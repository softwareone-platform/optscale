from datetime import UTC, datetime

import time_machine
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import (
    Assignment,
    AuthUser,
    DataSource,
    Organization,
    Pool,
    User,
)
from ffc_api.ffc_api_server.app.enums import RoleName, RoleType, TagResourceType
from ffc_api.ffc_api_server.tests.types import ModelFactory
from httpx import AsyncClient
from requests import RequestException
from sqlalchemy.ext.asyncio import AsyncSession

FROZEN_NOW = datetime(2025, 3, 15, 12, 0, 0, tzinfo=UTC)


async def test_get_organizations(
    admin_client: AsyncClient,
    organization_factory: ModelFactory[Organization],
    expense_query,
):
    await organization_factory(name="Test org", currency="USD")
    await organization_factory(name="FFC", currency="EUR")

    response = await admin_client.get("/admin/organizations")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 2
    assert {item["name"] for item in data["items"]} == {"Test org", "FFC"}


async def test_get_organizations_excludes_demo_and_disabled(
    admin_client: AsyncClient,
    organization_factory: ModelFactory[Organization],
    expense_query,
):
    await organization_factory(name="FFC")
    await organization_factory(name="Demo", is_demo=True)
    await organization_factory(name="Disabled", disabled=True)

    response = await admin_client.get("/admin/organizations")

    assert response.status_code == 200
    orgs = response.json()["items"]
    assert len(orgs) == 1
    assert orgs[0]["name"] == "FFC"


async def test_get_organization_by_id(
    admin_client: AsyncClient,
    organization: Organization,
    expense_query,
):
    response = await admin_client.get(f"/admin/organizations/{organization.id}")

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == organization.id
    assert data["name"] == "Test org"
    assert data["currency"] == "USD"
    assert data["is_demo"] is False
    assert data["disabled"] is False


async def test_get_organization_by_id_not_found(admin_client: AsyncClient):
    response = await admin_client.get("/admin/organizations/fake-org")

    assert response.status_code == 404
    assert response.json() == {"detail": "Organization with ID `fake-org` wasn't found."}


async def test_get_deleted_organization_by_id(
    admin_client: AsyncClient, organization_factory: ModelFactory[Organization]
):
    organization = await organization_factory(deleted_at=1700000000)

    response = await admin_client.get(f"/admin/organizations/{organization.id}")

    assert response.status_code == 404


async def test_get_users_by_organization_id(
    admin_client: AsyncClient,
    organization: Organization,
    organization_admin: User,
):
    response = await admin_client.get(f"/admin/organizations/{organization.id}/users")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    user = data["items"][0]
    assert user["id"] == organization_admin.id
    assert user["name"] == "Alex Parish"
    assert user["auth_user"]["email"] == "admin@test.org.com"
    assert user["roles"] == 1
    assignment = user["auth_user"]["assignments"][0]
    assert assignment["role_name"] == RoleName.MANAGER.value
    assert assignment["resource_type"] == RoleType.ORGANIZATION.value
    assert assignment["resource_name"] == organization.name
    assert "role_id" not in assignment
    assert "type_id" not in assignment


async def test_get_users_by_organization_id_resolves_pool_names(
    admin_client: AsyncClient,
    db_session: AsyncSession,
    organization: Organization,
    auth_lookup_tables,
    auth_user_factory: ModelFactory[AuthUser],
    assignment_factory: ModelFactory[Assignment],
    user_factory: ModelFactory[User],
    pool_factory: ModelFactory[Pool],
):
    pool = await pool_factory(organization=organization, name="Engineering", purpose="budget")
    auth_user = await auth_user_factory(email="engineer@test.org.com")
    await assignment_factory(
        auth_user=auth_user,
        resource_id=pool.id,
        role=RoleName.ENGINEER,
        resource_type=RoleType.POOL,
    )
    await assignment_factory(
        auth_user=auth_user,
        resource_id=organization.id,
        role=RoleName.MEMBER,
        resource_type=RoleType.ORGANIZATION,
    )
    await user_factory(organization=organization, name="Sam", auth_user=auth_user)
    db_session.expunge_all()

    response = await admin_client.get(f"/admin/organizations/{organization.id}/users")

    assert response.status_code == 200
    assignments = response.json()["items"][0]["auth_user"]["assignments"]
    assert len(assignments) == 1
    assignment = assignments[0]
    assert assignment["resource_name"] == "Engineering"
    assert assignment["resource_purpose"] == "budget"
    assert assignment["resource_type"] == RoleType.POOL.value


@time_machine.travel(FROZEN_NOW, tick=False)
async def test_get_datasources_by_organization_id(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    expense_query,
):
    datasource = await datasource_factory(
        organization=organization, name="Production", type="aws_cnr", account_id="123456789012"
    )
    expense_query.get_cloud_expenses_with_resource_info.side_effect = [
        [(datasource.id, 89011.43, 17)],  # this month
        [(datasource.id, 71000.00, 15)],  # last month
    ]

    response = await admin_client.get(f"/admin/organizations/{organization.id}/datasources")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    item = data["items"][0]
    assert item["name"] == "Production"
    assert item["type"] == "aws_cnr"
    assert item["account_id"] == "123456789012"
    assert item["cost"] == 89011.43
    assert item["resources"] == 17


async def test_get_datasources_by_organization_id_excludes_deleted(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    expense_query,
):
    await datasource_factory(organization=organization, name="Active")
    await datasource_factory(organization=organization, name="Deleted", deleted_at=1700000000)

    response = await admin_client.get(f"/admin/organizations/{organization.id}/datasources")

    assert response.status_code == 200
    assert [item["name"] for item in response.json()["items"]] == ["Active"]


