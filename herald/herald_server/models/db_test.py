from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool

from herald.herald_server.models.db_base import BaseDB


class TestDB(BaseDB):
    __test__ = False  # avoid PytestCollectionWarning

    def _get_engine(self):
        return create_engine("sqlite://", poolclass=StaticPool, connect_args={"check_same_thread": False})

    def create_schema(self):
        self.create_all()
