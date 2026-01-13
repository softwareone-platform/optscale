from sqlalchemy.ext.asyncio import create_async_engine
from subspector.subspector_server.models.dbs.db_base import BaseDB


class MySQLDB(BaseDB):
    async def _get_engine(self):
        user, password, host, db = self._config.subspector_db_params()
        return create_async_engine(
            f'mysql+asyncmy://{user}:{password}@{host}/{db}?charset=utf8mb4',
            pool_recycle=500,
            pool_size=200,
            max_overflow=25,
            future=True,
        )

    async def create_schema(self):
        # created in initContainers job
        return
