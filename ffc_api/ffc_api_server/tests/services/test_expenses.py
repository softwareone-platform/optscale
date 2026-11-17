from datetime import UTC, datetime

import time_machine
from ffc_api.ffc_api_server.app.services import expenses as expenses_service
from ffc_api.ffc_api_server.app.services.expenses import (
    _build_query,
    get_forecasts,
    get_organization_expenses,
)
from pytest_mock import MockerFixture

FROZEN_NOW = datetime(2025, 3, 15, 12, 0, 0, tzinfo=UTC)
NAIVE_NOW = FROZEN_NOW.replace(tzinfo=None)


def test_get_forecasts_without_datasources(expense_query):
    assert get_forecasts([]) == {}
    expense_query.get_cloud_expenses_with_resource_info.assert_not_called()


@time_machine.travel(FROZEN_NOW, tick=False)
def test_get_forecasts_aggregates_current_and_previous_month(expense_query):
    expense_query.get_cloud_expenses_with_resource_info.side_effect = [
        [("ds-1", 100.0, 5)],  # current month
        [("ds-1", 400.0, 4)],  # previous month
    ]
    expense_query.get_first_expenses_for_forecast.return_value = {"ds-1": NAIVE_NOW}
    expense_query.get_monthly_forecast.side_effect = None
    expense_query.get_monthly_forecast.return_value = 1234.56

    result = get_forecasts(["ds-1"])

    assert result == {"ds-1": {"cost": 100.0, "forecast": 1234.56, "resources": 5}}
    expense_query.get_monthly_forecast.assert_called_once_with(500.0, 100.0, NAIVE_NOW)


@time_machine.travel(FROZEN_NOW, tick=False)
def test_get_forecasts_queries_the_expected_date_ranges(expense_query):
    get_forecasts(["ds-1"])

    calls = expense_query.get_cloud_expenses_with_resource_info.call_args_list
    assert len(calls) == 2
    _, month_start, month_end = calls[0].args
    assert month_start == datetime(2025, 3, 1, 0, 0, 0)
    assert month_end == datetime(2025, 3, 15, 23, 59, 59)
    _, last_month_start, last_month_end = calls[1].args
    assert last_month_start == datetime(2025, 2, 1, 0, 0, 0)
    assert last_month_end == month_start


@time_machine.travel(FROZEN_NOW, tick=False)
def test_get_forecasts_no_expenses(expense_query):
    result = get_forecasts(["ds-1", "ds-2"])

    assert set(result) == {"ds-1", "ds-2"}
    assert result["ds-1"]["cost"] == 0
    assert result["ds-1"]["resources"] == 0
    expense_query.get_monthly_forecast.assert_any_call(0, 0, None)


@time_machine.travel(FROZEN_NOW, tick=False)
def test_get_forecasts_returns_an_entry_per_requested_datasource(expense_query):
    expense_query.get_cloud_expenses_with_resource_info.side_effect = [
        [("ds-1", 10.0, 1), ("ds-unknown", 99.0, 9)],
        [],
    ]

    result = get_forecasts(["ds-1", "ds-2"])

    assert set(result) == {"ds-1", "ds-2"}


def test_get_organization_expenses(mocker: MockerFixture):
    organization = mocker.Mock(pool_id="pool-1")
    rest_api_client = mocker.Mock()
    rest_api_client.pool_get.return_value = (200, {"cost": 42.0, "limit": 1000})
    mocker.patch.object(expenses_service, "get_rest_api_client", return_value=rest_api_client)

    result = get_organization_expenses(organization)

    assert result == {"cost": 42.0, "limit": 1000}
    rest_api_client.pool_get.assert_called_once_with("pool-1", details=True)


def test_get_organization_expenses_without_a_pool(mocker: MockerFixture):
    organization = mocker.Mock(pool_id=None)
    get_client = mocker.patch.object(expenses_service, "get_rest_api_client")

    assert get_organization_expenses(organization) is None
    get_client.assert_not_called()


def test_build_query(mocker: MockerFixture):
    clickhouse_client = mocker.Mock()
    clickhouse_client.query.return_value.result_rows = [("row",)]
    mocker.patch.object(expenses_service, "get_clickhouse_client", return_value=clickhouse_client)
    mongo_client = mocker.Mock()
    mocker.patch.object(expenses_service, "get_mongo_client", return_value=mongo_client)

    query = _build_query()

    assert query._resources is mongo_client.restapi.resources
    assert query._execute_ch("SELECT 1") == [("row",)]
    clickhouse_client.query.assert_called_once_with(query="SELECT 1")
