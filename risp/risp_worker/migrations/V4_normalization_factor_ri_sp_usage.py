import logging
from collections import defaultdict

from migrate.migrators.clickhouse import MigrationBase

from optscale_client.rest_api_client.client_v2 import Client as RestClient

# TODO: This migration won't work as it relies on mongo_client AND the rest_api client

LOG = logging.getLogger(__name__)


class Migration(MigrationBase):

    def update_table(self):
        # default value is 0
        self.clickhouse_client.query(
            """ALTER TABLE ri_sp_usage ADD COLUMN
            IF NOT EXISTS ri_norm_factor FLOAT AFTER usage""")

    def get_resources_dates(self, cloud_account_id):
        result = defaultdict(lambda: defaultdict(set))
        # normalization factor is used in RI, so it doesn't matter for rows
        # with 'sp' type
        data_q = self.clickhouse_client.query(
            """SELECT DISTINCT resource_id, date, offer_id FROM ri_sp_usage
            WHERE cloud_account_id=%(cloud_account_id)s
            AND ri_norm_factor=0 AND offer_type='ri'""",
            parameters={"cloud_account_id": cloud_account_id})
        for res_data in data_q.result_rows:
            resource_id, date, offer_id = res_data
            result[resource_id][offer_id].add(date)
        return result

    def update_ch_expenses(self, cloud_account_id, data):
        exp_to_add = []
        column_names = [
            'cloud_account_id', 'resource_id', 'offer_type',
            'date', 'offer_id', 'offer_cost', 'on_demand_cost',
            'usage', 'ri_norm_factor', 'sign'
        ]
        for exp_data in data:
            resource_id, offer_id, date, factor = exp_data
            ch_expenses_q = self.clickhouse_client.query(
                """SELECT sum(offer_cost * sign),
                    sum(on_demand_cost * sign), sum(usage * sign)
                FROM ri_sp_usage
                WHERE cloud_account_id=%(cloud_account_id)s
                AND resource_id=%(resource_id)s AND offer_type='ri'
                AND date=%(start_date)s AND ri_norm_factor=0""",
                parameters={
                    "cloud_account_id": cloud_account_id,
                    "resource_id": resource_id,
                    "start_date": date
                })

            for expense in ch_expenses_q.result_rows:
                offer_cost, on_demand_cost, usage = expense

                exp = [
                    cloud_account_id,
                    resource_id,
                    'ri',
                    date,
                    offer_id,
                    offer_cost,
                    on_demand_cost,
                    usage,
                    0,
                    1
                ]

                neg_exp = exp.copy()
                neg_exp[9] = -1
                exp_to_add.append(neg_exp)

                exp[8] = factor
                exp_to_add.append(exp)

        self.clickhouse_client.insert(
            "ri_sp_usage", exp_to_add, column_names=column_names)

    def fill_norm_factor(self):
        rest_cl = RestClient(
            url=self.config_client.restapi_url(),
            secret=self.config_client.cluster_secret())
        _, orgs = rest_cl.organization_list({'is_demo': False})
        organizations = orgs['organizations']
        for i, org in enumerate(organizations):
            org_id = org['id']
            LOG.info('Start processing for organization %s (%s/%s)',
                     org_id, i + 1, len(organizations))
            _, cloud_accs = rest_cl.cloud_account_list(org_id, type='aws_cnr')
            cloud_accounts = cloud_accs['cloud_accounts']
            for j, cloud_account in enumerate(cloud_accounts):
                cloud_account_id = cloud_account['id']
                LOG.info('Start processing for cloud account %s (%s/%s)',
                         cloud_account_id, j + 1, len(cloud_accounts))
                ch_expenses = []
                res_id_date_map = self.get_resources_dates(cloud_account_id)
                LOG.info('Found %s resources with RI expenses',
                         len(dict(res_id_date_map)))
                for resource_id, data in res_id_date_map.items():
                    dates = set(v for values in data.values() for v in values)
                    offer_ids = list(data.keys())
                    expenses = self.mongo_client.restapi.raw_expenses.find({
                        'cloud_account_id': cloud_account_id,
                        'resource_id': resource_id,
                        'start_date': {'$in': list(dates)},
                        'lineItem/LineItemType': 'DiscountedUsage',
                        'lineItem/UsageStartDate': {'$exists': True}
                    }, {'start_date': 1, 'lineItem/NormalizationFactor': 1,
                        'reservation/ReservationARN': 1})
                    for expense in expenses:
                        ri_id = expense['reservation/ReservationARN']
                        start_date = expense['start_date']
                        # lineItem/NormalizationFactor is missing for
                        # RDS instances
                        factor = float(
                            expense.get('lineItem/NormalizationFactor', 1))
                        for offer_id in offer_ids:
                            if (offer_id in ri_id and
                                    start_date in data[offer_id]):
                                ch_expenses.append((
                                    resource_id, offer_id, start_date, factor))
                if ch_expenses:
                    self.update_ch_expenses(cloud_account_id, ch_expenses)
                    self.clickhouse_client.query(
                        """OPTIMIZE TABLE ri_sp_usage FINAL""")

    def upgrade(self):
        self.update_table()
        self.fill_norm_factor()
