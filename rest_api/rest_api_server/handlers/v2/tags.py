import json

from rest_api.rest_api_server.handlers.v1.base_async import (
    BaseAsyncCollectionHandler,
    BaseAsyncItemHandler,
)
from rest_api.rest_api_server.controllers.tags import TagAsyncController
from rest_api.rest_api_server.handlers.v1.base import BaseAuthHandler
from rest_api.rest_api_server.handlers.v2.base import BaseHandler
from rest_api.rest_api_server.utils import get_resource_and_type, run_task, ModelEncoder
from tools.optscale_exceptions.http_exc import OptHTTPError
from rest_api.rest_api_server.exceptions import Err


class TagAsyncCollectionHandler(BaseAsyncCollectionHandler, BaseAuthHandler, BaseHandler):
    def _get_controller_class(self):
        return TagAsyncController

    async def post(self, **url_params):
        """
        ---
        description: |
            Create tag
            Required permission: ?
        tags: [tag]
        summary: Create tag
        parameters:
        -   name: cloud_account_id
            in: path
            description: Id of the cloud account for which tag is created
            required: false
            type: string
        -   name: organization_id
            in: path
            description: Id of the organization for which tag is created
            required: false
            type: string
        -   in: body
            name: body
            description: Tag to add
            required: true
            schema:
                type: object
                properties:
                    name:
                        type: string
                        description: Tag name
                        example: version
                    value:
                        type: string
                        description: Tag value
                        example: v1.0.1
        responses:
            201:
                description: Success
                schema:
                    type: object
                    properties:
                        id:
                            type: string
                            description: "Unique tag id"
                        deleted_at:
                            type: integer
                            description: "Deleted timestamp (service field)"
                        created_at:
                            type: integer
                            description: "Created timestamp (service field)"
                        updated_at:
                            type: integer
                            description: "Updated timestamp"
                        resource_id:
                            type: string
                            description: "Tag resource id"
                        name:
                            type: string
                            description: "Tag name"
                        value:
                            type: string
                            description: "Tag value"
                        type_id:
                            type: integer
                            description: "Tag type id"
            400:
                description: |
                    Wrong arguments:
                    - OE0174: Type is invalid
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
                    - OE0002: Resource not found
                    - OE0005: Type doesn't exist
        security:
        - token: []
        """
        data = self._request_body()
        data["resource_id"], data["tag_type"] = get_resource_and_type(url_params)
        res = await run_task(self.controller.create, **data)
        self.set_status(201)
        self.write(res.to_json())

    async def get(self, **url_params):
        """
        ---
        description: |
            Get a list of tags for resource
            Required permission: ?
        tags: [tag]
        summary: List of tags
        parameters:
        -   name: cloud_account_id
            in: path
            description: Id of the cloud account for which tag is created
            required: false
            type: string
        -   name: organization_id
            in: path
            description: Id of the organization for which tag is created
            required: false
            type: string
        responses:
            200:
                description: Tags list
                schema:
                    type: array
                    items:
                        type: object
                        properties:
                            id:
                                type: string
                                description: "Unique tag id"
                            deleted_at:
                                type: integer
                                description: "Deleted timestamp (service field)"
                            created_at:
                                type: integer
                                description: "Created timestamp (service field)"
                            updated_at:
                                type: integer
                                description: "Updated timestamp"
                            resource_id:
                                type: string
                                description: "Tag resource id"
                            name:
                                type: string
                                description: "Tag name"
                            value:
                                type: string
                                description: "Tag value"
                            type_id:
                                type: integer
                                description: "Tag type id"
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
                    - OE0002: Resource not found
                    - OE0005: Type doesn't exist
        """
        resource_id, tag_type = get_resource_and_type(url_params)
        res = await run_task(self.controller.list, resource_id=resource_id, tag_type=tag_type)
        self.write(json.dumps(res, cls=ModelEncoder))


