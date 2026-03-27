import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import Select

from app.db.handlers import NotFoundError
from app.dependencies.db import DataSourceRepository, OrganizationRepository, UserRepository
from app.dependencies.path import OrganizationId
from app.pagination import LimitOffsetPage, paginate
from app.rql import DataSourceRules, OrganizationRules, RQLQuery, UserRules
from app.schemas.core import convert_model_to_schema
from app.schemas.datasources import DataSourceRead
from app.schemas.organizations import OrganizationRead
from app.schemas.users import UserRead
from app.optscale.models import DataSource, Organization, User

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


async def fetch_organization_or_404(
    organization_id: OrganizationId, organization_repo: OrganizationRepository
) -> Organization:
    try:
        return await organization_repo.get(
            id=organization_id,
            extra_conditions=[Organization.disabled == False],
        )
    except NotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        ) from e


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
    response_model=LimitOffsetPage[DataSourceRead],
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
    },)
async def get_datasources_by_organization_id(
    organization: Annotated[Organization, Depends(fetch_organization_or_404)],
    datasource_repo: DataSourceRepository,
    base_query: Select = Depends(RQLQuery(DataSourceRules())),
):
    return await paginate(
        datasource_repo,
        DataSourceRead,
        base_query=base_query,
        where_clauses=[DataSource.organization_id == organization.id],
    )
