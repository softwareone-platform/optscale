import os
from unittest.mock import patch
from rest_api.rest_api_server.tests.unittests.test_api_base import TestApiBase


class TestCloudPolicyGeneratorApi(TestApiBase):

    def setUp(self, version='v2'):
        super().setUp(version)
        _, self.org = self.client.organization_create({'name': "organization"})
        self.org_id = self.org['id']
        patch('rest_api.rest_api_server.controllers.policy_gen.PolicyGeneratorController.'
              'get_aws_account_id',
              return_value=5555555555555551).start()

    def test_generate_policy_ok(self):
        code, result = self.client.cloud_policy_get(self.org_id, "aws_cnr",
                                                    "test")
        self.assertTrue(result.get("role_policy", {}).get("Statement"))
        self.assertTrue(result.get("trust_policy", {}).get("Statement"))

    def test_invalid_cloud(self):
        code, result = self.client.cloud_policy_get(self.org_id, "invalid",
                                                    "test")
        self.assertEqual(code, 400)
        self.assertEqual(result["error"]["error_code"], "OE0436")

    def test_missing_arg(self):
        url = self.client.cloud_policy_url(self.org_id) + self.client.query_url(
            bucket_name="test"
        )
        code, result = self.client.get(url)
        self.assertEqual(code, 400)
        self.assertEqual(result["error"]["error_code"], "OE0548")

    def test_unexpected_arg(self):
        url = self.client.cloud_policy_url(self.org_id) + self.client.query_url(
            cloud_type="aws_cnr", bucket_name="my_bucket", unexpected="test"
        )
        code, result = self.client.get(url)
        self.assertEqual(code, 400)
        self.assertEqual(result["error"]["error_code"], "OE0212")
