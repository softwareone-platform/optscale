import json
from rest_api.rest_api_server.controllers.profiling.profiling_token import (
    ProfilingTokenAsyncController)
from rest_api.rest_api_server.handlers.v1.base_async import (
    BaseAsyncCollectionHandler, BaseAsyncItemHandler)
from rest_api.rest_api_server.handlers.v1.base import BaseAuthHandler
from rest_api.rest_api_server.utils import run_task


class ProfilingTokenAsyncCollectionHandler(BaseAsyncCollectionHandler,
                                           BaseAuthHandler):
    def _get_controller_class(self):
        return ProfilingTokenAsyncController

    async def post(self, _organization_id, **_url_params):
        self.raise405()

    async def get(self, organization_id, **url_params):
        """
        ---
        description: |
            Get organization profiling token
            Required permission: INFO_ORGANIZATION or CLUSTER_SECRET
        tags: [profiling_tokens]
        summary: Organization profiling token
        parameters:
        -   name: organization_id
            in: path
            description: Organization id
            required: true
            type: string
        responses:
            200:
                description: Organization profiling token
                schema:
                    type: object
                    properties:
                        id:
                            type: string
                            description: Unique profiling token id
                        token:
                            type: string
                            description: Profiling token
                        organization_id:
                            type: string
                            description: Organization id
                        md5_token:
                            type: string
                            description: MD5 hash of profiling token
                        created_at:
                            type: integer
                            description: Created at timestamp
                        deleted_at:
                            type: integer
                            description: Deleted at timestamp
            401:
                description: |
                    Unauthorized:
                    - OE0235: Unauthorized
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0234: Forbidden
            404:
                description: |
                    Not found:
                    - OE0002: Organization not found
        security:
        - token: []
        """
        if not self.check_cluster_secret(raises=False):
            await self.check_permissions(
                'INFO_ORGANIZATION', 'organization', organization_id)
        res = await run_task(self.controller.get,
                             organization_id=organization_id)
        self.write(json.dumps(res))


class ProfilingTokenInfoAsyncItemHandler(BaseAsyncItemHandler,
                                         BaseAuthHandler):
    def _get_controller_class(self):
        return ProfilingTokenAsyncController

    async def patch(self, profiling_token, **kwargs):
        self.raise405()

    async def delete(self, profiling_token, **kwargs):
        self.raise405()

    async def get(self, profiling_token, **url_params):
        """
        ---
        description: |
            Get profiling token info
            Required permission: CLUSTER_SECRET
        tags: [profiling_tokens]
        summary: Get profiling token info by profiling token value
        parameters:
        -   name: profiling_token
            in: path
            description: Profiling token value
            required: true
            type: string
        responses:
            200:
                description: Organization profiling token info
                schema:
                    type: object
                    properties:
                        id:
                            type: string
                            description: Unique profiling token id
                        token:
                            type: string
                            description: Profiling token
                        organization_id:
                            type: string
                            description: Organization id
                        created_at:
                            type: integer
                            description: Organization id
                        deleted_at:
                            type: integer
                            description: Organization id
            401:
                description: |
                    Unauthorized:
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0236: Bad secret
        security:
        - secret: []
        """
        self.check_cluster_secret(raises=True)
        res = await run_task(self.controller.get_profiling_token_info,
                             profiling_token=profiling_token)
        self.write(res.to_json())
