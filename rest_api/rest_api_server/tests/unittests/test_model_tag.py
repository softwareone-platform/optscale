import unittest

from rest_api.rest_api_server.models.db_factory import DBType, DBFactory
from rest_api.rest_api_server.models.db_base import BaseDB
from rest_api.rest_api_server.models.models import Tag, Type


class TestModelBase(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._db_session = None

    @property
    def db_session(self):
        db = DBFactory(DBType.Test, None).db
        if not self._db_session:
            self._db_session = BaseDB.session(db.engine)()
        return self._db_session

    def setUp(self):
        super().setUp()
        self.db = DBFactory(DBType.Test, None).db
        self.db.create_all()

    def tearDown(self):
        DBFactory.clean_type(DBType.Test)
        DBFactory.clean_type(DBType.Test)
        super().tearDown()


class TestType(TestModelBase):

    def test_type_create(self):
        session = self.db_session
        name = 'cloud_account'
        type_cl_acc = Type(name=name)
        session.add(type_cl_acc)
        session.commit()
        types = session.query(Type).all()
        self.assertEqual(len(types), 1)
        self.assertEqual(types[0].name, name)
        self.assertEqual(types[0].id, 1)
