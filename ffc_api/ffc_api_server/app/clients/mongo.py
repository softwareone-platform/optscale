from pymongo import AsyncMongoClient, MongoClient
from pymongo.asynchronous.collection import AsyncCollection

from ffc_api.ffc_api_server.app.conf import get_settings

_mongo_client = None
_async_mongo_client = None


def get_mongo_client():
    global _mongo_client
    if _mongo_client is None:
        settings = get_settings()
        _mongo_client = MongoClient(settings.mongo_url)
    return _mongo_client


def get_async_mongo_client() -> AsyncMongoClient:
    global _async_mongo_client
    if _async_mongo_client is None:
        settings = get_settings()
        _async_mongo_client = AsyncMongoClient(settings.mongo_url)
    return _async_mongo_client


def get_keeper_events_collection() -> AsyncCollection:
    """The collection where keeper (report server) stores the organization events"""
    return get_async_mongo_client()[get_settings().mongo_db].event
