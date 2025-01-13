import json
from rest_api.rest_api_server.controllers.employee_email import (
    EmployeeEmailAsyncController
)
from rest_api.rest_api_server.handlers.v1.base_async import (
    BaseAsyncCollectionHandler
)
from rest_api.rest_api_server.handlers.v1.base import BaseAuthHandler
from rest_api.rest_api_server.handlers.v2.base import BaseHandler
from rest_api.rest_api_server.utils import (
    check_list_attribute, ModelEncoder, raise_unexpected_exception, run_task
)
from tools.optscale_exceptions.common_exc import WrongArgumentsException
from tools.optscale_exceptions.http_exc import OptHTTPError


class EmployeeEmailsAsyncCollectionHandler(BaseAsyncCollectionHandler,
                                           BaseAuthHandler, BaseHandler):
    def _get_controller_class(self):
        return EmployeeEmailAsyncController

    async def get(self, employee_id):
        """
        ---
        description: |
            Gets a list of employee emails.
            Required permission: INFO_ORGANIZATION or CLUSTER_SECRET
        tags: [employee_emails]
        summary: List of employee emails
        parameters:
        -   name: employee_id
            in: path
            description: Id of employee
            required: true
            type: string
        -   name: email_template
            in: query
            description: Name of email template
            required: false
            type: string
        responses:
            200:
                description: Employee emails list
                schema:
                    type: object
                    properties:
                        employee_emails:
                            type: array
                            items:
                                type: object
                                properties:
                                    id:
                                        type: string
                                        description: Employee email id
                                    deleted_at:
                                        type: string
                                        description: |
                                            Deleted timestamp (service field)
                                    employee_id:
                                        type: string
                                        description: Employee id
                                    enabled:
                                        type: boolean
                                        description: Is email sending enabled
                                    email_template:
                                        type: string
                                        description: Email template name
            401:
                description: |
                    Unauthorized:
                    - OE0235: Unauthorized
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0236: Bad secret
            404:
                description: |
                    Not found:
                    - OE0002: Employee not found
        security:
        - token: []
        - secret: []
        """
        if not self.check_cluster_secret(raises=False):
            await self.check_permissions(
                'INFO_ORGANIZATION', 'employee', employee_id)
        email_template = self.get_arg('email_template', str, None)
        res = await run_task(self.controller.list, employee_id,
                             email_template=email_template)
        self.write(json.dumps(res, cls=ModelEncoder))

    def post(self, *args, **kwargs):
        self.raise405()


class EmployeeEmailsBulkAsyncCollectionHandler(BaseAsyncCollectionHandler,
                                               BaseAuthHandler, BaseHandler):
    def _get_controller_class(self):
        return EmployeeEmailAsyncController

    def get(self, *args, **kwargs):
        self.raise405()

    def _validate_params(self, **kwargs):
        allowed_params = ['enable', 'disable']
        try:
            args_unexpected = list(filter(
                lambda x: x not in allowed_params,
                kwargs.keys()))
            if args_unexpected:
                raise_unexpected_exception(args_unexpected)
            for param in allowed_params:
                if param in kwargs and kwargs[param]:
                    check_list_attribute(param, kwargs[param])
        except WrongArgumentsException as ex:
            raise OptHTTPError.from_opt_exception(400, ex)

    async def post(self, employee_id):
        """
        ---
        description: |
            Bulk update employee emails
            Required permission: INFO_ORGANIZATION
        tags: [employee_emails]
        summary: Bulk update employee emails
        parameters:
        -   name: employee_id
            in: path
            description: Employee id
            required: true
            type: string
        -   in: body
            name: body
            description: Ids of employee emails to enable/disable
            required: true
            schema:
                type: object
                required: true
                properties:
                    enable:
                        type: array
                        description: list of employee emails ids to enable
                        items:
                            type: string
                            description: employee email id
                    disable:
                        type: array
                        description: list of employee emails ids to disable
                        items:
                            type: string
                            description: employee email id
        responses:
            200:
                description: Employee emails data
            400:
                description: |
                    Wrong arguments:
                    - OE0385: Argument should be a list
                    - OE0212: Unexpected parameters
            401:
                description: |
                    Unauthorized:
                    - OE0237: This resource requires authorization
            404:
                description: |
                    Not found:
                    - OE0002: Employee not found
        security:
        - token: []
        """
        await self.check_permissions(
            'INFO_ORGANIZATION', 'employee', employee_id)
        data = self._request_body()
        self._validate_params(**data)
        res = await run_task(
            self.controller.bulk_update, employee_id, **data
        )
        self.write(json.dumps(res, cls=ModelEncoder))
