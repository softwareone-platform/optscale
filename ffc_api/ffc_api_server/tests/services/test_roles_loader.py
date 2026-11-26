import pytest
from ffc_api.ffc_api_server.app.db.models.optscale import Role
from ffc_api.ffc_api_server.app.enums import RoleName, RolePurposes, RoleType
from ffc_api.ffc_api_server.app.services import roles_loader
from ffc_api.ffc_api_server.app.services.roles_loader import Roles, configure_roles, get_roles
from ffc_api.ffc_api_server.tests.conftest import ROLE_IDS, TYPE_IDS
from sqlalchemy.ext.asyncio import AsyncSession


@pytest.fixture
def unconfigured_roles(configured_roles: Roles):
    """Undo the autouse `configured_roles` fixture for the duration of a test."""
    roles_loader._roles = None
    yield
    roles_loader._roles = None


async def test_roles_load(db_session: AsyncSession, auth_lookup_tables: None):
    roles = Roles()

    await roles.load()

    assert roles.get_role_name(ROLE_IDS[RoleName.MANAGER]) == RoleName.MANAGER.value
    assert roles.get_role_purpose(ROLE_IDS[RoleName.MANAGER]) == RolePurposes.optscale_manager.value
    assert roles.get_type_name(TYPE_IDS[RoleType.POOL]) == RoleType.POOL.value


async def test_roles_load_skips_deleted_roles(db_session: AsyncSession, auth_lookup_tables: None):
    db_session.add(Role(id=99, name="obsolete", purpose="optscale_member", deleted_at=1700000000))
    await db_session.commit()
    roles = Roles()

    await roles.load()

    assert roles.get_role_name(99) is None


def test_roles_lookups_return_none_for_unknown_ids():
    roles = Roles()

    assert roles.get_role_name(404) is None
    assert roles.get_role_purpose(404) is None
    assert roles.get_type_name(404) is None


def test_get_roles_before_configuration(unconfigured_roles):
    with pytest.raises(RuntimeError, match="Roles not configured"):
        get_roles()


async def test_configure_roles_installs_the_cache(
    db_session: AsyncSession, auth_lookup_tables: None, unconfigured_roles
):
    roles = await configure_roles()

    assert get_roles() is roles
    assert roles.get_role_name(ROLE_IDS[RoleName.ENGINEER]) == RoleName.ENGINEER.value
