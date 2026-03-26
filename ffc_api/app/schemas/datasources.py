from typing import Annotated

from pydantic import Field

from app.schemas.core import BaseSchema, IdSchema


class DataSourceBase(BaseSchema):
    name: Annotated[str, Field(examples=["Adobe subscription"])]
    type: Annotated[str, Field(examples=["AWS"])]
    account_id: Annotated[str | None, Field(examples=["203589795269"])] = None


class DataSourceReference(IdSchema):
    name: Annotated[str, Field(examples=["Adobe subscription"])]


class DataSourceRead(IdSchema, DataSourceBase):
    parent: DataSourceReference | None = None
