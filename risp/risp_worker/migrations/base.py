import os
import logging
import clickhouse_connect
from pymongo import MongoClient

LOG = logging.getLogger(__name__)
CH_DB_NAME = 'risp'
MIGRATIONS_FOLDER = 'migrations'


class MigrationBase:
    def __init__(self, config_client):
        self.config_client = config_client
        self._mongo_client = None
        self._clickhouse_client = None

    @property
    def name(self):
        return os.path.basename(__file__)

    @property
    def migrations_path(self):
        return os.path

    @property
    def mongo_client(self):
        if self._mongo_client is None:
            mongo_params = self.config_client.mongo_params()
            self._mongo_client = MongoClient(mongo_params[0])
        return self._mongo_client

    @property
    def clickhouse_client(self):
        if self._clickhouse_client is None:
            user, password, host, _, port, secure = (
                self.config_client.clickhouse_params())
            self._clickhouse_client = clickhouse_connect.get_client(
                host=host, password=password, database=CH_DB_NAME, user=user,
                port=port, secure=secure)
        return self._clickhouse_client

    def upgrade(self):
        raise NotImplementedError
