from ffc_api.ffc_api_server.app.db.handlers import UserHandler
from ffc_api.ffc_api_server.app.db.models.optscale import Organization, User
from ffc_api.ffc_api_server.app.enums import RoleName, RoleType
from ffc_api.ffc_api_server.app.services.users import build_user_read
from ffc_api.ffc_api_server.tests.types import ModelFactory
from sqlalchemy.ext.asyncio import AsyncSession


async def test_build_user_read(
    db_session: AsyncSession,
    organization: Organization,
    organization_admin: User,
):
    user = await UserHandler(db_session).get(organization_admin.id)

    user_read = build_user_read(user, resource_map={organization.id: {"name": "Test org"}})

    assert user_read.id == user.id
    assert user_read.name == "Alex Parish"
    assert user_read.auth_user.email == "admin@test.org.com"
    assert user_read.roles == 1
    assignment = user_read.auth_user.assignments[0]
    assert assignment.resource_name == "Test org"
    assert assignment.resource_purpose is None
    assert assignment.role_name == RoleName.MANAGER.value
    assert assignment.resource_type == RoleType.ORGANIZATION.value


async def test_build_user_read_with_unknown_resource(
    db_session: AsyncSession, organization_admin: User
):
    user = await UserHandler(db_session).get(organization_admin.id)

    user_read = build_user_read(user, resource_map={})

    assignment = user_read.auth_user.assignments[0]
    assert assignment.resource_name is None
    assert assignment.resource_purpose is None


async def test_build_user_read_includes_pool_purpose(
    db_session: AsyncSession,
    organization: Organization,
    auth_lookup_tables: None,
    auth_user_factory,
    assignment_factory,
    user_factory: ModelFactory[User],
    pool_factory,
):
    pool = await pool_factory(organization=organization, name="Engineering", purpose="budget")
    auth_user = await auth_user_factory(email="engineer@test.org.com")
    await assignment_factory(
        auth_user=auth_user,
        resource_id=pool.id,
        role=RoleName.ENGINEER,
        resource_type=RoleType.POOL,
    )
    created = await user_factory(organization=organization, auth_user=auth_user)
    db_session.expunge_all()
    user = await UserHandler(db_session).get(created.id)

    user_read = build_user_read(
        user, resource_map={pool.id: {"name": "Engineering", "purpose": "budget"}}
    )

    assignment = user_read.auth_user.assignments[0]
    assert assignment.resource_name == "Engineering"
    assert assignment.resource_purpose == "budget"
