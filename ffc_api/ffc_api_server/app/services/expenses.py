from calendar import monthrange
from datetime import datetime, timedelta

from tools.optscale_data.clickhouse import ExternalDataConverter

from ffc_api.ffc_api_server.app.clients.clickhouse import get_clickhouse_client
from ffc_api.ffc_api_server.app.clients.mongo import get_mongo_client
from ffc_api.ffc_api_server.app.utils import utcnow


def get_cloud_expenses_with_resource_info(
    clickhouse_client, mongo_client, datasource_ids, start_date, end_date
):
    pipeline = [
        {
            "$match": {
                "$and": [
                    {"cloud_account_id": {"$in": datasource_ids}},
                    {"_first_seen_date": {"$lt": end_date}},
                    {
                        "_last_seen_date": {
                            "$gte": start_date.replace(hour=0, minute=0, second=0, microsecond=0),
                        },
                    },
                    {"first_seen": {"$lt": int(end_date.timestamp())}},
                    {"last_seen": {"$gte": int(start_date.timestamp())}},
                    {"deleted_at": 0},
                ]
            }
        },
        {
            "$group": {"_id": "$cloud_account_id", "count": {"$sum": 1}},
        },
    ]
    resource_counts = list(mongo_client.restapi.resources.aggregate(pipeline))
    query = """
            SELECT cloud_account_id, SUM(cost * sign), count
            FROM expenses
                     JOIN cloud_accounts
                          ON expenses.cloud_account_id = cloud_accounts._id
            WHERE date >= %(start_date)s \
              AND date \
                < %(end_date)s
            GROUP BY cloud_account_id, count
            """

    return clickhouse_client.query(
        query=query,
        parameters={"start_date": start_date, "end_date": end_date},
        external_data=ExternalDataConverter()(
            [
                {
                    "name": "cloud_accounts",
                    "structure": [("_id", "String"), ("count", "Int32")],
                    "data": resource_counts,
                }
            ]
        ),
    ).result_rows


def get_cloud_expenses(clickhouse_client, mongo_client, start, end, datasource_ids):
    expenses = get_cloud_expenses_with_resource_info(
        clickhouse_client,
        mongo_client,
        datasource_ids=datasource_ids,
        start_date=start,
        end_date=end,
    )
    return {x[0]: {"cost": x[1], "count": x[2]} for x in expenses}


def get_this_month_expenses(clickhouse_client, mongo_client, datasource_ids, today_date):
    start = today_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    end = today_date.replace(hour=23, minute=59, second=59, microsecond=0)

    return get_cloud_expenses(clickhouse_client, mongo_client, start, end, datasource_ids)


def get_last_month_expenses(clickhouse_client, mongo_client, datasource_ids, today_date):
    end = today_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    last_day_in_month = end - timedelta(days=1)
    start = last_day_in_month.replace(day=1)
    return get_cloud_expenses(clickhouse_client, mongo_client, start, end, datasource_ids)


def get_first_expenses_for_forecast(clickhouse_client, datasource_ids):
    prev_month_start = (utcnow().replace(day=1) - timedelta(days=1)).replace(
        day=1, hour=0, minute=0, second=0, microsecond=0
    )

    query = """
        SELECT 'cloud_account_id', min(date)
        FROM expenses
        WHERE cloud_account_id
            IN cloud_account_ids
            AND date >= %(date)s
        GROUP BY cloud_account_id
    """
    external_tables = [
        {
            "name": "cloud_account_ids",
            "structure": [("id", "String")],
            "data": [{"id": r_id} for r_id in datasource_ids],
        }
    ]

    result = clickhouse_client.query(
        query=query,
        parameters={"date": prev_month_start},
        external_data=ExternalDataConverter()(external_tables),
    ).result_rows

    return {r[0]: r[1] for r in result}


def get_monthly_forecast(cost, month_cost, first_expense=None):
    today = datetime.today()
    month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    last_month_start = (month_start - timedelta(days=1)).replace(day=1)
    start_date = max(last_month_start, first_expense) if first_expense else last_month_start
    forecast_days = (today - start_date).days
    daily_forecast = cost / forecast_days if forecast_days > 0 else cost
    _, days_in_month = monthrange(today.year, today.month)
    forecast = month_cost + daily_forecast * (days_in_month - (today - month_start).days)
    return round(forecast, 2)


def get_forecasts(datasource_ids):
    result = {}

    if not datasource_ids:
        return result

    clickhouse_client = get_clickhouse_client()
    mongo_client = get_mongo_client()

    today = utcnow()
    month_expenses = get_this_month_expenses(clickhouse_client, mongo_client, datasource_ids, today)
    last_month_expenses = get_last_month_expenses(
        clickhouse_client, mongo_client, datasource_ids, today
    )
    first_expenses = get_first_expenses_for_forecast(clickhouse_client, datasource_ids)

    for datasource_id in datasource_ids:
        default = {"cost": 0, "count": 0}
        current_stats = month_expenses.get(datasource_id, default)
        last_stats = last_month_expenses.get(datasource_id, default)
        result[datasource_id] = {
            "cost": current_stats["cost"],
            "forecast": get_monthly_forecast(
                last_stats["cost"] + current_stats["cost"],
                current_stats["cost"],
                first_expenses.get(datasource_id),
            ),
            "resources": current_stats["count"],
        }

    return result
