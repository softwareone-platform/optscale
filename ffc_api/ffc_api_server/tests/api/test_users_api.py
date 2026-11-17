from datetime import UTC, datetime, timedelta

import requests
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import AuthUser, Organization, User
from ffc_api.ffc_api_server.app.enums import RoleName, RoleType, TagResourceType
from ffc_api.ffc_api_server.tests.types import ModelFactory
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession


async def test_get_users(admin_client: AsyncClient, organization_admin: User):
    response = await admin_client.get("/admin/users")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    user = data["items"][0]
    assert user["id"] == organization_admin.id
    assert user["name"] == "Alex Parish"
    assert user["created_at"] == 1677722000
    assert user["auth_user"]["email"] == "admin@test.org.com"
    assert "last_login" not in user["auth_user"]
    assert user["roles"] == 1


async def test_get_users_includes_the_last_login(
    admin_client: AsyncClient,
    db_session: AsyncSession,
    organization_admin: User,
    token_factory,
):
    last_login = (datetime.now(UTC) - timedelta(hours=1)).replace(tzinfo=None, microsecond=0)
    auth_user = await db_session.get(AuthUser, organization_admin.auth_user_id)
    await token_factory(auth_user=auth_user, created_at=last_login)
    db_session.expunge_all()

    response = await admin_client.get("/admin/users")

    assert response.status_code == 200
    assert response.json()["items"][0]["auth_user"]["last_login"] is not None


async def test_get_users_rql_email(
    admin_client: AsyncClient,
    db_session: AsyncSession,
    organization: Organization,
    organization_admin: User,
    auth_lookup_tables,
    auth_user_factory: ModelFactory[AuthUser],
    user_factory: ModelFactory[User],
):
    other_auth_user = await auth_user_factory(email="other@test.org.com")
    await user_factory(organization=organization, name="Other", auth_user=other_auth_user)
    db_session.expunge_all()

    response = await admin_client.get("/admin/users?eq(email,admin@test.org.com)")

    assert response.status_code == 200
    assert [item["id"] for item in response.json()["items"]] == [organization_admin.id]


async def test_get_user_by_id(admin_client: AsyncClient, organization_admin: User):
    response = await admin_client.get(f"/admin/users/{organization_admin.id}")

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == organization_admin.id
    assignment = data["auth_user"]["assignments"][0]
    assert assignment["role_name"] == RoleName.MANAGER.value
    assert assignment["resource_type"] == RoleType.ORGANIZATION.value
    assert assignment["purpose"] == "optscale_manager"


async def test_get_user_without_auth_user(
    admin_client: AsyncClient,
    organization: Organization,
    user_factory: ModelFactory[User],
):
    user = await user_factory(organization=organization, name="Service", auth_user=None)

    response = await admin_client.get(f"/admin/users/{user.id}")

    assert response.status_code == 200
    data = response.json()
    assert "auth_user" not in data
    assert data["roles"] == 0


async def test_get_tags_by_user_id(
    admin_client: AsyncClient,
    organization_admin: User,
    tag_factory: ModelFactory[Tag],
):
    await tag_factory(
        resource_id=organization_admin.id,
        name="team",
        value="turing",
        resource_type=TagResourceType.USER,
    )
    await tag_factory(
        resource_id=organization_admin.id,
        name="org-scoped",
        value="x",
        resource_type=TagResourceType.ORGANIZATION,
    )

    response = await admin_client.get(f"/admin/users/{organization_admin.id}/tags")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["name"] == "team"


async def test_get_tag_by_user_id_by_name(
    admin_client: AsyncClient,
    organization_admin: User,
    tag_factory: ModelFactory[Tag],
):
    tag = await tag_factory(
        resource_id=organization_admin.id,
        name="team",
        value="turing",
        resource_type=TagResourceType.USER,
    )

    response = await admin_client.get(f"/admin/users/{organization_admin.id}/tags/team")

    assert response.status_code == 200
    assert response.json()["id"] == str(tag.id)


async def test_create_user(admin_client: AsyncClient, mock_auth_client):
    mock_auth_client.user_create.return_value = (
        201,
        {
            "id": "user-id",
            "display_name": "Peter Parker",
            "email": "peter.parker@test.org.com",
            "created_at": 1730126521,
            "deleted_at": 0,
            "is_active": True,
            "verified": True,
            "type_id": 1,
            "scope_id": None,
            "token": "new-user-token",
        },
    )

    response = await admin_client.post(
        "/admin/users",
        json={
            "email": "peter.parker@test.org.com",
            "display_name": "Peter Parker",
            "password": "s3creT!",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["id"] == "user-id"
    assert data["name"] == "Peter Parker"
    assert data["created_at"] == 1730126521
    assert data["roles"] == 0
    assert "token" not in data
    mock_auth_client.user_create.assert_called_once_with(
        email="peter.parker@test.org.com",
        password="s3creT!",
        display_name="Peter Parker",
        verified=True,
    )


async def test_create_user_propagates_auth_errors(
    admin_client: AsyncClient, mock_auth_client, optscale_http_error
):
    mock_auth_client.user_create.side_effect = optscale_http_error(
        status_code=409,
        reason="User already exists",
    )

    response = await admin_client.post(
        "/admin/users",
        json={"email": "peter.parker@test.org.com", "display_name": "Peter", "password": "xxx"},
    )

    assert response.status_code == 409
    assert response.json()["detail"] == "User already exists"


async def test_create_user_auth_is_unreachable(admin_client: AsyncClient, mock_auth_client):
    mock_auth_client.user_create.side_effect = requests.exceptions.ConnectionError("refused")

    response = await admin_client.post(
        "/admin/users",
        json={"email": "peter.parker@test.org.com", "display_name": "Peter", "password": "xxx"},
    )

    assert response.status_code == 400


async def test_create_user_invalid_email(admin_client: AsyncClient, mock_auth_client):
    response = await admin_client.post(
        "/admin/users", json={"email": "invalid_email", "display_name": "Peter", "password": "xxx"}
    )

    assert response.status_code == 422
    mock_auth_client.user_create.assert_not_called()


async def test_create_user_requires_cluster_secret(api_client: AsyncClient, mock_auth_client):
    response = await api_client.post(
        "/admin/users",
        json={"email": "peter.parker@test.org.com", "display_name": "Peter", "password": "xxx"},
    )

    assert response.status_code == 403
    mock_auth_client.user_create.assert_not_called()
