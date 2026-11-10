from datetime import datetime
from enum import StrEnum
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


class ImportStatus(StrEnum):
    COMPLETED = "completed"
    FAILED = "failed"
    UNKNOWN = "unknown"


class AwsAccountType(StrEnum):
    MEMBER = "member"
    MANAGEMENT_STANDALONE = "management_standalone"


class AwsAuthenticationType(StrEnum):
    ASSUMED_ROLE = "assumed_role"
    ACCESS_KEY = "access_key"


class AwsExportType(StrEnum):
    LEGACY_CUR_EXPORT = "legacy_cur_export"
    STANDARD_DATA_EXPORT = "standard_data_export"


class AzureSubscriptionDetails(BaseSchema):
    connected_at: datetime | None
    parent: DataSourceBase | None = None
    subscription_id: Annotated[str | None, Field(examples=["5f3a1c2e-..."])] = None
    tenant_id: Annotated[str | None, Field(examples=["8b1d7e4a-..."])] = None
    client_id: Annotated[str | None, Field(examples=["c2a9f0b3-..."])] = None


class AzureTenantDetails(BaseSchema):
    connected_at: datetime | None
    tenant_id: Annotated[str | None, Field(examples=["8b1d7e4a-..."])] = None
    client_id: Annotated[str | None, Field(examples=["c2a9f0b3-..."])] = None


class AwsDetails(BaseSchema):
    """
    `assumed_role_name` is returned only for assumed role authentication,
    `access_key_id` only for access key authentication and the export fields
    only for root (non-linked) accounts: fields that don't apply are left unset
    and, like any null field, omitted from the response.
    """

    connected_at: datetime | None
    account_id: Annotated[str | None, Field(examples=["203589795269"])] = None
    account_type: AwsAccountType
    authentication_type: AwsAuthenticationType
    assumed_role_name: Annotated[str | None, Field(examples=["FinOpsReadOnly"])] = None
    access_key_id: Annotated[str | None, Field(examples=["AKIAIOSFODNN7EXAMPLE"])] = None
    export_type: AwsExportType | None = None
    use_edp_discount: bool | None = None
    export_name: Annotated[str | None, Field(examples=["optscale-export"])] = None
    bucket_name: Annotated[str | None, Field(examples=["optscale-bucket"])] = None
    bucket_prefix: Annotated[str | None, Field(examples=["reports"])] = None
    region_name: Annotated[str | None, Field(examples=["eu-central-1"])] = None
    included_regions: Annotated[list[str] | None, Field(examples=[["eu-central-1"]])] = None
    excluded_regions: Annotated[list[str] | None, Field(examples=[["us-east-1"]])] = None


class GcpDetails(BaseSchema):
    connected_at: datetime | None
    project_id: Annotated[str | None, Field(examples=["my-gcp-project"])] = None
    billing_dataset_name: Annotated[str | None, Field(examples=["billing_export"])] = None
    billing_table_name: Annotated[
        str | None, Field(examples=["gcp_billing_export_v1_0123AB_456CDE_789EFG"])
    ] = None
    billing_project_id: Annotated[str | None, Field(examples=["my-billing-project"])] = None


DataSourceDetails = AzureSubscriptionDetails | AzureTenantDetails | AwsDetails | GcpDetails


class BillingInfo(BaseSchema):
    last_report_processed_at: datetime | None = None
    last_attempt_at: datetime | None = None
    last_report_updated_at: datetime | None = None
    status: ImportStatus
    error: Annotated[str | None, Field(examples=["Bucket not found"])] = None


class MetricsInfo(BaseSchema):
    last_retrieval_at: datetime | None = None
    last_attempt_at: datetime | None = None
    status: ImportStatus
    error: str | None = None


class DiscoveryItem(BaseSchema):
    resource_type: Annotated[str | None, Field(examples=["instance"])] = None
    enabled: bool | None = None
    last_discovery_at: datetime | None = None
    last_error_at: datetime | None = None
    status: ImportStatus
    error: str | None = None


class DataSourceDetailRead(DataSourceWithExpenses):
    details: DataSourceDetails | None = None
    billing: BillingInfo
    metrics: MetricsInfo
    discovery: list[DiscoveryItem] = []


class DataSourceAdd(BaseSchema):
    name: Annotated[str, Field(examples=["AWS HQ"])]
    type: DataSourceType
    config: dict[str, Any]
    auto_import: Annotated[bool, Field(default=True, examples=[True])]
    process_recommendations: Annotated[bool, Field(default=True, examples=[True])]
