import logging
from pymongo import UpdateOne
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from diworker.diworker.migrations.base import BaseMigration
"""
Change resource type for "Compute Engine" GCP resources
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
                org['id'], type="gcp_cnr")
            for cloud_account in accounts["cloud_accounts"]:
                if cloud_account["auto_import"]:
                    cloud_accounts_ids.add(cloud_account["id"])
        return cloud_accounts_ids

    def upgrade(self):
        cloud_accs = self.get_cloud_accs()
        for i, cloud_acc_id in enumerate(list(cloud_accs)):
            LOG.info("Starting processing for cloud account %s (%s/%s)" % (
                cloud_acc_id, i + 1, len(cloud_accs)))
            updates = []
            resources = self.mongo_resources.find({
                "cloud_account_id": cloud_acc_id,
                "resource_type": "Compute Engine",
                "active": {"$exists": False}
            })
            for resource in resources:
                if len(updates) >= CHUNK_SIZE:
                    self.mongo_resources.bulk_write(updates)
                    updates.clear()
                name = resource.get("name", "").lower()
                resource_hash = resource.get("cloud_resource_hash")
                if resource_hash and "network" in name or (
                        "ip charge on" in name):
                    updates.append(UpdateOne(
                        filter={"_id": resource["_id"]},
                        update={"$set": {"resource_type": "Instance"}}
                    ))
                elif 'ip charge' in name:
                    updates.append(UpdateOne(
                        filter={"_id": resource["_id"]},
                        update={"$set": {"resource_type": "IP Address"}}
                    ))
            if updates:
                self.mongo_resources.bulk_write(updates)

    def downgrade(self):
        pass
