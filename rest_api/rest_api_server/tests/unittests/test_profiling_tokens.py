import hashlib
from unittest.mock import patch, PropertyMock
from rest_api.rest_api_server.tests.unittests.test_api_base import TestApiBase
from rest_api.rest_api_server.tests.unittests.test_profiling_base import (
    ArceeMock
)
from rest_api.rest_api_server.models.db_factory import DBFactory, DBType
from rest_api.rest_api_server.models.db_base import BaseDB
from rest_api.rest_api_server.models.models import ProfilingToken


class TestProfilingTokensApi(TestApiBase):

    def setUp(self, version='v2'):
        super().setUp(version)
        patch('rest_api.rest_api_server.controllers.base.'
              'BaseProfilingTokenController.arcee_client',
              new_callable=PropertyMock,
              return_value=ArceeMock(self.mongo_client)).start()
        patch('rest_api.rest_api_server.controllers.base.'
              'BaseProfilingTokenController.bulldozer_client',
              new_callable=PropertyMock).start()
        _, self.org = self.client.organization_create({'name': "organization"})

    @staticmethod
    def _get_db_profiling_tokens(org_id):
        db = DBFactory(DBType.Test, None).db
        engine = db.engine
        session = BaseDB.session(engine)()
        tokens = session.query(ProfilingToken).filter(
            ProfilingToken.organization_id == org_id,
            ProfilingToken.deleted.is_(False)
        ).all()
        return tokens

    def test_get(self):
        tokens = self._get_db_profiling_tokens(self.org['id'])
        self.assertEqual(len(tokens), 0)
        # create on get
        code, token1 = self.client.profiling_token_get(self.org['id'])
        self.assertEqual(code, 200)
        self.assertEqual(len(self._get_db_profiling_tokens(self.org['id'])), 1)

        # get on get
        code, resp = self.client.profiling_token_get(self.org['id'])
        self.assertEqual(code, 200)
        self.assertEqual(token1, resp)
        self.assertEqual(resp['md5_token'], hashlib.md5(
            resp['token'].encode('utf-8')).hexdigest())

    def test_create_on_another_api(self):
        tokens = self._get_db_profiling_tokens(self.org['id'])
        self.assertEqual(len(tokens), 0)
        self.client.task_list(self.org['id'])
        tokens = self._get_db_profiling_tokens(self.org['id'])
        self.assertEqual(len(tokens), 1)

    def test_error_on_create(self):
        tokens = self._get_db_profiling_tokens(self.org['id'])
        self.assertEqual(len(tokens), 0)
        err = patch('rest_api.rest_api_server.controllers.base.'
                    'BaseProfilingTokenController.'
                    '_create_arcee_token',
                    side_effect=Exception('Arcee error'))
        err.start()
        code, resp = self.client.profiling_token_get(self.org['id'])
        self.assertEqual(code, 500)
        tokens = self._get_db_profiling_tokens(self.org['id'])
        self.assertEqual(len(tokens), 0)

        err.stop()
        code, resp = self.client.profiling_token_get(self.org['id'])
        self.assertEqual(code, 200)
        self.assertEqual(len(self._get_db_profiling_tokens(self.org['id'])), 1)

    def test_get_token_info(self):
        code, token = self.client.profiling_token_get(self.org['id'])
        self.assertEqual(code, 200)
        code, data = self.client.profiling_token_info_get(token['token'])
        self.assertEqual(code, 200)
        self.assertEqual(data['organization_id'], self.org['id'])

    def test_get_invalid_token_info(self):
        code, data = self.client.profiling_token_info_get('token')
        self.assertEqual(code, 404)
        self.assertEqual(data['error']['error_code'], 'OE0002')
