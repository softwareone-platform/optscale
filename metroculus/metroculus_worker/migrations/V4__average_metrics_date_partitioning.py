import logging
from metroculus.metroculus_worker.migrations.base import MigrationBase


LOG = logging.getLogger(__name__)


class Migration(MigrationBase):
    def create_new_table(self):
        query = """CREATE TABLE average_metrics_new (
                     cloud_account_id String,
                     resource_id String,
                     date DateTime,
                     metric Enum8('cpu' = 1, 'ram' = 2, 'disk_read_io' = 3,
                       'disk_write_io' = 4, 'network_in_io' = 5,
                       'network_out_io' = 6),
                     value Float32)
                   ENGINE = MergeTree
                   PARTITION BY toYYYYMM(date)
                   ORDER BY (cloud_account_id, resource_id, date)"""
        self.clickhouse_client.query(query)

    def insert_data(self):
        LOG.info("Start inserting data")
        self.clickhouse_client.query(
            """INSERT INTO average_metrics_new SELECT * FROM average_metrics"""
        )
        LOG.info("Done inserting data")

    def rename_new_table(self):
        LOG.info("Dropping average_metrics table")
        self.clickhouse_client.query("""DROP TABLE average_metrics""")
        LOG.info("Renaming table: average_metrics_new -> average_metrics")
        self.clickhouse_client.query(
            """RENAME TABLE average_metrics_new TO average_metrics""")

    def upgrade(self):
        tables = [
            x[0] for x in self.clickhouse_client.query("""SHOW TABLES""").result_rows
        ]
        if 'average_metrics_new' in tables and 'average_metrics' in tables:
            self.clickhouse_client.query(
                """DROP TABLE average_metrics_new""")
        self.create_new_table()
        self.insert_data()
        self.rename_new_table()
