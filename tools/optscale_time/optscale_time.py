from datetime import datetime, timezone


def utcnow() -> datetime:
    return datetime.now(tz=timezone.utc).replace(tzinfo=None)


def utcnow_timestamp() -> int:
    return int(datetime.now(tz=timezone.utc).timestamp())


def utcfromtimestamp(timestamp) -> datetime:
    return datetime.fromtimestamp(
        timestamp, timezone.utc).replace(tzinfo=None)


def startday(date) -> datetime:
    return date.replace(hour=0, minute=0, second=0, microsecond=0)
