import pytest
from pytest_mock import MockerFixture

from ffc_api.ffc_api_server.app.clients import auth as auth_clients
from ffc_api.ffc_api_server.app.clients import rest_api as rest_api_clients
from ffc_api.ffc_api_server.tests import TEST_AUTH_URL, TEST_CLUSTER_SECRET, TEST_REST_API_URL


@pytest.fixture(autouse=True)
def reset_clients():
    auth_clients._auth_client = None
    rest_api_clients._rest_api_client = None
    yield
    auth_clients._auth_client = None
    rest_api_clients._rest_api_client = None


def test_get_rest_api_client_caches_secret(mocker: MockerFixture):
    client_cls = mocker.patch.object(rest_api_clients, "RestClient")

    first = rest_api_clients.get_rest_api_client()
    second = rest_api_clients.get_rest_api_client()

    assert first is second
    client_cls.assert_called_once_with(url=TEST_REST_API_URL, secret=TEST_CLUSTER_SECRET)


def test_get_rest_api_client_never_caches_user_token(mocker: MockerFixture):
    client_cls = mocker.patch.object(rest_api_clients, "RestClient")

    rest_api_clients.get_rest_api_client(token="token-a")
    rest_api_clients.get_rest_api_client(token="token-b")

    assert client_cls.call_args_list[:2] == [
        mocker.call(url=TEST_REST_API_URL, token="token-a"),
        mocker.call(url=TEST_REST_API_URL, token="token-b"),
    ]


def test_get_auth_client_caches_secret(mocker: MockerFixture):
    client_cls = mocker.patch.object(auth_clients, "AuthClient")

    assert auth_clients.get_auth_client() is auth_clients.get_auth_client()
    client_cls.assert_called_once_with(url=TEST_AUTH_URL, secret=TEST_CLUSTER_SECRET)


def test_get_auth_client_builds_client_per_token(mocker: MockerFixture):
    client_cls = mocker.patch.object(auth_clients, "AuthClient")

    auth_clients.get_auth_client(token="token-a")
    auth_clients.get_auth_client(token="token-b")

    assert client_cls.call_args_list == [
        mocker.call(url=TEST_AUTH_URL, token="token-a"),
        mocker.call(url=TEST_AUTH_URL, token="token-b"),
    ]
