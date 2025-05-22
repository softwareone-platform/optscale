from mongodb_migrations.base import BaseMigration


class Migration(BaseMigration):
    def upgrade(self):
        self.db.runset.update_many(
            {"spot_settings": None},
            {"$set": {"spot_settings": {}}}
        )
        self.db.runset.update_many(
            {"image": None},
            {"$set": {"image": ""}}
        )

    def downgrade(self):
        pass
