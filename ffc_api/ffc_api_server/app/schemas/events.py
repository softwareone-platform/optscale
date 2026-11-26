from datetime import UTC, datetime
from typing import Any

from ffc_api.ffc_api_server.app.schemas.core import BaseSchema


class EventRead(BaseSchema):
    id: str
    time: datetime
    level: str
    evt_class: str
    object_id: str | None = None
    object_type: str | None = None
    object_name: str | None = None
    description: str | None = None
    ack: bool
    acknowledged: datetime | None = None
    acknowledged_by: str | None = None
    acknowledged_user: str | None = None
    resolution: str | None = None
    initiator_id: str | None = None
    initiator_name: str | None = None

    @classmethod
    def from_document(cls, document: dict[str, Any]) -> "EventRead":
        """Builds the schema from a keeper `event` document, where dates are Unix timestamps"""
        data = {key: value for key, value in document.items() if key in cls.model_fields}
        data["id"] = str(document["_id"])
        for field_name in ("time", "acknowledged"):
            if data.get(field_name) is not None:
                data[field_name] = datetime.fromtimestamp(data[field_name], tz=UTC)
        return cls(**data)
