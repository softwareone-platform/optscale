import logging
from datetime import timedelta

from tools.optscale_data.expenses import ExpenseQuery

from ffc_api.ffc_api_server.app.clients.clickhouse import get_clickhouse_client
from ffc_api.ffc_api_server.app.clients.mongo import get_mongo_client
from ffc_api.ffc_api_server.app.clients.rest_api import get_rest_api_client
from ffc_api.ffc_api_server.app.utils import utcnow

logger = logging.getLogger(__name__)


def get_forecasts(datasource_ids):
    result = {}

    if not datasource_ids:
        return result

    q = _build_query()
    today = utcnow()

    month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    month_end = today.replace(hour=23, minute=59, second=59, microsecond=0)
    month_rows = q.get_cloud_expenses_with_resource_info(datasource_ids, month_start, month_end)
    month_expenses = {r[0]: {"cost": r[1], "count": r[2]} for r in month_rows}

    last_month_end = month_start
    last_month_start = (last_month_end - timedelta(days=1)).replace(day=1)
    last_month_rows = q.get_cloud_expenses_with_resource_info(
        datasource_ids, last_month_start, last_month_end
    )
    last_month_expenses = {r[0]: {"cost": r[1], "count": r[2]} for r in last_month_rows}

    first_expenses = q.get_first_expenses_for_forecast("cloud_account_id", datasource_ids)

    result = {}
    for ds_id in datasource_ids:
        default = {"cost": 0, "count": 0}
        current_stats = month_expenses.get(ds_id, default)
        last_stats = last_month_expenses.get(ds_id, default)
        result[ds_id] = {
            "cost": current_stats["cost"],
            "forecast": q.get_monthly_forecast(
                last_stats["cost"] + current_stats["cost"],
                current_stats["cost"],
                first_expenses.get(ds_id),
            ),
            "resources": current_stats["count"],
        }
    return result


def _build_query() -> ExpenseQuery:
    clickhouse_client = get_clickhouse_client()
    mongo_client = get_mongo_client().restapi.resources

    def execute_clickhouse(query, **kwargs):
        return clickhouse_client.query(query=query, **kwargs).result_rows

    return ExpenseQuery(
        execute_clickhouse=execute_clickhouse,
        resources_collection=mongo_client,
    )


def get_organization_expenses(organization):
    pool_id = organization.pool_id
    if not pool_id:
        return None

    client = get_rest_api_client()
    _, expenses = client.pool_get(pool_id, details=True)
    return expenses
