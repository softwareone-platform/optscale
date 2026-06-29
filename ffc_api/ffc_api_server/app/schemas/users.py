from datetime import datetime
from typing import Annotated

from pydantic import Field, computed_field, model_validator

from ffc_api.ffc_api_server.app.enums import RolePurposes
from ffc_api.ffc_api_server.app.schemas.core import BaseSchema, IdSchema
from ffc_api.ffc_api_server.app.schemas.tags import TagRef
from ffc_api.ffc_api_server.app.services.roles_loader import get_roles


class UserBase(BaseSchema):
    name: Annotated[str, Field(examples=["Alex Parish"])]


class AssignmentRead(IdSchema, BaseSchema):
    type_id: Annotated[int, Field(exclude=True)]
    role_id: Annotated[int, Field(exclude=True)]
    resource_id: str | None = None
    resource_name: str | None = None
    resource_purpose: str | None = None

    @computed_field  # type: ignore[misc]
    @property
    def role_name(self) -> str | None:
        return get_roles().get_role_name(self.role_id)

    @computed_field  # type: ignore[misc]
    @property
    def resource_type(self) -> str | None:
        return get_roles().get_type_name(self.type_id)

    @computed_field  # type: ignore[misc]
    @property
    def purpose(self) -> str | None:
        return get_roles().get_role_purpose(self.role_id)


class AuthUserRead(IdSchema, BaseSchema):
    email: Annotated[str, Field(examples=["test@email.com"])]
    last_login: datetime | None = None
    assignments: list[AssignmentRead] = Field(default_factory=list)

    @model_validator(mode="after")
    def _drop_default_role_assignments(self):
        self.assignments = [
            a for a in self.assignments if a.purpose != RolePurposes.optscale_member.value
        ]
        return self


class UserRead(IdSchema, UserBase):
    auth_user: AuthUserRead | None = None
    created_at: Annotated[int, Field(examples=[1677722000])]
    tags: list[TagRef] = []

    @computed_field  # type: ignore[misc]
    @property
    def roles(self) -> int:
        return len(self.auth_user.assignments)
