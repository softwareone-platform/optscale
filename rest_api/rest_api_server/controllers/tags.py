from sqlalchemy import and_, exists

import tools.optscale_time as opttime
from rest_api.rest_api_server.controllers.base import BaseController
from rest_api.rest_api_server.controllers.base_async import BaseAsyncControllerWrapper
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.models.enums import TagTypes
from rest_api.rest_api_server.models.models import Tag, Type, CloudAccount, Organization

from tools.optscale_exceptions.common_exc import (
    ConflictException,
    NotFoundException,
    WrongArgumentsException,
)


class TagBaseController(BaseController):
    def _get_model_type(self):
        return Tag

    def get_type_id(self, type_name):
        type_id = self.session.query(Type.id).filter(
            Type.name == type_name,
            Type.deleted_at.is_(False),
        ).scalar()

        if type_id is None:
            raise NotFoundException(
                Err.OE0005, [Type.__name__, type_name]
            )

        return type_id

    @staticmethod
    def get_resource_model(tag_type):
        if tag_type == TagTypes.CLOUD_ACCOUNT.value:
            return CloudAccount
        if tag_type == TagTypes.ORGANIZATION.value:
            return Organization
        raise WrongArgumentsException(Err.OE0174, [tag_type])

    def check_resource_exists(self, tag_type, resource_id):
        resource_model = self.get_resource_model(tag_type)
        stmt = self.session.query(
            exists().where(and_(
                resource_model.id == resource_id,
                resource_model.deleted_at.is_(False),
            ))
        )
        if not self.session.execute(stmt).scalar():
            raise NotFoundException(Err.OE0002, [resource_model.__name__, resource_id])

    def create(self, **kwargs):
        tag_type = kwargs.pop("tag_type")
        self.check_resource_exists(tag_type, kwargs.get("resource_id"))

        kwargs['type_id'] = self.get_type_id(tag_type)

        tag = super().create(**kwargs)
        return tag

    def list(self, resource_id, tag_type):
        self.check_resource_exists(tag_type, resource_id)

        query = self.session.query(Tag).filter(
            Tag.resource_id == resource_id,
            Tag.type_id == self.get_type_id(tag_type),
            Tag.deleted_at.is_(False),
        )
        return list(map(lambda x: x.to_dict(), query))

    def get_tag(self, resource_id, tag_type, tag_name):
        tag = self.session.query(Tag).filter(
            Tag.resource_id == resource_id,
            Tag.type_id == self.get_type_id(tag_type),
            Tag.name == tag_name,
            Tag.deleted_at.is_(False),
        ).one_or_none()

        if tag is None:
            raise WrongArgumentsException(
                Err.OE0002,
                [Tag.__name__, f"{tag_name} for {tag_type} {resource_id}"],
            )

        return tag

    def get(self, item_id, **kwargs):
        tag_type = kwargs.get("tag_type")
        resource_id = kwargs.get("resource_id")
        # If tag_type and resource_id are passed, we overwrite get logic so
        # we can get tag for specific resource by given tag name
        if tag_type and resource_id:
            self.check_resource_exists(tag_type, resource_id)
            return self.get_tag(resource_id, tag_type, item_id)
        # Otherwise we call default BaseController implementation and search
        # for the tag by ID, needed for update and delete calls.
        else:
            return super().get(item_id, **kwargs)

    def _validate_params(self, tag, **kwargs):
        if "name" in kwargs:
            existing_tag = self.session.query(Tag).filter(
                Tag.resource_id == tag.resource_id,
                Tag.type_id == tag.type_id,
                Tag.name == kwargs["name"],
                Tag.deleted_at.is_(False),
            ).one_or_none()

            if existing_tag:
                raise ConflictException(
                    Err.OE0149,
                    [Tag.__name__, kwargs["name"]],
                )

    def edit(self, item_id, **kwargs):
        tag_type = kwargs.pop("tag_type")
        resource_id = kwargs.pop("resource_id")
        kwargs['updated_at'] = opttime.utcnow_timestamp()

        self.check_resource_exists(tag_type, resource_id)
        tag = self.get(item_id, resource_id=resource_id, tag_type=tag_type)
        self._validate_params(tag, **kwargs)
        self.check_update_immutables(**kwargs)
        updated_tag = super().update(tag.id, **kwargs)

        return updated_tag

    def delete(self, item_id, **kwargs):
        tag_type = kwargs.get("tag_type")
        resource_id = kwargs.get("resource_id")
        self.check_resource_exists(tag_type, resource_id)
        tag = self.get(item_id, resource_id=resource_id, tag_type=tag_type)
        super().delete(tag.id)


class TagAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return TagBaseController
