import json
from datetime import datetime, timezone
from tools.optscale_exceptions.common_exc import (NotFoundException,
                                                  ForbiddenException)
from tools.optscale_exceptions.common_exc import WrongArgumentsException
from tools.optscale_exceptions.http_exc import OptHTTPError
from rest_api.rest_api_server.models.enums import CloudTypes
from rest_api.rest_api_server.controllers.cloud_account import (
    CloudAccountAsyncController)
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.handlers.v1.base_async import (
    BaseAsyncCollectionHandler, BaseAsyncItemHandler)
from rest_api.rest_api_server.handlers.v2.base import BaseHandler
from rest_api.rest_api_server.handlers.v1.base import BaseAuthHandler
from rest_api.rest_api_server.utils import (
    check_int_attribute, check_string_attribute, run_task, ModelEncoder)


class CloudAccountAsyncCollectionHandler(BaseAsyncCollectionHandler,
                                         BaseAuthHandler,
                                         BaseHandler):
    def _get_controller_class(self):
        return CloudAccountAsyncController

    def _validate_params(self, **kwargs):
        super()._validate_params(**kwargs)
        for unexpected in ['parent_id', 'root_config']:
            if unexpected in kwargs:
                raise OptHTTPError(400, Err.OE0212, [unexpected])
        cloud_type = kwargs.get('type')
        if cloud_type == CloudTypes.ENVIRONMENT.value:
            raise OptHTTPError(400, Err.OE0436, [cloud_type])

    async def post(self, **url_params):
        """
        ---
        description: |
            Create cloud account
            Required permission: MANAGE_CLOUD_CREDENTIALS
        tags: [cloud_account]
        summary: Create cloud account
        parameters:
        -   name: organization_id
            in: path
            description: Organization id
            required: true
            type: string
        -   in: body
            name: body
            description: Cloud account to add
            required: true
            schema:
                type: object
                properties:
                    name:
                        type: string
                        description: Cloud account name
                        example: AWS HQ
                    type:
                        type: string
                        enum: [aws_cnr, azure_cnr, kubernetes_cnr, alibaba_cnr,
                               azure_tenant, gcp_cnr, nebius, databricks,
                               gcp_tenant]
                        description: Cloud account type
                        example: aws_cnr
                    config:
                        type: object
                        description: Object with credentials to access cloud
                        example: {
                            "bucket_name": "opt_bucket",
                            "access_key_id": "key_id",
                            "secret_access_key": "secret"}
                    auto_import:
                        type: boolean
                        description: Is automatic import enabled? Default is True
                        example: true
                    process_recommendations:
                        type: boolean
                        description: Is recommendations enabled? Default is True
                        example: true
        responses:
            201:
                description: |
                    Success (returns created object)
            400:
                description: |
                    Wrong arguments:
                    - OE0212: Unexpected parameters
                    - OE0214: Argument should be a string
                    - OE0215: Wrong number of characters in string
                    - OE0216: Argument is not provided
                    - OE0219: Argument should be a string with valid JSON
                    - OE0223: Argument should be integer
                    - OE0224: Wrong integer argument value
                    - OE0226: Argument should be True or False
                    - OE0371: Unable to configure billing report
                    - OE0437: Can’t connect the cloud subscription
                    - OE0455: Cloud connection error
                    - OE0456: Duplicate path parameters in the request body
                    - OE0513: Cloud validation is timed out. Please retry later
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
            409:
                description: |
                    Conflict:
                    - OE0402: Cloud account entity for this account already exist
                    - OE0404: Cloud account with name already exist for organization
            503:
                description: |
                    Not found:
                    - OE0455: Cloud connection error: Could not connect to cloud by subscription: connection timed out.
        security:
        - token: []
        """
        organization_id = url_params.get('organization_id')
        cloud_type = self._request_body().get('type')
        if cloud_type == CloudTypes.ENVIRONMENT.value:
            raise OptHTTPError(400, Err.OE0436, [cloud_type])
        await self.check_permissions('MANAGE_CLOUD_CREDENTIALS',
                                     'organization', organization_id)
        try:
            await super().post(**url_params)
        except ForbiddenException as ex:
            raise OptHTTPError.from_opt_exception(403, ex)

    async def get(self, organization_id):
        """
        ---
        description: |
            Get list of cloud accounts for organization
            Required permission: INFO_ORGANIZATION or CLUSTER_SECRET
        tags: [cloud_account]
        summary: List of cloud accounts
        parameters:
        -   name: organization_id
            in: path
            description: Organization id
            required: true
            type: string
        -   name: details
            in: query
            type: boolean
            description: Resource expenses information for cloud account
            required: false
        -   name: only_linked
            in: query
            type: boolean
            description: Show only cloud account with linked set to true
            required: false
        -   name: type
            in: query
            type: string
            description: Show only cloud_account with specified cloud type
            required: false
        -   name: auto_import
            in: query
            type: boolean
            description: Show only cloud accounts with enabled auto_import
            required: false
        -   name: process_recommendations
            in: query
            type: boolean
            description: Show only cloud accounts with enabled recommendations
            required: false
        responses:
            200:
                description: Cloud accounts list
                schema:
                    type: object
                    properties:
                        cloud_account:
                            type: array
                            items:
                                type: object
                                properties:
                                    id: {type: string,
                                        description:
                                        "Unique cloud account id"}
                                    name: {type: string,
                                        description: "Cloud account name"}
                                    organization_id: {type: string,
                                        description: "Organization id"}
                                    deleted_at: {type: integer,
                                        description:
                                        "Deleted timestamp (service field)"}
                                    created_at: {type: integer,
                                        description:
                                        "Created timestamp (service field)"}
                                    type: {type: string,
                                        description: "cloud account type:
                                        ('aws_cnr','azure_cnr', 'kubernetes_cnr',
                                         'azure_tenant', 'alibaba_cnr', 'gcp_cnr',
                                         'nebius', 'databricks', 'gcp_tenant')"}
                                    config:
                                        type: object
                                        description: |
                                            Object with credentials to access
                                            cloud. See https://datatrendstech.atlassian.net/wiki/x/OgBVPQ
                                            for more info about cloud-specific parameters
                                    details:
                                        type: object
                                        properties:
                                            cost: {type: integer,
                                                description: total cost in this month}
                                            forecast: {type: integer,
                                                description: forecast for this month}
                                            last_month_cost: {type: integer,
                                                description: total cost in last month}
                                            resources: {type: integer,
                                                description: number of tracked resources}
                                            discovery_infos:
                                                type: object
                                                properties:
                                                    deleted_at: {type: integer,
                                                        description: "Deleted timestamp (service field)"}
                                                    id: {type: string,
                                                        description: "Unique discovery info id"}
                                                    created_at: {type: integer,
                                                        description: "Created timestamp (service field)"}
                                                    cloud_account_id: {type: string,
                                                        description: "Unique cloud account id"}
                                                    resource_type: {type: string,
                                                        description: "discovery resource type"}
                                                    last_discovery_at: {type: integer,
                                                        description: "Last completed discovery start timestamp"}
                                                    last_error_at: {type: integer,
                                                        description: "UTC timestamp of last error"}
                                                    last_error: {type: string,
                                                        description: "Error message of last error"}
                                    import_period:
                                        type: integer
                                        description: period in hours between data imports
                                    last_import_at:
                                        type: integer
                                        description: UTC timestamp of last successful data import
                                    last_import_modified_at:
                                        type: integer
                                        description: last imported report modification time in timestamp format
                                    auto_import:
                                        type: boolean
                                        description: Is automatic import enabled? Default is True
                                    process_recommendations:
                                        type: boolean
                                        description: Is recommendations enabled? Default is True
                                    last_import_attempt_at:
                                        type: integer
                                        description: UTC timestamp of last data import attempt
                                    last_import_attempt_error:
                                        type: string
                                        description: Error message of last data import attempt, null if no error
                                    cleaned_at:
                                        type: integer
                                        description: UTC timestamp of date when cloud account was cleaned up
            400:
                description: |
                    Wrong arguments:
                    - OE0217: Invalid query parameter
            401:
                description: |
                    Unauthorized:
                    - OE0235: Unauthorized
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0234: Forbidden
                    - OE0236: Bad secret
            404:
                description: |
                    Not found:
                    - OE0002: Organization not found
        security:
        - token: []
        - secret: []
        """
        secure = False
        if not self.check_cluster_secret(raises=False):
            secure = True
            await self.check_permissions(
                'INFO_ORGANIZATION', 'organization', organization_id)
        params = dict(
            organization_id=organization_id,
            details=self.get_arg('details', bool, False),
            secure=secure,
            only_linked=self.get_arg('only_linked', bool),
            type=self.get_arg('type', str),
        )

        auto_import = self.get_arg('auto_import', bool)
        if auto_import is not None:
            params['auto_import'] = auto_import
        process_recommendations = self.get_arg('process_recommendations', bool)
        if process_recommendations is not None:
            params['process_recommendations'] = process_recommendations

        res = await run_task(self.controller.list, **params)
        cloud_acc_dict = {'cloud_accounts': res}
        self.write(json.dumps(cloud_acc_dict, cls=ModelEncoder))


