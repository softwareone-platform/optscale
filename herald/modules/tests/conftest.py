from collections.abc import Callable
from pathlib import Path
from typing import Any
from unittest.mock import MagicMock

import pytest
from jinja2 import ChainableUndefined, Environment, FileSystemLoader, select_autoescape
from pytest_mock import MockerFixture


@pytest.fixture
def mock_env() -> Environment:
    current_dir = Path(__file__).resolve().parent / "email_generator/test_data"
    return Environment(
        loader=FileSystemLoader(
            [
                current_dir / "templates",
            ],
        ),
        autoescape=select_autoescape(),
        undefined=ChainableUndefined,
    )


@pytest.fixture
def registry_json_data() -> str:
    return """
    [
        {
            "name": "dummy",
            "entrypoint": "myfilters.dummy_filter"
        }
    ]
    """


@pytest.fixture
def registry_json_data_no_name() -> str:
    return """
    [
        {
            "entrypoint": "myfilters.dummy_filter"
        }
    ]
    """


@pytest.fixture
def registry_json_data_no_entrypoint() -> str:
    return """
    [
        {
            "name": "dummy"
        }
    ]
    """


@pytest.fixture
def config_client_factory(mocker: MockerFixture) -> Callable[[dict[str, Any]], MagicMock]:
    def _mocked_client(etcd_keys: dict[str, Any]) -> MagicMock:
        def get_key(key: str) -> MagicMock:
            val = mocker.MagicMock()
            val.value = etcd_keys[key]
            return val

        client = mocker.MagicMock()
        client.get = get_key
        return client

    return _mocked_client
