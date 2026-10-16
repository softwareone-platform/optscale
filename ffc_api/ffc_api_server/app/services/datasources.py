from datetime import UTC, datetime
from typing import Any

from fastapi import HTTPException, status
from fastapi.concurrency import run_in_threadpool
from tools.cloud_adapter.enums import CloudTypes

from ffc_api.ffc_api_server.app.clients.rest_api import get_rest_api_client
from ffc_api.ffc_api_server.app.db.handlers import NotFoundError
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource
from ffc_api.ffc_api_server.app.dependencies.db import DataSourceRepository
from ffc_api.ffc_api_server.app.schemas.core import convert_model_to_schema
from ffc_api.ffc_api_server.app.schemas.datasources import (
    AwsAccountType,
    AwsAuthenticationType,
    AwsDetails,
    AwsExportType,
    AzureSubscriptionDetails,
    AzureTenantDetails,
    BillingInfo,
    DataSourceBase,
    DataSourceDetailRead,
    DataSourceDetails,
    DiscoveryItem,
    GcpDetails,
    ImportStatus,
    MetricsInfo,
)
from ffc_api.ffc_api_server.app.utils import proxy_optscale_errors

AWS_EXPORT_TYPES = {
    1: AwsExportType.LEGACY_CUR_EXPORT,
    2: AwsExportType.STANDARD_DATA_EXPORT,
}


async def fetch_datasource_or_404(
    datasource_repo: DataSourceRepository,
    datasource_id: str,
    organization_id: str | None = None,
) -> DataSource:
    extra_conditions = []
    if organization_id is not None:
        extra_conditions = [
            DataSource.organization_id == organization_id,
            DataSource.deleted_at == 0,
        ]
    try:
        return await datasource_repo.get(id=datasource_id, extra_conditions=extra_conditions)
    except NotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        ) from e


async def get_datasource_detail(datasource: DataSource) -> DataSourceDetailRead:
    """
    Builds the datasource detail from the rest_api cloud account (requested with
    details): it is the only source of the decrypted config, the metrics
    retrieval status and the discovery infos.
    The config obtained with the cluster secret includes the credentials, so
    only the documented, non-secret fields are picked from it.
    """
    with proxy_optscale_errors():
        _, cloud_account = await run_in_threadpool(
            get_rest_api_client().cloud_account_get, datasource.id, details=True
        )

    stats = cloud_account.get("details") or {}
    return convert_model_to_schema(
        DataSourceDetailRead,
        datasource,
        cost=stats.get("cost"),
        forecast=stats.get("forecast"),
        resources=stats.get("resources"),
        details=_build_details(datasource, cloud_account),
        billing=_build_billing(cloud_account),
        metrics=_build_metrics(cloud_account),
        discovery=[_build_discovery_item(info) for info in stats.get("discovery_infos") or []],
    )


def _to_datetime(timestamp: int | None) -> datetime | None:
    if not timestamp:
        return None
    return datetime.fromtimestamp(timestamp, tz=UTC)


def _import_status(at: int | None, attempt_at: int | None, error: str | None) -> ImportStatus:
    # same rules applied by the ngui datasource details view
    at, attempt_at = at or 0, attempt_at or 0
    if at > 0 and at == attempt_at:
        return ImportStatus.COMPLETED
    if error and at < attempt_at:
        return ImportStatus.FAILED
    return ImportStatus.UNKNOWN


def _build_billing(cloud_account: dict[str, Any]) -> BillingInfo:
    at = cloud_account.get("last_import_at")
    attempt_at = cloud_account.get("last_import_attempt_at")
    error = cloud_account.get("last_import_attempt_error")
    status = _import_status(at, attempt_at, error)
    return BillingInfo(
        last_report_processed_at=_to_datetime(at),
        last_attempt_at=_to_datetime(attempt_at),
        last_report_updated_at=_to_datetime(cloud_account.get("last_import_modified_at")),
        status=status,
        error=error if status == ImportStatus.FAILED else None,
    )


