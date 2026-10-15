import uuid
from collections.abc import AsyncGenerator, Generator
from datetime import UTC, datetime

import pytest
import sqlalchemy as sa
from asgi_lifespan import LifespanManager
from faker import Faker
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient
from pytest_mock import MockerFixture
from sqlalchemy import event
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, create_async_engine
from sqlalchemy.pool import StaticPool
from tools.optscale_data.expenses import ExpenseQuery

from ffc_api.ffc_api_server.app import main
from ffc_api.ffc_api_server.app.conf import get_settings
from ffc_api.ffc_api_server.app.db.base import session_factory
from ffc_api.ffc_api_server.app.db.models.ffc import Base as FFCBase
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import (
    Assignment,
    AuthUser,
    DataSource,
    Organization,
    Pool,
    Role,
    Token,
    Type,
    User,
)
from ffc_api.ffc_api_server.app.db.models.optscale import Base as OptScaleBase
from ffc_api.ffc_api_server.app.enums import RoleName, RolePurposes, RoleType, TagResourceType
from ffc_api.ffc_api_server.app.services import expenses as expenses_service
from ffc_api.ffc_api_server.app.services import roles_loader
from ffc_api.ffc_api_server.tests import TEST_CLUSTER_SECRET
from ffc_api.ffc_api_server.tests.types import ModelFactory

ROLE_IDS = {
    RoleName.MANAGER: 1,
    RoleName.ENGINEER: 2,
    RoleName.MEMBER: 3,
}
ROLE_PURPOSES = {
    RoleName.MANAGER: RolePurposes.optscale_manager,
    RoleName.ENGINEER: RolePurposes.optscale_engineer,
    RoleName.MEMBER: RolePurposes.optscale_member,
}
TYPE_IDS = {
    RoleType.ORGANIZATION: 1,
    RoleType.POOL: 2,
}


@pytest.fixture(scope="session")
def test_settings():
    return get_settings()


@pytest.fixture
async def db_engine(test_settings) -> AsyncGenerator[AsyncEngine]:
    """A throwaway database per test: one in-memory SQLite per schema.

    `StaticPool` keeps a single connection alive for as long as the engine
    lives, which is what makes `ATTACH DATABASE ':memory:'` usable as a schema.

    Deliberately per-test, not per-session. The usual "outer transaction +
    SAVEPOINT, rolled back afterwards" recipe only isolates tests for as long as
    that outer transaction stays alive, and on SQLite it does not reliably:
    pysqlite drives its own transactions, and a failed flush (the suite has
    several on purpose) can deactivate the enclosing transaction — after which
    every later statement commits for real and leaks into the next test.
    Discarding the whole database instead costs ~15 ms per test and cannot leak,
    whatever a request did to the connection.
    """
    Tag.__table__.c.active_key.computed.sqltext = sa.text("CASE WHEN deleted_ts = 0 THEN 0 END")

    engine = create_async_engine(
        "sqlite+aiosqlite://",
        poolclass=StaticPool,
        connect_args={"check_same_thread": False},
        future=True,
    )

    @event.listens_for(engine.sync_engine, "connect")
    def _prepare_connection(dbapi_connection, _connection_record) -> None:
        # ATTACH is not allowed inside a transaction, so the schemas are attached
        # here, at connect time, rather than from within `engine.begin()`.
        cursor = dbapi_connection.cursor()
        try:
            for schema in (test_settings.db_name, test_settings.mysql_db, test_settings.auth_db):
                cursor.execute(f"ATTACH DATABASE ':memory:' AS \"{schema}\"")
        finally:
            cursor.close()

        def _from_unixtime(value: int | None) -> str | None:
            if value is None:
                return None
            return datetime.fromtimestamp(value, tz=UTC).strftime("%Y-%m-%d %H:%M:%S")

        dbapi_connection.create_function("from_unixtime", 1, _from_unixtime, deterministic=True)

    async with engine.begin() as conn:
        await conn.run_sync(FFCBase.metadata.create_all)
        await conn.run_sync(OptScaleBase.metadata.create_all)

    try:
        yield engine
    finally:
        await engine.dispose()


@pytest.fixture
async def db_session(db_engine: AsyncEngine) -> AsyncGenerator[AsyncSession]:
    """A session on this test's database, with `session_factory` rebound to it"""
    session_factory.configure(bind=db_engine, join_transaction_mode="conditional_savepoint")
    async with session_factory() as session:
        try:
            yield session
        finally:
            await session.rollback()


@pytest.fixture(scope="session")
def unstarted_app(session_mocker: MockerFixture) -> FastAPI:
    session_mocker.patch.object(main, "configure_db_engine")
    session_mocker.patch.object(main, "verify_db_connection")
    session_mocker.patch.object(main, "configure_roles")
    session_mocker.patch.object(main, "get_clickhouse_client")
    session_mocker.patch.object(main, "get_mongo_client")
    return main.setup_app()


