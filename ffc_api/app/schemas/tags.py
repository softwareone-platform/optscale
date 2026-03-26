from datetime import datetime
from typing import Annotated, Optional

from pydantic import BaseModel, Field

from app.enums import TagResourceType
from app.schemas.core import BaseSchema, CommonEventsSchema, IdSchema


class TagBase(BaseSchema):
    name: Annotated[str, Field(min_length=1, max_length=255, examples=["Version"])]
    value: Annotated[str, Field(min_length=1, max_length=255, examples=["1.0.0"])]
    resource_id: Annotated[
        str,
        Field(min_length=1, max_length=255, examples=["FORG-1234-1234-1234"]),
    ]

    resource_type: TagResourceType


class TagRead(IdSchema, TagBase, CommonEventsSchema):
    pass


class TagCreate(TagBase):
    pass


class TagUpdate(BaseSchema):
    value: Annotated[str, Field(min_length=1, max_length=255, examples=["1.0.1"])]

