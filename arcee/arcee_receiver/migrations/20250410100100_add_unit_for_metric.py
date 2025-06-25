from mongodb_migrations.base import BaseMigration


class Migration(BaseMigration):

    def upgrade(self):
        self.db.metric.update_many({}, {"$set": {"unit": ""}})

    def downgrade(self):
        pass
