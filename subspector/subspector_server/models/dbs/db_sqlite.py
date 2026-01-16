from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.pool import StaticPool
from subspector.subspector_server.models.dbs.db_base import BaseDB
from subspector.subspector_server.models.models import Base
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_fixed,
)


def should_retry(_exception):
    return True


class SQLiteDB(BaseDB):
    async def _get_engine(self):
        return create_async_engine(
            'sqlite+aiosqlite:///:memory:',
            poolclass=StaticPool,
            connect_args={'check_same_thread': False},
        )

    async def create_schema(self):
        await self._create_schema()

    @retry(
        stop=stop_after_attempt(20),
        wait=wait_fixed(1),
        retry=retry_if_exception_type(Exception),
    )
    async def _create_schema(self):
        engine = await self.get_engine()
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
