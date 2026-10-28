from datetime import datetime
from typing import Any
from urllib.parse import parse_qs, quote, unquote

from fastapi import Request
from pydantic import BaseModel
from requela import FieldRule, ModelRQLRules, RelationshipRule, RequelaError
from requela.builders.mongo import MongoQueryBuilder
from requela.dataclasses import Operator

from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.db.models.optscale import AuthUser, DataSource, Organization, User
from ffc_api.ffc_api_server.app.utils import wrap_exc_in_http_response


class TimestampMixin:
    created_at = FieldRule(alias="events.created.at")
    updated_at = FieldRule(alias="events.updated.at")
    deleted_at = FieldRule(alias="events.deleted.at")


class TagRules(ModelRQLRules):
    __model__ = Tag

    name = FieldRule()
    value = FieldRule()
    resource_type = FieldRule()
    resource_id = FieldRule()


class AuthUserRules(ModelRQLRules):
    __model__ = AuthUser

    id = FieldRule()
    email = FieldRule()


class UserRules(ModelRQLRules):
    __model__ = User

    id = FieldRule()
    name = FieldRule(alias="display_name")
    auth_user = RelationshipRule(rules=AuthUserRules())
    email = FieldRule(source="auth_user.email")
    is_admin = FieldRule(allowed_operators=[Operator.EQ, Operator.NE])
    created_at = FieldRule(source="created_at_dt")
    last_login = FieldRule(source="auth_user.last_login")

    tags = RelationshipRule(rules=TagRules())


class OrganizationRules(ModelRQLRules):
    __model__ = Organization

    id = FieldRule()
    name = FieldRule()
    currency = FieldRule()

    tags = RelationshipRule(rules=TagRules())


class BaseDataSourceRules(ModelRQLRules):
    __model__ = DataSource

    id = FieldRule()
    name = FieldRule()
    type = FieldRule()


class DataSourceRules(BaseDataSourceRules):
    __model__ = DataSource

    account_id = FieldRule(alias="datasource_id")
    parent = RelationshipRule(rules=BaseDataSourceRules())

    tags = RelationshipRule(rules=TagRules())


class EventDocument(BaseModel):
    """
    The fields of a keeper `event` document that can be used in RQL expressions.
    Only fields served by an index of the `event` collection are exposed: filtering an
    organization with hundreds of thousands of events on other fields scans all of them.
    """

    time: datetime
    level: str
    object_id: str | None = None


def datetime_to_timestamp(value: datetime) -> int:
    # keeper stores dates as Unix timestamps
    return int(value.timestamp())


class EventRules(ModelRQLRules):
    __model__ = EventDocument
    __builder__ = MongoQueryBuilder

    time = FieldRule(
        allowed_operators=[Operator.GT, Operator.GTE, Operator.LT, Operator.LTE],
        value_converter=datetime_to_timestamp,
    )
    level = FieldRule(allowed_operators=[Operator.EQ, Operator.IN], allow_ordering=False)
    object_id = FieldRule(allowed_operators=[Operator.EQ, Operator.IN], allow_ordering=False)


class RQLQuery:
    def __init__(self, rules: ModelRQLRules):
        self.rules = rules

    def __call__(self, request: Request) -> Any:
        qs = quote(
            request.scope["query_string"].decode(), safe="/&()=_.-~:,"
        )  # make sure we can decode datetime
        parsed = parse_qs(qs, keep_blank_values=True)
        rql_tokens = [k for k, v in parsed.items() if v == [""]]
        rql_expression = "&".join(rql_tokens)
        if not rql_expression:
            return None

        with wrap_exc_in_http_response(RequelaError):
            return self.rules.build_query(unquote(rql_expression))

        return None
