import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import Select

from ffc_api.ffc_api_server.app.db.handlers import NotFoundError
from ffc_api.ffc_api_server.app.db.models import Tag
from ffc_api.ffc_api_server.app.dependencies.db import DataSourceRepository, TagRepository
from ffc_api.ffc_api_server.app.dependencies.path import DataSourceId, TagId
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.app.optscale.models import DataSource
from ffc_api.ffc_api_server.app.pagination import LimitOffsetPage, paginate
from ffc_api.ffc_api_server.app.rql import DataSourceRules, RQLQuery, TagRules
from ffc_api.ffc_api_server.app.schemas.core import convert_model_to_schema
from ffc_api.ffc_api_server.app.schemas.datasources import DataSourceRead
from ffc_api.ffc_api_server.app.schemas.tags import TagRead
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


async def fetch_datasource_or_404(
    datasource_id: DataSourceId, datasource_repo: DataSourceRepository
) -> DataSource:
    try:
        return await datasource_repo.get(id=datasource_id)
    except NotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        ) from e


@router.get(
    "/{datasource_id}",
    response_model=DataSourceRead,
)
async def get_organization_by_id(
    datasource: Annotated[DataSource, Depends(fetch_datasource_or_404)],
):
    return convert_model_to_schema(DataSourceRead, datasource)


@router.get(
    "/{datasource_id}/tags",
    response_model=LimitOffsetPage[TagRead],
)
async def get_tags_by_datasource_id(
    datasource: Annotated[DataSource, Depends(fetch_datasource_or_404)],
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
    datasource: Annotated[DataSource, Depends(fetch_datasource_or_404)],
    tag_id_or_name: TagId,
    tag_repo: TagRepository,
):
    tag = await fetch_tag_or_404(
        datasource.id, tag_id_or_name, tag_repo, TagResourceType.DATA_SOURCE
    )
    return convert_model_to_schema(TagRead, tag)
