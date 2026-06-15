from datetime import UTC, datetime

MAX_32_INT = 2**31 - 1


def get_current_timestamp():
    return int(datetime.now(tz=UTC).timestamp())
