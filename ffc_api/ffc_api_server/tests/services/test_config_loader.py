import pytest
from ffc_api.ffc_api_server.app.services import config_loader
from ffc_api.ffc_api_server.app.services.config_loader import IDENTIFIER, load, write
from ffc_api.ffc_api_server.tests import (
    AUTH_DB_SCHEMA,
    OPTSCALE_DB_SCHEMA,
    TEST_AUTH_URL,
    TEST_CLUSTER_SECRET,
    TEST_MONGO_URL,
    TEST_REST_API_URL,
    FakeConfigClient,
)
from pytest_mock import MockerFixture


class DynaconfStub:
    """The subset of the Dynaconf API the loader uses."""

    def __init__(self, values: dict):
        self._values = values
        self.updates: list[tuple[dict, str]] = []

    def get(self, key, default=None):
        return self._values.get(key, default)

    def update(self, data, loader_identifier=None):
        self.updates.append((data, loader_identifier))


def test_load_populates_the_settings(mocker: MockerFixture):
    mocker.patch.object(config_loader, "ConfigClient", FakeConfigClient)
    obj = DynaconfStub({"ETCD_HOST": "etcd.test", "ETCD_PORT": "2379"})

    load(obj)

    data, loader_identifier = obj.updates[0]
    assert loader_identifier == IDENTIFIER
    assert data["MYSQL_DB"] == OPTSCALE_DB_SCHEMA
    assert data["AUTH_DB"] == AUTH_DB_SCHEMA
    assert data["CLUSTER_SECRET"] == TEST_CLUSTER_SECRET
    assert data["AUTH_URL"] == TEST_AUTH_URL
    assert data["REST_API_URL"] == TEST_REST_API_URL
    assert data["MONGO_URL"] == TEST_MONGO_URL
    assert data["CLICKHOUSE_HOST"] == "clickhouse.test"
    assert data["CLICKHOUSE_PORT"] == 9000
    assert data["CLICKHOUSE_SECURE"] is False


@pytest.mark.parametrize(
    "values",
    [
        pytest.param({}, id="no_etcd_settings"),
        pytest.param({"ETCD_HOST": "etcd.test"}, id="no_port"),
        pytest.param({"ETCD_PORT": "2379"}, id="no_host"),
        pytest.param({"ETCD_HOST": "", "ETCD_PORT": "2379"}, id="empty_host"),
    ],
)
def test_load_without_etcd_settings(values: dict):
    with pytest.raises(RuntimeError, match="ETCD_HOST / ETCD_PORT not set"):
        load(DynaconfStub(values))


def test_load_with_an_incomplete_etcd_configuration(mocker: MockerFixture):
    class IncompleteConfigClient(FakeConfigClient):
        def cluster_secret(self):
            return None

    mocker.patch.object(config_loader, "ConfigClient", IncompleteConfigClient)
    obj = DynaconfStub({"ETCD_HOST": "etcd.test", "ETCD_PORT": "2379"})

    with pytest.raises(RuntimeError, match="Configuration not fully loaded from ETCD"):
        load(obj)

    assert obj.updates == []


def test_load_passes_the_etcd_address_to_the_client(mocker: MockerFixture):
    client_cls = mocker.patch.object(config_loader, "ConfigClient", wraps=FakeConfigClient)

    load(DynaconfStub({"ETCD_HOST": "etcd.test", "ETCD_PORT": "2379"}))

    client_cls.assert_called_once_with(host="etcd.test", port=2379)


def test_write_is_not_supported():
    with pytest.raises(NotImplementedError):
        write()
