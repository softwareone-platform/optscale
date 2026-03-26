from typing import Annotated

from pydantic import Field, computed_field

from app.schemas.core import BaseSchema, IdSchema
from app.services.roles_loader import get_roles


class UserBase(BaseSchema):
    name: Annotated[str, Field(examples=["Alex Parish"])]


class AssignmentRead(BaseSchema):
    type_id: int
    role_id: int

    @computed_field  # type: ignore[misc]
    @property
    def role_name(self) -> str | None:
        return get_roles().get_role_name(self.role_id)

    @computed_field  # type: ignore[misc]
    @property
    def type_name(self) -> str | None:
        return get_roles().get_type_name(self.type_id)


class AuthUserRead(IdSchema, BaseSchema):
    email: Annotated[str, Field(examples=["test@email.com"])]
    assignments: list[AssignmentRead] = Field(default_factory=list)


class UserRead(IdSchema, UserBase):
    auth_user: AuthUserRead

    @computed_field  # type: ignore[misc]
    @property
    def roles(self) -> int:
        return len(self.auth_user.assignments)
