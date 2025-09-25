import logging
import os
import re
from datetime import datetime
from importlib import import_module

from pymongo import MongoClient

from db.migrators.base import BaseMigrator

MIGRATIONS_COLLECTION_NAME = "database_migrations"
LOCAL_MIGRATIONS_REGEX = r"^([0-9]+)[_a-z]*\.py$"
LOG = logging.getLogger(__name__)


class LocalMigration:
    def __init__(self, migration_datetime, file):
        self._datetime = migration_datetime
        self._file = file

    @property
    def datetime(self):
        return self._datetime

    @property
    def file(self):
        return self._file


class MongoMigrator(BaseMigrator):
    def __post_init__(self) -> None:
        self._mongo_client: MongoClient | None = None

    @property
    def mongo_client(self) -> MongoClient:
        if self._mongo_client is None:
            url = "mongodb://%s:%s@%s:%s" % (
                self.db_host,
                self.db_port,
                self.db_username,
                self.db_password,
            )
            self._mongo_client = MongoClient(url)

        return self._mongo_client

    @property
    def _mongo_migrations(self):
        return self.mongo_client[self.db_name][MIGRATIONS_COLLECTION_NAME]

    @property
    def migrations_path(self):
        return str((self.service_path / "migrations").resolve())

    def _get_remote_migrations(self):
        return list(self._mongo_migrations.find().sort("migration_datetime"))

    def _put_remote_migration(self, migration_datetime):
        self._mongo_migrations.insert_one({"migration_datetime": migration_datetime, "created_at": datetime.now()})

    def _delete_remote_migration(self, migration_datetime):
        self._mongo_migrations.delete_one({"migration_datetime": migration_datetime})

    def _get_local_migrations(self):
        migrations = []
        migrations_regex = re.compile(LOCAL_MIGRATIONS_REGEX)
        for file in os.listdir(self.migrations_path):
            result = migrations_regex.match(file)
            if result:
                migration = LocalMigration(result.group(1), file)
                migrations.append(migration)
        migrations.sort(key=lambda x: x.datetime)
        return migrations

    def _run_local_migration(self, migration, downgrade=False):
        try:
            module_name = os.path.splitext(migration.file)[0]
            module_path = os.path.join(self.migrations_path, module_name)
            module_path = os.path.normpath(module_path)
            module = import_module(module_path.replace(os.path.sep, "."))

            # TODO: Create MigrationBase
            if not issubclass(module.Migration, MigrationBase):
                raise TypeError(f"Migration class in {module_path} does not inherit from MigrationBase")

            migration_object = module.Migration(mongo_client=self.mongo_client)
            if downgrade:
                LOG.info(f"Downgrading version {migration.datetime}")
                migration_object.downgrade()
            else:
                LOG.info(f"Upgrading version {migration.datetime}")
                migration_object.upgrade()
        except Exception:
            LOG.error(f"Failed to apply version {migration.datetime}")
            raise

    def _upgrade(self, local_migrations, remote_migrations, to_datetime=None):
        for local_migration in local_migrations:
            if to_datetime and local_migration.datetime > to_datetime:
                break
            if not remote_migrations or remote_migrations[-1]["migration_datetime"] < local_migration.datetime:
                self._run_local_migration(local_migration)
                self._put_remote_migration(local_migration.datetime)

    def _downgrade(self, local_migrations, remote_migrations, to_datetime=None):
        remote_datetimes = {m["migration_datetime"] for m in remote_migrations}
        for local_migration in reversed(local_migrations):
            if to_datetime and local_migration.datetime <= to_datetime:
                break
            if local_migration.datetime in remote_datetimes:
                self._run_local_migration(local_migration, downgrade=True)
                self._delete_remote_migration(local_migration.datetime)

    def migrate(self, downgrade=False, to_datetime=None):
        LOG.info("Running MongoDB migrations")
        local_migrations = self._get_local_migrations()
        local_datetimes = {m.datetime for m in local_migrations}

        remote_migrations = self._get_remote_migrations()
        remote_datetimes = {m["migration_datetime"] for m in remote_migrations}
        if remote_datetimes - local_datetimes:
            raise ValueError(
                "Found remote migrations that do not exist locally. Did you accidentally remove something?"
            )

        if remote_migrations:
            LOG.info("Found remote migrations. Last version is {}".format(remote_migrations[-1]["migration_datetime"]))
        else:
            LOG.info("Found no remote migrations")

        if downgrade:
            self._downgrade(local_migrations, remote_migrations, to_datetime)
        else:
            self._upgrade(local_migrations, remote_migrations, to_datetime)
            if not to_datetime:
                remote_migrations = self._get_remote_migrations()
                remote_datetimes = {m["migration_datetime"] for m in remote_migrations}
                if local_datetimes - remote_datetimes:
                    raise ValueError(
                        "Found more local migrations than were applied to "
                        "database. Did you forget to put your migration on top "
                        "after rebase?"
                    )
