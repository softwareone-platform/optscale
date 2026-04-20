from typing import Annotated

from pydantic import Field

from ffc_api.ffc_api_server.app.schemas.core import BaseSchema, IdSchema
from ffc_api.ffc_api_server.app.schemas.tags import TagRef


class DataSourceBase(BaseSchema):
    name: Annotated[str, Field(examples=["Adobe subscription"])]
    type: Annotated[str, Field(examples=["AWS"])]
    account_id: Annotated[str | None, Field(examples=["203589795269"])] = None


class DataSourceReference(IdSchema):
    name: Annotated[str, Field(examples=["Adobe subscription"])]


class DataSourceRead(IdSchema, DataSourceBase):
    parent: DataSourceReference | None = None
    tags: list[TagRef] = []


class DataSourceWithExpenses(DataSourceRead):
    forecast: Annotated[float | None, Field(examples=[325777.232])] = None
    resources: Annotated[int | None, Field(examples=[17])] = None
    cost: Annotated[float | None, Field(examples=[89011.43])] = None
