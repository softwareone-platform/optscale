from clickhouse_connect import get_client

from ffc_api.ffc_api_server.app.conf import get_settings

_clickhouse_client = None


def get_clickhouse_client():
    global _clickhouse_client
    if not _clickhouse_client:
        settings = get_settings()
        _clickhouse_client = get_client(
            host=settings.clickhouse_host,
            password=settings.clickhouse_password,
            database=settings.clickhouse_db,
            user=settings.clickhouse_user,
            port=settings.clickhouse_port,
            secure=settings.clickhouse_secure,
        )
    return _clickhouse_client
