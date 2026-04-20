from fastapi import HTTPException, status

from ffc_api.ffc_api_server.app.db.handlers import NotFoundError
from ffc_api.ffc_api_server.app.dependencies.db import OrganizationRepository
from ffc_api.ffc_api_server.app.dependencies.path import OrganizationId
from ffc_api.ffc_api_server.app.optscale.models import Organization


async def fetch_organization_or_404(
    organization_id: OrganizationId, organization_repo: OrganizationRepository
) -> Organization:
    try:
        return await organization_repo.get(
            id=organization_id,
            extra_conditions=[Organization.disabled == False],
        )
    except NotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        ) from e
