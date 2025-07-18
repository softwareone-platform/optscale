import time
import uuid
from freezegun import freeze_time
from cryptography.fernet import Fernet
from unittest.mock import patch, ANY, call, PropertyMock
from rest_api.rest_api_server.utils import MAX_32_INT
from rest_api.rest_api_server.models.db_base import BaseDB
from rest_api.rest_api_server.models.db_factory import DBType, DBFactory
from rest_api.rest_api_server.models.models import (
    CloudTypes, OrganizationConstraint, OrganizationLimitHit, OrganizationBI)
from rest_api.rest_api_server.tests.unittests.test_api_base import TestApiBase
from sqlalchemy import and_
from datetime import datetime, timedelta


class TestOrganizationApi(TestApiBase):

    def setUp(self, version='v2'):
        super().setUp(version)

        code, self.root = self.create_organization("root_name")
        self.code, self.organization = self.create_organization("test_name")
        patch('rest_api.rest_api_server.controllers.employee.'
              'EmployeeController.notification_domain_blacklist').start()
        patch('rest_api.rest_api_server.controllers.employee.'
              'EmployeeController.notification_domain_whitelist',
              new_callable=PropertyMock, return_value=[]).start()
        self.auth_user = self.gen_id()
        _, self.employee = self.client.employee_create(
            self.organization['id'], {'name': 'employee',
                                      'auth_user_id': self.auth_user})
        self._mock_auth_user(self.auth_user)
        user_roles = [{
            "user_id": self.auth_user,
            "role_purpose": 'optscale_manager'
        }]
        self.p_get_roles_info = patch(
            'rest_api.rest_api_server.handlers.v1.base.'
            'BaseAuthHandler.get_roles_info',
            return_value=user_roles).start()
        patch('rest_api.rest_api_server.controllers.base.BaseController.'
              'get_user_id',
              return_value=self.auth_user).start()
        patch('rest_api.rest_api_server.controllers.rule.RuleController.'
              'create_rule').start()

    def mock_user_info(self, user_id, email, name='default'):
        patch(
            'rest_api.rest_api_server.handlers.v1.base.'
            'BaseAuthHandler._get_user_info',
            return_value={
                'id': user_id,
                'display_name': name,
                'email': email,
                'is_password_autogenerated': False
            }).start()

    def test_patch_organization(self):
        organization_id = self.organization['id']
        _, org_pool = self.client.pool_get(self.organization['pool_id'])
        self.assertEqual(org_pool['name'], self.organization['name'])
        code, organization_dict = self.client.organization_update(
            organization_id, dict(name="new name", cleaned_at=6))
        self.assertEqual(code, 200)
        self.assertEqual(organization_dict["name"], "new name")
        _, org_pool = self.client.pool_get(organization_dict['pool_id'])
        self.assertEqual(org_pool['name'], organization_dict['name'])
        _, customer_dict = self.client.organization_get(organization_id)
        self.assertEqual(customer_dict["name"], "new name")

    def test_disable_organization(self):
        organization_id = self.organization['id']
        code, organization_dict = self.client.organization_update(
            organization_id, {'disabled': False})
        self.assertEqual(code, 200)
        self.assertEqual(organization_dict['disabled'], False)

        patch('rest_api.rest_api_server.handlers.v1.base.BaseAuthHandler.'
              'check_cluster_secret', return_value=False).start()
        code, resp = self.client.organization_update(
            organization_id, {'disabled': False})
        self.assertEqual(code, 403)
        self.assertEqual(resp['error']['error_code'], 'OE0561')

    def test_get_disabled_organizations(self):
        _, org = self.client.organization_create({'name': 'disabled'})
        self.client.organization_update(org['id'], {'disabled': True})
        code, resp = self.client.organization_list({'disabled': True})
        self.assertEqual(code, 200)
        self.assertEqual(len(resp['organizations']), 1)
        self.assertEqual(resp['organizations'][0]['id'], org['id'])

        code, resp = self.client.organization_list({'disabled': False})
        self.assertEqual(code, 200)
        self.assertEqual(len(resp['organizations']), 2)
        ids = [x['id'] for x in resp['organizations']]
        self.assertNotIn(org['id'], ids)

        code, resp = self.client.organization_list()
        self.assertEqual(code, 200)
        self.assertEqual(len(resp['organizations']), 3)

    def test_get_organization(self):
        organization_id = self.organization['id']
        code, organization = self.client.organization_get(organization_id)
        self.assertEqual(code, 200)

    def test_get_non_existing_organization(self):
        organization_id = str(uuid.uuid4())
        code, _ = self.client.organization_get(organization_id)
        self.assertEqual(code, 404)

    def test_delete_organization(self):
        self.assertFalse(self.organization['deleted_at'])
        organization_id = self.organization['id']
        self.delete_organization(organization_id)
        code, organization_dict = self.client.organization_get(organization_id)
        self.assertEqual(code, 404)

    def test_delete_non_existing_organization(self):
        organization_id = str(uuid.uuid4())
        code, _ = self.client.organization_delete(organization_id)
        self.assertEqual(code, 404)

    def test_create_organization_duplicate_name(self):
        code, organization1 = self.create_organization(self.organization['name'])
        self.assertEqual(code, 201)
        self.assertEqual(organization1['name'], self.organization['name'])

    def test_update_organization_with_duplicated_name(self):
        _, organization = self.create_organization("super organization")
        code, organization_upd = self.client.organization_update(
            organization['id'], dict(name=self.organization['name']))
        self.assertEqual(code, 200)
        self.assertEqual(organization_upd['name'], self.organization['name'])

    def test_create_organization_integer_name(self):
        code, organization = self.create_organization(123)
        self.assertEqual(code, 400)
        self.assertEqual(organization['error']['reason'], 'name should be a string')

    def test_create_organization_string_with_integer_name(self):
        code, organization = self.create_organization('123')
        self.assertEqual(code, 201)

    def test_recreate_organization(self):
        self.delete_organization(self.organization['id'])
        code, _ = self.create_organization("test_name")
        self.assertEqual(code, 201)

    def create_organization(self, name):
        bu_dict = {'name': name}
        return self.client.organization_create(bu_dict)

    def test_create_organization(self):
        self.assertEqual(self.code, 201)
        self.assertEqual(self.organization['name'], 'test_name')
        self.assertEqual(self.organization['cleaned_at'], 0)

    @patch('rest_api.rest_api_server.controllers.pool.PoolController.'
           '_authorize_action_for_user', return_value=True)
    @patch('rest_api.rest_api_server.handlers.v2.organizations.'
           'OrganizationAsyncCollectionHandler.check_cluster_secret',
           return_value=False)
    def test_create_organization_with_token(self, p, p_auth):
        user_id = self.gen_id()
        email = 'my@email.com'
        self.mock_user_info(user_id, email)
        p_send_email = self.mock_email_send_enable()
        self.client.secret = None
        p_publish_activities = patch(
            'rest_api.rest_api_server.controllers.base.BaseController.'
            'publish_activities_task'
        ).start()
        self._mock_auth_user(user_id)
        patch('rest_api.rest_api_server.controllers.base.BaseController.'
              'get_user_info',
              return_value={'id': user_id, 'display_name': 'my_name',
                            'email': email, 'is_password_autogenerated': True}
              ).start()
        org_name = 'test'
        code, org = self.client.organization_create({'name': org_name})
        self.assertEqual(code, 201)
        self.assertEqual(org['name'], org_name)
        p_send_email.assert_has_calls([
            call(
                ANY, ANY,
                template_type='new_employee',
                reply_to_email=email,
                template_params={
                    'texts': {
                        'organization': {
                            'id': org['id'],
                            'name': org_name,
                            'currency_code': '$'
                        },
                        'user': {
                            'id': ANY,
                            'email': email,
                            'authentication_type': 'google'
                        },
                        'users_count': 1
                    }
                })
        ], any_order=True)
        self.assertEqual(len(p_send_email.call_args_list), 2)
        code, pool = self.client.pool_get(org['pool_id'])
        self.assertEqual(code, 200)
        empl_id = pool['default_owner_id']
        self.assertTrue(empl_id is not None)
        code, empl = self.client.employee_get(empl_id)
        self.assertEqual(code, 200)
        self.assertEqual(empl['auth_user_id'], user_id)
        activity_param_tuples = self.get_publish_activity_tuple(
            org['id'], org['id'], 'organization',
            'organization_created', {
                'object_name': org['name']
            })
        p_publish_activities.assert_called_once_with(
            *activity_param_tuples
        )
        patch('rest_api.rest_api_server.controllers.base.BaseController.'
              'get_user_id',
              return_value=empl['auth_user_id']).start()
        code, sub_pool = self.client.pool_create(
            org['id'], {'name': 'sub_unit'})
        self.assertEqual(code, 201)
        empl_id = sub_pool['default_owner_id']
        self.assertTrue(empl_id is not None)
        code, empl = self.client.employee_get(empl_id)
        self.assertEqual(code, 200)
        self.assertEqual(empl['auth_user_id'], user_id)

    @patch('rest_api.rest_api_server.controllers.pool.PoolController.'
           '_authorize_action_for_user', return_value=True)
    @patch('rest_api.rest_api_server.handlers.v2.organizations.'
           'OrganizationAsyncCollectionHandler.check_cluster_secret',
           return_value=False)
    def test_create_organization_with_employee_email_blacklist(self, p, p_auth):
        patch('rest_api.rest_api_server.controllers.employee.'
              'EmployeeController.notification_domain_blacklist',
              new_callable=PropertyMock, return_value=['@email.com']).start()
        user_id = self.gen_id()
        email = 'my@email.com'
        self.mock_user_info(user_id, email)
        p_send_email = self.mock_email_send_enable()
        self.client.secret = None
        self._mock_auth_user(user_id)
        patch('rest_api.rest_api_server.controllers.base.BaseController.'
              'get_user_info',
              return_value={'id': user_id, 'display_name': 'my_name',
                            'email': email.upper(),
                            'is_password_autogenerated': True}).start()
        code, org = self.client.organization_create({'name': 'test'})
        self.assertEqual(code, 201)
        # only greetings email is sent
        self.assertEqual(len(p_send_email.call_args_list), 1)
        self.assertEqual(p_send_email.call_args_list[0][0][0][0],
                         email.upper())

    @patch('rest_api.rest_api_server.handlers.v2.organizations.'
           'OrganizationAsyncCollectionHandler.check_cluster_secret')
    def test_list_organizations(self, p_check_secret):
        patch('rest_api.rest_api_server.controllers.organization.OrganizationController.'
              '_get_assignments_by_token',
              return_value=[{'assignment_resource': self.root['id']}]).start()
        p_check_secret.return_value = False
        _, organization_list = self.client.organization_list()
        self.assertEqual(len(organization_list['organizations']), 1)
        _, pool = self.client.pool_create(self.root['id'],
                                          {'name': 'pool'})
        patch('rest_api.rest_api_server.controllers.organization.OrganizationController.'
              '_get_assignments_by_token',
              return_value=[
                  {'assignment_resource': self.root['id']},
                  {'assignment_resource': pool['id']},
              ]).start()
        _, organization_list = self.client.organization_list()
        self.assertEqual(len(organization_list['organizations']), 1)
        p_check_secret.return_value = True
        _, another_root = self.create_organization('another root')
        p_check_secret.return_value = False
        self.assertEqual(len(organization_list['organizations']), 1)
        patch('rest_api.rest_api_server.controllers.organization.'
              'OrganizationController._get_assignments_by_token',
              return_value=[
                  {'assignment_resource': self.root['id']},
                  {'assignment_resource': pool['id']},
                  {'assignment_resource': another_root['id']}
              ]).start()
        _, organization_list = self.client.organization_list()
        self.assertEqual(len(organization_list['organizations']), 2)

        _, organization_list = self.client.organization_list({'limit': 1})
        self.assertEqual(len(organization_list['organizations']), 1)

    def test_event_organization(self):
        p_publish_activities = patch(
            'rest_api.rest_api_server.controllers.base.BaseController.'
            'publish_activities_task'
        ).start()
        code, response = self.client.organization_create({
            'name': 'name'
        })
        self.assertEqual(code, 201)
        activity_param_tuples = self.get_publish_activity_tuple(
            response['id'], response['id'], 'organization',
            'organization_created', {
                'object_name': response['name']
            })
        p_publish_activities.assert_called_once_with(
            *activity_param_tuples
        )
        p_publish_activities = patch(
            'rest_api.rest_api_server.controllers.base.BaseController.'
            'publish_activities_task'
        ).start()
        code, response = self.client.organization_update(response['id'], {
            'name': 'new org name'
        })
        self.assertEqual(code, 200)
        self.assertEqual(response['name'], 'new org name')
        activity_param_tuples = self.get_publish_activity_tuple(
            response['id'], response['id'], 'organization',
            'organization_updated', {
                'object_name': response['name']
            })
        p_publish_activities.assert_called_once_with(
            *activity_param_tuples
        )
        p_publish_activities = patch(
            'rest_api.rest_api_server.controllers.base.BaseController.'
            'publish_activities_task'
        ).start()
        self.delete_organization(response['id'])
        activity_param_tuples = self.get_publish_activity_tuple(
            response['id'], response['id'], 'organization',
            'organization_deleted', {
                'object_name': response['name']
            })
        p_publish_activities.assert_called_once_with(
            *activity_param_tuples
        )

    def test_create_organization_empty_by_token(self):
        self.client.secret = None
        mocked_user = {'id': str(uuid.uuid4()), 'display_name': 'my_name'}
        patch('rest_api.rest_api_server.controllers.base.BaseController.'
              'get_user_info', return_value=mocked_user).start()
        self.p_get_meta_by_token.return_value = {'valid_until': time.time() * 2}
        code, response = self.client.organization_create({})
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OE0216')

    def test_create_organization_with_duplicated_name(self):
        code, organization1 = self.client.organization_create({
            'name': 'name 1'
        })
        self.assertEqual(code, 201)
        code, organization2 = self.client.organization_create({
            'name': 'name 1',
        })
        self.assertEqual(code, 201)

    def test_create_spaces_name(self):
        code, response = self.client.organization_create({
            'name': '    '
        })
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OE0416')

        code, org = self.client.organization_create({
            'name': 'business_unit1'
        })
        self.assertEqual(code, 201)

        code, response = self.client.organization_update(org['id'], {
            'name': '    '
        })
        self.assertEqual(code, 400)
        self.assertEqual(response['error']['error_code'], 'OE0416')

    @patch('rest_api.rest_api_server.handlers.v2.organizations.'
           'OrganizationAsyncCollectionHandler.check_cluster_secret',
           return_value=True)
    def test_get_org_list_with_secret(self, p_check):
        dt1 = datetime.now() + timedelta(seconds=1)
        dt2 = dt1 + timedelta(seconds=1)
        dt3 = dt2 + timedelta(seconds=1)
        dt4 = dt3 + timedelta(seconds=1)
        with freeze_time(dt3):
            code, org3 = self.client.organization_create({'name': 'org3'})
            self.assertEqual(code, 201)
        with freeze_time(dt4):
            code, org4 = self.client.organization_create({'name': 'org4'})
            self.assertEqual(code, 201)
        with freeze_time(dt1):
            code, org1 = self.client.organization_create({'name': 'org1'})
            self.assertEqual(code, 201)
        with freeze_time(dt2):
            code, org2 = self.client.organization_create({'name': 'org2'})
            self.assertEqual(code, 201)
        self.delete_organization(org4['id'])
        code, org_list = self.client.organization_list()
        self.assertEqual(code, 200)
        self.assertCountEqual(org_list['organizations'],
                              [self.root, self.organization, org1, org2, org3])
        # def test pagination
        for params, expected_orgs in [
            ({'limit': 1, 'offset': 2}, [org1['id']]),
            ({'offset': 2}, [org1['id'], org2['id'], org3['id']]),
            ({'offset': 5}, [])
        ]:
            code, org_list = self.client.organization_list(params)
            self.assertEqual(code, 200)
            self.assertEqual(len(org_list['organizations']), len(expected_orgs))
            for x in org_list['organizations']:
                self.assertTrue(x['id'] in expected_orgs)
            for k, v in params.items():
                self.assertEqual(org_list[k], v)
            self.assertEqual(org_list['total_count'], 5)
        for invalid_params in [
            {'limit': 1, 'offset': MAX_32_INT + 1},
            {'limit': MAX_32_INT + 1, 'offset': 1},
            {'limit': -1, 'offset': 1},
            {'limit': 1, 'offset': -1}
        ]:
            code, resp = self.client.organization_list(invalid_params)
            self.assertEqual(code, 400)
            self.verify_error_code(resp, 'OE0224')

    @patch('rest_api.rest_api_server.handlers.v2.organizations.'
           'OrganizationAsyncCollectionHandler.check_cluster_secret',
           return_value=False)
    def test_delete_organization_with_child_pool(self, p_auth):
        patch('rest_api.rest_api_server.controllers.organization.'
              'OrganizationController._get_assignments_by_token',
              return_value=[{'assignment_resource': self.root['id']}]).start()
        p_auth.return_value = False
        _, organization_list = self.client.organization_list()
        self.assertEqual(len(organization_list['organizations']), 1)
        _, root_pool = self.client.pool_get(self.root['pool_id'])
        self.assertEqual(root_pool['id'], self.root['pool_id'])
        self.assertEqual(root_pool['limit'], 0)
        _, response = self.client.pool_create(self.root['id'],
                                              {'name': 'pool', 'limit': 10})
        self.assertEqual(response['error']['error_code'], 'OE0407')

        patch_switch_off_check_child_pool_sum = patch(
            'rest_api.rest_api_server.controllers.pool.PoolController.'
            'check_child_pool_sum', return_value=None)
        patch_switch_off_check_child_pool_sum.start()
        _, child_pool_without_check = self.client.pool_create(
            self.root['id'], {'name': 'pool', 'limit': 20})
        self.assertEqual(child_pool_without_check['parent_id'],
                         self.root['pool_id'])
        self.assertEqual(child_pool_without_check['limit'], 20)
        patch_switch_off_check_child_pool_sum.stop()
        # in the usual case, there should be an error due to the pool
        # update (when changing deleted_at), because the limit is higher
        # for the child pool. than for the parent pool, but when changing
        # the remote pool, we ignore this
        self.delete_organization(self.root['id'])

    def test_delete_org_when_children_pool_set(self):
        code, org = self.client.organization_create({'name': 'organme'})
        self.assertEqual(code, 201)
        code, pool = self.client.pool_update(org['pool_id'], {'limit': 10})
        self.assertEqual(code, 200)
        code, subpool = self.client.pool_create(
            org['id'], {'limit': 5, 'name': 'a'})
        self.assertEqual(code, 201)
        self.delete_organization(org['id'])

    def test_delete_employee_on_deleting_organization(self):
        code, org = self.client.organization_create({'name': 'organme'})
        self.assertEqual(code, 201)
        code, employee = self.client.employee_create(
            org['id'], {'name': 'John Smith', 'auth_user_id': self.gen_id()})
        self.assertEqual(code, 201)
        patch('rest_api.rest_api_server.controllers.employee.'
              'EmployeeController.get_org_manager_user',
              return_value=None).start()
        code, resp = self.client.organization_delete(org['id'])
        self.assertEqual(code, 204)

    def test_create_organization_with_currency(self):
        code, organization = self.client.organization_create({
            'name': 'name 1', 'currency': 'CAD'
        })
        self.assertEqual(code, 201)
        self.assertEqual(organization['currency'], 'CAD')
        code, organization = self.client.organization_create({
            'name': 'name 1', 'currency': 610
        })
        self.assertEqual(code, 400)

    def test_update_organization_currency(self):
        code, organization = self.client.organization_update(
            self.organization['id'], {'currency': 'CAD'})
        self.assertEqual(code, 200)
        self.assertEqual(organization['currency'], 'CAD')

        code, resp = self.client.organization_update(
            self.organization['id'], {'currency': ''})
        self.assertEqual(code, 400)
        self.verify_error_code(resp, 'OE0215')

        code, resp = self.client.organization_update(
            self.organization['id'], {'currency': 'CAD2'})
        self.assertEqual(code, 400)
        self.verify_error_code(resp, 'OE0215')

        cloud_acc_dict = {
            'name': 'my cloud_acc',
            'type': 'aws_cnr',
            'config': {
                'access_key_id': 'key',
                'secret_access_key': 'secret',
                'bucket_name': 'name',
                'config_scheme': 'create_report'
            }
        }
        auth_user = self.gen_id()
        code, employee = self.client.employee_create(
            self.organization['id'], {'name': 'employee',
                                      'auth_user_id': auth_user})
        self.assertEqual(code, 201)
        patch('rest_api.rest_api_server.controllers.cloud_account.'
              'CloudAccountController._configure_report').start()
        _, ca = self.create_cloud_account(
            self.organization['id'], cloud_acc_dict, auth_user_id=auth_user)
        code, resp = self.client.organization_update(
            self.organization['id'], {'currency': 'RUB'})
        self.assertEqual(code, 424)
        self.verify_error_code(resp, 'OE0500')

        code, _ = self.client.cloud_account_delete(ca['id'])
        self.assertEqual(code, 204)
        code, organization = self.client.organization_update(
            self.organization['id'], {'currency': 'RUB'})
        self.assertEqual(code, 200)
        self.assertEqual(organization['currency'], 'RUB')

    @patch('rest_api.rest_api_server.controllers.report_import.'
           'ReportImportBaseController.publish_task')
    def test_get_orgs_with_shareables(self, m_publish_task):
        org_id = self.organization['id']
        code, new_org = self.client.organization_create({'name': 'new_org'})
        self.assertEqual(code, 201)
        code, resource = self.environment_resource_create(
            org_id, {
                'name': 'resource',
                'resource_type': 'some_env_type',
                'tags': {},
            })
        self.assertEqual(code, 201)
        schedule_book = {
            'resource_id': resource['id'],
            'acquired_by_id': self.employee['id']
        }
        code, resp = self.client.shareable_book_create(org_id,
                                                       schedule_book)
        self.assertEqual(code, 201)

        code, organization_list = self.client.organization_list()
        self.assertEqual(len(organization_list['organizations']), 3)
        self.assertEqual(code, 200)

        code, organization_list = self.client.organization_list(
            {'with_shareable_bookings': True})
        self.assertEqual(len(organization_list['organizations']), 1)
        self.assertEqual(code, 200)

    def test_delete_organization_constraint(self):
        self.create_org_constraint(self.organization['id'],
                                   self.organization['pool_id'])
        self.delete_organization(self.organization['id'])
        db = DBFactory(DBType.Test, None).db
        engine = db.engine
        session = BaseDB.session(engine)()
        constraint = session.query(OrganizationConstraint).filter(and_(
            OrganizationConstraint.organization_id == self.organization['id'],
            OrganizationConstraint.deleted.is_(False)
        )).one_or_none()
        self.assertEqual(constraint, None)

    def test_delete_organization_constraint_with_none_in_pool_filter(self):
        self.create_org_constraint(self.organization['id'],
                                   self.organization['pool_id'],
                                   filters={'pool_id': [None]})
        self.delete_organization(self.organization['id'])
        db = DBFactory(DBType.Test, None).db
        engine = db.engine
        session = BaseDB.session(engine)()
        constraint = session.query(OrganizationConstraint).filter(and_(
            OrganizationConstraint.organization_id == self.organization['id'],
            OrganizationConstraint.deleted.is_(False)
        )).one_or_none()
        self.assertEqual(constraint, None)

    def test_delete_organization_limit_hit(self):
        self.create_org_limit_hit(
            self.organization['id'], self.organization['pool_id'])
        self.delete_organization(self.organization['id'])
        db = DBFactory(DBType.Test, None).db
        engine = db.engine
        session = BaseDB.session(engine)()
        hits = session.query(OrganizationLimitHit).filter(and_(
            OrganizationLimitHit.organization_id == self.organization['id'],
            OrganizationLimitHit.deleted.is_(False)
        )).one_or_none()
        self.assertEqual(hits, None)

    def test_invalid_currency(self):
        code, org = self.client.organization_create({'name': 'org'})
        self.assertEqual(code, 201)
        code, resp = self.client.organization_create(
            {'name': 'org1', 'currency': 'asd'})
        self.assertEqual(code, 400)
        self.verify_error_code(resp, 'OE0536')
        code, resp = self.client.organization_update(
            org['id'], {'currency': 'inv'})
        self.assertEqual(code, 400)
        self.verify_error_code(resp, 'OE0536')

    def test_org_list_with_connected_cloud_accounts(self):
        code, resp = self.client.organization_list()
        self.assertEqual(code, 200)
        self.assertEqual(len(resp['organizations']), 2)
        for o in resp['organizations']:
            self.assertTrue(
                o['id'] in [self.root['id'], self.organization['id']])
        code, resp = self.client.organization_list(
            {'with_connected_accounts': True})
        self.assertEqual(code, 200)
        self.assertEqual(len(resp['organizations']), 0)

        cloud_acc_dict = {
            'name': 'my cloud_acc',
            'type': 'aws_cnr',
            'config': {
                'access_key_id': 'key',
                'secret_access_key': 'secret',
                'bucket_name': 'name',
                'config_scheme': 'create_report'
            }
        }
        auth_user = self.gen_id()
        code, employee = self.client.employee_create(
            self.organization['id'], {'name': 'employee',
                                      'auth_user_id': auth_user})
        self.assertEqual(code, 201)
        patch('rest_api.rest_api_server.controllers.cloud_account.'
              'CloudAccountController._configure_report').start()
        _, ca = self.create_cloud_account(
            self.organization['id'], cloud_acc_dict, auth_user_id=auth_user)

        code, resp = self.client.organization_list(
            {'with_connected_accounts': True})
        self.assertEqual(code, 200)
        organizations = resp['organizations']
        self.assertEqual(len(organizations), 1)
        self.assertEqual(organizations[0]['id'], self.organization['id'])

    def test_delete_org_bi_on_org_delete(self):
        code, org = self.client.organization_create({'name': 'org_name'})
        self.assertEqual(code, 201)
        encr_key = Fernet.generate_key()
        patch('rest_api.rest_api_server.utils.get_bi_encryption_key',
              return_value=encr_key).start()
        meta = {
            'access_key_id': 'access_key_id',
            'secret_access_key': 'secret_access_key',
            'bucket': 'bucket'
        }
        code, bi = self.client.bi_create(
            org['id'], 'AWS_RAW_EXPORT', 'aws', **meta)
        self.assertEqual(code, 201)
        self.delete_organization(org['id'])
        db = DBFactory(DBType.Test, None).db
        engine = db.engine
        session = BaseDB.session(engine)()
        bi = session.query(OrganizationBI).filter(and_(
            OrganizationBI.organization_id == org['id'],
            OrganizationBI.deleted.is_(False)
        )).one_or_none()
        self.assertEqual(bi, None)

    def test_delete_org_clean_ch(self):
        ch_del_mock = patch(
            'rest_api.rest_api_server.controllers.organization.'
            'OrganizationController.clean_clickhouse').start()
        code, org = self.client.organization_create({'name': 'org_name'})
        cloud_acc_dict = {
            'name': 'my cloud_acc',
            'type': 'aws_cnr',
            'config': {
                'access_key_id': 'key',
                'secret_access_key': 'secret',
                'bucket_name': 'name',
                'config_scheme': 'create_report'
            }
        }
        auth_user = self.gen_id()
        code, employee = self.client.employee_create(
            org['id'], {'name': 'employee', 'auth_user_id': auth_user})
        self.assertEqual(code, 201)
        patch('rest_api.rest_api_server.controllers.cloud_account.'
              'CloudAccountController._configure_report').start()
        _, ca = self.create_cloud_account(
            org['id'], cloud_acc_dict, auth_user_id=auth_user)
        self.assertEqual(code, 201)

        self.delete_organization(org['id'])
        ch_del_mock.assert_called_once_with({ca['id']: CloudTypes.AWS_CNR}, [])

    @patch('rest_api.rest_api_server.controllers.pool.PoolController.'
           '_authorize_action_for_user', return_value=True)
    @patch('rest_api.rest_api_server.handlers.v2.organizations.'
           'OrganizationAsyncCollectionHandler.check_cluster_secret',
           return_value=False)
    def test_create_organization_with_employee_email_whitelist(self, p, p_auth):
        patch('rest_api.rest_api_server.controllers.employee.'
              'EmployeeController.notification_domain_whitelist',
              new_callable=PropertyMock, return_value=['@another.com']).start()
        user_id = self.gen_id()
        email = 'my@email.com'
        self.mock_user_info(user_id, email)
        p_send_email = self.mock_email_send_enable()
        self.client.secret = None
        self._mock_auth_user(user_id)
        patch('rest_api.rest_api_server.controllers.base.BaseController.'
              'get_user_info',
              return_value={'id': user_id, 'display_name': 'my_name',
                            'email': email.upper(),
                            'is_password_autogenerated': True}).start()
        code, org = self.client.organization_create({'name': 'test'})
        self.assertEqual(code, 201)
        # only greetings email is sent
        self.assertEqual(len(p_send_email.call_args_list), 1)
        self.assertEqual(p_send_email.call_args_list[0][0][0][0],
                         email.upper())

    def test_disable_types_organization(self):
        organization_id = self.organization['id']

        code, organization_dict = self.client.organization_update(
            organization_id, {'disabled': True, 'disable_type': 'soft'})
        self.assertEqual(code, 200)
        self.assertTrue(organization_dict['disabled'])

        code, organization_dict = self.client.organization_update(
            organization_id, {'disabled': True, 'disable_type': 'hard'})
        self.assertEqual(code, 200)
        self.assertTrue(organization_dict['disabled'])

        code, organization_dict = self.client.organization_update(
            organization_id, {'disabled': False, 'disable_type': 'soft'})
        self.assertEqual(code, 200)
        self.assertTrue(organization_dict['disabled'])

        code, organization_dict = self.client.organization_update(
            organization_id, {'disabled': False, 'disable_type': 'hard'})
        self.assertEqual(code, 200)
        self.assertFalse(organization_dict['disabled'])
