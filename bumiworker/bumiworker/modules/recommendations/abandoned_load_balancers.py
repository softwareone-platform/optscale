from collections import OrderedDict
from datetime import timedelta
from optscale_client.metroculus_client.client import Client as MetroculusClient
from tools.optscale_time.optscale_time import utcnow, utcnow_timestamp
from bumiworker.bumiworker.modules.abandoned_base import AbandonedBase

DEFAULT_DAYS_THRESHOLD = 7
SUPPORTED_CLOUD_TYPES = [
    "azure_cnr", "aws_cnr"
]


class AbandonedLBs(AbandonedBase):
    def __init__(self, organization_id, config_client, created_at):
        super().__init__(organization_id, config_client, created_at)
        self.option_ordered_map = OrderedDict({
            "days_threshold": {
                "default": DEFAULT_DAYS_THRESHOLD},
            "bytes_sent_threshold": {"default": 0},
            "packets_sent_threshold": {"default": 0},
            "requests_threshold": {"default": 0},
            "excluded_pools": {
                "default": {},
                "clean_func": self.clean_excluded_pools,
            },
            "skip_cloud_accounts": {"default": []}
        })
        self._metroculus_cl = None

    @property
    def metroculus_cl(self):
        if self._metroculus_cl is None:
            self._metroculus_cl = MetroculusClient(
                url=self.config_cl.metroculus_url(),
                secret=self.config_cl.cluster_secret(),
                verify=False)
        return self._metroculus_cl

    @staticmethod
    def _get_thresholds(bytes_sent_threshold, packets_sent_threshold,
                        requests_threshold):
        return {
            "bytes_sent": bytes_sent_threshold,
            "packets_sent": packets_sent_threshold,
            "requests": requests_threshold
        }

    def _are_below_metrics(self, cloud_account_id, lb_id, start_date,
                           thresholds_map):
        _, response = self.metroculus_cl.get_metrics(
            cloud_account_id, lb_id, int(start_date.timestamp()),
            utcnow_timestamp())
        for metric in thresholds_map:
            metrics = response.get(metric, [])
            if metrics and any([x.get("value", 0) > thresholds_map[metric]
                                for x in metrics]):
                return False
        return True

    def _get(self):
        (days_threshold, bytes_sent_threshold, packets_sent_threshold,
         requests_threshold, excluded_pools, skip_cloud_accounts
         ) = self.get_options_values()
        cloud_account_map = self.get_cloud_accounts(
            SUPPORTED_CLOUD_TYPES, skip_cloud_accounts)
        cloud_accounts = list(cloud_account_map.values())
        cloud_accounts_ids = list(cloud_account_map.keys())
        starting_point = utcnow() - timedelta(days=days_threshold)
        employees = self.get_employees()
        pools = self.get_pools()
        lbs_by_account = self.get_active_resources(
            cloud_accounts_ids, starting_point, "Load Balancer")

        result = []
        for account in cloud_accounts:
            resources_map = {}
            cloud_account_id = account["id"]
            account_lbs = lbs_by_account[cloud_account_id]
            if account_lbs:
                thresholds_map = self._get_thresholds(
                    bytes_sent_threshold, packets_sent_threshold,
                    requests_threshold)
                for lb in account_lbs:
                    lb_id = lb["_id"]
                    if not self._are_below_metrics(
                            cloud_account_id, lb_id, starting_point,
                            thresholds_map):
                        continue
                    resources_map[lb_id] = lb
                expenses = self.get_month_saving_by_daily_avg_expenses(
                    list(resources_map.keys()), starting_point)

                for res_id, resource in resources_map.items():
                    saving = expenses.get(res_id, 0)
                    if saving > 0:
                        result.append({
                            "cloud_resource_id": resource["cloud_resource_id"],
                            "resource_name": resource.get("name"),
                            "resource_id": res_id,
                            "cloud_account_id": resource["cloud_account_id"],
                            "cloud_account_name": account["name"],
                            "cloud_type": account["type"],
                            "saving": saving,
                            "owner": self._extract_owner(
                                resource.get("employee_id"), employees),
                            "pool": self._extract_pool(
                                resource.get("pool_id"), pools),
                            "is_excluded": resource.get(
                                "pool_id") in excluded_pools,
                        })
        return result


def main(organization_id, config_client, created_at, **kwargs):
    return AbandonedLBs(organization_id, config_client, created_at).get()


def get_module_email_name():
    return "Abandoned Load Balancers"
