from datetime import UTC, datetime

import time_machine
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource, Organization
from ffc_api.ffc_api_server.tests.types import ModelFactory
from httpx import AsyncClient
from tools.optscale_data.expenses import ExpenseQuery

FROZEN_NOW = datetime(2025, 3, 15, 12, 0, 0, tzinfo=UTC)
MONTH_START = datetime(2025, 3, 1, 0, 0, 0)
MONTH_END = datetime(2025, 3, 15, 23, 59, 59)
LAST_MONTH_START = datetime(2025, 2, 1, 0, 0, 0)


@time_machine.travel(FROZEN_NOW, tick=False)
async def test_get_datasources_by_organization_id(
    client_api_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    expense_query,
    mock_authorize,
):
    datasource = await datasource_factory(organization=organization, name="ds-1")
    expense_query.get_cloud_expenses_with_resource_info.side_effect = [
        [(datasource.id, 100.0, 5)],  # this month
        [(datasource.id, 400.0, 4)],  # last month
    ]

    response = await client_api_client.get(f"/client/organizations/{organization.id}/datasources")

    assert response.status_code == 200
    item = response.json()[0]
    assert item["name"] == "ds-1"
    assert item["cost"] == 100.0
    assert item["resources"] == 5
    expense_query.get_monthly_forecast.assert_called_once_with(500.0, 100.0, None)
    assert item["forecast"] == ExpenseQuery.get_monthly_forecast(500.0, 100.0, None)
    mock_authorize.assert_called_once_with(
        "test-token", "INFO_ORGANIZATION", "organization", organization.id
    )


@time_machine.travel(FROZEN_NOW, tick=False)
async def test_get_datasources_uses_the_first_expense_date_in_the_forecast(
    client_api_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    expense_query,
):
    datasource = await datasource_factory(organization=organization)
    first_expense = datetime(2026, 2, 20, 0, 0, 0)
    expense_query.get_cloud_expenses_with_resource_info.side_effect = [
        [(datasource.id, 60.0, 2)],
        [(datasource.id, 40.0, 1)],
    ]
    expense_query.get_first_expenses_for_forecast.return_value = {datasource.id: first_expense}

    response = await client_api_client.get(f"/client/organizations/{organization.id}/datasources")

    assert response.status_code == 200
    expense_query.get_monthly_forecast.assert_called_once_with(100.0, 60.0, first_expense)
    assert response.json()[0]["forecast"] == ExpenseQuery.get_monthly_forecast(
        100.0, 60.0, first_expense
    )


@time_machine.travel(FROZEN_NOW, tick=False)
async def test_get_datasources_defaults_to_zero_withe_no_expenses(
    client_api_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    expense_query,
):
    """A datasource missing from both ClickHouse result sets still gets an entry."""
    await datasource_factory(organization=organization)

    response = await client_api_client.get(f"/client/organizations/{organization.id}/datasources")

    assert response.status_code == 200
    item = response.json()[0]
    assert item["cost"] == 0
    assert item["resources"] == 0
    assert item["forecast"] == 0.0


@time_machine.travel(FROZEN_NOW, tick=False)
async def test_get_datasources_reports_organizations_own_datasources(
    client_api_client: AsyncClient,
    organization: Organization,
    organization_factory: ModelFactory[Organization],
    datasource_factory: ModelFactory[DataSource],
    expense_query,
):
    datasource = await datasource_factory(organization=organization, name="ds-1")
    other_organization = await organization_factory(name="Globex")
    other_ds = await datasource_factory(organization=other_organization, name="ds-2")
    expense_query.get_cloud_expenses_with_resource_info.side_effect = [
        [(datasource.id, 10.0, 1), (other_ds.id, 999.0, 99)],
        [],
    ]

    response = await client_api_client.get(f"/client/organizations/{organization.id}/datasources")

    assert response.status_code == 200
    assert [item["name"] for item in response.json()] == ["ds-1"]


async def test_get_datasources_excludes_deleted(
    client_api_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    expense_query,
):
    await datasource_factory(organization=organization, name="Active")
    await datasource_factory(organization=organization, name="Deleted", deleted_at=1700000000)

    response = await client_api_client.get(f"/client/organizations/{organization.id}/datasources")

    assert response.status_code == 200
    items = response.json()
    assert len(items) == 1
    assert items[0]["name"] == "Active"


async def test_get_datasources_includes_the_parent_datasource(
    client_api_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    expense_query,
):
    parent = await datasource_factory(organization=organization, name="Tenant")
    await datasource_factory(organization=organization, name="Subscription", parent=parent)

    response = await client_api_client.get(f"/client/organizations/{organization.id}/datasources")

    assert response.status_code == 200
    subscription = next(i for i in response.json() if i["name"] == "Subscription")
    assert subscription["parent"]["name"] == "Tenant"


async def test_get_datasources_unknown_organization(client_api_client: AsyncClient, expense_query):
    response = await client_api_client.get("/client/organizations/fake-org/datasources")

    assert response.status_code == 404
    expense_query.get_cloud_expenses_with_resource_info.assert_not_called()
