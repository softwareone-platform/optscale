from collections.abc import Callable
from typing import Any
from unittest.mock import MagicMock

from herald.modules.email_generator.generator import does_template_exist, generate_email

TEMPLATE_TYPE = "mfa_code"
CODE = "048213"


def _render(config_client: MagicMock) -> str:
    message = generate_email(
        config_client,
        "user@example.com",
        "FinOps for Cloud verification code",
        {"texts": {"code": CODE}},
        template_type=TEMPLATE_TYPE,
    )
    body = message.get_payload()[0]
    return body.get_payload(decode=True).decode(body.get_content_charset())


def test_mfa_code_template_exists():
    assert does_template_exist(f"{TEMPLATE_TYPE}.html") is True


def test_mfa_code_template_renders(config_client_factory: Callable[[dict[str, Any]], MagicMock]):
    client = config_client_factory(
        {
            "/public_ip": "1.2.3.4",
            "/company_name": "SoftwareOne",
            "/product_name": "FinOps for Cloud",
        },
    )
    html = _render(client)

    # the code is a string, leading zeros must be kept
    assert f">{CODE}</span>" in html
    assert "expires in 10 minutes" in html
    assert "If you did not try to sign in, you can ignore this email" in html
    # unlike password recovery, nothing in the content is clickable
    assert "password-recovery" not in html
    assert "links.restore_button" not in html
    assert "Recover password" not in html
    # every placeholder was rendered
    assert "{{" not in html
    assert "{%" not in html
