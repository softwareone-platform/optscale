import logging
from pymongo import UpdateOne
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from diworker.diworker.migrations.base import BaseMigration
"""
Change resource type and name for Marketplace Purchase resource
"""
CHUNK_SIZE = 1000
LOG = logging.getLogger(__name__)


class Migration(BaseMigration):
    @property
    def mongo_resources(self):
        return self.db.resources

    @property
    def rest_cl(self):
        if self._rest_cl is None:
            self._rest_cl = RestClient(
                url=self.config_cl.restapi_url(),
                secret=self.config_cl.cluster_secret())
        return self._rest_cl

    def get_cloud_accs(self):
        cloud_accounts_ids = set()
        _, organizations = self.rest_cl.organization_list({
            "with_connected_accounts": True, "is_demo": False})
        for org in organizations["organizations"]:
            _, accounts = self.rest_cl.cloud_account_list(
                org['id'], type="azure_cnr")
            for cloud_account in accounts["cloud_accounts"]:
                if cloud_account["auto_import"]:
                    cloud_accounts_ids.add(cloud_account["id"])
        return cloud_accounts_ids

    def upgrade(self):
        resource_type = "Marketplace Purchase"
        cloud_accs = self.get_cloud_accs()
        updates = []
        for i, cloud_acc_id in enumerate(list(cloud_accs)):
            LOG.info("Starting processing for cloud account %s (%s/%s)" % (
                cloud_acc_id, i + 1, len(cloud_accs)))
            raw_exp = self.db.raw_expenses.find({
                "cloud_account_id": cloud_acc_id,
                "charge_type": "Purchase",
                "publisher_type": "Marketplace"
            }, {"resource_id": 1, "plan_name": 1, "part_number": 1,
                "start_date": 1, "meter_details": 1})
            resource_data = {}
            for res in raw_exp:
                if "plan_name" in res:
                    part = res["plan_name"]
                else:
                    part = res["meter_details"].get("meter_name", "")
                resource_data[res["resource_id"]] = (
                    part, res.get("part_number", ""),
                    res["start_date"].replace(day=1).strftime("%Y-%m-%d")
                )
            resources = self.db.resources.find({
                "cloud_account_id": cloud_acc_id,
                "cloud_resource_id": {"$in": list(resource_data)}
            }, {"_id": 1, "cloud_resource_id": 1})
            for resource in resources:
                if len(updates) >= CHUNK_SIZE:
                    self.mongo_resources.bulk_write(updates)
                    updates = []
                r_data = resource_data[resource["cloud_resource_id"]]
                r_name = f"{r_data[0]} ({r_data[1]}) {r_data[2]}"
                updates.append(UpdateOne(
                    filter={"_id": resource["_id"]},
                    update={"$set": {"name": r_name,
                                     "resource_type": resource_type}}))
        if updates:
            self.mongo_resources.bulk_write(updates)

    def downgrade(self):
        pass
