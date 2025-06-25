from mongodb_migrations.base import BaseMigration


INDEX_NAME = 'StartedRuns'
INDEX_FIELDS = ['task_id', 'start']
PARTIAL_FILTER_EXP = {
    "state": 1,
    "finish": None,
    "deleted_at": 0,
}


class Migration(BaseMigration):
    def existing_indexes(self):
        return [x['name'] for x in self.db.run.list_indexes()]

    def upgrade(self):
        if INDEX_NAME not in self.existing_indexes():
            self.db.run.create_index(
                    [(key, 1) for key in INDEX_FIELDS],
                    name=INDEX_NAME,
                    partialFilterExpression=PARTIAL_FILTER_EXP,
                    background=True
                )

    def downgrade(self):
        if INDEX_NAME in self.existing_indexes():
            self.db.run.drop_index(INDEX_NAME)
