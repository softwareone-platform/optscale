import logging
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.concurrency import run_in_threadpool
from fastapi_pagination import create_page, resolve_params
from sqlalchemy import Select

from ffc_api.ffc_api_server.app.clickhouse.service import get_forecasts
from ffc_api.ffc_api_server.app.db.models import Tag
from ffc_api.ffc_api_server.app.dependencies.db import (
    DataSourceRepository,
    OrganizationRepository,
    TagRepository,
    UserRepository,
)
from ffc_api.ffc_api_server.app.dependencies.path import TagId
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.app.optscale.models import DataSource, Organization, User
from ffc_api.ffc_api_server.app.pagination import LimitOffsetPage, LimitOffsetParams, paginate
from ffc_api.ffc_api_server.app.rql import (
    DataSourceRules,
    OrganizationRules,
    RQLQuery,
    TagRules,
    UserRules,
)
from ffc_api.ffc_api_server.app.schemas.core import convert_model_to_schema
from ffc_api.ffc_api_server.app.schemas.datasources import DataSourceWithExpenses
from ffc_api.ffc_api_server.app.schemas.organizations import OrganizationRead
from ffc_api.ffc_api_server.app.schemas.tags import TagRead
from ffc_api.ffc_api_server.app.schemas.users import UserRead
from ffc_api.ffc_api_server.app.services.organizations import fetch_organization_or_404
from ffc_api.ffc_api_server.app.services.tags import fetch_tag_or_404

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get(
    "",
    response_model=LimitOffsetPage[OrganizationRead],
    responses={
        200: {
            "description": "List of Organizations",
            "content": {
                "application/json": {
                    "example": {
                        "items": [],
                        "total": 1,
                        "limit": 10,
                        "offset": 0,
                    },
                },
            },
        },
    },
)
async def get_organizations(
    organization_repo: OrganizationRepository,
    base_query: Select = Depends(RQLQuery(OrganizationRules())),
):
    return await paginate(
        organization_repo,
        OrganizationRead,
        base_query=base_query,
        where_clauses=[Organization.is_demo == False, Organization.disabled == False],
    )


@router.get(
    "/{organization_id}",
    response_model=OrganizationRead,
    responses={
        200: {
            "description": "Organization",
            "content": {
                "application/json": {
                    "example": None,
                }
            },
        },
    },
)
async def get_organization_by_id(
    organization: Annotated[Organization, Depends(fetch_organization_or_404)],
):
    return convert_model_to_schema(OrganizationRead, organization)


@router.get(
    "/{organization_id}/users",
    response_model=LimitOffsetPage[UserRead],
    responses={
        200: {
            "description": "List of Organization Users",
            "content": {
                "application/json": {
                    "example": {
                        "items": [],
                        "total": 1,
                        "limit": 10,
                        "offset": 0,
                    },
                },
            },
        },
    },
)
async def get_users_by_organization_id(
    organization: Annotated[Organization, Depends(fetch_organization_or_404)],
    user_repo: UserRepository,
    base_query: Select = Depends(RQLQuery(UserRules())),
):
    return await paginate(
        user_repo,
        UserRead,
        base_query=base_query,
        where_clauses=[User.organization_id == organization.id],
    )


@router.get(
    "/{organization_id}/datasources",
    response_model=LimitOffsetPage[DataSourceWithExpenses],
    responses={
        200: {
            "description": "List of Organization Data Sources",
            "content": {
                "application/json": {
                    "example": {
                        "items": [],
                        "total": 1,
                        "limit": 10,
                        "offset": 0,
                    },
                },
            },
        },
    },
)
async def get_datasources_by_organization_id(
    organization: Annotated[Organization, Depends(fetch_organization_or_404)],
    datasource_repo: DataSourceRepository,
    base_query: Select = Depends(RQLQuery(DataSourceRules())),
):
    where_clauses = [
        DataSource.organization_id == organization.id,
        DataSource.deleted_at == 0,
    ]
    params: LimitOffsetParams = resolve_params()
    total = await datasource_repo.count(base_query=base_query, where_clauses=where_clauses)
    datasources = []
    if params.limit > 0:
        order_by = [DataSource.id]
        datasources = await datasource_repo.query_db(
            base_query=base_query,
            limit=params.limit,
            offset=params.offset,
            where_clauses=where_clauses,
            order_by=order_by,
        )

    datasources_ids = [ds.id for ds in datasources]
    expenses = await run_in_threadpool(
        get_forecasts,
        datasources_ids,
    )

    return create_page(
        [convert_model_to_schema(
            DataSourceWithExpenses,
            item,
            forecast=expenses[item.id].get('forecast'),
            cost=expenses[item.id].get('cost'),
            resources=expenses[item.id].get('resources'),
        ) for item in datasources],
        params=params,
        total=total,
    )


@router.get(
    "/{organization_id}/tags",
    response_model=LimitOffsetPage[TagRead],
)
async def get_tags_by_organization_id(
    organization: Annotated[Organization, Depends(fetch_organization_or_404)],
    tag_repo: TagRepository,
    base_query: Select = Depends(RQLQuery(TagRules())),
):
    return await paginate(
        tag_repo,
        TagRead,
        base_query=base_query,
        where_clauses=[
            Tag.deleted_at.is_(None),
            Tag.resource_type == TagResourceType.ORGANIZATION,
            Tag.resource_id == organization.id,
        ],
    )


@router.get(
    "/{organization_id}/tags/{tag_id_or_name}",
    response_model=TagRead,
)
async def get_tag_by_organization_id(
    organization: Annotated[Organization, Depends(fetch_organization_or_404)],
    tag_id_or_name: TagId,
    tag_repo: TagRepository,
):
    tag = await fetch_tag_or_404(
        organization.id, tag_id_or_name, tag_repo, TagResourceType.ORGANIZATION
    )
    return convert_model_to_schema(TagRead, tag)
