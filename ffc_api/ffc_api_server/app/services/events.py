from typing import Any

from requela.builders.mongo import MongoQuery

from ffc_api.ffc_api_server.app.clients.mongo import get_keeper_events_collection
from ffc_api.ffc_api_server.app.conf import get_settings

DEFAULT_SORT = [("time", -1)]


def build_events_query(organization_id: str, rql_query: MongoQuery | None) -> MongoQuery:
    """
    Scopes the RQL filter to the organization. The organization condition is always ANDed
    with the RQL one, so no RQL expression can match events of other organizations.
    Events are sorted by time (newest first) unless the RQL expression orders them, and
    `_id` is always the last sort key so that pages are stable. `_id` follows the direction
    of the previous key so that the sort can be read from the `(..., time, _id)` indexes
    in either direction instead of being done in memory.
    """
    query_filter: dict[str, Any] = {"organization_id": organization_id}
    if rql_query is not None and rql_query.filter:
        query_filter = {"$and": [query_filter, rql_query.filter]}

    sort = list(rql_query.sort) if rql_query is not None and rql_query.sort else list(DEFAULT_SORT)
    if all(key != "_id" for key, _ in sort):
        sort.append(("_id", sort[-1][1]))
    return MongoQuery(filter=query_filter, sort=sort)


async def get_organization_events(
    organization_id: str, rql_query: MongoQuery | None, limit: int, offset: int
) -> tuple[int, list[dict[str, Any]]]:
    """
    Raises `pymongo.errors.ExecutionTimeout` when a query runs longer than
    `EVENTS_QUERY_MAX_TIME_MS` (e.g. a `not()` expression, which no index can serve).
    """
    max_time_ms = get_settings().events_query_max_time_ms
    query = build_events_query(organization_id, rql_query)
    collection = get_keeper_events_collection()
    total = await collection.count_documents(query.filter, maxTimeMS=max_time_ms)
    events: list[dict[str, Any]] = []
    if limit > 0:
        events = (
            await collection.find(query.filter, max_time_ms=max_time_ms)
            .sort(query.sort)
            .skip(offset)
            .limit(limit)
            .to_list()
        )
    return total, events
