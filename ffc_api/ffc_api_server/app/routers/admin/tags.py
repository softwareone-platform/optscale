import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import Select

from ffc_api.ffc_api_server.app.db.handlers import ConstraintViolationError, NotFoundError
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.dependencies.db import TagRepository
from ffc_api.ffc_api_server.app.dependencies.path import TagId
from ffc_api.ffc_api_server.app.pagination import LimitOffsetPage, paginate
from ffc_api.ffc_api_server.app.rql import RQLQuery, TagRules
from ffc_api.ffc_api_server.app.schemas.core import (
    convert_model_to_schema,
    convert_schema_to_model,
)
from ffc_api.ffc_api_server.app.schemas.tags import TagCreate, TagRead, TagUpdate
from ffc_api.ffc_api_server.app.utils import wrap_exc_in_http_response

router = APIRouter()
logger = logging.getLogger(__name__)


async def fetch_tag_or_404(tag_id: TagId, tag_repo: TagRepository) -> Tag:
    try:
        return await tag_repo.get(id=tag_id, extra_conditions=[Tag.deleted_at.is_(None)])
    except NotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        ) from e


@router.get("", response_model=LimitOffsetPage[TagRead])
async def get_tags(
    tag_repo: TagRepository,
    base_query: Select = Depends(RQLQuery(TagRules())),
):
    return await paginate(
        tag_repo,
        TagRead,
        base_query=base_query,
        where_clauses=[Tag.deleted_at.is_(None)],
    )


@router.post(
    "",
    response_model=TagRead,
    status_code=status.HTTP_201_CREATED,
)
async def create_tag(
    data: TagCreate,
    tag_repo: TagRepository,
):
    with wrap_exc_in_http_response(ConstraintViolationError, "Tag already exists."):
        tag = convert_schema_to_model(data, Tag)
        db_tag = await tag_repo.create(tag)
    return convert_model_to_schema(TagRead, db_tag)


@router.get(
    "/{tag_id}",
    response_model=TagRead,
    responses={
        200: {
            "description": "Tag",
            "content": {
                "application/json": {
                    "example": None,
                }
            },
        },
    },
)
async def get_tag_by_id(
    tag: Annotated[Tag, Depends(fetch_tag_or_404)],
):
    return convert_model_to_schema(TagRead, tag)


@router.delete(
    "/{tag_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_tag_by_id(
    tag: Annotated[Tag, Depends(fetch_tag_or_404)],
    tag_repo: TagRepository,
):
    await tag_repo.delete(tag)


@router.put(
    "/{tag_id}",
    response_model=TagRead,
)
async def update_tag_by_id(
    data: TagUpdate,
    tag_repo: TagRepository,
    tag: Annotated[Tag, Depends(fetch_tag_or_404)],
):
    db_tag = await tag_repo.update(tag, {"value": data.value})
    return convert_model_to_schema(TagRead, db_tag)
