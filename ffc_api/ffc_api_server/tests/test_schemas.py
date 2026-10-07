import uuid
from datetime import UTC, datetime

import pytest
from pydantic import ValidationError
from tools.cloud_adapter.enums import CloudTypes

from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.app.schemas.core import (
    AuditEventsSchema,
    AuditFieldSchema,
    BaseSchema,
    CommonEventsSchema,
    IdSchema,
    convert_model_to_schema,
    convert_schema_to_model,
    extract_events,
    extract_fields_from_model,
    resolve_field_type,
)
from ffc_api.ffc_api_server.app.schemas.datasources import (
    DataSourceRead,
    DataSourceWithExpenses,
)
from ffc_api.ffc_api_server.app.schemas.organizations import (
    EXCLUDED_CURRENCIES,
    OrganizationExpenses,
    OrganizationRead,
)
from ffc_api.ffc_api_server.app.schemas.tags import TagCreate, TagRead, TagRef


def test_convert_model_to_schema():
    now = datetime.now(UTC)
    tag = Tag(
        id=uuid.uuid4(),
        name="env",
        value="prod",
        resource_id="ORG-1",
        resource_type=TagResourceType.ORGANIZATION,
        created_at=now,
        updated_at=now,
    )
    schema = convert_model_to_schema(TagRead, tag)

    assert schema.events.created.at == now
    assert schema.events.updated.at == now
    assert schema.events.deleted is None

    schema = convert_model_to_schema(TagRef, tag, value="overridden")

    assert schema.value == "overridden"


def test_convert_schema_to_model():
    data = TagCreate(
        name="env",
        value="prod",
        resource_id="ORG-1",
        resource_type=TagResourceType.ORGANIZATION,
    )
    tag = convert_schema_to_model(data, Tag)

    assert isinstance(tag, Tag)
    assert tag.name == "env"
    assert tag.resource_type == TagResourceType.ORGANIZATION


def test_extract_fields_from_model():
    tag = Tag(id=uuid.uuid4(), name="env", value="prod", resource_id="ORG-1")
    fields = extract_fields_from_model(TagRef, tag, excluded_fields=["value"])

    assert set(fields) == {"id", "name"}


def test_resolve_field_type_rejects_ambiguous_unions():
    with pytest.raises(TypeError, match="Unsupported union type"):
        resolve_field_type(AuditFieldSchema | IdSchema | None)


def test_base_schema_forbids_extra_fields():
    with pytest.raises(ValidationError):
        TagRef(id=uuid.uuid4(), name="env", value="prod", extra="nope")


def test_extract_events_rejects_non_audit_schema():
    class NotAuditEventsSchema(BaseSchema):
        created: IdSchema

    with pytest.raises(TypeError, match="Unsupported schema type"):
        extract_events(db_model=Tag(), events_schema_cls=NotAuditEventsSchema)


def test_common_events_schema_requires_created_and_updated():
    with pytest.raises(ValidationError):
        CommonEventsSchema(events=AuditEventsSchema())


def test_organization_currency():
    organization = OrganizationRead(
        id="ORG-1", name="FFC", is_demo=False, currency="USD", disabled=False
    )

    assert organization.currency == "USD"
    assert organization.tags == []

    with pytest.raises(ValidationError):
        OrganizationRead(
            id="ORG-1",
            name="FFC",
            is_demo=False,
            currency=EXCLUDED_CURRENCIES[0],
            disabled=False,
        )


def test_organization_expenses_defaults():
    expenses = OrganizationExpenses()

    assert expenses.limit == 0
    assert expenses.expenses_this_month == 0
    assert expenses.expenses_this_month_forecast == 0
    assert expenses.possible_monthly_saving == 0


def datasource_payload(**overrides) -> dict:
    payload = {
        "id": "ds-1",
        "name": "Production",
        "type": CloudTypes.AWS_CNR,
        "account_id": "123456789012",
        "last_import_at": 0,
        "last_import_modified_at": 0,
        "last_import_attempt_at": 0,
        "last_import_attempt_error": None,
    }
    payload.update(overrides)
    return payload


def test_datasource_read_normalises_the_type():
    datasource = DataSourceRead(**datasource_payload(type="AwS_cNr"))

    assert datasource.type.value == "aws_cnr"


def test_datasource_read_rejects_an_unknown_type():
    with pytest.raises(ValidationError):
        DataSourceRead(**datasource_payload(type="invalid type"))


def test_datasource_with_expenses_defaults_to_none():
    datasource = DataSourceWithExpenses(**datasource_payload())

    assert datasource.forecast is None
    assert datasource.cost is None
    assert datasource.resources is None


def test_datasource_with_expenses_carries_the_figures():
    datasource = DataSourceWithExpenses(
        **datasource_payload(), forecast=325777.23, cost=89011.43, resources=17
    )

    assert datasource.forecast == pytest.approx(325777.23)
    assert datasource.cost == pytest.approx(89011.43)
    assert datasource.resources == 17
