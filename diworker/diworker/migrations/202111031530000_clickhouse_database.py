from diworker.diworker.migrations.base import BaseMigration
import clickhouse_connect


"""
Adds a clickhouse database for expenses.
"""


class Migration(BaseMigration):
    def _get_clickhouse_client(self):
        user, password, host, db_name, port, secure = (
            self.config_cl.clickhouse_params())
        return clickhouse_connect.get_client(
                host=host, password=password, database=db_name, user=user,
                port=port, secure=secure)

    def upgrade(self):
        clickhouse_client = self._get_clickhouse_client()
        clickhouse_client.query(
            """
            CREATE TABLE expenses (
                cloud_account_id String,
                resource_id String,
                date DateTime,
                cost Float64,
                sign Int8)
            ENGINE = CollapsingMergeTree(sign)
            PARTITION BY toYYYYMM(date)
            ORDER BY (cloud_account_id, date, resource_id)
            """)

    def downgrade(self):
        clickhouse_client = self._get_clickhouse_client()
        clickhouse_client.query('DROP TABLE IF EXISTS expenses')
