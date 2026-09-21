from datetime import UTC, datetime

from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import DataSource, Organization
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.tests.types import ModelFactory
from httpx import AsyncClient


async def test_get_datasources(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
):
    await datasource_factory(organization=organization, name="ds-1", type="aws_cnr")
    await datasource_factory(organization=organization, name="ds-2", type="azure_cnr")

    response = await admin_client.get("/admin/datasources")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 2
    assert {item["name"] for item in data["items"]} == {"ds-1", "ds-2"}


async def test_get_datasources_with_parent(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
):
    parent = await datasource_factory(organization=organization, name="Tenant", type="azure_tenant")
    await datasource_factory(
        organization=organization,
        name="Subscription",
        type="azure_cnr",
        parent=parent,
        account_id="1111",
        last_import_at=1677722000,
        last_import_modified_at=1677722001,
        last_import_attempt_at=1677722002,
        last_import_attempt_error="credentials expired",
    )

    response = await admin_client.get(
        "/admin/datasources?and(eq(name,Subscription),eq(datasource_id,1111))"
    )

    assert response.status_code == 200
    item = response.json()["items"][0]
    assert item["parent"]["id"] == parent.id
    assert item["parent"]["name"] == "Tenant"
    assert item["parent"]["type"] == "azure_tenant"
    assert item["last_import_at"] == 1677722000
    assert item["last_import_modified_at"] == 1677722001
    assert item["last_import_attempt_at"] == 1677722002
    assert item["last_import_attempt_error"] == "credentials expired"


async def test_get_datasource_by_id(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
):
    datasource = await datasource_factory(organization=organization)

    response = await admin_client.get(f"/admin/datasources/{datasource.id}")

    assert response.status_code == 200
    assert response.json()["id"] == datasource.id


async def test_get_datasource_by_id_not_found(admin_client: AsyncClient):
    response = await admin_client.get("/admin/datasources/fake-ds")

    assert response.status_code == 404
    assert response.json() == {"detail": "DataSource with ID `fake-ds` wasn't found."}


async def test_get_tags_by_datasource_id(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    tag_factory: ModelFactory[Tag],
):
    datasource = await datasource_factory(organization=organization)
    await tag_factory(
        resource_id=datasource.id,
        name="owner",
        value="platform",
        resource_type=TagResourceType.DATA_SOURCE,
    )
    await tag_factory(
        resource_id=datasource.id,
        name="org-scoped",
        value="x",
        resource_type=TagResourceType.ORGANIZATION,
    )

    response = await admin_client.get(f"/admin/datasources/{datasource.id}/tags")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["name"] == "owner"


async def test_get_tag_by_datasource_id_by_name(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    tag_factory: ModelFactory[Tag],
):
    datasource = await datasource_factory(organization=organization)
    tag = await tag_factory(
        resource_id=datasource.id,
        name="owner",
        value="platform",
        resource_type=TagResourceType.DATA_SOURCE,
    )

    response = await admin_client.get(f"/admin/datasources/{datasource.id}/tags/owner")

    assert response.status_code == 200
    assert response.json()["id"] == str(tag.id)


async def test_get_tag_by_datasource_id_not_found(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
):
    datasource = await datasource_factory(organization=organization)

    response = await admin_client.get(f"/admin/datasources/{datasource.id}/tags/fake-tag")

    assert response.status_code == 404


async def test_get_deleted_tag_by_datasource_id(
    admin_client: AsyncClient,
    organization: Organization,
    datasource_factory: ModelFactory[DataSource],
    tag_factory: ModelFactory[Tag],
):
    datasource = await datasource_factory(organization=organization)
    await tag_factory(
        resource_id=datasource.id,
        name="owner",
        value="platform",
        resource_type=TagResourceType.DATA_SOURCE,
        deleted_at=datetime.now(UTC),
        deleted_ts=1700000000,
    )

    response = await admin_client.get(f"/admin/datasources/{datasource.id}/tags/owner")

    assert response.status_code == 404
