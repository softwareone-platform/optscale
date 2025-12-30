import uuid
from datetime import datetime
from unittest.mock import patch
from freezegun import freeze_time
from tools.optscale_exceptions.http_exc import OptHTTPError
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.tests.unittests.test_api_base import TestApiBase


class TestOrganizationSummaryApi(TestApiBase):
    def setUp(self, version='v2'):
        super().setUp(version)
        _, self.org = self.client.organization_create({'name': "organization"})

    def test_access(self):
        self.client.secret = None
        self.client.token = None

        def side_eff(_action, *_args, **_kwargs):
            raise OptHTTPError(403, Err.OE0234, [])

        patch(
            'rest_api.rest_api_server.handlers.v1.base.'
            'BaseAuthHandler.check_permissions',
            side_effect=side_eff).start()
        code, response = self.client.get_organization_summary(
            self.org['id'], ['employees'])
        self.assertEqual(code, 403)

        secret = self.gen_id()
        patch('optscale_client.config_client.client.Client.cluster_secret',
              return_value=secret).start()
        self.client.secret = secret
        code, response = self.client.get_organization_summary(
            self.org['id'], ['employees'])
        self.assertEqual(code, 200)

    def test_method(self):
        code, resp = self.client.post(
            self.client.organization_summary_url(self.org['id']), {})
        self.assertEqual(code, 405)
        code, resp = self.client.patch(
            self.client.organization_summary_url(self.org['id']), {})
        self.assertEqual(code, 405)
        code, resp = self.client.put(
            self.client.organization_summary_url(self.org['id']), {})
        self.assertEqual(code, 405)
        code, resp = self.client.delete(
            self.client.organization_summary_url(self.org['id']))
        self.assertEqual(code, 405)

    def test_get_invalid(self):
        code, response = self.client.get_organization_summary(
            self.org['id'], ['employees', 'invalid'])
        self.assertEqual(code, 400)
        self.verify_error_code(response, 'OE0217')

    def test_get_valid(self):
        code, response = self.client.get_organization_summary(
            self.org['id'])
        self.assertEqual(code, 200)
        entities = response['entities']
        self.assertEqual(len(entities), 0)

        expected_values = {
            'employees': 1,
            'cloud_accounts': 0,
            'month_expenses': {},
        }
        code, response = self.client.get_organization_summary(
            self.org['id'], list(expected_values.keys()))
        self.assertEqual(code, 200)
        entities = response['entities']
        self.assertEqual(response['id'], self.org['id'])
        self.assertFalse(response['disabled'])
        self.assertEqual(len(entities), 3)
        for key, value in expected_values.items():
            self.assertEqual(entities.get(key), value)

        auth_user = self.gen_id()
        _, employee = self.client.employee_create(
            self.org['id'], {'name': 'employee', 'auth_user_id': auth_user})
        patch('rest_api.rest_api_server.controllers.cloud_account.'
              'CloudAccountController._configure_report').start()
        cloud_acc = {
            'name': 'cloud_acc1',
            'type': 'aws_cnr',
            'config': {
                'access_key_id': 'key',
                'secret_access_key': 'secret',
                'config_scheme': 'create_report'
            }
        }
        _, cloud_acc = self.create_cloud_account(
            self.org['id'], cloud_acc, auth_user_id=auth_user)
        for dt, cost in [
            (datetime(2025, 9, 6), 10),
            (datetime(2025, 10, 6), 100),
            (datetime(2025, 11, 1), 150),
            (datetime(2025, 11, 30), 250),
            (datetime(2025, 12, 1), 300),
        ]:
            self.expenses.append({
                'cloud_account_id': cloud_acc['id'],
                'resource_id': str(uuid.uuid4()),
                'date': dt,
                'cost': cost,
                'sign': 1
            })
        with freeze_time(datetime(2025, 12, 2)):
            code, response = self.client.get_organization_summary(
                self.org['id'], list(expected_values.keys()))
        self.assertEqual(code, 200)
        expected_values = {
            'employees': 2,
            'cloud_accounts': 1,
            'month_expenses': {
                '2025-10': 100,
                '2025-11': 400,
                '2025-12': 300
            }
        }
        entities = response['entities']
        for key, value in expected_values.items():
            self.assertEqual(entities.get(key), value)

        code, response = self.client.get_organization_summary(
            self.org['id'], ['employees', 'cloud_accounts'])
        self.assertEqual(code, 200)
        entities = response['entities']
        expected_values = {
            'employees': 2,
            'cloud_accounts': 1,
        }
        for key, value in expected_values.items():
            self.assertEqual(entities.get(key), value)

        code, response = self.client.get_organization_summary(self.org['id'])
        self.assertEqual(code, 200)
        self.assertEqual(response['entities'], {})

    def test_get_summary_exchange(self):
        _, brl_org = self.client.organization_create({
            'name': "organization", "currency": "BRL",
        })
        auth_user = self.gen_id()
        _, employee = self.client.employee_create(
            brl_org['id'], {'name': 'employee', 'auth_user_id': auth_user})
        patch('rest_api.rest_api_server.controllers.cloud_account.'
              'CloudAccountController._configure_report').start()
        cloud_acc = {
            'name': 'cloud_acc1',
            'type': 'aws_cnr',
            'config': {
                'access_key_id': 'key',
                'secret_access_key': 'secret',
                'config_scheme': 'create_report'
            }
        }
        _, cloud_acc = self.create_cloud_account(
            brl_org['id'], cloud_acc, auth_user_id=auth_user)
        for dt, cost in [
            (datetime(2025, 12, 1), 200),
        ]:
            self.expenses.append({
                'cloud_account_id': cloud_acc['id'],
                'resource_id': str(uuid.uuid4()),
                'date': dt,
                'cost': cost,
                'sign': 1
            })
        patch('optscale_client.config_client.client.Client.exchange_rates',
              return_value={}
              ).start()
        # NO BRL in exchange_rates so expenses = 0 in USD
        with freeze_time(datetime(2025, 12, 2)):
            code, response = self.client.get_organization_summary(
                brl_org['id'], ['month_expenses'])
            self.assertEqual(code, 200)
            self.assertEqual(response['entities']['month_expenses'],
                             {'2025-12': 0})

        patch('optscale_client.config_client.client.Client.exchange_rates',
              return_value={'BRL': '5.0'}
              ).start()
        with freeze_time(datetime(2025, 12, 2)):
            code, response = self.client.get_organization_summary(
                brl_org['id'], ['month_expenses'])
            self.assertEqual(code, 200)
            self.assertEqual(response['entities']['month_expenses'],
                             {'2025-12': 1000})

    def test_summary_environment(self):
        patch('rest_api.rest_api_server.controllers.cloud_account.'
              'CloudAccountController._configure_report').start()
        auth_user_id = self.gen_id()
        _, employee = self.client.employee_create(self.org['id'], {
            'name': 'employee_1', 'auth_user_id': auth_user_id
        })
        aws_cloud_acc = {
            'name': 'my cloud_acc',
            'type': 'aws_cnr',
            'config': {
                'access_key_id': 'key',
                'secret_access_key': 'secret',
                'config_scheme': 'create_report'
            }
        }
        _, cloud_acc = self.create_cloud_account(
            self.org['id'], aws_cloud_acc, auth_user_id=auth_user_id)
        _, resource = self.cloud_resource_create(cloud_acc['id'], {
            'cloud_resource_id': 'res_id',
            'name': 'resource',
            'resource_type': 'test'
        })
        env_resource = {
            'name': 'resource',
            'resource_type': 'some_env_type',
        }
        code, env_resource = self.environment_resource_create(
            self.org['id'], env_resource)
        self.assertEqual(code, 201)

        date = datetime(2025, 12, 2)
        self.expenses.extend([
            {
                'resource_id': resource['id'],
                'cloud_account_id': cloud_acc['id'],
                'date': date,
                'cost': 10,
                'sign': 1
            },
            {
                'resource_id': env_resource['id'],
                'cloud_account_id': env_resource['cloud_account_id'],
                'date': date,
                'cost': 10000,
                'sign': 1
            }
        ])
        with freeze_time(date):
            code, response = self.client.get_organization_summary(
                self.org['id'], ['month_expenses', 'cloud_accounts'])
            self.assertEqual(code, 200)
            self.assertEqual(response['entities']['cloud_accounts'], 1)
            self.assertEqual(
                response['entities']['month_expenses'], {'2025-12': 10})
