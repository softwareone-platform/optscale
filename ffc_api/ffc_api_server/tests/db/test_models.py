from datetime import UTC, datetime, timedelta

from ffc_api.ffc_api_server.app.db.handlers import UserHandler
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import (
    AuthUser,
    Organization,
    User,
)
from ffc_api.ffc_api_server.app.enums import RoleName, RoleType, TagResourceType
from ffc_api.ffc_api_server.tests.types import ModelFactory
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import undefer


async def test_tag_defaults(db_session: AsyncSession):
    tag = Tag(name="env", value="prod", resource_id="ORG-1")
    db_session.add(tag)
    await db_session.commit()
    await db_session.refresh(tag)

    assert tag.resource_type == TagResourceType.ORGANIZATION
    assert tag.deleted_ts == 0
    assert tag.deleted_at is None


async def test_user_is_admin_hybrid_property(db_session: AsyncSession, organization_admin: User):
    user = await UserHandler(db_session).get(organization_admin.id)

    assert user.is_admin is True


async def test_user_is_admin_expression(
    db_session: AsyncSession,
    organization: Organization,
    organization_admin: User,
    auth_user_factory: ModelFactory[AuthUser],
    assignment_factory,
    user_factory: ModelFactory[User],
):
    member_auth_user = await auth_user_factory(email="member@test.org.com")
    await assignment_factory(
        auth_user=member_auth_user,
        resource_id=organization.id,
        role=RoleName.MEMBER,
        resource_type=RoleType.ORGANIZATION,
    )
    member = await user_factory(organization=organization, auth_user=member_auth_user)

    result = await db_session.execute(select(User.id).where(User.is_admin.is_(True)))

    admin_ids = set(result.scalars().all())
    assert organization_admin.id in admin_ids
    assert member.id not in admin_ids


async def test_auth_user_last_login(
    db_session: AsyncSession,
    organization_admin: User,
    auth_user_factory: ModelFactory[AuthUser],
    token_factory,
):
    auth_user = await auth_user_factory(email="login@test.org.com")
    older = datetime.now(UTC).replace(tzinfo=None) - timedelta(days=2)
    newer = datetime.now(UTC).replace(tzinfo=None) - timedelta(hours=1)
    await token_factory(auth_user=auth_user, created_at=older)
    await token_factory(auth_user=auth_user, created_at=newer)
    db_session.expunge_all()

    result = await db_session.execute(
        select(AuthUser).where(AuthUser.id == auth_user.id).options(undefer(AuthUser.last_login))
    )
    fetched = result.scalar_one()

    assert fetched.last_login == newer
