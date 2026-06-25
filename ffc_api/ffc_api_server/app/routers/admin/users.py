import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import Select

from ffc_api.ffc_api_server.app.db.handlers import NotFoundError
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import User
from ffc_api.ffc_api_server.app.dependencies.db import TagRepository, UserRepository
from ffc_api.ffc_api_server.app.dependencies.path import TagIdOrName, UserId
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.app.pagination import LimitOffsetPage, paginate
from ffc_api.ffc_api_server.app.rql import RQLQuery, TagRules, UserRules
from ffc_api.ffc_api_server.app.schemas.core import convert_model_to_schema
from ffc_api.ffc_api_server.app.schemas.tags import TagRead
from ffc_api.ffc_api_server.app.schemas.users import UserRead
from ffc_api.ffc_api_server.app.services.tags import fetch_tag_or_404

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get(
    "",
    response_model=LimitOffsetPage[UserRead],
)
async def get_users(
    user_repo: UserRepository,
    base_query: Select = Depends(RQLQuery(UserRules())),
):
    return await paginate(
        user_repo,
        UserRead,
        base_query=base_query,
    )


async def fetch_user_or_404(user_id: UserId, user_repo: UserRepository) -> User:
    try:
        return await user_repo.get(id=user_id)
    except NotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        ) from e


@router.get(
    "/{user_id}",
    response_model=UserRead,
)
async def get_user_by_id(
    user: Annotated[User, Depends(fetch_user_or_404)],
):
    return convert_model_to_schema(UserRead, user)


@router.get(
    "/{user_id}/tags",
    response_model=LimitOffsetPage[TagRead],
)
async def get_tags_by_user_id(
    user: Annotated[User, Depends(fetch_user_or_404)],
    tag_repo: TagRepository,
    base_query: Select = Depends(RQLQuery(TagRules())),
):
    return await paginate(
        tag_repo,
        TagRead,
        base_query=base_query,
        where_clauses=[
            Tag.deleted_at.is_(None),
            Tag.resource_type == TagResourceType.USER,
            Tag.resource_id == user.id,
        ],
    )


@router.get(
    "/{user_id}/tags/{tag_id_or_name}",
    response_model=TagRead,
)
async def get_tag_by_user_id(
    user: Annotated[User, Depends(fetch_user_or_404)],
    tag_id_or_name: TagIdOrName,
    tag_repo: TagRepository,
):
    tag = await fetch_tag_or_404(user.id, tag_id_or_name, tag_repo, TagResourceType.USER)
    return convert_model_to_schema(TagRead, tag)
