""""encode_env_properties_for_not_shareable"

Revision ID: 8992bafc1505
Revises: 18ff48efa898
Create Date: 2022-11-25 12:16:13.012984

"""
import os
import base64
import binascii
from pymongo import MongoClient, UpdateOne
from optscale_client.config_client.client import Client as EtcdClient

# revision identifiers, used by Alembic.
revision = '8992bafc1505'
down_revision = '18ff48efa898'
branch_labels = None
depends_on = None


DEFAULT_ETCD_HOST = 'etcd'
DEFAULT_ETCD_PORT = 80
CHUNK_SIZE = 200


def encode_string(val, decode):
    if len(val) == 0:
        return val
    method = base64.b64decode if decode else base64.b64encode
    return method(val.encode('utf-8')).decode('utf-8')


def encoded_map(map_, decode):
    if not map_:
        return {}
    new_map = {}
    for k, v in map_.items():
        new_key = encode_string(k, decode)
        new_map[new_key] = v
    return new_map


def get_etcd_config_client():
    etcd_host = os.environ.get('HX_ETCD_HOST', DEFAULT_ETCD_HOST)
    etcd_port = os.environ.get('HX_ETCD_PORT', DEFAULT_ETCD_PORT)
    config_cl = EtcdClient(host=etcd_host, port=int(etcd_port))
    return config_cl


def get_mongo_client():
    config_cl = get_etcd_config_client()
    mongo_params = config_cl.mongo_params()
    mongo_client = MongoClient(mongo_params[0])
    return mongo_client


def get_resources_collection():
    return get_mongo_client().restapi.resources


def resources_with_env_properties():
    resources_collection = get_resources_collection()
    res_filters = {
        'deleted_at': 0,
        'env_properties': {'$exists': True},
    }
    return resources_collection.find(res_filters, ['_id', 'env_properties'])


def upgrade():
    resources_collection = get_resources_collection()
    update_requests = []
    for res in resources_with_env_properties():
        env_properties = res.get('env_properties')
        try:
            env_properties = encoded_map(env_properties, decode=True)
        except (UnicodeDecodeError, binascii.Error):
            env_properties = encoded_map(env_properties, decode=False)
            update_requests.append(UpdateOne(
                filter={'_id': res['_id']},
                update={'$set': {'env_properties': env_properties}},
            ))
        if len(update_requests) == CHUNK_SIZE:
            resources_collection.bulk_write(update_requests)
            update_requests = []
    if len(update_requests) > 0:
        resources_collection.bulk_write(update_requests)


def downgrade():
    pass
