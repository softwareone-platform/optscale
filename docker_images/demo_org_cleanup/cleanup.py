import logging
import os
from datetime import timedelta, datetime, timezone

from requests import HTTPError
from pymongo import MongoClient
from pymongo.errors import PyMongoError

from optscale_client.config_client.client import Client as ConfigClient
from optscale_client.rest_api_client.client_v2 import Client as RestClient

LOG = logging.getLogger(__name__)

DEFAULT_DEMO_ORG_LIFETIME_HRS = 168
RESTAPI_DB_NAME = 'restapi'


def get_mongo_client(config_cl):
    url, _ = config_cl.mongo_params()
    client = MongoClient(url)
    return client[RESTAPI_DB_NAME]


def main(config_cl):
    rest_cl = RestClient(url=config_cl.restapi_url(), verify=False)
    rest_cl.secret = config_cl.cluster_secret()

    params = config_cl.read_branch('/demo_org_cleanup')
    raw_lifetime_hrs = params.get("demo_org_lifetime_hrs")

    try:
        lifetime_hrs = int(raw_lifetime_hrs)
        LOG.info("Using demo_org_lifetime_hrs = %s", lifetime_hrs)
    except (TypeError, ValueError):
        LOG.info("Using default demo_org_lifetime_hrs = %s (got: %r)",
                 DEFAULT_DEMO_ORG_LIFETIME_HRS, raw_lifetime_hrs)
        lifetime_hrs = DEFAULT_DEMO_ORG_LIFETIME_HRS

    mongo_db = get_mongo_client(config_cl)
    demo_collection = mongo_db['live_demos']

    _, response = rest_cl.organization_list({'is_demo': True})
    old_org_ts = int((datetime.now(tz=timezone.utc) - timedelta(
        hours=lifetime_hrs)).timestamp())
    for org in response['organizations']:
        if org['created_at'] > old_org_ts:
            continue
        org_id = org['id']
        try:
            # Delete from REST API
            rest_cl.organization_delete(org_id)
            LOG.info('Demo organization %s deleted from REST API',
                     org_id)
        except HTTPError as exc:
            LOG.error('Failed to delete org %s: (%s): %s',
                      org_id, exc, exc.response.text)

        try:
            # Delete from MongoDB
            result = demo_collection.delete_many({'organization_id': org_id})
            if result.deleted_count > 0:
                LOG.info('Deleted %d MongoDB live_demos entries for org %s',
                         result.deleted_count, org_id)
        except PyMongoError as e:
            LOG.error('MongoDB cleanup failed for org %s: %s',
                      org_id, str(e))


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    config_cl = ConfigClient(
        host=os.environ.get('HX_ETCD_HOST'),
        port=int(os.environ.get('HX_ETCD_PORT')),
    )
    config_cl.wait_configured()
    main(config_cl)
