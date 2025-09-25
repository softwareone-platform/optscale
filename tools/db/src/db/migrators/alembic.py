import configparser
import logging
import os
import shlex
import subprocess
import sys

from db.migrators.base import BaseMigrator
from db.utils import PROJECT_ROOT, build_url

LOG = logging.getLogger()
LOG.addHandler(logging.StreamHandler())
LOG.setLevel(logging.DEBUG)


class ConfigTemplate:
    def __init__(self, service_path):
        self.service_path = service_path
        self.config = None

    def load(self, name="alembic.template"):
        config = configparser.ConfigParser()
        config.read(str(self.service_path / name))
        self.config = config
        return self.config

    def save(self, host, username, password, db, file_name="alembic.ini"):
        config = self.load()

        mysql_connection_url = build_url(
            scheme="mysql+mysqlconnector",
            username=username,
            password=password,
            host=host,
            path=db,
        )

        config.set("alembic", "sqlalchemy.url", mysql_connection_url)

        with (self.service_path / file_name).open("w") as fh:
            config.write(fh)

    def execute(self, cmd_parts):
        cmd_parts = list(map(str, cmd_parts))
        full_cmd = shlex.join(cmd_parts)

        LOG.debug("Executing command %s", full_cmd)
        myenv = os.environ.copy()
        myenv["PYTHONPATH"] = str(PROJECT_ROOT)

        proc = subprocess.Popen(cmd_parts, stdout=subprocess.PIPE, env=myenv, cwd=self.service_path)
        out, err = proc.communicate()
        LOG.debug("Command: %s output: %s, err: %s, retcode: %s", full_cmd, out, err, proc.returncode)

        if proc.returncode != 0:
            sys.exit(proc.returncode)


# TODO: Merge the template and the migrator into a single class


class AlembicMigrator(BaseMigrator):
    def save_config(self, file_name: str = "alembic.ini") -> ConfigTemplate:
        template = ConfigTemplate(self.service_path)
        # TODO: Add support for passing the db port as well
        template.save(
            host=self.db_host,
            username=self.db_username,
            password=self.db_password,
            db=self.db_name,
            file_name=file_name,
        )
        return template

    def generate_migration(self, name: str):
        template = self.save_config()
        # TODO: Discrepency with migrate -- do we need the -c arg here?
        cmd = ["alembic", "revision", "--autogenerate", "-m", name]
        template.execute(cmd)

    def migrate(self):
        template = self.save_config()
        cmd = ["alembic", "-c", (template.service_path / "alembic.ini").resolve(), "upgrade", "head"]
        template.execute(cmd)
