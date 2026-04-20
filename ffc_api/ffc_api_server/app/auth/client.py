import requests

from fastapi import HTTPException, status

from ffc_api.ffc_api_server.app.conf import get_settings
from optscale_client.auth_client.client_v2 import Client as AuthClient


def authorize(token: object, action: object, type: object, resource_id: object):
    try:
        settings = get_settings()

        client = AuthClient(url=settings.auth_url)
        client.token = token
        client.authorize(action, type, resource_id)
    except requests.exceptions.HTTPError as exc:
        if exc.response.status_code == 403:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden") from exc
        elif exc.response.status_code == 401:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized"
            ) from exc
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    except requests.exceptions.ConnectionError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
