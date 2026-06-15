from enum import Enum
from subspector.subspector_server.models.dbs.db_mysql import MySQLDB
from subspector.subspector_server.models.dbs.db_sqlite import SQLiteDB


class DBType(Enum):
    TEST = 'test'
    MYSQL = 'mysql'


class Database:
    DBS = {DBType.TEST: SQLiteDB, DBType.MYSQL: MySQLDB}
    _instances: dict[DBType, 'Database'] = {}
    _db = None

    @staticmethod
    def _get_db(db_type, config):
        db_class = Database.DBS.get(db_type)
        if not db_class:
            error = 'Nonexistent model type specified: %s', db_type
            raise ValueError(error)
        else:
            return db_class(config)

    def __new__(cls, db_type, config, *args, **kwargs):
        if db_type not in cls._instances:
            instance = super().__new__(cls, *args, **kwargs)
            instance._db = Database._get_db(db_type, config)
            cls._instances[db_type] = instance
        return cls._instances[db_type]

    @classmethod
    def clean_type(cls, db_type):
        if cls._instances.get(db_type):
            del cls._instances[db_type]

    @property
    def db(self):
        return self._db
