import uuid

import pytest
from ffc_api.ffc_api_server.app.db.handlers import (
    CannotDeleteError,
    ConstraintViolationError,
    DatabaseError,
    DataSourceHandler,
    NotFoundError,
    OrganizationHandler,
    TagHandler,
    UserHandler,
)
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource, Organization, User
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.tests.types import ModelFactory
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def test_get(db_session: AsyncSession, organization_factory: ModelFactory[Organization]):
    organization = await organization_factory(name="Test org")

    fetched = await OrganizationHandler(db_session).get(organization.id)

    assert fetched.id == organization.id
    assert fetched.name == "Test org"


async def test_get_not_found(db_session: AsyncSession):
    with pytest.raises(NotFoundError, match="Organization with ID `missing` wasn't found."):
        await OrganizationHandler(db_session).get("missing")


async def test_get_extra_conditions(
    db_session: AsyncSession, organization_factory: ModelFactory[Organization]
):
    organization = await organization_factory(deleted_at=1700000000)
    handler = OrganizationHandler(db_session)

    with pytest.raises(NotFoundError):
        await handler.get(organization.id, extra_conditions=[Organization.deleted_at == 0])


async def test_query_db_with_limit_and_offset(
    db_session: AsyncSession, organization_factory: ModelFactory[Organization]
):
    for index in range(5):
        await organization_factory(id=f"org-{index}", name=f"Org {index}")
    handler = OrganizationHandler(db_session)

    results = await handler.query_db(limit=3, offset=1, order_by=[Organization.id])

    assert [org.id for org in results] == ["org-1", "org-2", "org-3"]


async def test_query_db_where_clauses(
    db_session: AsyncSession, organization_factory: ModelFactory[Organization]
):
    await organization_factory(name="Enabled", disabled=False)
    await organization_factory(name="Disabled", disabled=True)
    handler = OrganizationHandler(db_session)

    results = await handler.query_db(where_clauses=[Organization.disabled.is_(False)])

    assert [org.name for org in results] == ["Enabled"]


async def test_query_db_with_base_query(
    db_session: AsyncSession, organization_factory: ModelFactory[Organization]
):
    await organization_factory(name="Test org")
    await organization_factory(name="FFC")
    handler = OrganizationHandler(db_session)
    base_query = select(Organization).where(Organization.name == "FFC")

    results = await handler.query_db(base_query=base_query)

    assert [org.name for org in results] == ["FFC"]


async def test_count(db_session: AsyncSession, organization_factory: ModelFactory[Organization]):
    for index in range(3):
        await organization_factory(id=f"org-{index}", name=f"Org {index}")
    handler = OrganizationHandler(db_session)

    assert await handler.count() == 3
    assert await handler.count(where_clauses=[Organization.id == "org-1"]) == 1

    base_query = select(Organization).where(Organization.name == "Org 1")

    count = await handler.count(
        base_query=base_query, where_clauses=[Organization.disabled.is_(False)]
    )

    assert count == 1


async def test_first(db_session: AsyncSession, tag_factory: ModelFactory[Tag]):
    assert await TagHandler(db_session).first(where_clauses=[Tag.name == "env"]) is None

    await tag_factory(resource_id="ORG-1", name="env", value="prod")

    tag = await TagHandler(db_session).first(where_clauses=[Tag.name == "env"])

    assert tag is not None
    assert tag.value == "prod"


async def test_stream_scalars(
    db_session: AsyncSession, organization_factory: ModelFactory[Organization]
):
    for index in range(3):
        await organization_factory(id=f"org-{index}")
    handler = OrganizationHandler(db_session)

    streamed = [org.id async for org in handler.stream_scalars(order_by=[Organization.id])]

    assert streamed == ["org-0", "org-1", "org-2"]


async def test_create(db_session: AsyncSession):
    handler = TagHandler(db_session)

    tag = await handler.create(
        Tag(
            name="env",
            value="prod",
            resource_id="ORG-1",
            resource_type=TagResourceType.ORGANIZATION,
        )
    )

    assert isinstance(tag.id, uuid.UUID)
    assert tag.created_at is not None
    assert tag.updated_at is not None
    assert tag.deleted_at is None
    assert tag.deleted_ts == 0


