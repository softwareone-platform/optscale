import json

import pytest
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource, Organization
from ffc_api.ffc_api_server.tests.types import ModelFactory
from httpx import AsyncClient

CREATED_AT = 1700000000
CREATED_AT_ISO = "2023-11-14T22:13:20Z"
IMPORT_AT = 1730126521
IMPORT_AT_ISO = "2024-10-28T14:42:01Z"
LATER = 1730130121
LATER_ISO = "2024-10-28T15:42:01Z"

SECRETS = (
    "secret_access_key",
    "secret",
    "partner_secret",
    "sa_connection_string",
    "credentials",
    "private_key",
)

AWS_ROOT_CONFIG = {
    "access_key_id": "AKIAROOT",
    "secret_access_key": "root-secret",
    "linked": False,
    "cur_version": 2,
    "use_edp_discount": True,
    "report_name": "optscale-export",
    "bucket_name": "optscale-bucket",
    "bucket_prefix": "reports",
    "region_name": "eu-central-1",
    "included_regions": ["eu-central-1", "eu-west-1"],
    "excluded_regions": ["us-east-1"],
    "config_scheme": "create_report",
}

AWS_LINKED_ASSUMED_ROLE_CONFIG = {
    # rest_api injects the service credentials into assumed role accounts
    "access_key_id": "AKIASERVICE",
    "secret_access_key": "service-secret",
    "assume_role_account_id": "203589795269",
    "assume_role_name": "FinOpsReadOnly",
    "assume_role_external_id": "external-id",
    "linked": True,
}


def cloud_account_response(datasource: DataSource, config: dict, **overrides) -> dict:
    response = {
        "id": datasource.id,
        "name": datasource.name,
        "type": datasource.type,
        "account_id": datasource.account_id,
        "created_at": CREATED_AT,
        "deleted_at": 0,
        "config": config,
        "last_import_at": 0,
        "last_import_modified_at": 0,
        "last_import_attempt_at": 0,
        "last_import_attempt_error": None,
        "last_getting_metrics_at": 0,
        "last_getting_metric_attempt_at": 0,
        "last_getting_metric_attempt_error": None,
        "details": {
            "cost": 89011.43,
            "forecast": 325777.23,
            "last_month_cost": 1200.5,
            "resources": 17,
            "discovery_infos": [],
        },
    }
    response.update(overrides)
    return response


def assert_no_secrets(body: dict):
    serialized = json.dumps(body)
    for secret in SECRETS:
        assert f'"{secret}"' not in serialized
    for value in ("root-secret", "service-secret", "azure-secret", "AKIASERVICE"):
        assert value not in serialized


@pytest.fixture
def cloud_account_get(mock_rest_api_client):
    return mock_rest_api_client.return_value.cloud_account_get


async def test_get_aws_root_access_key_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(
        organization=organization, type="aws_cnr", account_id="111111111111"
    )
    cloud_account_get.return_value = (200, cloud_account_response(datasource, AWS_ROOT_CONFIG))

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    assert response.status_code == 200
    body = response.json()
    assert body["details"] == {
        "connected_at": CREATED_AT_ISO,
        "account_id": "111111111111",
        "account_type": "management_standalone",
        "authentication_type": "access_key",
        "access_key_id": "AKIAROOT",
        "export_type": "standard_data_export",
        "use_edp_discount": True,
        "export_name": "optscale-export",
        "bucket_name": "optscale-bucket",
        "bucket_prefix": "reports",
        "region_name": "eu-central-1",
        "included_regions": ["eu-central-1", "eu-west-1"],
        "excluded_regions": ["us-east-1"],
    }
    assert (body["cost"], body["forecast"], body["resources"]) == (89011.43, 325777.23, 17)
    assert "config" not in body
    assert_no_secrets(body)


async def test_get_aws_root_legacy_export_without_regions(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, type="aws_cnr")
    config = {
        k: v
        for k, v in AWS_ROOT_CONFIG.items()
        if k not in ("included_regions", "excluded_regions", "region_name")
    }
    config["cur_version"] = 1
    cloud_account_get.return_value = (200, cloud_account_response(datasource, config))

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    details = response.json()["details"]
    assert details["export_type"] == "legacy_cur_export"
    assert "included_regions" not in details
    assert "excluded_regions" not in details
    assert "region_name" not in details


async def test_get_aws_linked_assumed_role_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(
        organization=organization, type="aws_cnr", account_id="203589795269"
    )
    cloud_account_get.return_value = (
        200,
        cloud_account_response(datasource, AWS_LINKED_ASSUMED_ROLE_CONFIG),
    )

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    assert response.status_code == 200
    body = response.json()
    assert body["details"] == {
        "connected_at": CREATED_AT_ISO,
        "account_id": "203589795269",
        "account_type": "member",
        "authentication_type": "assumed_role",
        "assumed_role_name": "FinOpsReadOnly",
    }
    assert_no_secrets(body)


