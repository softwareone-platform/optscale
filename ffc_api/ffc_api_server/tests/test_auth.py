import pytest
import requests
from fastapi import HTTPException, Request
from pytest_mock import MockerFixture

from ffc_api.ffc_api_server.app.auth import client as auth_client
from ffc_api.ffc_api_server.app.auth.auth import TokenBearer
from ffc_api.ffc_api_server.app.auth.client import authorize
from ffc_api.ffc_api_server.app.dependencies.auth import verify_cluster_secret
from ffc_api.ffc_api_server.tests import TEST_AUTH_URL, TEST_CLUSTER_SECRET


async def test_token_bearer_with_invalid_header():
    assert (
        await TokenBearer()(
            Request(
                {
                    "type": "http",
                    "method": "GET",
                    "path": "/",
                    "headers": [("Authorization", "invalid header")],
                }
            )
        )
        is None
    )


def test_verify_cluster_secret_accepts_configured_secret():
    assert verify_cluster_secret(TEST_CLUSTER_SECRET) is None


def test_verify_cluster_secret_no_secret():
    with pytest.raises(HTTPException) as exc_info:
        verify_cluster_secret(None)

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Missing secret"


def test_verify_cluster_secret__wrong_secret():
    with pytest.raises(HTTPException) as exc_info:
        verify_cluster_secret("invalid")

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Invalid cluster secret"


@pytest.fixture
def mock_auth_client(mocker: MockerFixture):
    return mocker.patch.object(auth_client, "AuthClient")


def test_authorize(mock_auth_client):
    authorize("token", "INFO_ORGANIZATION", "organization", "ORG-1")

    mock_auth_client.assert_called_once_with(url=TEST_AUTH_URL)
    client = mock_auth_client.return_value
    assert client.token == "token"
    client.authorize.assert_called_once_with("INFO_ORGANIZATION", "organization", "ORG-1")


def _http_error(status_code: int) -> requests.exceptions.HTTPError:
    response = requests.Response()
    response.status_code = status_code
    return requests.exceptions.HTTPError("Error", response=response)


@pytest.mark.parametrize(
    ("status_code", "expected_status", "expected_detail"),
    [
        (403, 403, "Forbidden"),
        (401, 401, "Unauthorized"),
        (500, 400, "Error"),
    ],
)
def test_authorize_errors(
    mock_auth_client, status_code: int, expected_status: int, expected_detail: str
):
    mock_auth_client.return_value.authorize.side_effect = _http_error(status_code)

    with pytest.raises(HTTPException) as exc_info:
        authorize("token", "INFO_ORGANIZATION", "organization", "ORG-1")

    assert exc_info.value.status_code == expected_status
    assert exc_info.value.detail == expected_detail
