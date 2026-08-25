from pymongo import MongoClient

from ffc_api.ffc_api_server.app.conf import get_settings

_mongo_client = None


def get_mongo_client():
    global _mongo_client
    if _mongo_client is None:
        settings = get_settings()
        _mongo_client = MongoClient(settings.mongo_url)
    return _mongo_client
