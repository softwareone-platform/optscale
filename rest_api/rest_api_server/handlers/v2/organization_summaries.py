import json
import logging

from rest_api.rest_api_server.controllers.organization_summary import (
    OrganizationSummaryAsyncController)
from rest_api.rest_api_server.handlers.v2.base import BaseHandler
from rest_api.rest_api_server.handlers.v1.base_async import BaseAsyncCollectionHandler
from rest_api.rest_api_server.handlers.v1.base import BaseAuthHandler
from rest_api.rest_api_server.utils import ModelEncoder, run_task
from tools.optscale_exceptions.http_exc import OptHTTPError
from rest_api.rest_api_server.exceptions import Err

LOG = logging.getLogger(__name__)


class OrganizationSummariesAsyncHandler(BaseAsyncCollectionHandler,
                                        BaseAuthHandler,
                                        BaseHandler):
    def _get_controller_class(self):
        return OrganizationSummaryAsyncController

    def post(self, **kwargs):
        self.raise405()

    def _validate_entities(self, entities):
        if not entities:
            return
        available_entities = [
            'employees', 'cloud_accounts', 'month_expenses'
        ]
        if any(x not in available_entities for x in entities):
            raise OptHTTPError(400, Err.OE0217, ['entity'])

    async def get(self, organization_id, **url_params):
        """
        ---
        description: |
            Getting the number of entities in organization
            Required permission: INFO_ORGANIZATION or CLUSTER_SECRET
        tags: [organization_summary]
        summary: Getting the number of entities in organization
        parameters:
        -   name: entity
            in: query
            description: >
                entities to calculate
                [cloud_accounts, employees, month_expenses]
            required: false
            type: array
            collectionFormat: multi
            items:
                type: string
        responses:
            200:
                description: Organization entities summary
                schema:
                    type: object
                    properties:
                        id: {type: string,
                            description: "Unique organization id"}
                        name: {type: string,
                            description: "Organization display name"}
                        deleted_at: {type: string,
                            description: "Deleted timestamp
                            (service field)"}
                        created_at: {type: integer,
                            description: "Creation timestamp
                            (service field)"}
                        is_demo: {type: boolean,
                            description: "Is demo organization or not"}
                        currency: {type: string,
                            description: "Organization currency"}
                        disabled: {type: boolean,
                            description: "Is organization disabled"}
                        entities:
                            type: object
                            properties:
                                cloud_accounts:
                                    type: integer
                                    description: Number of cloud accounts
                                employees:
                                    type: integer
                                    description: Number of employees
                                month_expenses:
                                    type: object
                                    description: Month expenses map
            400:
                description: |
                    Wrong arguments:
                    - OE0217: Invalid entity
            401:
                description: |
                    Unauthorized:
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0236: Bad secret
        security:
        - token: []
        """
        if not self.check_cluster_secret(raises=False):
            await self.check_permissions(
                'INFO_ORGANIZATION', 'organization', organization_id)
        entities = self.get_arg('entity', str, [], repeated=True)
        if entities:
            self._validate_entities(entities)
        res = await run_task(self.controller.get, organization_id, entities)
        self.write(json.dumps(res, cls=ModelEncoder))
