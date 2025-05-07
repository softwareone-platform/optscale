import logging
from pymongo import MongoClient
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from diworker.diworker.importers.factory import get_importer_class
import clickhouse_connect

LOG = logging.getLogger(__name__)


class Regenerator:
    def __init__(self, config_cl):
        self.config_cl = config_cl
        self._rest_cl = None
        self._mongo_cl = None
        self._clickhouse_cl = None

    @property
    def rest_cl(self):
        if self._rest_cl is None:
            self._rest_cl = RestClient(
                url=self.config_cl.restapi_url(), verify=False)
            self._rest_cl.secret = self.config_cl.cluster_secret()
        return self._rest_cl

    @property
    def mongo_cl(self):
        if self._mongo_cl is None:
            mongo_params = self.config_cl.mongo_params()
            self._mongo_cl = MongoClient(mongo_params[0])
        return self._mongo_cl

    @property
    def clickhouse_cl(self):
        if not self._clickhouse_cl:
            user, password, host, db_name, port, secure = (
                self.config_cl.clickhouse_params())
            self._clickhouse_cl = clickhouse_connect.get_client(
                host=host, password=password, database=db_name, user=user,
                port=port, secure=secure)
        return self._clickhouse_cl

    def drop_expenses(self, cloud_account_id):
        self.clickhouse_cl.query(
            'ALTER TABLE expenses DELETE WHERE cloud_account_id=%(ca_id)s',
            parameters={'ca_id': cloud_account_id})
        self.clickhouse_cl.query('OPTIMIZE TABLE expenses FINAL')

    def regenerate_expenses(self):
        mongo_raw = self.mongo_cl.restapi['raw_expenses']
        current_cloud_account_id = None
        try:
            _, org_list = self.rest_cl.organization_list()
            cloud_account_ids = []
            for org in org_list['organizations']:
                LOG.info('Re-generating clean expenses for {} ({})'.format(
                    org['name'], org['id']))
                _, ca_list = self.rest_cl.cloud_account_list(org['id'])
                for cloud_acc in ca_list['cloud_accounts']:
                    current_cloud_account_id = cloud_acc['id']
                    cloud_account_ids.append(current_cloud_account_id)
                    parameters = dict(
                        cloud_account_id=current_cloud_account_id,
                        rest_cl=self.rest_cl,
                        config_cl=self.config_cl,
                        mongo_raw=mongo_raw,
                        mongo_resources=self.mongo_cl.restapi['resources'],
                        clickhouse_cl=self.clickhouse_cl,
                        recalculate=True
                    )
                    self.drop_expenses(cloud_acc['id'])
                    if cloud_acc['type'] == 'azure_cnr':
                        parameters['detect_period_start'] = False
                    export_scheme = cloud_acc['config'].get(
                        'expense_import_scheme')
                    importer = get_importer_class(
                        cloud_acc['type'], export_scheme)(**parameters)
                    importer.generate_clean_records(regeneration=True)
        except Exception as ex:
            LOG.error('Failed to re-generate: cloud_account_id: %s, error: %s'
                      % (current_cloud_account_id, str(ex)))
            raise
        LOG.info('Re-generation finished')
