from mongodb_migrations.base import BaseMigration


class Migration(BaseMigration):

    def upgrade(self):
        self.db.template.update_many({"max_runner_num": {"$exists": False},
                                      "deleted_at": 0},
                                     {"$set": {"max_runner_num": 15}})

    def downgrade(self):
        pass
