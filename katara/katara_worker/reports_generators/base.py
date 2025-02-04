import os
from currency_symbols.currency_symbols import CURRENCY_SYMBOLS_MAP
from optscale_client.auth_client.client_v2 import Client as AuthClient
from optscale_client.rest_api_client.client_v2 import Client as RestClient


MODULE_NAME_EMAIL_TEMPLATE = {
    'organization_expenses': 'weekly_expense_report',
    'pool_limit_exceed': 'pool_exceed_report',
    'pool_limit_exceed_resources': 'pool_exceed_resources_report',
    'violated_constraints': 'resource_owner_violation_report',
    'violated_constraints_diff': 'pool_owner_violation_report'
}


class Base(object):
    def __init__(self, organization_id, report_data, config_client):
        self.organization_id = organization_id
        self.report_data = report_data
        self.config_cl = config_client
        self._rest_cl = None
        self._auth_cl = None

    @property
    def rest_cl(self):
        if self._rest_cl is None:
            self._rest_cl = RestClient(
                url=self.config_cl.restapi_url(), verify=False)
            self._rest_cl.secret = self.config_cl.cluster_secret()
        return self._rest_cl

    @property
    def auth_cl(self):
        if self._auth_cl is None:
            self._auth_cl = AuthClient(
                url=self.config_cl.auth_url(), verify=False)
            self._auth_cl.secret = self.config_cl.cluster_secret()
        return self._auth_cl

    @staticmethod
    def get_currency_code(currency):
        return CURRENCY_SYMBOLS_MAP.get(currency, '')

    @staticmethod
    def get_template_type(path):
        return MODULE_NAME_EMAIL_TEMPLATE[(os.path.splitext(
            os.path.basename(path)))[0]]
