import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.concurrency import run_in_threadpool
from sqlalchemy import Select

from ffc_api.ffc_api_server.app.clients.rest_api import get_rest_api_client
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource, Organization
from ffc_api.ffc_api_server.app.dependencies.auth import require_token, verify_org_permission
from ffc_api.ffc_api_server.app.dependencies.db import DataSourceRepository
from ffc_api.ffc_api_server.app.rql import DataSourceRules, RQLQuery
from ffc_api.ffc_api_server.app.schemas.core import (
    convert_dict_to_schema,
    convert_model_to_schema,
)
from ffc_api.ffc_api_server.app.schemas.datasources import (
    ALLOWED_TYPES,
    DataSourceAdd,
    DataSourceWithConfig,
    DataSourceWithExpenses,
)
from ffc_api.ffc_api_server.app.services.expenses import get_forecasts
from ffc_api.ffc_api_server.app.services.organizations import fetch_organization_or_404
from ffc_api.ffc_api_server.app.utils import proxy_optscale_errors

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get(
    "/{organization_id}/datasources",
    response_model=list[DataSourceWithExpenses],
    dependencies=[Depends(verify_org_permission("INFO_ORGANIZATION"))],
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
    datasources = await datasource_repo.query_db(
        base_query=base_query,
        where_clauses=where_clauses,
    )

    datasources_ids = [ds.id for ds in datasources]
    expenses = await run_in_threadpool(
        get_forecasts,
        datasources_ids,
    )

    return [
        convert_model_to_schema(
            DataSourceWithExpenses,
            item,
            forecast=expenses[item.id].get("forecast"),
            cost=expenses[item.id].get("cost"),
            resources=expenses[item.id].get("resources"),
        )
        for item in datasources
    ]


@router.post(
    path="/{organization_id}/cloud_accounts",
    response_model=DataSourceWithConfig,
    status_code=status.HTTP_201_CREATED,
)
async def link_cloud_account(
    organization_id: str,
    data: DataSourceAdd,
    token: Annotated[str, Depends(require_token)],
):
    if data.type not in ALLOWED_TYPES:
        allowed = ", ".join(t.value for t in ALLOWED_TYPES)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported type: {data.type.value}. Allowed: {allowed}.",
        )

    client = get_rest_api_client(token=token)
    with proxy_optscale_errors():
        _, cloud_account = await run_in_threadpool(
            client.cloud_account_create, organization_id, data.model_dump(mode="json")
        )
    return convert_dict_to_schema(DataSourceWithConfig, cloud_account)
