import json

from rest_api.rest_api_server.controllers.policy_gen import (
    PolicyGeneratorControllerAsyncController)
from rest_api.rest_api_server.handlers.v2.base import BaseHandler
from rest_api.rest_api_server.handlers.v1.base import BaseAuthHandler
from rest_api.rest_api_server.utils import run_task, ModelEncoder
from tools.optscale_exceptions.http_exc import OptHTTPError
from rest_api.rest_api_server.exceptions import Err


class PolicyGeneratorAsyncCollectionHandler(BaseAuthHandler, BaseHandler):
    def _get_controller_class(self):
        return PolicyGeneratorControllerAsyncController

    async def get(self, organization_id, **kwargs):
        """
        ---
        description: |
            Get clou policy for assumed accounts for organization
            Required permission: INFO_ORGANIZATION
        tags: [cloud_policy]
        summary: Policies for assumed cloud account
        parameters:
        -   name: organization_id
            in: path
            description: Organization id
            required: true
            type: string
        -   name: cloud_type
            in: query
            type: string
            description: Cloud type
            required: true
        -   name: bucket_name
            in: query
            type: string
            description: Bucket name
            required: true
        responses:
            200:
                description: Cloud accounts list
            400:
                description: |
                    Wrong arguments:
                    - OE0212: Unexpected parameters
                    - OE0436: Provided unsupported cloud type
                    - OE0548: Argument is required

            401:
                description: |
                    Unauthorized:
                    - OE0235: Unauthorized
            424:
                description: |
                    Failed dependency:
                    - OE0570: Failed to get account id

        security:
        - token: []
        - secret: []
        """
        await self.check_permissions(
                'INFO_ORGANIZATION', 'organization', organization_id)
        args = self._request_arguments()
        allowed_args = ('bucket_name', 'cloud_type')
        for param in allowed_args:
            val = args.get(param)
            if not val:
                raise OptHTTPError(400, Err.OE0548, [param])
        unexpected_args = list(filter(lambda x: x not in allowed_args,
                                      args.keys()))
        if unexpected_args:
            message = ', '.join(unexpected_args)
            raise OptHTTPError(400, Err.OE0212, [message])
        cloud_type = self.get_argument('cloud_type')
        bucket_name = self.get_argument('bucket_name')
        res = await run_task(self.controller.generate_policies,
                             cloud_type, bucket_name)
        self.write(json.dumps(res, cls=ModelEncoder))