def _build_metrics(cloud_account: dict[str, Any]) -> MetricsInfo:
    at = cloud_account.get("last_getting_metrics_at")
    attempt_at = cloud_account.get("last_getting_metric_attempt_at")
    error = cloud_account.get("last_getting_metric_attempt_error")
    status = _import_status(at, attempt_at, error)
    return MetricsInfo(
        last_retrieval_at=_to_datetime(at),
        last_attempt_at=_to_datetime(attempt_at),
        status=status,
        error=error if status == ImportStatus.FAILED else None,
    )


def _build_discovery_item(info: dict[str, Any]) -> DiscoveryItem:
    last_discovery_at = info.get("last_discovery_at") or 0
    last_error_at = info.get("last_error_at") or 0
    if last_discovery_at == 0 and last_error_at == 0:
        status = ImportStatus.UNKNOWN
    elif last_discovery_at > last_error_at:
        status = ImportStatus.COMPLETED
    else:
        status = ImportStatus.FAILED
    return DiscoveryItem(
        resource_type=info.get("resource_type"),
        enabled=info.get("enabled"),
        last_discovery_at=_to_datetime(last_discovery_at),
        last_error_at=_to_datetime(last_error_at),
        status=status,
        error=info.get("last_error") if status == ImportStatus.FAILED else None,
    )


def _build_details(
    datasource: DataSource, cloud_account: dict[str, Any]
) -> DataSourceDetails | None:
    config = cloud_account.get("config") or {}
    connected_at = _to_datetime(cloud_account.get("created_at"))
    match (datasource.type or "").lower():
        case CloudTypes.AZURE_CNR.value:
            return AzureSubscriptionDetails(
                connected_at=connected_at,
                parent=(
                    convert_model_to_schema(DataSourceBase, datasource.parent)
                    if datasource.parent
                    else None
                ),
                subscription_id=config.get("subscription_id") or datasource.account_id,
                tenant_id=config.get("tenant"),
                client_id=config.get("client_id"),
            )
        case CloudTypes.AZURE_TENANT.value:
            return AzureTenantDetails(
                connected_at=connected_at,
                tenant_id=config.get("tenant") or datasource.account_id,
                client_id=config.get("client_id"),
            )
        case CloudTypes.AWS_CNR.value:
            return _build_aws_details(datasource, config, connected_at)
        case CloudTypes.GCP_CNR.value:
            billing_data = config.get("billing_data") or {}
            return GcpDetails(
                connected_at=connected_at,
                project_id=datasource.account_id,
                billing_dataset_name=billing_data.get("dataset_name"),
                billing_table_name=billing_data.get("table_name"),
                billing_project_id=billing_data.get("project_id"),
            )
    return None


def _build_aws_details(
    datasource: DataSource, config: dict[str, Any], connected_at: datetime | None
) -> AwsDetails:
    linked = bool(config.get("linked"))
    assumed_role = bool(config.get("assume_role_account_id") and config.get("assume_role_name"))
    details: dict[str, Any] = {
        "connected_at": connected_at,
        "account_id": datasource.account_id,
        "account_type": (AwsAccountType.MEMBER if linked else AwsAccountType.MANAGEMENT_STANDALONE),
        "authentication_type": (
            AwsAuthenticationType.ASSUMED_ROLE if assumed_role else AwsAuthenticationType.ACCESS_KEY
        ),
    }
    if assumed_role:
        details["assumed_role_name"] = config.get("assume_role_name")
    else:
        # for assumed role accounts rest_api injects the service access key: never expose it
        details["access_key_id"] = config.get("access_key_id")
    if not linked:
        details.update(
            export_type=AWS_EXPORT_TYPES.get(config.get("cur_version")),
            use_edp_discount=config.get("use_edp_discount"),
            export_name=config.get("report_name"),
            bucket_name=config.get("bucket_name"),
            bucket_prefix=config.get("bucket_prefix"),
            region_name=config.get("region_name"),
            included_regions=config.get("included_regions"),
            excluded_regions=config.get("excluded_regions"),
        )
    return AwsDetails(**details)
