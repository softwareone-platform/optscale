import logging
from collections.abc import Sequence
from typing import Annotated, Any

from fastapi import APIRouter, Depends
from fastapi.concurrency import run_in_threadpool
from fastapi_pagination import create_page, resolve_params
from requests import RequestException
from sqlalchemy import Select

from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource, Organization, Pool, User
from ffc_api.ffc_api_server.app.dependencies.db import (
    DataSourceRepository,
    OrganizationRepository,
    PoolRepository,
    TagRepository,
    UserRepository,
)
from ffc_api.ffc_api_server.app.dependencies.path import TagId
from ffc_api.ffc_api_server.app.enums import TagResourceType
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
from ffc_api.ffc_api_server.app.schemas.organizations import OrganizationExpenses, OrganizationRead
from ffc_api.ffc_api_server.app.schemas.tags import TagRead
from ffc_api.ffc_api_server.app.schemas.users import UserRead
from ffc_api.ffc_api_server.app.services.expenses import get_forecasts, get_organization_expenses
from ffc_api.ffc_api_server.app.services.organizations import fetch_organization_or_404
from ffc_api.ffc_api_server.app.services.tags import fetch_tag_or_404
from ffc_api.ffc_api_server.app.services.users import build_user_read
from ffc_api.ffc_api_server.app.utils import wrap_exc_in_http_response

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
        where_clauses=[Organization.is_demo.is_(False), Organization.disabled.is_(False)],
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
    pool_repo: PoolRepository,
    base_query: Select = Depends(RQLQuery(UserRules())),
):
    pools = await pool_repo.query_db(
        where_clauses=[
            Pool.organization_id == organization.id,
            Pool.deleted_at == 0,
        ],
    )

    where_clauses = [User.organization_id == organization.id, User.deleted_at == 0]
    params: LimitOffsetParams = resolve_params()
    total = await user_repo.count(base_query=base_query, where_clauses=where_clauses)
    users: Sequence[User] = []
    if params.limit > 0:
        users = await user_repo.query_with_assignment_scope(
            resource_ids=[pool.id for pool in pools] + [organization.id],
            base_query=base_query,
            where_clauses=where_clauses,
            limit=params.limit,
            offset=params.offset,
            order_by=[User.id],
        )

    resource_map: dict[str, dict[str, Any]] = {
        pool.id: {"name": pool.name, "purpose": pool.purpose} for pool in pools
    }
    resource_map[organization.id] = {"name": organization.name}

    return create_page(
        [build_user_read(user, resource_map=resource_map) for user in users],
        params=params,
        total=total,
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
        [
            convert_model_to_schema(
                DataSourceWithExpenses,
                item,
                forecast=expenses[item.id].get("forecast"),
                cost=expenses[item.id].get("cost"),
                resources=expenses[item.id].get("resources"),
            )
            for item in datasources
        ],
        params=params,
        total=total,
    )


@router.get(
    "/{organization_id}/expenses",
    response_model=OrganizationExpenses,
    responses={
        200: {
            "description": "Organization expenses",
            "content": {
                "application/json": {
                    "example": None,
                },
            },
        },
    },
)
async def get_expenses_by_organization_id(
    organization: Annotated[Organization, Depends(fetch_organization_or_404)],
):
    with wrap_exc_in_http_response(
        exc_cls=RequestException,
        status_code=502,
    ):
        expenses = await run_in_threadpool(get_organization_expenses, organization) or {}
        return OrganizationExpenses(
            limit=expenses.get("limit", 0),
            expenses_this_month=expenses.get("cost", 0),
            expenses_this_month_forecast=expenses.get("forecast", 0),
            possible_monthly_saving=expenses.get("saving", 0),
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
