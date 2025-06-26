import logging
import sys
from pathlib import Path

import pytest
from jinja2 import Environment, FileSystemLoader
from pytest_mock import MockerFixture

from herald.modules.email_generator.utils import get_environment, load_filters_from_registry


def test_load_filters_from_registry(mocker: MockerFixture, registry_json_data: str, mock_env: Environment):
    mocker.patch.object(Path, "exists", return_value=True)
    mocker.patch(
        "herald.modules.email_generator.utils.open",
        mocker.mock_open(read_data=registry_json_data),
    )
    mocked_module = mocker.MagicMock()
    mocked_import = mocker.patch(
        "herald.modules.email_generator.utils.importlib.import_module",
        return_value=mocked_module,
    )
    load_filters_from_registry(mock_env, Path("/test"))
    assert mock_env.filters["dummy"] == mocked_module.dummy_filter
    assert mocked_import.mock_calls[-1].args == ("myfilters",)
    assert sys.path[0] == "/test"


def test_load_filters_from_registry_no_registry_json(caplog: pytest.LogCaptureFixture, mock_env: Environment):
    with caplog.at_level(logging.INFO):
        load_filters_from_registry(mock_env, Path("/test"))

    assert "Filter registry file not found: /test/filters_registry.json" in caplog.text


def test_load_filters_from_registry_invalid_registry_not_a_json(
    mocker: MockerFixture, caplog: pytest.LogCaptureFixture, mock_env: Environment
):
    mocker.patch.object(Path, "exists", return_value=True)
    mocker.patch(
        "herald.modules.email_generator.utils.open",
        mocker.mock_open(read_data="invalid data"),
    )

    with caplog.at_level(logging.ERROR):
        load_filters_from_registry(mock_env, Path("/test"))

    assert (
        "Error loading filter registry from /test/filters_registry.json: Expecting value: line 1 column 1 (char 0)"
    ) in caplog.text


def test_load_filters_from_registry_invalid_registry_json(
    mocker: MockerFixture, caplog: pytest.LogCaptureFixture, mock_env: Environment
):
    mocker.patch.object(Path, "exists", return_value=True)
    mocker.patch(
        "herald.modules.email_generator.utils.open",
        mocker.mock_open(read_data="{}"),
    )

    with caplog.at_level(logging.ERROR):
        load_filters_from_registry(mock_env, Path("/test"))

    assert (
        "Invalid filter registry format: /test/filters_registry.json should contain a list of filters."
    ) in caplog.text


def test_load_filters_from_registry_no_filter_name(
    mocker: MockerFixture,
    caplog: pytest.LogCaptureFixture,
    mock_env: Environment,
    registry_json_data_no_name: str,
):
    mocker.patch.object(Path, "exists", return_value=True)
    mocker.patch(
        "herald.modules.email_generator.utils.open",
        mocker.mock_open(read_data=registry_json_data_no_name),
    )

    with caplog.at_level(logging.WARNING):
        load_filters_from_registry(mock_env, Path("/test"))

    assert ("Invalid filter entry in registry: {'entrypoint': 'myfilters.dummy_filter'}. Error: 'name'") in caplog.text


def test_load_filters_from_registry_no_filter_entrypoint(
    mocker: MockerFixture,
    caplog: pytest.LogCaptureFixture,
    mock_env: Environment,
    registry_json_data_no_entrypoint: str,
):
    mocker.patch.object(Path, "exists", return_value=True)
    mocker.patch(
        "herald.modules.email_generator.utils.open",
        mocker.mock_open(read_data=registry_json_data_no_entrypoint),
    )

    with caplog.at_level(logging.WARNING):
        load_filters_from_registry(mock_env, Path("/test"))

    assert ("Invalid filter entry in registry: {'name': 'dummy'}. Error: 'entrypoint'") in caplog.text


def test_load_filters_from_registry_import_error(
    mocker: MockerFixture, caplog: pytest.LogCaptureFixture, registry_json_data: str, mock_env: Environment
):
    mocker.patch.object(Path, "exists", return_value=True)
    mocker.patch(
        "herald.modules.email_generator.utils.open",
        mocker.mock_open(read_data=registry_json_data),
    )
    mocker.patch(
        "herald.modules.email_generator.utils.importlib.import_module",
        side_effect=ImportError("import error"),
    )
    with caplog.at_level(logging.WARNING):
        load_filters_from_registry(mock_env, Path("/test"))

    assert ("Failed to load filter 'dummy': import error") in caplog.text


def test_load_filters_from_registry_attribute_error(
    mocker: MockerFixture, caplog: pytest.LogCaptureFixture, registry_json_data: str, mock_env: Environment
):
    mocker.patch.object(Path, "exists", return_value=True)
    mocker.patch(
        "herald.modules.email_generator.utils.open",
        mocker.mock_open(read_data=registry_json_data),
    )
    mocked_module = mocker.MagicMock()
    del mocked_module.dummy_filter
    mocker.patch(
        "herald.modules.email_generator.utils.importlib.import_module",
        return_value=mocked_module,
    )
    with caplog.at_level(logging.WARNING):
        load_filters_from_registry(mock_env, Path("/test"))

    assert ("Failed to load filter 'dummy': module 'myfilters' has no attribute 'dummy_filter'") in caplog.text


def test_get_environment(mocker: MockerFixture):
    mocker.patch("herald.modules.email_generator.utils.ENV", None)
    mocker.patch("herald.modules.email_generator.utils.get_current_dir", return_value=Path("/test_path"))
    mocked_load_registry = mocker.patch("herald.modules.email_generator.utils.load_filters_from_registry")
    env = get_environment()
    assert isinstance(env, Environment)
    assert isinstance(env.loader, FileSystemLoader)
    assert sorted(env.loader.searchpath) == ["/test_path/custom_templates", "/test_path/templates"]
    mocked_load_registry.assert_called_once_with(env, Path("/test_path/custom_filters"))
