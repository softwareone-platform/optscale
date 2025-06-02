import logging
import os
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from optscale_client.config_client.client import Client as ConfigClient
from optscale_client.rest_api_client.client_v2 import Client as RestClient

DEFAULT_ETCD_HOST = 'etcd'
DEFAULT_ETCD_PORT = 80
DEFAULT_DAYS_LIMIT = 30
LOG = logging.getLogger(__name__)


def _get_session_to_auth_db(config_cl):
    user, password, host, db_name = config_cl.auth_db_params()
    auth_url = 'mysql+mysqlconnector://%s:%s@%s/%s?charset=utf8mb4' % (
        user, password, host, db_name)
    engine = create_engine(auth_url, encoding='utf-8')
    return sessionmaker(bind=engine)()


def _get_session_to_my_db(config_cl):
    user, password, host, db_name = config_cl.rest_db_params()
    mydb_url = 'mysql+mysqlconnector://%s:%s@%s/%s?charset=utf8mb4' % (
        user, password, host, db_name)
    engine = create_engine(mydb_url, encoding='utf-8')
    return sessionmaker(bind=engine)()


def _get_organization_employees_map(mydb):
    query = """
        SELECT org_t.id, empl_t.auth_user_id
            FROM (
                SELECT id
                FROM organization
                WHERE deleted_at = 0 and is_demo = 0 and disabled is null
            ) AS org_t
            LEFT JOIN (
                SELECT auth_user_id, organization_id
                FROM employee
                WHERE deleted_at = 0
            ) AS empl_t ON org_t.id = empl_t.organization_id
        WHERE empl_t.auth_user_id IS NOT NULL
    """
    query_result = mydb.execute(query)
    result = defaultdict(list)
    for q in query_result:
        result[q[0]].append(q[1])
    return result


def _check_recent_tokens(auth, user_ids, days_limit):
    if not user_ids:
        return []
    user_ids_str = "', '".join(user_ids)
    inactive_period = datetime.now(
        tz=timezone.utc) - timedelta(days=days_limit)
    auth_query = f'''
        SELECT 1
        FROM token
        WHERE user_id in ('{user_ids_str}')
            AND valid_until >= TIMESTAMP('{inactive_period}')
        LIMIT 1
    '''
    query_result = auth.execute(auth_query)
    return list(query_result)


def main(config_cl):
    start_date = datetime.now()
    params = config_cl.read_branch('/deactivatorg')
    if params.get('enable') == "False":
        return
    days_limit = params.get('days_limit') or DEFAULT_DAYS_LIMIT
    auth_cl = _get_session_to_auth_db(config_cl)
    mydb_cl = _get_session_to_my_db(config_cl)
    org_empl_map = _get_organization_employees_map(mydb_cl)
    _rest_cl = RestClient(
        url=config_cl.restapi_url(),
        secret=config_cl.cluster_secret(),
        verify=False)
    counts = defaultdict(int)
    for org_id, empl_ids in org_empl_map.items():
        if _check_recent_tokens(auth_cl, empl_ids, int(days_limit)):
            continue
        try:
            _rest_cl.organization_update(
                org_id, {'disabled': True, 'disable_type': 'soft'})
            counts['success'] += 1
        except Exception as ex:
            counts['error'] += 1
            LOG.error('Error while disabling organization %s: %s',
                      org_id, str(ex))
    LOG.info('Processed %s organizations (%s disabled, %s errors) for '
             '%s seconds', len(org_empl_map.keys()), counts['success'],
             counts['error'], (datetime.now() - start_date).total_seconds())


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    etcd_host = os.environ.get('HX_ETCD_HOST', DEFAULT_ETCD_HOST)
    etcd_port = os.environ.get('HX_ETCD_PORT', DEFAULT_ETCD_PORT)
    config_client = ConfigClient(host=etcd_host, port=int(etcd_port))
    config_client.wait_configured()
    main(config_client)
