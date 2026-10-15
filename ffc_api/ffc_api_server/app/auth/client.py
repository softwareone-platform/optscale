import requests
from fastapi import HTTPException, status

from ffc_api.ffc_api_server.app.clients.auth import get_auth_client


def authorize(token: str | None, action: str, type: str, resource_id: str):
    try:
        client = get_auth_client(token=token)
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


def get_token_by_user_id(user_id: str) -> str:
    client = get_auth_client()
    _, token_info = client.token_get_user_id(user_id)
    return token_info["token"]