class CloudAccountAsyncItemHandler(BaseAsyncItemHandler, BaseAuthHandler,
                                   BaseHandler):
    def _get_controller_class(self):
        return CloudAccountAsyncController

    async def get(self, id, **kwargs):
        """
        ---
        description: |
            Get cloud account info by ID
            Required permission: CLUSTER_SECRET or INFO_ORGANIZATION
        tags: [cloud_account]
        summary: Get cloud account
        parameters:
        -   name: id
            in: path
            description: Cloud account ID
            required: true
            type: string
        -   name: details
            in: query
            type: boolean
            description: Resource expenses information for cloud account
            required: false
        responses:
            200:
                description: Cloud account data
                schema:
                    type: object
                    properties:
                        id: {type: string,
                            description: "Unique cloud account id"}
                        name: {type: string,
                            description: "Cloud account name"}
                        organization_id: {type: string,
                            description: "Organization id"}
                        deleted_at: {type: integer,
                            description: "Deleted timestamp (service field)"}
                        created_at: {type: integer,
                            description: "Created timestamp (service field)"}
                        type: {type: string,
                            description: "cloud account type:
                            ('aws_cnr','azure_cnr', 'alibaba_cnr',
                             'azure_tenant', 'kubernetes_cnr', 'gcp_cnr',
                             'nebius', 'databricks', 'gcp_tenant')"}
                        config: {type: object,
                            description:
                            "Object with credentials to access cloud"}
                        details:
                            type: object
                            properties:
                                cost: {type: integer,
                                    description: total cost in this month}
                                forecast: {type: integer,
                                    description: forecast for this month}
                                last_month_cost: {type: integer,
                                    description: total cost in last month}
                                resources: {type: integer,
                                    description: number of resources}
                                discovery_infos:
                                    type: object
                                    properties:
                                        deleted_at: {type: integer,
                                            description: "Deleted timestamp (service field)"}
                                        id: {type: string,
                                            description: "Unique discovery info id"}
                                        created_at: {type: integer,
                                            description: "Created timestamp (service field)"}
                                        cloud_account_id: {type: string,
                                            description: "Unique cloud account id"}
                                        resource_type: {type: string,
                                            description: "discovery resource type"}
                                        last_discovery_at: {type: integer,
                                            description: "Last completed discovery start timestamp"}
                                        last_error_at: {type: integer,
                                            description: "UTC timestamp of last error"}
                                        last_error: {type: string,
                                            description: "Error message of last error"}
                        import_period:
                            type: integer
                            description: period in hours between data imports
                        last_import_at:
                            type: integer
                            description: UTC timestamp of last successful data import
                        last_import_modified_at:
                            type: integer
                            description: last imported report modification time in timestamp format
                        auto_import:
                            type: boolean
                            description: Is automatic import enabled? Default is True
                        process_recommendations:
                            type: boolean
                            description: Is recommendations enabled? Default is True
                        last_import_attempt_at:
                            type: integer
                            description: UTC timestamp of last data import attempt
                        last_import_attempt_error:
                            type: string
                            description: Error message of last data import attempt, null if no error
                        cleaned_at:
                            type: integer
                            description: UTC timestamp of date when cloud account was cleaned up
            400:
                description: |
                    Wrong arguments:
                    - OE0217: Invalid query parameter
            401:
                description: |
                    Unauthorized:
                    - OE0235: Unauthorized
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0234: Forbidden
                    - OE0236: Bad secret
            404:
                description: |
                    Not found:
                    - OE0002: Cloud account not found
        security:
        - token: []
        - secret: []
        """
        secure = False
        if not self.check_cluster_secret(raises=False):
            secure = True
            await self.check_permissions(
                'INFO_ORGANIZATION', 'cloud_account', id)
        details = self.get_arg('details', bool, False)
        try:
            item = await self._get_item(id, **kwargs)
            self._validate_params(item, **kwargs)
        except NotFoundException as ex:
            raise OptHTTPError.from_opt_exception(404, ex)
        result = item.to_dict(secure=secure)
        if details:
            res = await run_task(
                self.controller.get_details, item.id)
            result['details'] = res
        self.write(json.dumps(result, cls=ModelEncoder))

    @staticmethod
    def _validate_params(cloud_acc, **kwargs):
        secret = kwargs.get('secret')
        validate_map = {
            'last_import_attempt_at': check_int_attribute,
            'last_import_attempt_error': check_string_attribute
        }
        for param, func in validate_map.items():
            if not secret and param in kwargs:
                raise OptHTTPError(
                    400, Err.OE0449, [param, 'cloud account'])
            value = kwargs.get(param)
            if value:
                try:
                    func(param, value)
                except WrongArgumentsException as exc:
                    raise OptHTTPError.from_opt_exception(400, exc)

        for param in ['last_import_at', 'last_import_modified_at']:
            value = kwargs.get(param)
            if value:
                if not secret and cloud_acc.type in [CloudTypes.ENVIRONMENT,
                                                     CloudTypes.KUBERNETES_CNR]:
                    raise OptHTTPError(
                        400, Err.OE0560, [cloud_acc.type.value])

                try:
                    check_int_attribute(param, value)
                except WrongArgumentsException as exc:
                    raise OptHTTPError.from_opt_exception(400, exc)
                if not secret:
                    # dates should be less than a year ago and not a date in
                    # the current month if updated by a token
                    now = datetime.now(tz=timezone.utc)
                    min_date = int(
                        now.replace(year=now.year - 1).timestamp())
                    max_date = int(now.replace(
                        day=1, hour=0, minute=0, second=0,
                        microsecond=0).timestamp()) - 1
                    if value < min_date or value > max_date:
                        raise OptHTTPError(400, Err.OE0559, [param])

    async def patch(self, id, **kwargs):
        """
        ---
        description: |
            Modifies an existing cloud account
            Required permission: MANAGE_CLOUD_CREDENTIALS or CLUSTER_SECRET
        tags: [cloud_account]
        summary: Edit cloud account
        parameters:
        -   name: id
            in: path
            description: Cloud account ID
            required: true
            type: string
        -   in: body
            name: body
            description: New cloud account
            required: false
            schema:
                type: object
                properties:
                    last_import_at:
                        type: integer
                        description: |
                            timestamp of last successful data import
                    last_import_attempt_at:
                        type: integer
                        description: |
                            Attention! This field is for internal use, it is
                            undesirable to change it! UTC timestamp of last
                            data import attempt
                    last_import_attempt_error:
                        type: string
                        description: |
                            Attention! This field is for internal use, it is
                            undesirable to change it! Error message of last
                            data import attempt, null if no error
                    last_import_modified_at:
                        type: integer
                        description: |
                            Last imported report modification time in
                            timestamp format
                    cleaned_at:
                        type: integer
                        description: |
                            Attention! This field is for internal use, it is
                            undesirable to change it! UTC timestamp of date
                            when cloud account was cleaned up
                    name:
                        type: string
                        description: Cloud account name
                    process_recommendations:
                        type: boolean
                        description: |
                            Is recommendations enabled? Default is True
                    config:
                        type: object
                        description:  |
                            Object with credentials to access
                            cloud. See https://datatrendstech.atlassian.net/wiki/x/OgBVPQ
                            for more info about cloud-specific parameters
                    auto_import:
                        type: boolean
                        description: Is automatic import enabled?
        responses:
            200: {description: Success (returns modified object)}
            400:
                description: |
                    Wrong arguments:
                    - OE0211: Parameter is immutable
                    - OE0212: Unexpected parameters
                    - OE0214: Argument should be a string
                    - OE0215: Wrong number of characters in string
                    - OE0216: Argument is not provided
                    - OE0219: Argument should be a string with valid JSON
                    - OE0223: Argument should be integer
                    - OE0224: Wrong integer argument value
                    - OE0226: Argument should be True or False
                    - OE0371: Unable to configure billing report
                    - OE0437: Can’t connect the cloud subscription
                    - OE0455: Cloud connection error
                    - OE0449: Parameter of cloud account can\'t be changed
                    - OE0559: Parameter date should be between a month and a year ago
                    - OE0560: Changing import dates is not supported for cloud account type
            401:
                description: |
                    Unauthorized:
                    - OE0235: Unauthorized
                    - OE0237: This resource requires authorization
            403:
                description: |
                    Forbidden:
                    - OE0234: Forbidden
                    - OE0236: Bad secret
            404:
                description: |
                    Not found:
                    - OE0002: Cloud account not found
            409:
                description: |
                    Conflict:
                    - OE0404: Cloud account with name already exist for organization
            503:
                description: |
                    Not found:
                    - OE0455: Cloud connection error: Could not connect to cloud by subscription: connection timed out.
        security:
        - token: []
        - secret: []
        """
        data = self._request_body()
        secret = True
        if not self.check_cluster_secret(raises=False):
            await self.check_permissions('MANAGE_CLOUD_CREDENTIALS',
                                         'cloud_account', id)
            secret = False
        item = await self._get_item(id)
        self._validate_params(item, **data, secret=secret)
        res = await run_task(self.controller.edit, id, **data)
        self.write(res.to_json())

    async def delete(self, id, **kwargs):
        """
        ---
        description: |
            Deletes cloud account with specified id
            Required permission: MANAGE_CLOUD_CREDENTIALS
        tags: [cloud_account]
        summary: Delete cloud account
        parameters:
        -   name: id
            in: path
            description: Cloud account ID
            required: true
            type: string
        responses:
            204:
                description: Success
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
                    - OE0002: Cloud account not found
        security:
        - token: []
        """
        await self.check_permissions('MANAGE_CLOUD_CREDENTIALS',
                                     'cloud_account', id)
        await super().delete(id, **kwargs)