class TagAsyncItemHandler(BaseAsyncItemHandler, BaseAuthHandler, BaseHandler):
    def _get_controller_class(self):
        return TagAsyncController

    async def get(self, tag_name, **url_params):
        """
        ---
        description: |
            Get tag by name
            Required permission: ?
        tags: [tag]
        summary: Get tag
        parameters:
        -   name: tag_name
            in: path
            description: Tag name
            required: true
            type: string
        -   name: cloud_account_id
            in: path
            description: Id of the cloud account related with tag
            required: false
            type: string
        -   name: organization_id
            in: path
            description: Id of the organization related with tag
            required: false
            type: string
        responses:
            200:
                description: Tag data
                schema:
                    type: object
                    properties:
                        id:
                            type: string
                            description: "Unique tag id"
                        deleted_at:
                            type: integer
                            description: "Deleted timestamp (service field)"
                        created_at:
                            type: integer
                            description: "Created timestamp (service field)"
                        updated_at:
                            type: integer
                            description: "Updated timestamp"
                        resource_id:
                            type: string
                            description: "Tag resource id"
                        name:
                            type: string
                            description: "Tag name"
                        value:
                            type: string
                            description: "Tag value"
                        type_id:
                            type: integer
                            description: "Tag type id"
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
                    - OE0002: Tag not found
                    - OE0002: Resource not found
                    - OE0005: Type doesn't exist
        """
        resource_id, tag_type = get_resource_and_type(url_params)
        res = await run_task(
            self.controller.get,
            tag_name,
            resource_id=resource_id,
            tag_type=tag_type,
        )

        self.write(res.to_json())

    def _validate_params(self, item, **kwargs):
        if "resource_id" in kwargs:
            raise OptHTTPError(400, Err.OE0212, ["resource_id"])

    async def patch(self, tag_name, **url_params):
        """
        ---
        description: |
            Modifies an existing tag
            Required permission: ?
        tags: [tag]
        summary: Edit tag
        parameters:
        -   name: tag_name
            in: path
            description: Tag name
            required: true
            type: string
        -   name: cloud_account_id
            in: path
            description: Id of the cloud account related with tag
            required: false
            type: string
        -   name: organization_id
            in: path
            description: Id of the organization related with tag
            required: false
            type: string
        -   in: body
            name: body
            description: New tag
            required: false
            schema:
                type: object
                properties:
                    name:
                        type: string
                        description: Tag name
                        example: version
                    value:
                        type: string
                        description: Tag value
                        example: v1.0.1
        responses:
            200: {description: Success (returns modified object)}
            400:
                description: |
                    Wrong arguments:
                    - OE0211: Parameter is immutable
                    - OE0212: Unexpected parameters
                    - OE0214: Argument should be a string
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
                    - OE0002: Tag not found
                    - OE0002: Resource not found
                    - OE0005: Type doesn't exist
            409:
                description: |
                    Conflict:
                    - OE0149: Tag with name already exists
        """
        data = self._request_body()
        self._validate_params(tag_name, **data)

        resource_id, tag_type = get_resource_and_type(url_params)

        res = await run_task(
            self.controller.edit,
            tag_name,
            resource_id=resource_id,
            tag_type=tag_type,
            **data,
        )

        self.write(res.to_json())

    async def delete(self, tag_name, **url_params):
        """
        ---
        description: |
            Deletes tag by name
            Required permission: ?
        tags: [tag]
        summary: Delete tag
        parameters:
        -   name: tag_name
            in: path
            description: Tag name
            required: true
            type: string
        -   name: cloud_account_id
            in: path
            description: Id of the cloud account related with tag
            required: false
            type: string
        -   name: organization_id
            in: path
            description: Id of the organization related with tag
            required: false
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
                    - OE0002: Tag not found
                    - OE0002: Resource not found
                    - OE0005: Type doesn't exist
        """
        resource_id, tag_type = get_resource_and_type(url_params)
        await run_task(
            self.controller.delete,
            tag_name,
            resource_id=resource_id,
            tag_type=tag_type,
        )
        self.set_status(204)
