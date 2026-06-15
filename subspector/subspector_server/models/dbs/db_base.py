from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker
from optscale_client.config_client.client import Client as ConfigClient


class BaseDB:
    def __init__(self, config: ConfigClient):
        self._engine: AsyncEngine | None = None
        self._config: ConfigClient = config
        self._session_maker: async_sessionmaker[AsyncSession] | None = None

    async def init_session_maker(self):
        if not self._session_maker:
            engine = await self.get_engine()
            self._session_maker = async_sessionmaker(
                bind=engine, autoflush=False
            )

    async def session(self):
        if not self._session_maker:
            await self.init_session_maker()
        return self._session_maker()

    async def prepare(self):
        await self.create_schema()
        await self.init_session_maker()

    async def get_engine(self):
        if not self._engine:
            self._engine = await self._get_engine()
        return self._engine

    async def _get_engine(self):
        raise NotImplementedError

    async def create_schema(self):
        raise NotImplementedError

    async def dispose(self):
        if self._engine:
            await self._engine.dispose()
