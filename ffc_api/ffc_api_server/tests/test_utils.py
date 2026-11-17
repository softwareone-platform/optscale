import hashlib
from datetime import UTC, datetime

import pytest
import requests
import time_machine
from fastapi import HTTPException, status

from ffc_api.ffc_api_server.app.utils import (
    get_digest,
    proxy_optscale_errors,
    raise_from_http_error,
    utcnow_timestamp,
    wrap_exc_in_http_response,
)

FROZEN_NOW = datetime(2026, 10, 15, 4, 30, 45, tzinfo=UTC)


def test_get_digest():
    assert get_digest("token") == hashlib.md5(b"token").hexdigest()


@time_machine.travel(FROZEN_NOW, tick=False)
def test_utcnow_timestamp():
    assert utcnow_timestamp() == int(FROZEN_NOW.timestamp())


def test_wrap_exc_in_http_response_converts_the_exception():
    with pytest.raises(HTTPException) as exc_info:
        with wrap_exc_in_http_response(ValueError):
            raise ValueError("error")

    assert exc_info.value.status_code == status.HTTP_400_BAD_REQUEST
    assert exc_info.value.detail == "error"


def test_wrap_exc_in_http_response_uses_message_and_status():
    with pytest.raises(HTTPException) as exc_info:
        with wrap_exc_in_http_response(ValueError, "Something went wrong", status_code=502):
            raise ValueError("error")

    assert exc_info.value.status_code == 502
    assert exc_info.value.detail == "Something went wrong"


def test_wrap_exc_in_http_response_propagates_error():
    with pytest.raises(KeyError):
        with wrap_exc_in_http_response(ValueError):
            raise KeyError("untouched")


def _http_error(status_code: int, body: bytes | None = None) -> requests.exceptions.HTTPError:
    response = requests.Response()
    response.status_code = status_code
    if body is not None:
        response._content = body
        response.headers["Content-Type"] = "application/json"
    return requests.exceptions.HTTPError(f"{status_code} Error", response=response)


def test_raise_from_http_error_optscale_reason():
    error = _http_error(
        403, b'{"error": {"error_code": "OE0234", "reason": "Forbidden", "params": []}}'
    )

    with pytest.raises(HTTPException) as exc_info:
        raise_from_http_error(error)

    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == "Forbidden"


def test_raise_from_http_error_non_json_falls_back_to_body():
    error = _http_error(502, b"Bad Gateway")
    error.response.headers["Content-Type"] = "text/html"

    with pytest.raises(HTTPException) as exc_info:
        raise_from_http_error(error)

    assert exc_info.value.status_code == 502
    assert exc_info.value.detail == "Bad Gateway"


def test_raise_from_http_error_falls_back_when_reason_missing():
    error = _http_error(409, b'{"error": {"error_code": "OE0149"}}')

    with pytest.raises(HTTPException) as exc_info:
        raise_from_http_error(error)

    assert exc_info.value.status_code == 409
    assert exc_info.value.detail == '{"error": {"error_code": "OE0149"}}'


def test_proxy_optscale_errors_maps_http_errors():
    with pytest.raises(HTTPException) as exc_info:
        with proxy_optscale_errors():
            raise _http_error(404, b'{"error": {"reason": "Not found"}}')

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Not found"


def test_proxy_optscale_errors_maps_connection_errors_to_400():
    with pytest.raises(HTTPException) as exc_info:
        with proxy_optscale_errors():
            raise requests.exceptions.ConnectionError("refused")

    assert exc_info.value.status_code == status.HTTP_400_BAD_REQUEST
    assert exc_info.value.detail == "refused"


def test_proxy_optscale_errors_propagates_other_exceptions():
    with pytest.raises(KeyError):
        with proxy_optscale_errors():
            raise KeyError("untouched")
