import pytest
from ffc_api.ffc_api_server.app.rql import EventRules
from ffc_api.ffc_api_server.app.services import events as events_service
from ffc_api.ffc_api_server.app.services.events import (
    build_events_query,
    get_organization_events,
)
from pytest_mock import MockerFixture
from requela import RequelaError
from requela.builders.mongo import MongoQuery


@pytest.fixture(scope="module")
def event_rules() -> EventRules:
    return EventRules()


def test_rules_convert_datetimes_to_timestamps(event_rules: EventRules):
    query = event_rules.build_query(
        "and(eq(level,ERROR),gte(time,2026-10-01T00:00:00Z),lt(time,2026-10-02T00:00:00Z))"
        "&order_by(-time)"
    )

    assert query.filter == {
        "$and": [
            {"level": "ERROR"},
            {"time": {"$gte": 1790812800}},
            {"time": {"$lt": 1790899200}},
        ]
    }
    assert query.sort == [("time", -1)]


def test_rules_filter_by_object_id(event_rules: EventRules):
    query = event_rules.build_query("in(object_id,(obj-1,obj-2))")

    assert query.filter == {"object_id": {"$in": ["obj-1", "obj-2"]}}


@pytest.mark.parametrize(
    "rql",
    [
        "eq(organization_id,other-org)",
        "ilike(description,*quota*)",
        "eq(evt_class,CLOUD_ACCOUNT_IMPORT_FAILED)",
        "eq(object_type,cloud_account)",
        "eq(object_name,AWS)",
    ],
)
def test_rules_reject_not_indexed_fields(event_rules: EventRules, rql: str):
    with pytest.raises(RequelaError, match="not found"):
        event_rules.build_query(rql)


@pytest.mark.parametrize(
    ("rql", "error"),
    [
        ("ne(level,INFO)", "Operator 'ne' is not allowed for field 'level'"),
        ("like(object_id,obj*)", "Operator 'like' is not allowed for field 'object_id'"),
        ("eq(time,2026-10-01T00:00:00Z)", "Operator 'eq' is not allowed for field 'time'"),
    ],
)
def test_rules_reject_not_allowed_operators(event_rules: EventRules, rql: str, error: str):
    with pytest.raises(RequelaError, match=error):
        event_rules.build_query(rql)


@pytest.mark.parametrize("field", ["level", "object_id"])
def test_rules_only_allow_ordering_by_time(event_rules: EventRules, field: str):
    with pytest.raises(RequelaError, match=f"Order by '{field}' is not allowed"):
        event_rules.build_query(f"order_by({field})")


def test_build_events_query_without_rql():
    query = build_events_query("org-id", None)

    assert query.filter == {"organization_id": "org-id"}
    assert query.sort == [("time", -1), ("_id", -1)]


def test_build_events_query_scopes_rql_to_the_organization():
    rql_query = MongoQuery(
        filter={"$or": [{"organization_id": "other-org"}, {"level": "ERROR"}]},
        sort=[("time", 1)],
    )

    query = build_events_query("org-id", rql_query)

    assert query.filter == {
        "$and": [
            {"organization_id": "org-id"},
            {"$or": [{"organization_id": "other-org"}, {"level": "ERROR"}]},
        ]
    }
    assert query.sort == [("time", 1), ("_id", 1)]
    assert rql_query.sort == [("time", 1)]


def test_build_events_query_keeps_id_ordering():
    query = build_events_query("org-id", MongoQuery(sort=[("_id", 1)]))

    assert query.sort == [("_id", 1)]


async def test_get_organization_events(mocker: MockerFixture, test_settings):
    collection = mocker.Mock()
    collection.count_documents = mocker.AsyncMock(return_value=3)
    cursor = collection.find.return_value.sort.return_value.skip.return_value.limit.return_value
    cursor.to_list = mocker.AsyncMock(return_value=[{"_id": "x"}])
    mocker.patch.object(events_service, "get_keeper_events_collection", return_value=collection)
    max_time_ms = test_settings.events_query_max_time_ms

    total, events = await get_organization_events("org-id", None, limit=10, offset=20)

    assert total == 3
    assert events == [{"_id": "x"}]
    collection.count_documents.assert_awaited_once_with(
        {"organization_id": "org-id"}, maxTimeMS=max_time_ms
    )
    collection.find.assert_called_once_with({"organization_id": "org-id"}, max_time_ms=max_time_ms)
    collection.find.return_value.sort.assert_called_once_with([("time", -1), ("_id", -1)])
    collection.find.return_value.sort.return_value.skip.assert_called_once_with(20)
    collection.find.return_value.sort.return_value.skip.return_value.limit.assert_called_once_with(
        10
    )


async def test_get_organization_events_with_zero_limit(mocker: MockerFixture):
    collection = mocker.Mock()
    collection.count_documents = mocker.AsyncMock(return_value=3)
    mocker.patch.object(events_service, "get_keeper_events_collection", return_value=collection)

    total, events = await get_organization_events("org-id", None, limit=0, offset=0)

    assert total == 3
    assert events == []
    collection.find.assert_not_called()
