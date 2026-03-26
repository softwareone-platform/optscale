from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import handlers
from app.db.base import session_factory


async def get_db_session() -> AsyncGenerator[AsyncSession]:
    async with session_factory() as session:
        async with session.begin():
            yield session


DBSession = Annotated[AsyncSession, Depends(get_db_session)]


class HandlerFactory:
    def __init__(self, handler_cls: type[handlers.BaseHandler]):
        self.handler_class = handler_cls

    def __call__(self, session: DBSession) -> handlers.BaseHandler:
        return self.handler_class(session)


OrganizationRepository = Annotated[
    handlers.OrganizationHandler, Depends(HandlerFactory(handlers.OrganizationHandler))
]
UserRepository = Annotated[handlers.UserHandler, Depends(HandlerFactory(handlers.UserHandler))]
DataSourceRepository = Annotated[
    handlers.DataSourceHandler, Depends(HandlerFactory(handlers.DataSourceHandler))
]
TokenRepository = Annotated[handlers.TokenHandler, Depends(HandlerFactory(handlers.TokenHandler))]
TagRepository = Annotated[
    handlers.TagHandler, Depends(HandlerFactory(handlers.TagHandler))
]