@pytest.fixture(scope="session")
async def app_lifespan_manager(unstarted_app: FastAPI) -> AsyncGenerator[LifespanManager]:
    async with LifespanManager(unstarted_app) as lifespan_manager:
        yield lifespan_manager


@pytest.fixture(scope="session")
def fastapi_app(unstarted_app: FastAPI, app_lifespan_manager: LifespanManager) -> FastAPI:
    return unstarted_app


@pytest.fixture
async def api_client(
    app_lifespan_manager: LifespanManager, db_session: AsyncSession
) -> AsyncGenerator[AsyncClient]:
    async with AsyncClient(
        transport=ASGITransport(app=app_lifespan_manager.app),
        base_url="http://localhost/ffc/v1",
    ) as client:
        yield client


@pytest.fixture
def admin_client(api_client: AsyncClient) -> AsyncClient:
    """Client carrying the cluster secret expected by the `/admin` router."""
    api_client.headers["Secret"] = TEST_CLUSTER_SECRET
    return api_client


@pytest.fixture
def mock_authorize(mocker: MockerFixture):
    """`app.dependencies.auth` imports `authorize` directly, so patch it there."""
    from ffc_api.ffc_api_server.app.dependencies import auth as auth_dependencies

    return mocker.patch.object(auth_dependencies, "authorize")


@pytest.fixture
def client_api_client(api_client: AsyncClient, mock_authorize) -> AsyncClient:
    """Client for the `/client` router, with the auth service authorising everything."""
    api_client.headers["Authorization"] = "Bearer test-token"
    return api_client


@pytest.fixture(autouse=True)
def configured_roles() -> Generator[roles_loader.Roles]:
    roles = roles_loader.Roles()
    roles.role_map = {role_id: name.value for name, role_id in ROLE_IDS.items()}
    roles.role_purpose_map = {
        ROLE_IDS[name]: purpose.value for name, purpose in ROLE_PURPOSES.items()
    }
    roles.type_map = {type_id: name.value for name, type_id in TYPE_IDS.items()}

    roles_loader._roles = roles
    yield roles
    roles_loader._roles = None


@pytest.fixture
async def auth_lookup_tables(db_session: AsyncSession) -> None:
    """Insert the auth `role` / `type` rows matching `ROLE_IDS` / `TYPE_IDS`."""
    db_session.add_all(
        [
            Role(
                id=role_id,
                name=name.value,
                purpose=ROLE_PURPOSES[name].value,
                deleted_at=0,
            )
            for name, role_id in ROLE_IDS.items()
        ]
        + [Type(id=type_id, name=name.value) for name, type_id in TYPE_IDS.items()]
    )
    await db_session.commit()


@pytest.fixture
def organization_factory(faker: Faker, db_session: AsyncSession) -> ModelFactory[Organization]:
    async def _organization(
        id: str | None = None,
        name: str | None = None,
        currency: str = "USD",
        is_demo: bool = False,
        disabled: bool = False,
        deleted_at: int = 0,
        pool_id: str | None = None,
    ) -> Organization:
        organization = Organization(
            id=id or str(uuid.uuid4()),
            name=name or faker.company(),
            currency=currency,
            is_demo=is_demo,
            disabled=disabled,
            deleted_at=deleted_at,
            pool_id=pool_id,
        )
        db_session.add(organization)
        await db_session.commit()
        await db_session.refresh(organization)
        return organization

    return _organization


@pytest.fixture
def pool_factory(faker: Faker, db_session: AsyncSession) -> ModelFactory[Pool]:
    async def _pool(
        organization: Organization,
        id: str | None = None,
        name: str | None = None,
        purpose: str = "business_unit",
        limit: int = 0,
        default_owner_id: str | None = None,
        deleted_at: int = 0,
    ) -> Pool:
        pool = Pool(
            id=id or str(uuid.uuid4()),
            name=name or faker.word(),
            organization_id=organization.id,
            purpose=purpose,
            limit=limit,
            default_owner_id=default_owner_id,
            deleted_at=deleted_at,
        )
        db_session.add(pool)
        await db_session.commit()
        await db_session.refresh(pool)
        return pool

    return _pool


@pytest.fixture
def datasource_factory(faker: Faker, db_session: AsyncSession) -> ModelFactory[DataSource]:
    async def _datasource(
        organization: Organization,
        id: str | None = None,
        name: str | None = None,
        type: str = "aws_cnr",
        account_id: str | None = None,
        config: str = "{}",
        parent: DataSource | None = None,
        deleted_at: int = 0,
        last_import_at: int = 0,
        last_import_modified_at: int = 0,
        last_import_attempt_at: int = 0,
        last_import_attempt_error: str | None = None,
    ) -> DataSource:
        datasource = DataSource(
            id=id or str(uuid.uuid4()),
            name=name or faker.word(),
            type=type,
            account_id=account_id or str(faker.random_number(digits=12)),
            config=config,
            organization_id=organization.id,
            parent_id=parent.id if parent else None,
            deleted_at=deleted_at,
            last_import_at=last_import_at,
            last_import_modified_at=last_import_modified_at,
            last_import_attempt_at=last_import_attempt_at,
            last_import_attempt_error=last_import_attempt_error,
        )
        db_session.add(datasource)
        await db_session.commit()
        await db_session.refresh(datasource)
        return datasource

    return _datasource


