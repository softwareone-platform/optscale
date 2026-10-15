from optscale_client.auth_client.client_v2 import Client as AuthClient

from ffc_api.ffc_api_server.app.conf import get_settings

_auth_client = None


def get_auth_client(token: str | None = None) -> AuthClient:
    settings = get_settings()
    if token:
        return AuthClient(url=settings.auth_url, token=token)

    global _auth_client
    if _auth_client is None:
        _auth_client = AuthClient(
            url=settings.auth_url,
            secret=settings.cluster_secret,
        )
    return _auth_client
