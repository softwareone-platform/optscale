from clickhouse_connect import get_client
from pymongo import MongoClient

from ffc_api.ffc_api_server.app.conf import get_settings


_clickhouse_client = None
_mongo_client = None


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


def get_mongo_client():
    global _mongo_client
    if _mongo_client is None:
        settings = get_settings()
        _mongo_client = MongoClient(settings.mongo_url)
    return _mongo_client


def configure_clickhouse_client():
    get_clickhouse_client()
    get_mongo_client()
