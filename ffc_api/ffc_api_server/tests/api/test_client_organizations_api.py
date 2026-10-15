from datetime import UTC, datetime

import requests
import time_machine
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource, Organization
from ffc_api.ffc_api_server.tests.types import ModelFactory
from httpx import AsyncClient
from tools.cloud_adapter.enums import CloudTypes
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


CLOUD_ACCOUNT_REQUEST = {
    "name": "AWS HQ",
    "type": "aws_cnr",
    "config": {"bucket_name": "bucket", "access_key_id": "key", "secret_access_key": "key"},
}
REST_API_CLOUD_ACCOUNT = {
    "id": "ca-1",
    "name": "AWS HQ",
    "type": "aws_cnr",
    "account_id": "123456789012",
    "organization_id": "org-1",
    "config": {"bucket_name": "bucket", "access_key_id": "key"},
    "auto_import": True,
    "process_recommendations": True,
    "import_period": 1,
    "last_import_at": 0,
    "last_import_modified_at": 0,
    "last_import_attempt_at": 0,
    "last_import_attempt_error": None,
    "cleaned_at": 0,
    "parent_id": None,
}


async def test_link_cloud_account(
    client_api_client: AsyncClient,
    organization: Organization,
    mock_rest_api_client,
    mock_authorize,
):
    rest_api_client = mock_rest_api_client.return_value
    rest_api_client.cloud_account_create.return_value = (201, REST_API_CLOUD_ACCOUNT)

    response = await client_api_client.post(
        f"/client/organizations/{organization.id}/cloud_accounts", json=CLOUD_ACCOUNT_REQUEST
    )

    assert response.status_code == 201
    data = response.json()
    assert data["id"] == "ca-1"
    assert data["type"] == "aws_cnr"
    assert data["config"] == {"bucket_name": "bucket", "access_key_id": "key"}
    assert data["auto_import"] is True
    assert "import_period" not in data

    mock_rest_api_client.assert_called_once_with(token="test-token")
    mock_authorize.assert_not_called()
    rest_api_client.cloud_account_create.assert_called_once_with(
        organization.id,
        {**CLOUD_ACCOUNT_REQUEST, "auto_import": True, "process_recommendations": True},
    )


async def test_link_cloud_account_unsupported_type(
    client_api_client: AsyncClient,
    organization: Organization,
    mock_rest_api_client,
):
    response = await client_api_client.post(
        f"/client/organizations/{organization.id}/cloud_accounts",
        json={**CLOUD_ACCOUNT_REQUEST, "type": CloudTypes.NEBIUS.value},
    )

    assert response.status_code == 400
    assert response.json()["detail"].startswith(f"Unsupported type: {CloudTypes.NEBIUS.value}.")
    mock_rest_api_client.assert_not_called()


async def test_link_cloud_account_unknown_type(
    client_api_client: AsyncClient, organization: Organization, mock_rest_api_client
):
    response = await client_api_client.post(
        f"/client/organizations/{organization.id}/cloud_accounts",
        json={**CLOUD_ACCOUNT_REQUEST, "type": "invalid"},
    )

    assert response.status_code == 422
    mock_rest_api_client.assert_not_called()


async def test_link_cloud_account_no_token(
    api_client: AsyncClient, organization: Organization, mock_rest_api_client
):
    response = await api_client.post(
        f"/client/organizations/{organization.id}/cloud_accounts", json=CLOUD_ACCOUNT_REQUEST
    )

    assert response.status_code == 401
    mock_rest_api_client.assert_not_called()


async def test_link_cloud_account_propagates_rest_api_errors(
    client_api_client: AsyncClient,
    organization: Organization,
    mock_rest_api_client,
    optscale_http_error,
):
    mock_rest_api_client.return_value.cloud_account_create.side_effect = optscale_http_error(
        403, "Forbidden"
    )

    response = await client_api_client.post(
        f"/client/organizations/{organization.id}/cloud_accounts", json=CLOUD_ACCOUNT_REQUEST
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Forbidden"


async def test_link_cloud_account_rest_api_unreachable(
    client_api_client: AsyncClient, organization: Organization, mock_rest_api_client
):
    mock_rest_api_client.return_value.cloud_account_create.side_effect = (
        requests.exceptions.ConnectionError("refused")
    )

    response = await client_api_client.post(
        f"/client/organizations/{organization.id}/cloud_accounts", json=CLOUD_ACCOUNT_REQUEST
    )

    assert response.status_code == 400
