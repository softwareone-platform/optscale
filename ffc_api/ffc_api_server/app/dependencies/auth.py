import secrets

from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyHeader

from ffc_api.ffc_api_server.app.auth.auth import TokenBearer
from ffc_api.ffc_api_server.app.auth.client import authorize
from ffc_api.ffc_api_server.app.conf import get_settings
from ffc_api.ffc_api_server.app.db.models.optscale import Organization
from ffc_api.ffc_api_server.app.services.organizations import fetch_organization_or_404

secret_header = APIKeyHeader(name="Secret", auto_error=False)
token_bearer = TokenBearer()


def verify_cluster_secret(secret: str | None = Depends(secret_header)):
    if secret is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Missing secret")

    settings = get_settings()

    if not secrets.compare_digest(secret, settings.cluster_secret):  # type: ignore[type-var]
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid cluster secret",
        )


def verify_org_permission(action: str):

    def dependency(
        token: str | None = Depends(token_bearer),
        organization: Organization = Depends(fetch_organization_or_404),
    ) -> None:
        authorize(token, action, "organization", organization.id)

    return dependency
