import contextlib
import hashlib
import logging
from datetime import UTC, datetime

from fastapi import HTTPException, status

logger = logging.getLogger(__name__)


def dateformat(date_obj: datetime | None) -> str:
    return date_obj.strftime("%-d %B %Y") if date_obj else ""


def get_digest(val):
    return hashlib.md5(val.encode("utf-8")).hexdigest()


def utcnow() -> datetime:
    return datetime.now(tz=UTC).replace(tzinfo=None)


def utcnow_timestamp() -> int:
    return int(datetime.now(tz=UTC).timestamp())


@contextlib.contextmanager
def wrap_exc_in_http_response(
    exc_cls: type[Exception],
    error_msg: str | None = None,
    status_code: int = status.HTTP_400_BAD_REQUEST,
):
    try:
        yield
    except exc_cls as e:
        if error_msg is None:
            error_msg = str(e)

        logger.exception(
            f"{exc_cls.__name__} error was raised during an operation, "
            f"returning a {status_code} HTTP response: {error_msg}"
        )
        raise HTTPException(status_code=status_code, detail=error_msg) from e
