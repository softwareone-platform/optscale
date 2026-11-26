from datetime import UTC, datetime

import pytest
from fastapi import HTTPException
from ffc_api.ffc_api_server.app.db.handlers import TagHandler
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.enums import TagResourceType
from ffc_api.ffc_api_server.app.services.tags import fetch_tag_or_404
from ffc_api.ffc_api_server.tests.types import ModelFactory
from sqlalchemy.ext.asyncio import AsyncSession


async def test_fetch_tag_or_404(db_session: AsyncSession, tag_factory: ModelFactory[Tag]):
    tag = await tag_factory(resource_id="ORG-1", name="env")

    fetched_by_id = await fetch_tag_or_404(
        "ORG-1", str(tag.id), TagHandler(db_session), TagResourceType.ORGANIZATION
    )

    assert fetched_by_id.id == tag.id

    fetched_by_name = await fetch_tag_or_404(
        "ORG-1", "env", TagHandler(db_session), TagResourceType.ORGANIZATION
    )

    assert fetched_by_name.id == tag.id


async def test_fetch_tag_or_404_wrong_resource(
    db_session: AsyncSession, tag_factory: ModelFactory[Tag]
):
    await tag_factory(resource_id="ORG-1", name="env")

    with pytest.raises(HTTPException) as exc_info:
        await fetch_tag_or_404("ORG", "env", TagHandler(db_session), TagResourceType.ORGANIZATION)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == f"Tag env for {TagResourceType.ORGANIZATION} ORG not found"


async def test_fetch_tag_or_404_wrong_resource_type(
    db_session: AsyncSession, tag_factory: ModelFactory[Tag]
):
    await tag_factory(resource_id="RES-1", name="env", resource_type=TagResourceType.ORGANIZATION)

    with pytest.raises(HTTPException):
        await fetch_tag_or_404("RES-1", "env", TagHandler(db_session), TagResourceType.DATA_SOURCE)


async def test_fetch_tag_or_404_ignores_deleted_tags(
    db_session: AsyncSession, tag_factory: ModelFactory[Tag]
):
    await tag_factory(
        resource_id="ORG",
        name="env",
        deleted_at=datetime.now(UTC),
        deleted_ts=1700000000,
    )

    with pytest.raises(HTTPException):
        await fetch_tag_or_404("ORG", "env", TagHandler(db_session), TagResourceType.ORGANIZATION)
