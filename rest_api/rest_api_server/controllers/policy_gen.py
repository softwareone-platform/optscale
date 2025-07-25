import json
import etcd
import boto3
import logging

from rest_api.rest_api_server.controllers.base import BaseController
from rest_api.rest_api_server.controllers.base_async import (
    BaseAsyncControllerWrapper)
from tools.optscale_exceptions.common_exc import (
    WrongArgumentsException, FailedDependency)
from rest_api.rest_api_server.exceptions import Err

LOG = logging.getLogger(__name__)


class PolicyGeneratorController(BaseController):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    supported_clouds = ["aws_cnr"]

    aws_policy_role_template = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AllowCURAndBCMToWriteToS3",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject",
                    "s3:GetObject",
                    "s3:GetBucketPolicy"
                ],
                "Resource": [
                    "arn:aws:s3:::%s",
                    "arn:aws:s3:::%s/*"
                ]
            },
            {
                "Sid": "AllowCostAndUsageReports",
                "Effect": "Allow",
                "Action": [
                    "cur:DescribeReportDefinitions"
                ],
                "Resource": "*"
            },
            {
                "Sid": "AllowS3AndIAMOperations",
                "Effect": "Allow",
                "Action": [
                    "s3:GetBucketPublicAccessBlock",
                    "s3:GetBucketPolicyStatus",
                    "s3:GetBucketTagging",
                    "s3:GetBucketAcl",
                    "s3:GetBucketLocation",
                    "s3:ListBucket",
                    "s3:PutBucketPolicy",
                    "s3:ListAllMyBuckets",
                    "iam:GetAccessKeyLastUsed",
                    "iam:GetLoginProfile",
                    "iam:ListUsers",
                    "iam:ListAccessKeys"
                ],
                "Resource": "*"
            },
            {
                "Sid": "AllowMonitoringAndInfrastructureReadOnly",
                "Effect": "Allow",
                "Action": [
                    "cloudwatch:GetMetricStatistics",
                    "ec2:Describe*",
                    "elasticloadbalancing:Describe*"
                ],
                "Resource": "*"
            },
            {
                "Sid": "AllowBCMExports",
                "Effect": "Allow",
                "Action": [
                    "bcm-data-exports:ListExports",
                    "bcm-data-exports:GetExport",
                    "bcm-data-exports:CreateExport"
                ],
                "Resource": "*"
            },
            {
                "Sid": "OptScaleOperations",
                "Effect": "Allow",
                "Action": [
                    "s3:GetBucketPublicAccessBlock",
                    "s3:GetBucketPolicyStatus",
                    "s3:GetBucketTagging",
                    "iam:GetAccessKeyLastUsed",
                    "cloudwatch:GetMetricStatistics",
                    "s3:GetBucketAcl",
                    "ec2:Describe*",
                    "ec2:StartInstances",
                    "ec2:StopInstances",
                    "s3:ListAllMyBuckets",
                    "iam:ListUsers",
                    "s3:GetBucketLocation",
                    "iam:GetLoginProfile",
                    "cur:DescribeReportDefinitions",
                    "iam:ListAccessKeys",
                    "elasticloadbalancing:Describe*"
                ],
                "Resource": "*"
            }
        ]
    }

    aws_trust_rel_template = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "AWS": "arn:aws:iam::%s:root"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }

    @staticmethod
    def _get_aws_account_id(access_key_id, secret_access_key,
                            session_token=None, region='us-east-1'):
        sts = boto3.client(
            'sts',
            aws_access_key_id=access_key_id,
            aws_secret_access_key=secret_access_key,
            aws_session_token=session_token,
            region_name=region
        )
        response = sts.get_caller_identity()
        return response['Account']

    def get_aws_account_id(self):
        try:
            service_creds = self._config.read_branch(
                '/service_credentials/aws/')
        except etcd.EtcdKeyNotFound:
            raise FailedDependency(Err.OE0569, [])
        try:
            account_id = self._get_aws_account_id(**service_creds)
        except Exception as exc:
            LOG.info("error getting account id: %s", str(exc))
            raise FailedDependency(Err.OE0570, [exc])
        return account_id

    def generate_aws_role_policy(self, bucket_name):
        return json.loads(
            json.dumps(self.aws_policy_role_template) % (
                bucket_name, bucket_name))

    def generate_aws_trust_rel_template(self, account_id):
        return json.loads(
            json.dumps(self.aws_trust_rel_template) % account_id)

    def generate_policies(self, cloud_type, bucket_name):
        if cloud_type not in self.supported_clouds:
            raise WrongArgumentsException(Err.OE0436, [cloud_type])
        account_id = self.get_aws_account_id()
        return {
            "role_policy": self.generate_aws_role_policy(bucket_name),
            "trust_policy": self.generate_aws_trust_rel_template(account_id),
        }


class PolicyGeneratorControllerAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return PolicyGeneratorController
