from unittest.mock import patch, PropertyMock

import tornado.testing

from auth.auth_server.controllers.token import DEFAULT_TOKEN_EXPIRATION
from auth.auth_server.models.models import Type, User, gen_id
from auth.auth_server.models.db_factory import DBType, DBFactory
from auth.auth_server.models.db_base import BaseDB
from auth.auth_server.models.models import gen_salt
from auth.auth_server.server import make_app
from auth.auth_server.utils import hash_password
import optscale_client.auth_client.client
import optscale_client.auth_client.client_v2


class TestAuthBase(tornado.testing.AsyncHTTPTestCase):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._db_session = None

    def get_app(self):
        return make_app(DBType.TEST, '127.0.0.1', 80)

    @property
    def db_session(self):
        db = DBFactory(DBType.TEST, None).db
        engine = db.engine
        if not self._db_session:
            self._db_session = BaseDB.session(engine)()
        return self._db_session

    @staticmethod
    def get_auth_client(version="v1"):
        return {
            "v1": optscale_client.auth_client.client,
            "v2": optscale_client.auth_client.client_v2
        }.get(version)

    def setUp(self, version='v1'):
        super().setUp()
        secret = gen_id()
        patch('optscale_client.config_client.client.Client.cluster_secret',
              return_value=secret).start()
        patch('optscale_client.config_client.client.Client.zoho_params',
              return_value={}).start()
        patch('auth.auth_server.utils.get_encryption_salt',
              return_value=gen_salt()).start()
        patch('auth.auth_server.controllers.token.TokenController.expiration',
              new_callable=PropertyMock,
              return_value=DEFAULT_TOKEN_EXPIRATION).start()

        patch("auth.auth_server.controllers.base."
              "BaseController.get_resources_info",
              return_value={}).start()
        http_provider = optscale_client.auth_client.client.\
            FetchMethodHttpProvider(self.fetch, rethrow=False)
        self.client = TestAuthBase.get_auth_client(version).Client(
            http_provider=http_provider)
        self.client.secret = secret
        self.user_verified_mock = patch(
            'auth.auth_server.models.models.User.verified',
            new_callable=PropertyMock, return_value=True)
        self.user_verified_mock.start()

    def tearDown(self):
        self.user_verified_mock.stop()
        DBFactory.clean_type(DBType.TEST)
        super().tearDown()

    def create_root_type(self):
        session = self.db_session
        type_ = session.query(Type).get(0)
        if not type_:
            type_ = Type(id_=0, name='root')
            session.add(type_)
            session.commit()
        return type_

    def create_root_user(self, email='root@hystax.com', password='toor'):
        session = self.db_session
        type_ = self.create_root_type()
        salt = gen_salt()
        password = hash_password(password, salt)
        root_user = User(email=email, password=password, salt=salt,
                         display_name="I\'m root!", type_=type_)
        session.add(root_user)
        session.commit()
        return root_user

    def get_token_response(self, email, password):
        origin_secret = self.client.secret
        self.client.secret = None
        code, token_info = self.client.token_get(email, password)
        self.assertEqual(code, 201)
        self.client.secret = origin_secret
        return token_info

    def get_token(self, email, password):
        return self.get_token_response(email, password)['token']
