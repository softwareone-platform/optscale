from __future__ import annotations

import datetime
import types
from typing import Any

from pydantic import BaseModel, ConfigDict

from app.db.models import Base
from app.optscale.models import Base as OptScaleBase


def convert_model_to_schema[M: Base | OptScaleBase, S: BaseModel](
    schema_cls: type[S], db_model: M, **override_attributes: Any
) -> S:
    """
    Converts (Serialize) an SQLAlchemy model instance (`db_model`) into a
    Pydantic schema (`schema_cls`).
    If the given schema has an "events" field to track audit events, they will be
    added to the generated schema that will be returned to the caller.
    This function also allows including attributes to the generated output schema.


    Args:
        - schema_cls (Type[S]): The target Pydantic schema class. If a class does not inherit
            from BaseModel, it cannot be used as S.

        - db_model (M): The SQLAlchemy model instance. If a class does not inherit from Base,
            it cannot be used as M

        - override_attributes (Any): Fields to override in the schema.

    Returns:
        S: An instance of `schema_cls` with the converted data.

    """
    schema_data = extract_fields_from_model(schema_cls, db_model, list(override_attributes.keys()))
    if "events" not in schema_cls.model_fields:
        # IF "events" is not in the dictionary containing all the schema’s fields, then no additional
        # processing is needed. Just returns an instance of schema_cls with the
        # fields extracted from the db_model and any user provided attributes to override.
        return schema_cls(**schema_data, **override_attributes)

    # NOTE: This is a hack, ideally this behavior should be handled by the models,
    #       but to do it properly we need to spend more time in learning how pydantic
    #       works and possibly do quite a lot of refactoring of our schemas

    events_schema_cls = schema_cls.model_fields["events"].annotation
    # IF "events" exists, we're going to create an instance of AuditEventsSchema
    # extract field values from db_model that match schema_cls, not considering the
    # override_attributes fields, if any.
    events = extract_events(db_model=db_model, events_schema_cls=events_schema_cls)  # type: ignore
    return schema_cls(**schema_data, events=events, **override_attributes)


def extract_events[M: Base | OptScaleBase, S: BaseModel](
    db_model: M, events_schema_cls: type[S]
) -> BaseModel:
    """
    Extracts events of type AuditFieldSchema from an SQLAlchemy model instance

    Args:
        db_model (M): The SQLAlchemy model instance.
        events_schema_cls (type[S]): The target schema containing `events` to extract.

    Returns:
        BaseModel: An instance of `AuditEventsSchema` with extracted event data.
    """
    schema_values: dict[str, AuditFieldSchema | None] = {}
    for field_name, field_info in events_schema_cls.model_fields.items():
        print(field_name, field_info.annotation)
        event_field_schema_cls = resolve_field_type(field_info.annotation)

        if not issubclass(event_field_schema_cls, AuditFieldSchema):  # type: ignore
            raise TypeError(f"Unsupported schema type: {event_field_schema_cls}")

        at_value = getattr(db_model, f"{field_name}_at", None)

        schema_values[field_name] = (
            event_field_schema_cls(at=at_value) if at_value else None  # type: ignore
        )
    print(schema_values)
    return events_schema_cls(**schema_values)


def resolve_field_type(field_info: Any) -> BaseModel:
    """
    This function resolves the actual field type from a Pydantic model annotation,
    ensuring the correct type handling with nullable, optional, fields.
    Schemas might have optional fields and the events field might be Null.

    Args:
        field_info (Any): The field annotation from a Pydantic model instance.

    Returns:
        BaseSchema: The resolved field type, without Optional or Union
    Raises:
        TypeError: If the given field type is not an acceptable type.
    """
    event_field_schema_cls = field_info
    if isinstance(event_field_schema_cls, types.UnionType):
        non_none_types = [t for t in event_field_schema_cls.__args__ if t != types.NoneType]

        if len(non_none_types) != 1:
            raise TypeError(f"Unsupported union type: {event_field_schema_cls.__args__}")

        event_field_schema_cls = non_none_types[0]
    return event_field_schema_cls


def convert_schema_to_model[M: Base | OptScaleBase, S: BaseModel](
    schema: S, model_cls: type[M]
) -> M:
    """
    Converts a Pydantic schema instance to an ORM model instance.

    This function ensures that only fields present in the ORM model are
    passed to it,preventing errors caused by extra fields.
    """
    # extract data from the schema. This will return a dict
    schema_data = schema.model_dump(exclude_unset=True)
    # filter out all the fields that are not in the ORM model
    dbmodel_fields = {key: value for key, value in schema_data.items() if hasattr(model_cls, key)}
    # create an instance of the ORM model
    return model_cls(**dbmodel_fields)


def extract_fields_from_model[M: Base | OptScaleBase, S: BaseModel](
    schema_cls: type[S], db_model: M, excluded_fields: list[str]
) -> dict[str, Any]:
    """
    This function iterates through the fields defined in the Pydantic schema (`schema_cls`),
    retrieves the corresponding values from the database model (`db_model`), and returns
    a dictionary with the extracted field values.
    Any fields listed in `excluded_fields` or not present in `db_model`are ignored.
    This function ensures that only fields present in the Pydantic model are included
    in the returned dictionary.

    """
    return {
        field_name: getattr(db_model, field_name)
        for field_name in schema_cls.model_fields.keys()
        if field_name not in excluded_fields and hasattr(db_model, field_name)
    }


class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True, extra="forbid")


class IdSchema(BaseSchema):
    id: str

class AuditFieldSchema(BaseSchema):
    at: datetime.datetime


class AuditEventsSchema(BaseSchema):
    created: AuditFieldSchema
    updated: AuditFieldSchema
    deleted: AuditFieldSchema | None = None


class CommonEventsSchema(BaseSchema):
    events: AuditEventsSchema
