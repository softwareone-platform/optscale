import logging
from typing import Annotated, List

from fastapi import APIRouter, Depends
from fastapi.concurrency import run_in_threadpool
from sqlalchemy import Select

from ffc_api.ffc_api_server.app.auth.client import authorize
from ffc_api.ffc_api_server.app.clickhouse.service import get_forecasts
from ffc_api.ffc_api_server.app.dependencies.auth import token_bearer
from ffc_api.ffc_api_server.app.dependencies.db import DataSourceRepository
from ffc_api.ffc_api_server.app.optscale.models import DataSource, Organization
from ffc_api.ffc_api_server.app.rql import DataSourceRules, RQLQuery
from ffc_api.ffc_api_server.app.schemas.core import convert_model_to_schema
from ffc_api.ffc_api_server.app.schemas.datasources import DataSourceWithExpenses
from ffc_api.ffc_api_server.app.services.organizations import fetch_organization_or_404

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get(
    "/{organization_id}/datasources",
    response_model=List[DataSourceWithExpenses],
)
async def get_datasources_by_organization_id(
    organization: Annotated[Organization, Depends(fetch_organization_or_404)],
    datasource_repo: DataSourceRepository,
    base_query: Select = Depends(RQLQuery(DataSourceRules())),
    token: str = Depends(token_bearer),
):
    authorize(token, 'INFO_ORGANIZATION', 'organization', organization.id)

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

    return [convert_model_to_schema(
        DataSourceWithExpenses,
        item,
        forecast=expenses[item.id].get('forecast'),
        cost=expenses[item.id].get('cost'),
        resources=expenses[item.id].get('resources'),
    ) for item in datasources]
