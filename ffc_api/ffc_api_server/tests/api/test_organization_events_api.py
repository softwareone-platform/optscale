from unittest.mock import Mock

import pytest
from bson import ObjectId
from ffc_api.ffc_api_server.app.db.models.optscale import Organization
from ffc_api.ffc_api_server.app.services import events as events_service
from httpx import AsyncClient
from pymongo.errors import ExecutionTimeout, ServerSelectionTimeoutError
from pytest_mock import MockerFixture

EVENT_ID = ObjectId("652f1b2c3d4e5f6a7b8c9d0e")


@pytest.fixture
def events_collection(mocker: MockerFixture) -> Mock:
    collection = mocker.Mock()
    collection.count_documents = mocker.AsyncMock(return_value=0)
    cursor = collection.find.return_value.sort.return_value.skip.return_value.limit.return_value
    cursor.to_list = mocker.AsyncMock(return_value=[])
    mocker.patch.object(events_service, "get_keeper_events_collection", return_value=collection)
    return collection


def set_events(collection: Mock, events: list[dict], total: int | None = None) -> None:
    collection.count_documents.return_value = len(events) if total is None else total
    cursor = collection.find.return_value.sort.return_value.skip.return_value.limit.return_value
    cursor.to_list.return_value = events


async def test_get_events_by_organization_id(
    admin_client: AsyncClient, organization: Organization, events_collection: Mock
):
    set_events(
        events_collection,
        [
            {
                "_id": EVENT_ID,
                "time": 1790812800,
                "level": "WARNING",
                "evt_class": "CLOUD_ACCOUNT_IMPORT_FAILED",
                "object_id": "ds-id",
                "object_type": "cloud_account",
                "object_name": "AWS",
                "organization_id": organization.id,
                "description": "Import failed",
                "ack": True,
                "acknowledged": 1790816400,
                "acknowledged_by": "user-id",
                "localized": '{"tag": "x"}',
            }
        ],
        total=21,
    )

    response = await admin_client.get(
        f"/admin/organizations/{organization.id}/events?limit=1&offset=20"
    )

    assert response.status_code == 200
    assert response.json() == {
        "items": [
            {
                "id": str(EVENT_ID),
                "time": "2026-10-01T00:00:00Z",
                "level": "WARNING",
                "evt_class": "CLOUD_ACCOUNT_IMPORT_FAILED",
                "object_id": "ds-id",
                "object_type": "cloud_account",
                "object_name": "AWS",
                "description": "Import failed",
                "ack": True,
                "acknowledged": "2026-10-01T01:00:00Z",
                "acknowledged_by": "user-id",
            }
        ],
        "total": 21,
        "limit": 1,
        "offset": 20,
    }
    events_collection.find.assert_called_once_with(
        {"organization_id": organization.id}, max_time_ms=5000
    )
    events_collection.find.return_value.sort.assert_called_once_with([("time", -1), ("_id", -1)])


async def test_get_events_by_organization_id_with_rql(
    admin_client: AsyncClient, organization: Organization, events_collection: Mock
):
    response = await admin_client.get(
        f"/admin/organizations/{organization.id}/events"
        "?and(eq(object_id,obj-1),eq(level,ERROR),gte(time,2026-10-01T00:00:00Z))&order_by(+time)"
    )

    assert response.status_code == 200
    expected_filter = {
        "$and": [
            {"organization_id": organization.id},
            {
                "$and": [
                    {"object_id": "obj-1"},
                    {"level": "ERROR"},
                    {"time": {"$gte": 1790812800}},
                ]
            },
        ]
    }
    events_collection.count_documents.assert_awaited_once_with(expected_filter, maxTimeMS=5000)
    events_collection.find.assert_called_once_with(expected_filter, max_time_ms=5000)
    events_collection.find.return_value.sort.assert_called_once_with([("time", 1), ("_id", 1)])


async def test_get_events_by_organization_id_invalid_rql(
    admin_client: AsyncClient, organization: Organization, events_collection: Mock
):
    response = await admin_client.get(
        f"/admin/organizations/{organization.id}/events?eq(organization_id,other-org)"
    )

    assert response.status_code == 400
    events_collection.count_documents.assert_not_called()


async def test_get_events_by_organization_id_not_indexed_field(
    admin_client: AsyncClient, organization: Organization, events_collection: Mock
):
    response = await admin_client.get(
        f"/admin/organizations/{organization.id}/events?ilike(description,*quota*)"
    )

    assert response.status_code == 400
    events_collection.count_documents.assert_not_called()


async def test_get_events_by_organization_id_query_timeout(
    admin_client: AsyncClient, organization: Organization, events_collection: Mock
):
    events_collection.count_documents.side_effect = ExecutionTimeout(
        "operation exceeded time limit"
    )

    response = await admin_client.get(
        f"/admin/organizations/{organization.id}/events?not(eq(level,ERROR))"
    )

    assert response.status_code == 400
    assert response.json() == {
        "detail": "The query took too long: narrow it, e.g. with a time range."
    }


async def test_get_events_by_organization_id_not_found(
    admin_client: AsyncClient, events_collection: Mock
):
    response = await admin_client.get("/admin/organizations/fake-org/events")

    assert response.status_code == 404
    events_collection.count_documents.assert_not_called()


async def test_get_events_by_organization_id_mongo_error(
    admin_client: AsyncClient, organization: Organization, events_collection: Mock
):
    events_collection.count_documents.side_effect = ServerSelectionTimeoutError("timeout")

    response = await admin_client.get(f"/admin/organizations/{organization.id}/events")

    assert response.status_code == 502
    assert response.json() == {"detail": "Unable to retrieve the organization events."}
