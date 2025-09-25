import hashlib
import importlib
import logging
import os
from datetime import UTC, datetime

import clickhouse_connect
from clickhouse_connect.driver.client import Client as ClickhouseClient

from db.migrators.base import BaseMigrator
from db.utils import PROJECT_ROOT

LOG = logging.getLogger(__name__)

MIGRATIONS_FOLDER = "migrations"
VERSIONS_TABLE = "schema_versions"


class ClickhouseMigrator(BaseMigrator):
    def __post_init__(self):
        self._clickhouse_client: ClickhouseClient | None = None

    @property
    def clickhouse_client(self) -> ClickhouseClient:
        if self._clickhouse_client is None:
            self._clickhouse_client = clickhouse_connect.get_client(
                host=self.db_host,
                port=self.db_port,
                user=self.db_username,
                password=self.db_password,
                database=self.db_name,
                secure=self.db_secure,
            )

        return self._clickhouse_client

    def init_db(self):
        self.clickhouse_client.query(f"""CREATE DATABASE IF NOT EXISTS {self.db_name}""")

    def create_versions_table(self):
        self.clickhouse_client.query(
            f"""CREATE TABLE IF NOT EXISTS {VERSIONS_TABLE} (
                 version UInt32,
                 md5 String,
                 script String,
                 created_at DateTime DEFAULT now())
               ENGINE = MergeTree
               ORDER BY tuple(created_at)"""
        )

    def get_local_versions(self):
        migrations_folder = str((self.service_path / MIGRATIONS_FOLDER).resolve())
        migrations = []
        for filename in os.listdir(migrations_folder):
            if filename.startswith("V") and filename.endswith(".py"):
                migrations.append(filename.split(".py")[0])
        return sorted(migrations)

    def get_clickhouse_versions(self):
        versions_list = []
        ch_versions_q = self.clickhouse_client.query(f"""SELECT script from {VERSIONS_TABLE}""")
        for ch_version in ch_versions_q.result_rows:
            script_name = ch_version[0]
            # fix script names
            if script_name.endswith("sql"):
                new_script_name = script_name.replace("sql", "py")
                self.clickhouse_client.query(f"""
                    ALTER TABLE {VERSIONS_TABLE}
                    UPDATE script='{new_script_name}'
                    WHERE script='{script_name}'""")
                self.clickhouse_client.query(f"""OPTIMIZE TABLE {VERSIONS_TABLE} FINAL""")
            script_base_name = script_name.replace(".py", "").replace(f"{MIGRATIONS_FOLDER}/", "")
            versions_list.append(script_base_name)
        return sorted(versions_list)

    @staticmethod
    def check_versions(local_versions, ch_versions):
        if len(local_versions) < len(ch_versions):
            raise ValueError(
                "Found remote migrations that do not exist locally. Did you accidentally remove something?"
            )
        for i, ch_version in enumerate(ch_versions):
            if ch_version != local_versions[i]:
                raise ValueError(
                    f"Found remote migrations that do not exist locally. "
                    f"Conflicting versions: ({ch_version}, {local_versions[i]})"
                )

    @staticmethod
    def _get_version_from_name(filename):
        return int(filename.split("_")[0].replace("V", ""))

    @staticmethod
    def _get_script_from_name(filename):
        return f"{MIGRATIONS_FOLDER}/{filename}.py"

    @staticmethod
    def _get_md5(filename):
        return hashlib.md5(open(f"{MIGRATIONS_FOLDER}/{filename}.py", "rb").read()).hexdigest()

    def update_versions_table(self, filename):
        version = [
            self._get_version_from_name(filename),
            self._get_script_from_name(filename),
            self._get_script_from_name(filename),
            datetime.now(tz=UTC).replace(tzinfo=None),
        ]
        column_names = ["version", "md5", "script", "created_at"]
        self.clickhouse_client.insert(VERSIONS_TABLE, [version], column_names=column_names)

    def migrate(self):
        self.init_db()
        self.create_versions_table()
        local_versions = self.get_local_versions()
        ch_versions = self.get_clickhouse_versions()
        if ch_versions:
            LOG.info(f"Found remote migrations. Last version is {ch_versions[-1]}")
        else:
            LOG.info("Found no remote migrations")
        self.check_versions(local_versions, ch_versions)

        import_base = self.service_path.relative_to(PROJECT_ROOT)
        import_base = import_base.replace("/", ".")

        new_migrations = local_versions[len(ch_versions) :]
        for filename in new_migrations:
            LOG.info(f"Upgrading version {filename}")
            import_path = f"{import_base}.{MIGRATIONS_FOLDER}.{filename}"
            module = importlib.import_module(import_path)
            # TODO: Change back the arguments here to accept the config client instead
            migration = module.Migration(self.clickhouse_client)
            migration.upgrade()
            self.update_versions_table(filename)
            LOG.info(f"Finished migration {filename}")
        LOG.info("Upgrade is finished")
