import hashlib
from datetime import UTC, datetime

import pytest
import time_machine
from fastapi import HTTPException, status

from ffc_api.ffc_api_server.app.utils import (
    get_digest,
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
