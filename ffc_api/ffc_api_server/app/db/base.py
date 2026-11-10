import ssl

from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from ffc_api.ffc_api_server.app.conf import mysql_async_url

session_factory: async_sessionmaker[AsyncSession] = async_sessionmaker(
    class_=AsyncSession, expire_on_commit=False
)

ssl_ctx = ssl.create_default_context()


def configure_db_engine(settings) -> AsyncEngine:
    db_engine = create_async_engine(
        mysql_async_url(),
        echo=settings.debug,
        connect_args={"ssl": ssl_ctx},
        future=True,
        pool_pre_ping=True,
        pool_recycle=280,
    )
    session_factory.configure(bind=db_engine)
    return db_engine


async def verify_db_connection():
    async with session_factory() as session:
        result = await session.execute(text("SELECT 1"))

        if result.one()[0] != 1:
            raise RuntimeError("Could not verify database connection")