@pytest.fixture
def auth_user_factory(faker: Faker, db_session: AsyncSession) -> ModelFactory[AuthUser]:
    async def _auth_user(
        id: str | None = None,
        email: str | None = None,
    ) -> AuthUser:
        auth_user = AuthUser(id=id or str(uuid.uuid4()), email=email or faker.email())
        db_session.add(auth_user)
        await db_session.commit()
        await db_session.refresh(auth_user)
        return auth_user

    return _auth_user


@pytest.fixture
def assignment_factory(db_session: AsyncSession) -> ModelFactory[Assignment]:
    async def _assignment(
        auth_user: AuthUser,
        resource_id: str | None = None,
        role: RoleName = RoleName.MANAGER,
        resource_type: RoleType = RoleType.ORGANIZATION,
        id: str | None = None,
    ) -> Assignment:
        assignment = Assignment(
            id=id or str(uuid.uuid4()),
            user_id=auth_user.id,
            role_id=ROLE_IDS[role],
            type_id=TYPE_IDS[resource_type],
            resource_id=resource_id,
        )
        db_session.add(assignment)
        await db_session.commit()
        await db_session.refresh(assignment)
        return assignment

    return _assignment


@pytest.fixture
def user_factory(faker: Faker, db_session: AsyncSession) -> ModelFactory[User]:
    async def _user(
        organization: Organization,
        id: str | None = None,
        name: str | None = None,
        auth_user: AuthUser | None = None,
        created_at: int = 1677722000,
        deleted_at: int = 0,
    ) -> User:
        user = User(
            id=id or str(uuid.uuid4()),
            name=name or faker.name(),
            organization_id=organization.id,
            auth_user_id=auth_user.id if auth_user else None,
            created_at=created_at,
            deleted_at=deleted_at,
        )
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)
        return user

    return _user


@pytest.fixture
def token_factory(db_session: AsyncSession) -> ModelFactory[Token]:
    async def _token(
        auth_user: AuthUser,
        digest: str | None = None,
        created_at: datetime | None = None,
    ) -> Token:
        token = Token(
            digest=digest or uuid.uuid4().hex,
            user_id=auth_user.id,
            created_at=created_at or datetime.now(UTC).replace(tzinfo=None),
        )
        db_session.add(token)
        await db_session.commit()
        await db_session.refresh(token)
        return token

    return _token


@pytest.fixture
def tag_factory(faker: Faker, db_session: AsyncSession) -> ModelFactory[Tag]:
    async def _tag(
        resource_id: str,
        name: str | None = None,
        value: str | None = None,
        resource_type: TagResourceType = TagResourceType.ORGANIZATION,
        deleted_at: datetime | None = None,
        deleted_ts: int = 0,
    ) -> Tag:
        tag = Tag(
            name=name or faker.word(),
            value=value or faker.word(),
            resource_id=resource_id,
            resource_type=resource_type,
            deleted_at=deleted_at,
            deleted_ts=deleted_ts,
        )
        db_session.add(tag)
        await db_session.commit()
        await db_session.refresh(tag)
        return tag

    return _tag


@pytest.fixture
async def organization(organization_factory: ModelFactory[Organization]) -> Organization:
    return await organization_factory(name="Test org", currency="USD")


@pytest.fixture
async def organization_admin(
    db_session: AsyncSession,
    organization: Organization,
    auth_lookup_tables: None,
    auth_user_factory: ModelFactory[AuthUser],
    assignment_factory: ModelFactory[Assignment],
    user_factory: ModelFactory[User],
) -> User:
    auth_user = await auth_user_factory(email="admin@test.org.com")
    await assignment_factory(
        auth_user=auth_user,
        resource_id=organization.id,
        role=RoleName.MANAGER,
        resource_type=RoleType.ORGANIZATION,
    )
    user = await user_factory(organization=organization, name="Alex Parish", auth_user=auth_user)
    db_session.expunge_all()
    return user


@pytest.fixture
def expense_query(mocker: MockerFixture):
    mocker.patch.object(expenses_service, "get_clickhouse_client")
    mocker.patch.object(expenses_service, "get_mongo_client")

    expense_query_cls = mocker.patch.object(expenses_service, "ExpenseQuery", autospec=True)
    query = expense_query_cls.return_value
    query.get_cloud_expenses_with_resource_info.return_value = []
    query.get_first_expenses_for_forecast.return_value = {}
    query.get_monthly_forecast.side_effect = ExpenseQuery.get_monthly_forecast

    query.rest_api_client = mocker.patch.object(
        expenses_service, "get_rest_api_client"
    ).return_value
    query.rest_api_client.pool_get.return_value = (200, {})

    return query