async def test_get_aws_root_assumed_role_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, type="aws_cnr")
    config = {**AWS_LINKED_ASSUMED_ROLE_CONFIG, "linked": False, "cur_version": 2}
    cloud_account_get.return_value = (200, cloud_account_response(datasource, config))

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    details = response.json()["details"]
    assert details["authentication_type"] == "assumed_role"
    assert details["account_type"] == "management_standalone"
    assert details["export_type"] == "standard_data_export"
    assert "access_key_id" not in details
    assert_no_secrets(response.json())


async def test_get_aws_linked_access_key_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, type="aws_cnr")
    config = {"access_key_id": "AKIALINKED", "secret_access_key": "root-secret", "linked": True}
    cloud_account_get.return_value = (200, cloud_account_response(datasource, config))

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    details = response.json()["details"]
    assert details["authentication_type"] == "access_key"
    assert details["access_key_id"] == "AKIALINKED"
    assert "assumed_role_name" not in details
    assert "export_type" not in details
    assert "use_edp_discount" not in details
    assert_no_secrets(response.json())


async def test_get_azure_subscription_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    parent = await datasource_factory(organization=organization, name="Tenant", type="azure_tenant")
    datasource = await datasource_factory(
        organization=organization,
        name="Subscription",
        type="azure_cnr",
        parent=parent,
        account_id="sub-id",
    )
    # rest_api merges the tenant config into the subscription one
    config = {
        "subscription_id": "sub-id",
        "tenant": "tenant-id",
        "client_id": "client-id",
        "secret": "azure-secret",
        "sa_connection_string": "azure-secret",
        "expense_import_scheme": "usage",
    }
    cloud_account_get.return_value = (200, cloud_account_response(datasource, config))

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    assert response.status_code == 200
    body = response.json()
    assert body["details"] == {
        "connected_at": CREATED_AT_ISO,
        "parent": {
            "id": parent.id,
            "name": "Tenant",
            "type": "azure_tenant",
            "account_id": parent.account_id,
        },
        "subscription_id": "sub-id",
        "tenant_id": "tenant-id",
        "client_id": "client-id",
    }
    assert body["parent"]["id"] == parent.id
    assert_no_secrets(body)


async def test_get_azure_tenant_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(
        organization=organization, type="azure_tenant", account_id="tenant-id"
    )
    config = {"tenant": "tenant-id", "client_id": "client-id", "secret": "azure-secret"}
    cloud_account_get.return_value = (200, cloud_account_response(datasource, config))

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    assert response.json()["details"] == {
        "connected_at": CREATED_AT_ISO,
        "tenant_id": "tenant-id",
        "client_id": "client-id",
    }
    assert_no_secrets(response.json())


async def test_get_gcp_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(
        organization=organization, type="gcp_cnr", account_id="my-gcp-project"
    )
    config = {
        "billing_data": {
            "dataset_name": "billing_export",
            "table_name": "gcp_billing_export_v1",
            "project_id": "billing-project",
        },
        "pricing_data": {"dataset_name": "pricing", "table_name": "pricing_export"},
        "credentials": {"private_key": "gcp-secret"},
    }
    cloud_account_get.return_value = (200, cloud_account_response(datasource, config))

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    assert response.json()["details"] == {
        "connected_at": CREATED_AT_ISO,
        "project_id": "my-gcp-project",
        "billing_dataset_name": "billing_export",
        "billing_table_name": "gcp_billing_export_v1",
        "billing_project_id": "billing-project",
    }
    assert "gcp-secret" not in response.text
    assert_no_secrets(response.json())


async def test_get_unsupported_type_has_no_details(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, type="kubernetes_cnr")
    cloud_account_get.return_value = (
        200,
        cloud_account_response(datasource, {"user": "k8s", "password": "k8s-secret"}),
    )

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    assert response.status_code == 200
    assert "details" not in response.json()
    assert "k8s-secret" not in response.text


async def test_get_datasource_without_imports(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, type="aws_cnr")
    cloud_account_get.return_value = (
        200,
        cloud_account_response(
            datasource,
            AWS_ROOT_CONFIG,
            created_at=0,
            details={
                "cost": 0,
                "forecast": 0,
                "resources": 0,
                "discovery_infos": [
                    {
                        "resource_type": "instance",
                        "enabled": True,
                        "last_discovery_at": 0,
                        "last_error_at": 0,
                        "last_error": None,
                    }
                ],
            },
        ),
    )

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    body = response.json()
    assert "connected_at" not in body["details"]
    assert body["billing"] == {
        "status": "unknown",
    }
    assert body["metrics"] == {
        "status": "unknown",
    }
    assert body["discovery"] == [
        {
            "resource_type": "instance",
            "enabled": True,
            "status": "unknown",
        }
    ]


