from typing import Annotated, Any

from pydantic import BeforeValidator, Field
from tools.cloud_adapter.enums import CloudTypes

from ffc_api.ffc_api_server.app.schemas.core import BaseSchema, IdSchema
from ffc_api.ffc_api_server.app.schemas.tags import TagRef


def _normalize_cloud_type(value):
    if isinstance(value, str):
        return value.lower()
    return value


DataSourceType = Annotated[CloudTypes, BeforeValidator(_normalize_cloud_type)]

ALLOWED_TYPES = [
    CloudTypes.AWS_CNR,
    CloudTypes.GCP_CNR,
    CloudTypes.AZURE_CNR,
    CloudTypes.AZURE_TENANT,
]


class DataSourceBase(IdSchema, BaseSchema):
    name: Annotated[str, Field(examples=["Adobe subscription"])]
    type: DataSourceType
    account_id: Annotated[str | None, Field(examples=["203589795269"])] = None


class DataSourceRead(DataSourceBase):
    parent: DataSourceBase | None = None
    tags: list[TagRef] = []
    last_import_at: int
    last_import_modified_at: int
    last_import_attempt_at: int
    last_import_attempt_error: str | None


class DataSourceWithConfig(DataSourceRead):
    config: dict[str, Any]
    auto_import: Annotated[bool, Field(examples=[True])]
    process_recommendations: Annotated[bool, Field(examples=[True])]


class DataSourceWithExpenses(DataSourceRead):
    forecast: Annotated[float | None, Field(examples=[325777.232])] = None
    resources: Annotated[int | None, Field(examples=[17])] = None
    cost: Annotated[float | None, Field(examples=[89011.43])] = None


class DataSourceAdd(BaseSchema):
    name: Annotated[str, Field(examples=["AWS HQ"])]
    type: DataSourceType
    config: dict[str, Any]
    auto_import: Annotated[bool, Field(default=True, examples=[True])]
    process_recommendations: Annotated[bool, Field(default=True, examples=[True])]
