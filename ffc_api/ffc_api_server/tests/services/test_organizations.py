import pytest
from fastapi import HTTPException
from ffc_api.ffc_api_server.app.db.handlers import OrganizationHandler
from ffc_api.ffc_api_server.app.db.models.optscale import Organization
from ffc_api.ffc_api_server.app.services.organizations import fetch_organization_or_404
from ffc_api.ffc_api_server.tests.types import ModelFactory
from sqlalchemy.ext.asyncio import AsyncSession


async def test_fetch_organization_or_404(db_session: AsyncSession, organization: Organization):
    fetched = await fetch_organization_or_404(organization.id, OrganizationHandler(db_session))

    assert fetched.id == organization.id


async def test_fetch_organization_or_404_not_found(db_session: AsyncSession):
    with pytest.raises(HTTPException) as exc_info:
        await fetch_organization_or_404("missing", OrganizationHandler(db_session))

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Organization with ID `missing` wasn't found."


async def test_fetch_organization_or_404_ignores_deleted(
    db_session: AsyncSession, organization_factory: ModelFactory[Organization]
):
    organization = await organization_factory(deleted_at=1700000000)

    with pytest.raises(HTTPException) as exc_info:
        await fetch_organization_or_404(organization.id, OrganizationHandler(db_session))

    assert exc_info.value.status_code == 404
