import logging
from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import Select

from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource
from ffc_api.ffc_api_server.app.dependencies.db import DataSourceRepository, TagRepository
from ffc_api.ffc_api_server.app.dependencies.path import DataSourceId, TagIdOrName
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.app.pagination import LimitOffsetPage, paginate
from ffc_api.ffc_api_server.app.rql import DataSourceRules, RQLQuery, TagRules
from ffc_api.ffc_api_server.app.schemas.core import convert_model_to_schema
from ffc_api.ffc_api_server.app.schemas.datasources import DataSourceDetailRead, DataSourceRead
from ffc_api.ffc_api_server.app.schemas.tags import TagRead
from ffc_api.ffc_api_server.app.services.datasources import (
    fetch_datasource_or_404,
    get_datasource_detail,
)
from ffc_api.ffc_api_server.app.services.tags import fetch_tag_or_404

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get(
    "",
    response_model=LimitOffsetPage[DataSourceRead],
)
async def get_datasources(
    datasource_repo: DataSourceRepository,
    base_query: Select = Depends(RQLQuery(DataSourceRules())),
):
    return await paginate(
        datasource_repo,
        DataSourceRead,
        base_query=base_query,
    )


async def get_datasource_or_404(
    datasource_id: DataSourceId, datasource_repo: DataSourceRepository
) -> DataSource:
    return await fetch_datasource_or_404(datasource_repo, datasource_id)


@router.get(
    "/{datasource_id}",
    response_model=DataSourceDetailRead,
)
async def get_datasource_by_id(
    datasource: Annotated[DataSource, Depends(get_datasource_or_404)],
):
    return await get_datasource_detail(datasource)


@router.get(
    "/{datasource_id}/tags",
    response_model=LimitOffsetPage[TagRead],
)
async def get_tags_by_datasource_id(
    datasource: Annotated[DataSource, Depends(get_datasource_or_404)],
    tag_repo: TagRepository,
    base_query: Select = Depends(RQLQuery(TagRules())),
):
    return await paginate(
        tag_repo,
        TagRead,
        base_query=base_query,
        where_clauses=[
            Tag.deleted_at.is_(None),
            Tag.resource_type == TagResourceType.DATA_SOURCE,
            Tag.resource_id == datasource.id,
        ],
    )


@router.get(
    "/{datasource_id}/tags/{tag_id_or_name}",
    response_model=TagRead,
)
async def get_tag_by_datasource_id(
    datasource: Annotated[DataSource, Depends(get_datasource_or_404)],
    tag_id_or_name: TagIdOrName,
    tag_repo: TagRepository,
):
    tag = await fetch_tag_or_404(
        datasource.id, tag_id_or_name, tag_repo, TagResourceType.DATA_SOURCE
    )
    return convert_model_to_schema(TagRead, tag)