async def test_create_constraint_violation(db_session: AsyncSession):
    """`uq_tags_active` rejects a second active tag with the same name for a resource."""
    handler = TagHandler(db_session)
    await handler.create(
        Tag(
            name="env",
            value="prod",
            resource_id="ORG-1",
            resource_type=TagResourceType.ORGANIZATION,
        )
    )

    with pytest.raises(ConstraintViolationError):
        await handler.create(
            Tag(
                name="env",
                value="dev",
                resource_id="ORG-1",
                resource_type=TagResourceType.ORGANIZATION,
            )
        )


async def test_update(db_session: AsyncSession, tag_factory: ModelFactory[Tag]):
    tag = await tag_factory(resource_id="ORG-1", name="env", value="prod")
    handler = TagHandler(db_session)

    updated = await handler.update(tag, {"value": "dev"})

    assert updated.value == "dev"


async def test_get_or_create(db_session: AsyncSession):
    handler = TagHandler(db_session)

    tag, created = await handler.get_or_create(
        name="env",
        resource_id="ORG-1",
        resource_type=TagResourceType.ORGANIZATION,
        defaults={"value": "prod"},
    )

    assert created is True
    assert tag.value == "prod"


async def test_get_or_create_existing(db_session: AsyncSession, tag_factory: ModelFactory[Tag]):
    existing = await tag_factory(resource_id="ORG-1", name="env", value="prod")
    handler = TagHandler(db_session)

    tag, created = await handler.get_or_create(
        name="env",
        resource_id="ORG-1",
        resource_type=TagResourceType.ORGANIZATION,
        defaults={"value": "dev"},
    )

    assert created is False
    assert tag.id == existing.id
    assert tag.value == "prod"


async def test_delete(db_session: AsyncSession, tag_factory: ModelFactory[Tag]):
    tag = await tag_factory(resource_id="ORG-1", name="env")
    handler = TagHandler(db_session)

    deleted = await handler.delete(tag)

    assert deleted.deleted_at is not None
    assert deleted.deleted_ts > 0


async def test_delete_twice(db_session: AsyncSession, tag_factory: ModelFactory[Tag]):
    tag = await tag_factory(resource_id="ORG-1", name="env")
    handler = TagHandler(db_session)
    await handler.delete(tag)

    with pytest.raises(CannotDeleteError, match="already deleted"):
        await handler.delete(tag)


async def test_soft_deleted_tag_frees_the_unique_slot(
    db_session: AsyncSession, tag_factory: ModelFactory[Tag]
):
    """`active_key` is NULL once soft-deleted, so the name becomes reusable."""
    tag = await tag_factory(resource_id="ORG-1", name="env", value="prod")
    handler = TagHandler(db_session)
    await handler.delete(tag)

    recreated = await handler.create(
        Tag(
            name="env",
            value="dev",
            resource_id="ORG-1",
            resource_type=TagResourceType.ORGANIZATION,
        )
    )

    assert recreated.id != tag.id


@pytest.mark.parametrize("method", ["create", "update", "delete"])
async def test_read_only_handlers_reject_writes(db_session: AsyncSession, method: str):
    handler = OrganizationHandler(db_session)

    with pytest.raises(DatabaseError, match="Model is read-only"):
        await getattr(handler, method)()


async def test_datasource_handler_loads_parent(
    db_session: AsyncSession,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
):
    parent = await datasource_factory(organization=organization, name="Tenant")
    child = await datasource_factory(organization=organization, name="Subscription", parent=parent)
    db_session.expunge_all()

    fetched = await DataSourceHandler(db_session).get(child.id)

    assert fetched.parent is not None
    assert fetched.parent.name == "Tenant"


async def test_user_handler_loads_auth_user_and_assignments(
    db_session: AsyncSession, organization_admin: User
):
    fetched = await UserHandler(db_session).get(organization_admin.id)

    assert fetched.auth_user is not None
    assert fetched.auth_user.email == "admin@test.org.com"
    assert len(fetched.auth_user.assignments) == 1


async def test_user_handler_query_with_assignment_scope(
    db_session: AsyncSession,
    organization: Organization,
    organization_admin: User,
):
    users = await UserHandler(db_session).query_with_assignment_scope(
        resource_ids=["some-pool"],
        where_clauses=[User.id == organization_admin.id],
    )

    assert len(users) == 1
    assert users[0].auth_user.assignments == []


async def test_user_handler_query_with_assignment_scope_keeps_matching_resources(
    db_session: AsyncSession,
    organization: Organization,
    organization_admin: User,
):
    users = await UserHandler(db_session).query_with_assignment_scope(
        resource_ids=[organization.id],
        where_clauses=[User.id == organization_admin.id],
    )

    assert len(users[0].auth_user.assignments) == 1
