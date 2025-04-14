from metroculus.metroculus_worker.migrations.base import MigrationBase


class Migration(MigrationBase):
    def upgrade(self):
        self.clickhouse_client.query(
            """ALTER TABLE average_metrics MODIFY COLUMN
               metric Enum8('cpu' = 1, 'ram' = 2, 'disk_read_io' = 3,
                            'disk_write_io' = 4, 'network_in_io' = 5,
                            'network_out_io' = 6, 'bytes_sent' = 7,
                            'packets_sent' = 8)"""
        )
