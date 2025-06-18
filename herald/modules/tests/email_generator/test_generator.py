from collections.abc import Callable
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from typing import Any
from unittest.mock import MagicMock

from jinja2 import Environment
from pytest_mock import MockerFixture

from herald.modules.email_generator.generator import _generate_context, does_template_exist, generate_email
from herald.modules.email_generator.utils import load_filters_from_registry


def test_generate_email(mocker: MockerFixture, mock_env: Environment):
    load_filters_from_registry(
        mock_env,
        Path(__file__).resolve().parent / "test_data/custom_filters",
    )
    mocker.patch(
        "herald.modules.email_generator.generator.get_environment",
        return_value=mock_env,
    )
    mocker.patch(
        "herald.modules.email_generator.generator._generate_context",
        return_value={
            "title": "This will be wrapped by title html tag.",
            "name": "this is uppercase",
        },
    )

    mime_msg = generate_email(
        mocker.MagicMock(),
        "test@example.com",
        "Email subject",
        {},
        template_type="my_email_template",
    )
    assert isinstance(mime_msg, MIMEMultipart)

    assert mime_msg["Subject"] == "Email subject"
    assert mime_msg["To"] == "test@example.com"

    message = mime_msg.as_string()
    assert "<title>This will be wrapped by title html tag.</title>" in message
    assert "<h1>Hello THIS IS UPPERCASE!</h1>" in message


def test_does_template_exist(mocker: MockerFixture, mock_env: Environment):
    load_filters_from_registry(
        mock_env,
        Path(__file__).resolve().parent / "test_data/custom_filters",
    )
    mocker.patch(
        "herald.modules.email_generator.generator.get_environment",
        return_value=mock_env,
    )
    assert does_template_exist("my_email_template.html") is True
    assert does_template_exist("does_not_exist.html") is False


def test_generate_context(
    mocker: MockerFixture,
    config_client_factory: Callable[[dict[str, Any]], MagicMock],
):
    mocker.patch(
        "herald.modules.email_generator.generator.get_default_context",
        return_value={"default": "context"},
    )
    client = config_client_factory(
        {
            "/public_ip": "1.2.3.4",
            "/my/other/key": "other_key_value",
        },
    )
    template_params = {
        "texts": {
            "organization": {
                "id": "a550ba8f-2766-4a4c-ba07-84a502ecca10",
                "name": "Twister Inc.",
                "currency_code": "$",
            },
            "employee": {"id": "cb40fab5-3247-4064-b416-c3632786707a", "name": "Twister Inc."},
            "key1": 1,
            "key2": 2,
        },
        "etcd": {
            "other_key": "/my/other/key",
            "key_not_found": "/not/found",
        },
    }

    context = _generate_context(template_params, client)

    assert context == {
        "default": "context",
        "etcd": {"other_key": "other_key_value", "key_not_found": ""},
        "style": {"element_visibility_key1": "table-row", "element_visibility_key2": "table-row"},
        "texts": {
            "control_panel_parameters": "?organizationId=a550ba8f-2766-4a4c-ba07-84a502ecca10",
            "organization": {
                "id": "a550ba8f-2766-4a4c-ba07-84a502ecca10",
                "name": "Twister Inc.",
                "currency_code": "$",
            },
            "employee": {"id": "cb40fab5-3247-4064-b416-c3632786707a", "name": "Twister Inc."},
            "key1": 1,
            "key2": 2,
            "etcd": {"control_panel_link": "1.2.3.4"},
        },
    }