async def test_get_expenses_by_organization_id(
    admin_client: AsyncClient,
    organization_factory: ModelFactory[Organization],
    expense_query,
):
    organization = await organization_factory(name="FFC", pool_id="pool-1")
    expense_query.rest_api_client.pool_get.return_value = (
        200,
        {
            "limit": 10000,
            "cost": 2111.49,
            "forecast": 5001.12,
            "saving": 4.66,
        },
    )

    response = await admin_client.get(f"/admin/organizations/{organization.id}/expenses")

    assert response.status_code == 200
    assert response.json() == {
        "limit": "10000",
        "expenses_this_month": "2111.49",
        "expenses_this_month_forecast": "5001.12",
        "possible_monthly_saving": "4.66",
    }
    expense_query.rest_api_client.pool_get.assert_called_once_with("pool-1", details=True)


async def test_get_expenses_defaults_to_zero(
    admin_client: AsyncClient,
    organization: Organization,
    expense_query,
):
    response = await admin_client.get(f"/admin/organizations/{organization.id}/expenses")

    assert response.status_code == 200
    assert response.json() == {
        "limit": "0",
        "expenses_this_month": "0",
        "expenses_this_month_forecast": "0",
        "possible_monthly_saving": "0",
    }
    expense_query.rest_api_client.pool_get.assert_not_called()


async def test_get_expenses_rest_api_unreachable(
    admin_client: AsyncClient,
    organization_factory: ModelFactory[Organization],
    expense_query,
):
    organization = await organization_factory(name="FFC", pool_id="pool-1")
    expense_query.rest_api_client.pool_get.side_effect = RequestException("connection refused")

    response = await admin_client.get(f"/admin/organizations/{organization.id}/expenses")

    assert response.status_code == 502


async def test_get_tags_by_organization_id(
    admin_client: AsyncClient,
    organization: Organization,
    tag_factory: ModelFactory[Tag],
):
    await tag_factory(resource_id=organization.id, name="team", value="turing")
    await tag_factory(resource_id="org-id", name="other", value="x")
    await tag_factory(
        resource_id=organization.id,
        name="user-scoped",
        value="x",
        resource_type=TagResourceType.USER,
    )

    response = await admin_client.get(f"/admin/organizations/{organization.id}/tags")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["name"] == "team"


async def test_get_tag_by_organization_id_by_uuid(
    admin_client: AsyncClient,
    organization: Organization,
    tag_factory: ModelFactory[Tag],
):
    tag = await tag_factory(resource_id=organization.id, name="team", value="turing")

    response = await admin_client.get(f"/admin/organizations/{organization.id}/tags/{tag.id}")

    assert response.status_code == 200
    assert response.json()["id"] == str(tag.id)


async def test_get_tag_by_organization_id_by_name(
    admin_client: AsyncClient,
    organization: Organization,
    tag_factory: ModelFactory[Tag],
):
    tag = await tag_factory(resource_id=organization.id, name="team", value="turing")

    response = await admin_client.get(f"/admin/organizations/{organization.id}/tags/team")

    assert response.status_code == 200
    assert response.json()["id"] == str(tag.id)


async def test_create_organization(
    admin_client: AsyncClient, mock_get_token_by_user_id, mock_rest_api_client
):
    rest_api_client = mock_rest_api_client.return_value
    rest_api_client.organization_create.return_value = (
        201,
        {
            "id": "org-id",
            "name": "FFC",
            "currency": "EUR",
            "is_demo": False,
            "disabled": False,
            "pool_id": "pool",
            "created_at": 1732792923,
            "deleted_at": 0,
            "cleaned_at": 0,
        },
    )

    response = await admin_client.post(
        "/admin/organizations", json={"name": "FFC", "currency": "EUR", "user_id": "user-1"}
    )

    assert response.status_code == 201
    data = response.json()
    assert data["id"] == "org-id"
    assert data["name"] == "FFC"
    assert data["currency"] == "EUR"
    assert "pool_id" not in data
    mock_get_token_by_user_id.assert_called_once_with("user-1")
    mock_rest_api_client.assert_called_once_with(token="user-token")
    rest_api_client.organization_create.assert_called_once_with({"name": "FFC", "currency": "EUR"})


async def test_create_organization_unverified_user(
    admin_client: AsyncClient,
    mock_get_token_by_user_id,
    mock_rest_api_client,
    optscale_http_error,
):
    mock_get_token_by_user_id.side_effect = optscale_http_error(403, "User is not verified")

    response = await admin_client.post(
        "/admin/organizations", json={"name": "FFC", "currency": "EUR", "user_id": "user-1"}
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "User is not verified"
    mock_rest_api_client.assert_not_called()


async def test_create_organization_propagates_rest_api_errors(
    admin_client: AsyncClient,
    mock_get_token_by_user_id,
    mock_rest_api_client,
    optscale_http_error,
):
    mock_rest_api_client.return_value.organization_create.side_effect = optscale_http_error(
        400, "Invalid currency: XXX"
    )

    response = await admin_client.post(
        "/admin/organizations", json={"name": "FFC", "currency": "XXX", "user_id": "user-1"}
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid currency: XXX"


async def test_create_organization_requires_user_id(
    admin_client: AsyncClient, mock_get_token_by_user_id, mock_rest_api_client
):
    response = await admin_client.post(
        "/admin/organizations", json={"name": "FFC", "currency": "EUR"}
    )

    assert response.status_code == 422
    mock_get_token_by_user_id.assert_not_called()


async def test_create_organization_requires_cluster_secret(
    api_client: AsyncClient, mock_get_token_by_user_id
):
    response = await api_client.post(
        "/admin/organizations", json={"name": "FFC", "currency": "EUR", "user_id": "user-1"}
    )

    assert response.status_code == 403
    mock_get_token_by_user_id.assert_not_called()
