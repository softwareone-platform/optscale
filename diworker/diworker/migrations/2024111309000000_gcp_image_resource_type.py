import logging
from pymongo import UpdateOne
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from diworker.diworker.migrations.base import BaseMigration
"""
Change resource type from "Bucket" to "Image" for GCP images
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
            self.mongo_resources.update_many({
                "cloud_account_id": cloud_acc_id,
                "resource_type": "Bucket",
                "name": {"$regex": "Storage(.*) Image(.*)"}
            }, {"$set": {"resource_type": "Image"}})

    def downgrade(self):
        pass
