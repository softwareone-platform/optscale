from urllib.parse import parse_qs, quote, unquote

from fastapi import Request
from requela import FieldRule, ModelRQLRules, RelationshipRule, RequelaError
from sqlalchemy.sql.selectable import Select

from app.db.models import Tag
from app.utils import wrap_exc_in_http_response
from app.optscale.models import DataSource, User, Organization


class TimestampMixin:
    created_at = FieldRule(alias="events.created.at")
    updated_at = FieldRule(alias="events.updated.at")
    deleted_at = FieldRule(alias="events.deleted.at")


class OrganizationRules(ModelRQLRules):
    __model__ = Organization

    id = FieldRule()
    name = FieldRule()
    currency = FieldRule()


class UserRules(ModelRQLRules):
    __model__ = User

    name = FieldRule()


class DataSourceRules(ModelRQLRules):
    __model__ = DataSource

    name = FieldRule()
    type = FieldRule()
    account_id = FieldRule()
    parent_id = FieldRule()


class TagRules(ModelRQLRules):
    __model__ = Tag

    name = FieldRule()
    value = FieldRule()
    resource_type = FieldRule()
    resource_id = FieldRule()


class RQLQuery:
    def __init__(self, rules: ModelRQLRules):
        self.rules = rules

    def __call__(self, request: Request) -> Select | None:
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
