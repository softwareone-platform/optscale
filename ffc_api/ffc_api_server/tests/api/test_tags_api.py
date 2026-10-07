import uuid

from ffc_api.ffc_api_server.app.db.handlers import TagHandler
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.tests.types import ModelFactory
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession


def tag_payload(**overrides) -> dict:
    payload = {
        "name": "env",
        "value": "prod",
        "resource_id": "ORG-1234-5678",
        "resource_type": TagResourceType.ORGANIZATION.value,
    }
    payload.update(overrides)
    return payload


async def test_admin_router_requires_the_cluster_secret(api_client: AsyncClient):
    response = await api_client.get("/admin/tags")

    assert response.status_code == 403
    assert response.json() == {"detail": "Missing secret"}


async def test_admin_router_rejects_a_wrong_cluster_secret(api_client: AsyncClient):
    api_client.headers["Secret"] = "Invalid"

    response = await api_client.get("/admin/tags")

    assert response.status_code == 403
    assert response.json() == {"detail": "Invalid cluster secret"}


async def test_get_tags(
    admin_client: AsyncClient,
    tag_factory: ModelFactory[Tag],
    db_session: AsyncSession,
):
    await tag_factory(resource_id="ORG-1", name="env", value="prod")
    await tag_factory(resource_id="ORG-1", name="team", value="finops")

    deleted_tag = await tag_factory(resource_id="ORG-1", name="payg", value="enabled")
    await TagHandler(db_session).delete(deleted_tag)
    await db_session.commit()

    response = await admin_client.get("/admin/tags")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 2
    assert {item["name"] for item in data["items"]} == {"env", "team"}
    assert data["items"][0]["events"]["created"]["at"] is not None


async def test_create_tag(admin_client: AsyncClient):
    response = await admin_client.post("/admin/tags", json=tag_payload())

    assert response.status_code == 201
    data = response.json()
    assert uuid.UUID(data["id"])
    assert data["name"] == "env"
    assert data["value"] == "prod"
    assert data["resource_type"] == TagResourceType.ORGANIZATION.value
    assert data["events"]["created"]["at"] is not None
    assert "deleted" not in data["events"]


async def test_create_duplicate_tag(admin_client: AsyncClient):
    await admin_client.post("/admin/tags", json=tag_payload())

    response = await admin_client.post("/admin/tags", json=tag_payload(value="dev"))

    assert response.status_code == 400
    assert response.json() == {"detail": "Tag already exists."}


async def test_get_tag_by_id(admin_client: AsyncClient, tag_factory: ModelFactory[Tag]):
    tag = await tag_factory(resource_id="ORG-1", name="env", value="prod")

    response = await admin_client.get(f"/admin/tags/{tag.id}")

    assert response.status_code == 200
    assert response.json()["id"] == str(tag.id)


async def test_get_tag_by_id_not_found(admin_client: AsyncClient):
    tag_id = uuid.uuid4()

    response = await admin_client.get(f"/admin/tags/{tag_id}")

    assert response.status_code == 404
    assert response.json() == {"detail": f"Tag with ID `{tag_id}` wasn't found."}


async def test_get_deleted_tag_by_id(
    admin_client: AsyncClient, db_session: AsyncSession, tag_factory: ModelFactory[Tag]
):
    tag = await tag_factory(resource_id="ORG-1", name="env")
    await TagHandler(db_session).delete(tag)
    await db_session.commit()

    response = await admin_client.get(f"/admin/tags/{tag.id}")

    assert response.status_code == 404


async def test_update_tag(admin_client: AsyncClient, tag_factory: ModelFactory[Tag]):
    tag = await tag_factory(resource_id="ORG-1", name="env", value="prod")

    response = await admin_client.put(f"/admin/tags/{tag.id}", json={"value": "dev"})

    assert response.status_code == 200
    data = response.json()
    assert data["value"] == "dev"
    assert data["name"] == "env"


async def test_update_tag_name_forbidden(admin_client: AsyncClient, tag_factory: ModelFactory[Tag]):
    tag = await tag_factory(resource_id="ORG-1", name="env", value="prod")

    response = await admin_client.put(
        f"/admin/tags/{tag.id}", json={"value": "dev", "name": "renamed"}
    )

    assert response.status_code == 422


async def test_delete_tag(
    admin_client: AsyncClient, db_session: AsyncSession, tag_factory: ModelFactory[Tag]
):
    tag = await tag_factory(resource_id="ORG-1", name="env")

    response = await admin_client.delete(f"/admin/tags/{tag.id}")

    assert response.status_code == 204
    await db_session.refresh(tag)
    assert tag.deleted_at is not None
    assert tag.deleted_ts != 0
