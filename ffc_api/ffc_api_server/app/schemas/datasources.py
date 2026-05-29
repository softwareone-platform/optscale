from typing import Annotated

from cloud_adapter.enums import CloudTypes
from pydantic import BeforeValidator, Field

from ffc_api.ffc_api_server.app.schemas.core import BaseSchema, IdSchema
from ffc_api.ffc_api_server.app.schemas.tags import TagRef


def _normalize_cloud_type(value):
    if isinstance(value, str):
        return value.lower()
    return value


DataSourceType = Annotated[CloudTypes, BeforeValidator(_normalize_cloud_type)]


class DataSourceBase(BaseSchema):
    name: Annotated[str, Field(examples=["Adobe subscription"])]
    type: DataSourceType
    account_id: Annotated[str | None, Field(examples=["203589795269"])] = None


class DataSourceReference(IdSchema):
    name: Annotated[str, Field(examples=["Adobe subscription"])]
    type: DataSourceType


class DataSourceRead(IdSchema, DataSourceBase):
    parent: DataSourceReference | None = None
    tags: list[TagRef] = []


class DataSourceWithExpenses(DataSourceRead):
    forecast: Annotated[float | None, Field(examples=[325777.232])] = None
    resources: Annotated[int | None, Field(examples=[17])] = None
    cost: Annotated[float | None, Field(examples=[89011.43])] = None
