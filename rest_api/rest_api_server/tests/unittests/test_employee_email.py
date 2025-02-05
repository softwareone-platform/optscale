import uuid
from unittest.mock import patch
from rest_api.rest_api_server.controllers.employee_email import ROLE_TEMPLATES
from rest_api.rest_api_server.tests.unittests.test_api_base import TestApiBase


class TestOrganizationApi(TestApiBase):

    def setUp(self, version='v2'):
        super().setUp(version)
        _, self.org = self.client.organization_create(
            {'name': "organization"})
        self.org_id = self.org['id']
        self.user_id = self.gen_id()
        self._mock_auth_user(self.user_id)
        _, self.employee = self.client.employee_create(
            self.org_id, {'name': 'name1', 'auth_user_id': self.user_id})
        patch('rest_api.rest_api_server.controllers.employee_email.'
              'EmployeeEmailController.auth_client').start()
        patch('rest_api.rest_api_server.controllers.employee_email.'
              'EmployeeEmailController.auth_client.user_roles_get',
              return_value=(
                  200, [{'user_id': self.employee['auth_user_id'],
                         'role_purpose': 'optscale_engineer'}])).start()
        self.valid_params = {
            'employee_id': self.employee['id'],
            'email_template': 'saving_spike',
            'enabled': True
        }

    def test_get_employee_emails(self):
        code, employee = self.client.employee_create(
            self.org_id, {'name': 'name1', 'auth_user_id': str(uuid.uuid4())})
        self.assertEqual(code, 201)
        patch('rest_api.rest_api_server.controllers.employee_email.'
              'EmployeeEmailController.auth_client.user_roles_get',
              return_value=(
                  200, [{'user_id': employee['auth_user_id'],
                         'role_purpose': 'optscale_member'}])).start()
        emails_num = len(set(t for t_list in ROLE_TEMPLATES.values()
                             for t in t_list))
        code, employee_emails = self.client.employee_emails_get(
            employee['id'])
        self.assertEqual(code, 200)
        self.assertEqual(len(employee_emails['employee_emails']), emails_num)
        self.assertEqual(len([x for x in employee_emails['employee_emails']
                             if x['available_by_role']]),
                         len(ROLE_TEMPLATES['optscale_member']))

        # employee is manager
        patch('rest_api.rest_api_server.controllers.employee_email.'
              'EmployeeEmailController.auth_client.user_roles_get',
              return_value=(
                  200, [{'user_id': employee['auth_user_id'],
                         'role_purpose': 'optscale_manager'}])).start()
        code, employee_emails = self.client.employee_emails_get(
            employee['id'])
        self.assertEqual(code, 200)
        self.assertEqual(len(employee_emails['employee_emails']), emails_num)
        self.assertEqual(
            len([x for x in employee_emails['employee_emails']
                 if x['available_by_role']]),
            len(ROLE_TEMPLATES['optscale_manager'] + ROLE_TEMPLATES[
                'optscale_member']))

        # employee is engineer
        patch('rest_api.rest_api_server.controllers.employee_email.'
              'EmployeeEmailController.auth_client.user_roles_get',
              return_value=(
                  200, [{'user_id': employee['auth_user_id'],
                         'role_purpose': 'optscale_engineer'}])).start()
        code, employee_emails = self.client.employee_emails_get(
            employee['id'])
        self.assertEqual(code, 200)
        self.assertEqual(len(employee_emails['employee_emails']), emails_num)
        self.assertEqual(
            len([x for x in employee_emails['employee_emails']
                 if x['available_by_role']]),
            len(ROLE_TEMPLATES['optscale_engineer'] + ROLE_TEMPLATES[
                'optscale_member']))

    def test_employee_email_get_by_email_template(self):
        code, employee_emails = self.client.employee_emails_get(
            self.employee['id'], email_template='saving_spike')
        self.assertEqual(code, 200)
        self.assertEqual(len(employee_emails['employee_emails']), 1)
        self.assertEqual(
            employee_emails['employee_emails'][0]['email_template'],
            'saving_spike'
        )

    def test_employee_email_get_invalid_employee(self):
        code, resp = self.client.employee_emails_get('employee_id')
        self.assertEqual(code, 404)
        self.assertEqual(resp['error']['error_code'], 'OE0002')

    def test_employee_email_bulk(self):
        _, resp = self.client.employee_emails_get(self.employee['id'])
        employee_email1 = resp['employee_emails'][0]['id']
        employee_email2 = resp['employee_emails'][1]['id']
        params = {
            'enable': [employee_email1],
            'disable': [employee_email2]
        }
        code, resp = self.client.employee_emails_bulk(
            self.employee['id'], params)
        self.assertEqual(code, 200)
        emp_email1 = list(filter(lambda x: x['id'] == employee_email1,
                                 resp['employee_emails']))
        self.assertEqual(emp_email1[0]['enabled'], True)
        emp_email2 = list(filter(lambda x: x['id'] == employee_email2,
                                 resp['employee_emails']))
        self.assertEqual(emp_email2[0]['enabled'], False)

    def test_employee_email_bulk_invalid_id(self):
        params = {
            'enable': ['test']
        }
        code, resp = self.client.employee_emails_bulk(
            self.employee['id'], params)
        self.assertEqual(code, 200)

    def test_employee_email_bulk_empty(self):
        _, resp = self.client.employee_emails_get(self.employee['id'])
        code, resp = self.client.employee_emails_bulk(
            self.employee['id'], {})
        self.assertEqual(code, 200)
        emails_num = len(set(t for t_list in ROLE_TEMPLATES.values()
                             for t in t_list))
        self.assertEqual(len(resp['employee_emails']), emails_num)

    def test_employee_email_bulk_unexpected(self):
        _, resp = self.client.employee_emails_get(self.employee['id'])
        code, resp = self.client.employee_emails_bulk(
            self.employee['id'], {'unexpected': 'param'})
        self.assertEqual(code, 400)
        self.assertEqual(resp['error']['error_code'], 'OE0212')

    def test_employee_email_bulk_invalid_params(self):
        for param in ['enable', 'disable']:
            for value in ['test', 123, {'test': 123}]:
                code, resp = self.client.employee_emails_bulk(
                    self.employee['id'], {param: value})
                self.assertEqual(code, 400)
                self.assertEqual(resp['error']['error_code'], 'OE0385')

    def test_employee_email_bulk_invalid_employee(self):
        code, resp = self.client.employee_emails_bulk('employee_id',
                                                      {'enable': ['test']})
        self.assertEqual(code, 404)
        self.assertEqual(resp['error']['error_code'], 'OE0002')

    def test_employee_email_not_allowed(self):
        url = self.client.employee_emails_url(self.employee['id'])
        code, _ = self.client.patch(url, {})
        self.assertEqual(code, 405)

        code, _ = self.client.post(url, {})
        self.assertEqual(code, 405)

        code, _ = self.client.delete(url, {})
        self.assertEqual(code, 405)

    def test_employee_email_bulk_not_allowed(self):
        url = self.client.employee_emails_bulk_url(self.employee['id'])
        code, _ = self.client.patch(url, {})
        self.assertEqual(code, 405)

        code, _ = self.client.get(url, {})
        self.assertEqual(code, 405)

        code, _ = self.client.delete(url, {})
        self.assertEqual(code, 405)
