import logging
from pymongo import UpdateOne, DeleteOne
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from diworker.diworker.migrations.base import BaseMigration
"""
Fix resource type and cloud_resource_id for Alibaba load balancer resources
"""
CHUNK_SIZE = 500
RESOURCE_TYPE = "Load Balancer"
LOG = logging.getLogger(__name__)


class Migration(BaseMigration):
    @property
    def mongo_resources(self):
        return self.db.resources

    @property
    def mongo_expenses(self):
        return self.db.raw_expenses

    @property
    def rest_cl(self):
        if self._rest_cl is None:
            self._rest_cl = RestClient(
                url=self.config_cl.restapi_url(),
                secret=self.config_cl.cluster_secret())
        return self._rest_cl

    def _get_cloud_accs(self):
        cloud_accounts_ids = set()
        _, organizations = self.rest_cl.organization_list({
            "with_connected_accounts": True, "is_demo": False})
        for org in organizations["organizations"]:
            _, accounts = self.rest_cl.cloud_account_list(
                org['id'], type="alibaba_cnr")
            for cloud_account in accounts["cloud_accounts"]:
                if cloud_account["auto_import"]:
                    cloud_accounts_ids.add(cloud_account["id"])
        return cloud_accounts_ids

    def _fix_resource_type(self, cloud_acc_id):
        self.mongo_resources.update_many(
            filter={"cloud_account_id": cloud_acc_id,
                    "service_name": "Server Load Balancer"},
            update={"$set": {"resource_type": RESOURCE_TYPE}})

    def _fix_cloud_resource_id(self, cloud_acc_id):
        # change resources ids like `alb-je90kfn1q2wc8tszw1;eu-central-1` to
        # `alb-je90kfn1q2wc8tszw1`
        lbs = self.mongo_resources.find(
            {
                "cloud_account_id": cloud_acc_id,
                "resource_type": RESOURCE_TYPE,
            },
            {"cloud_resource_id": 1}
        )
        lb_res_ids_map = {x["cloud_resource_id"]: x["_id"] for x in lbs}
        LOG.error(f"Found {len(lb_res_ids_map)} resources for {cloud_acc_id}")
        res_updates = []
        for old_cloud_res_id, _id in lb_res_ids_map.items():
            if not old_cloud_res_id or ';' not in old_cloud_res_id:
                continue
            new_id = old_cloud_res_id.split(";")[0]
            if new_id in lb_res_ids_map:
                continue
            self.mongo_expenses.update_many(
                filter={"cloud_account_id": cloud_acc_id,
                        "resource_id": old_cloud_res_id},
                update={"$set": {"resource_id": new_id}}
            )
            res_updates.append(UpdateOne(
                {"_id": _id},
                {"$set": {"cloud_resource_id": new_id}}))
        if res_updates:
            self.mongo_resources.bulk_write(res_updates)

    def upgrade(self):
        cloud_accs = self._get_cloud_accs()
        for i, cloud_acc_id in enumerate(list(cloud_accs)):
            LOG.info("Starting processing for cloud account %s (%s/%s)" % (
                cloud_acc_id, i + 1, len(cloud_accs)))
            self._fix_resource_type(cloud_acc_id)
            self._fix_cloud_resource_id(cloud_acc_id)

    def downgrade(self):
        pass
