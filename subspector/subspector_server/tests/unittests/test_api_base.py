import pytest
from fastapi import Request
from fastapi.testclient import TestClient
from optscale_client.subspector_client.client import Client
from subspector.subspector_server.api.dependencies import verify_stripe_event
from subspector.subspector_server.models.database import DBType
from subspector.subspector_server.server import make_app


class SubspectorTestClient(TestClient):
    def request(self, *args, **kwargs):
        response = super().request(*args, **kwargs)
        try:
            content = response.json()
        except ValueError:
            content = None
        return response.status_code, content


class MockedConfigClient:
    def __init__(self, secret=None):
        self.secret = secret

    def cluster_secret(self):
        return self.secret

    def stripe_settings(self):
        return {
            'api_key': 'test',
            'webhook_secret': 'test',
        }

    def public_ip(self):
        return 'localhost'

    def rabbit_params(self):
        return 'user', 'pass', 'host', 80


async def verify_webhook_mock(request: Request):
    payload = await request.json()
    return payload


class TestBase:
    @pytest.fixture(autouse=True)
    def setup_app(self, mocker):
        test_secret = 'test_secret'
        config_client = MockedConfigClient(secret=test_secret)
        app = make_app(DBType.TEST, config_client=config_client)
        app.dependency_overrides[verify_stripe_event] = verify_webhook_mock
        test_client = SubspectorTestClient(app)
        test_client.headers.update({'Secret': test_secret})
        self.client = Client(http_provider=test_client)
        test_client.__enter__()
        yield
        test_client.__exit__(None, None, None)
