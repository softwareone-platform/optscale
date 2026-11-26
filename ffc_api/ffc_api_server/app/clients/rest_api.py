from optscale_client.rest_api_client.client_v2 import Client as RestClient

from ffc_api.ffc_api_server.app.conf import get_settings

_rest_api_client = None


def get_rest_api_client(token: str | None = None):
    if token:
        settings = get_settings()
        return RestClient(url=settings.rest_api_url, token=token)

    global _rest_api_client
    if _rest_api_client is None:
        settings = get_settings()
        _rest_api_client = RestClient(
            url=settings.rest_api_url,
            secret=settings.cluster_secret,
        )
    return _rest_api_client
