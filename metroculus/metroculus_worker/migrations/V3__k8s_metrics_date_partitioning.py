import logging
from metroculus.metroculus_worker.migrations.base import MigrationBase


LOG = logging.getLogger(__name__)


class Migration(MigrationBase):
    def create_new_table(self):
        query = """CREATE TABLE k8s_metrics_new (
                     cloud_account_id String,
                     resource_id String,
                     date DateTime,
                     pod_cpu_average_usage Float32,
                     pod_memory_average_usage Float32,
                     pod_cpu_provision Float32,
                     pod_cpu_requests Float32,
                     pod_memory_provision Float32,
                     pod_memory_requests Float32,
                     namespace_cpu_provision_used Float32,
                     namespace_memory_provision_used Float32,
                     namespace_quota_cpu_provision_hard Float32,
                     namespace_quota_memory_provision_hard Float32,
                     namespace_quota_cpu_provision_medium Float32,
                     namespace_quota_memory_provision_medium Float32,
                     namespace_quota_cpu_provision_low Float32,
                     namespace_quota_memory_provision_low Float32,
                     namespace_cpu_requests_used Float32,
                     namespace_memory_requests_used Float32,
                     namespace_quota_cpu_requests_hard Float32,
                     namespace_quota_memory_requests_hard Float32,
                     namespace_quota_cpu_requests_medium Float32,
                     namespace_quota_memory_requests_medium Float32,
                     namespace_quota_cpu_requests_low Float32,
                     namespace_quota_memory_requests_low Float32)
                   ENGINE = MergeTree
                   PARTITION BY toYYYYMM(date)
                   ORDER BY (cloud_account_id, resource_id, date)"""
        self.clickhouse_client.query(query)

    def insert_data(self):
        LOG.info("Start inserting data")
        self.clickhouse_client.query(
            """INSERT INTO k8s_metrics_new SELECT * FROM k8s_metrics""")
        LOG.info("Done inserting data")

    def rename_new_table(self):
        LOG.info("Dropping k8s_metrics table")
        self.clickhouse_client.query("""DROP TABLE k8s_metrics""")
        LOG.info("Renaming table: k8s_metrics_new -> k8s_metrics")
        self.clickhouse_client.query(
            """RENAME TABLE k8s_metrics_new TO k8s_metrics""")

    def upgrade(self):
        tables = [
            x[0] for x in self.clickhouse_client.query("""SHOW TABLES""").result_rows
        ]
        if 'k8s_metrics_new' in tables and 'k8s_metrics' in tables:
            self.clickhouse_client.query("""DROP TABLE k8s_metrics_new""")
        self.create_new_table()
        self.insert_data()
        self.rename_new_table()
