from ffc_api.ffc_api_server.app.db.handlers import DataSourceHandler, OrganizationHandler
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource, Organization
from ffc_api.ffc_api_server.app.services.validators import (
    DataSourceValidator,
    OrganizationValidator,
)
from ffc_api.ffc_api_server.tests.types import ModelFactory
from sqlalchemy.ext.asyncio import AsyncSession


async def test_organization_validator_existing_organization(
    db_session: AsyncSession, organization: Organization
):
    validator = OrganizationValidator(OrganizationHandler(db_session))

    assert await validator.exists(organization.id) is True


async def test_organization_validator_unknown_id(db_session: AsyncSession):
    validator = OrganizationValidator(OrganizationHandler(db_session))

    assert await validator.exists("missing") is False


async def test_datasource_validator_existing_datasource(
    db_session: AsyncSession,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
):
    datasource = await datasource_factory(organization=organization)
    validator = DataSourceValidator(DataSourceHandler(db_session))

    assert await validator.exists(datasource.id) is True


async def test_datasource_validator_unknown_id(db_session: AsyncSession):
    validator = DataSourceValidator(DataSourceHandler(db_session))

    assert await validator.exists("missing") is False
