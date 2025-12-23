from unittest.mock import patch
from rest_api.rest_api_server.tests.unittests.test_api_base import TestApiBase


class TestSubscriptionsApi(TestApiBase):
    def setUp(self, version='v2'):
        super().setUp(version)
        _, org = self.client.organization_create({'name': "organization"})
        self.organization_id = org['id']
        patch('optscale_client.config_client.client.Client.stripe_settings',
              return_value={'enabled': True}).start()
        patch('rest_api.rest_api_server.handlers.v2.organization_subscription'
              '.OrganizationSubscriptionItemHandler._check_manager_access').start()

    def test_endpoint_method(self):
        code, _ = self.client.delete(
            self.client.subscription_url(self.organization_id))
        self.assertEqual(code, 405)
        code, _ = self.client.post(
            self.client.subscription_url(self.organization_id), {})
        self.assertEqual(code, 405)
        code, _ = self.client.delete(
            self.client.subscription_plan_url(self.organization_id))
        self.assertEqual(code, 405)
        code, _ = self.client.post(
            self.client.subscription_plan_url(self.organization_id), {})
        self.assertEqual(code, 405)
        code, _ = self.client.patch(
            self.client.subscription_plan_url(self.organization_id), {})
        self.assertEqual(code, 405)

    def test_disabled_billing(self):
        patch('optscale_client.config_client.client.Client.stripe_settings',
              return_value={'enabled': False}).start()
        code, _ = self.client.subscription_get(self.organization_id)
        self.assertEqual(code, 403)
        code, _ = self.client.subscription_update(self.organization_id, {})
        self.assertEqual(code, 403)
        code, _ = self.client.subscription_plan_list(self.organization_id)
        self.assertEqual(code, 403)

    def test_get_subscription(self):
        _return_value = {'id': str(self.organization_id)}
        patch('rest_api.rest_api_server.controllers.organization_subscription.'
              'OrganizationSubscriptionController._get',
              return_value=_return_value).start()
        code, resp = self.client.subscription_get(self.organization_id)
        self.assertEqual(code, 200)
        self.assertEqual(resp, _return_value)

    def test_update_subscription(self):
        _return_value = {'id': str(self.organization_id)}
        patch('rest_api.rest_api_server.controllers.organization_subscription.'
              'OrganizationSubscriptionController._edit',
              return_value=_return_value).start()
        code, resp = self.client.subscription_update(
            self.organization_id, {})
        self.assertEqual(code, 200)
        self.assertEqual(resp, _return_value)

    def test_plan_list(self):
        _return_value = [{'id': str(self.organization_id)}]
        patch('rest_api.rest_api_server.controllers.organization_subscription.'
              'OrganizationSubscriptionController._plan_list',
              return_value=_return_value).start()
        code, resp = self.client.subscription_plan_list(self.organization_id)
        self.assertEqual(code, 200)
        self.assertEqual(resp, {'plans': _return_value})
