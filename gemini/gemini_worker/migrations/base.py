import os
import logging
import clickhouse_connect


DB_NAME = "gemini"
MIGRATIONS_FOLDER = "migrations"

LOG = logging.getLogger(__name__)


class MigrationBase:
    def __init__(self, config_client):
        self.config_client = config_client
        self._clickhouse_client = None

    @property
    def name(self):
        return os.path.basename(__file__)

    @property
    def migrations_path(self):
        return os.path

    @property
    def clickhouse_client(self):
        if self._clickhouse_client is None:
            user, password, host, _, port, secure = (
                self.config_client.clickhouse_params())
            self._clickhouse_client = clickhouse_connect.get_client(
                host=host, password=password, database=DB_NAME, user=user,
                port=port, secure=secure)
        return self._clickhouse_client

    def upgrade(self):
        raise NotImplementedError