async def test_get_datasource_successful_imports(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, type="aws_cnr")
    cloud_account_get.return_value = (
        200,
        cloud_account_response(
            datasource,
            AWS_ROOT_CONFIG,
            last_import_at=IMPORT_AT,
            last_import_attempt_at=IMPORT_AT,
            last_import_modified_at=LATER,
            last_getting_metrics_at=IMPORT_AT,
            last_getting_metric_attempt_at=IMPORT_AT,
            details={
                "cost": 1,
                "forecast": 2,
                "resources": 3,
                "discovery_infos": [
                    {
                        "resource_type": "volume",
                        "enabled": True,
                        "last_discovery_at": LATER,
                        "last_error_at": IMPORT_AT,
                        "last_error": "old failure",
                    }
                ],
            },
        ),
    )

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    body = response.json()
    assert body["billing"] == {
        "last_report_processed_at": IMPORT_AT_ISO,
        "last_attempt_at": IMPORT_AT_ISO,
        "last_report_updated_at": LATER_ISO,
        "status": "completed",
    }
    assert body["metrics"] == {
        "last_retrieval_at": IMPORT_AT_ISO,
        "last_attempt_at": IMPORT_AT_ISO,
        "status": "completed",
    }
    assert body["discovery"] == [
        {
            "resource_type": "volume",
            "enabled": True,
            "last_discovery_at": LATER_ISO,
            "last_error_at": IMPORT_AT_ISO,
            "status": "completed",
        }
    ]
    # existing fields keep their integer timestamps
    assert body["last_import_at"] == datasource.last_import_at


async def test_get_datasource_failed_imports(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, type="aws_cnr")
    cloud_account_get.return_value = (
        200,
        cloud_account_response(
            datasource,
            AWS_ROOT_CONFIG,
            last_import_at=IMPORT_AT,
            last_import_attempt_at=LATER,
            last_import_attempt_error="Bucket not found",
            last_getting_metrics_at=0,
            last_getting_metric_attempt_at=LATER,
            last_getting_metric_attempt_error="Access denied",
            details={
                "cost": 1,
                "forecast": 2,
                "resources": 3,
                "discovery_infos": [
                    {
                        "resource_type": "ip_address",
                        "enabled": False,
                        "last_discovery_at": IMPORT_AT,
                        "last_error_at": LATER,
                        "last_error": "Throttled",
                    }
                ],
            },
        ),
    )

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    body = response.json()
    assert body["billing"]["status"] == "failed"
    assert body["billing"]["error"] == "Bucket not found"
    assert body["billing"]["last_report_processed_at"] == IMPORT_AT_ISO
    assert body["billing"]["last_attempt_at"] == LATER_ISO
    assert body["metrics"] == {
        "last_attempt_at": LATER_ISO,
        "status": "failed",
        "error": "Access denied",
    }
    assert body["discovery"][0]["status"] == "failed"
    assert body["discovery"][0]["error"] == "Throttled"


async def test_get_datasource_propagates_rest_api_errors(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
    optscale_http_error,
):
    datasource = await datasource_factory(organization=organization)
    cloud_account_get.side_effect = optscale_http_error(404, "Cloud account not found")

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Cloud account not found"


async def test_get_organization_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, type="aws_cnr")
    cloud_account_get.return_value = (
        200,
        cloud_account_response(datasource, AWS_LINKED_ASSUMED_ROLE_CONFIG),
    )

    response = await admin_client.get(
        f"/admin/organizations/{organization.id}/datasources/{datasource.id}"
    )

    assert response.status_code == 200
    body = response.json()
    assert body["id"] == datasource.id
    assert body["details"]["authentication_type"] == "assumed_role"
    assert body == (await admin_client.get(f"/admin/datasources/{datasource.id}")).json()


async def test_get_organization_datasource_of_another_organization(
    admin_client: AsyncClient,
    organization: Organization,
    organization_factory: ModelFactory[Organization],
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    other = await organization_factory(name="Other org", currency="EUR")
    datasource = await datasource_factory(organization=other)

    response = await admin_client.get(
        f"/admin/organizations/{organization.id}/datasources/{datasource.id}"
    )

    assert response.status_code == 404
    cloud_account_get.assert_not_called()


async def test_get_organization_deleted_datasource(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    cloud_account_get,
):
    datasource = await datasource_factory(organization=organization, deleted_at=1700000000)

    response = await admin_client.get(
        f"/admin/organizations/{organization.id}/datasources/{datasource.id}"
    )

    assert response.status_code == 404
    cloud_account_get.assert_not_called()


async def test_get_organization_datasource_organization_not_found(
    admin_client: AsyncClient, cloud_account_get
):
    response = await admin_client.get("/admin/organizations/fake-org/datasources/fake-ds")

    assert response.status_code == 404
    cloud_account_get.assert_not_called()
