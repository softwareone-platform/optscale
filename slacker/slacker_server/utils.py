from concurrent.futures.thread import ThreadPoolExecutor
from datetime import datetime
from decimal import Decimal
import enum
import json
import logging
import uuid
from retrying import Retrying
from slack_sdk.errors import SlackApiError


MS_IN_SEC = 1000
LOG = logging.getLogger(__name__)
tp_executor = ThreadPoolExecutor(30)


class ModelEncoder(json.JSONEncoder):
    # pylint: disable=E0202
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, enum.Enum):
            return obj.value
        if isinstance(obj, Decimal):
            return float(obj)
        if isinstance(obj, bytes):
            return obj.decode()
        if isinstance(obj, set):
            return list(obj)
        if isinstance(obj, str):
            try:
                return json.loads(obj)
            except Exception:
                pass
        return json.JSONEncoder.default(self, obj)


def gen_id():
    return str(uuid.uuid4())


def retriable_slack_api_error(exc):
    if (isinstance(exc, SlackApiError) and
            exc.response.headers.get('Retry-After')):
        return True
    return False


def retry_too_many_requests(f, *args, **kwargs):
    try:
        return f(*args, **kwargs)
    except Exception as exc:
        if retriable_slack_api_error(exc):
            f_retry = Retrying(
                retry_on_exception=retriable_slack_api_error,
                wait_fixed=int(
                    exc.response.headers['Retry-After']) * MS_IN_SEC,
                stop_max_attempt_number=5)
            res = f_retry.call(f, *args, **kwargs)
            return res
        else:
            raise exc
