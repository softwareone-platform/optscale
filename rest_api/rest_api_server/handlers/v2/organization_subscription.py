import json
from rest_api.rest_api_server.controllers.organization_subscription import (
    OrganizationSubscriptionAsyncController)
from rest_api.rest_api_server.handlers.v1.base_async import (
    BaseAsyncCollectionHandler, BaseAsyncItemHandler)
from rest_api.rest_api_server.handlers.v1.base import BaseAuthHandler
from rest_api.rest_api_server.utils import run_task, ModelEncoder
from rest_api.rest_api_server.models.enums import RolePurposes
from rest_api.rest_api_server.exceptions import Err
from tools.optscale_exceptions.http_exc import OptHTTPError


class OrganizationSubscriptionItemHandler(BaseAsyncItemHandler, BaseAuthHandler):
    def _get_controller_class(self):
        return OrganizationSubscriptionAsyncController

    async def patch(self, organization_id, **kwargs):
        """
        ---
        description: |
            Edit subscription
            Required permission: TOKEN
        tags: [subscription]
        summary: Change subscription
        parameters:
        -   name: organization_id
            in: path
            description: Organization ID
            required: true
            type: string
        -   in: body
            name: body
            description: Update info
            required: true
            schema:
                type: object
                properties:
                    plan_id:
                        type: string
                        example: 44e262cb-d861-45c4-ac85-aaef8edf90f0
                        description: new plan id
                        required: False
        responses:
            200:
                description: Success
                schema:
                    type: object
                    properties:
                        result: Change result
                        url: billing portal url
            400:
                description: |
                    Wrong arguments:
                    - OE0287: Bad request
            404:
                description: |
                    Not found:
                    - OE0002: Object not found
            401:
                description: |
                    Unauthorized:
                    - OE0235: Unauthorized
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0234: Forbidden
        security:
        - token: []
        """
        data = self._request_body()
        plan_id = data.get('plan_id')
        await self.check_permissions(
            'INFO_ORGANIZATION', 'organization', organization_id)
        await self._check_manager_access(organization_id)
        res = await run_task(self.controller.edit, organization_id, plan_id)
        self.write(json.dumps(res, cls=ModelEncoder))

    async def _check_manager_access(self, organization_id, **kwargs):
        user_id = await self.check_self_auth()
        user_roles = await self.get_roles_info(
            [user_id], [RolePurposes.optscale_manager.value])
        resource_ids = {
            user_role.get('assignment_resource_id') for user_role in user_roles
        }
        if organization_id not in resource_ids:
            raise OptHTTPError(403, Err.OE0234, [])

    async def get(self, organization_id, **kwargs):
        """
        ---
        description: |
            Get current subscription info
            Required permission: INFO_ORGANIZATION
        tags: [subscription]
        summary: Get subscription info
        parameters:
        -   name: organization_id
            in: path
            description: Organization ID
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
                            description: Unique subscription id
                        quantity:
                            type: string
                            description: Subscription quantity
                        status:
                            type: string
                            description: Subscription status
                        stripe_status:
                            type: string
                            description: Stripe status for subscription
                        end_date:
                            type: integer
                            description: End date timestamp for subscription
                        grace_period_start:
                            type: integer
                            description: Grace period start timestamp
                        cancel_at_period_end:
                            type: integer
                            description: Cancel date timestamp for subscription
                        plan:
                            type: object
                            properties:
                                id:
                                    type: string
                                    description: Plan id
                                created_at:
                                    type: string
                                    description: Plan created at timestamp
                                deleted_at:
                                    type: string
                                    description: Plan deleted at timestamp
                                default:
                                    type: string
                                    description: Plan is default
                                name:
                                    type: string
                                    description: Plan name
                                price_id:
                                    type: string
                                    description: Plan price
                                customer_id:
                                    type: string
                                    description: Plan customer id
                                limits:
                                    type: object
                                    description: Plan limits
                                trial_days:
                                    type: integer
                                    description: Number of days to trial for plan
                                grace_period_days:
                                    type: integer
                                    description: Number of days for grace period
                                price:
                                    type: float
                                    description: plan's price
                                currency:
                                    type: string
                                    description: plan's currency
                                qty_unit:
                                    type: string
                                    description: quantity-related entity
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
                    - OE0002: Subscription not found
        security:
        - token: []
        """
        await self.check_permissions(
            'INFO_ORGANIZATION', 'organization', organization_id)
        res = await run_task(self.controller.get, organization_id)
        self.write(json.dumps(res, cls=ModelEncoder))

    def delete(self, organization_id, **kwargs):
        self.raise405()


class PlanAsyncCollectionHandler(BaseAsyncCollectionHandler, BaseAuthHandler):
    def _get_controller_class(self):
        return OrganizationSubscriptionAsyncController

    async def get(self, organization_id, **kwargs):
        """
        ---
        description: |
            Get list of available plans for organization
            Required permission: INFO_ORGANIZATION
        tags: [subscription]
        summary: Get list of available plans for organization
        parameters:
        -   name: organization_id
            in: path
            description: Organization ID
            required: true
            type: string
        responses:
            200:
                description: Plan list
                schema:
                    type: object
                    properties:
                        plans:
                            type: array
                            items:
                                type: object
                                properties:
                                    id:
                                        type: string
                                        description: Plan id
                                    created_at:
                                        type: string
                                        description: Plan created at timestamp
                                    deleted_at:
                                        type: string
                                        description: Plan deleted at timestamp
                                    default:
                                        type: string
                                        description: Plan is default
                                    name:
                                        type: string
                                        description: Plan name
                                    price_id:
                                        type: string
                                        description: Plan price
                                    customer_id:
                                        type: string
                                        description: Plan customer id
                                    limits:
                                        type: object
                                        description: Plan limits
                                    trial_days:
                                        type: integer
                                        description: Number of days to trial for plan
                                    grace_period_days:
                                        type: integer
                                        description: Number of days for grace period
                                    price:
                                        type: float
                                        description: plan's price
                                    currency:
                                        type: string
                                        description: plan's currency
                                    qty_unit:
                                        type: string
                                        description: quantity-related entity
            401:
                description: |
                    Unauthorized:
                    - OE0235: Unauthorized
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0234: Forbidden
        security:
        - token: []
        """
        await self.check_permissions(
            'INFO_ORGANIZATION', 'organization', organization_id)
        res = await run_task(self.controller.plan_list, organization_id)
        plan_dict = {'plans': res}
        self.write(json.dumps(plan_dict, cls=ModelEncoder))

    def post(self, organization_id, **kwargs):
        self.raise405()
