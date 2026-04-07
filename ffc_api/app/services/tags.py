from fastapi import HTTPException, status
from sqlalchemy import or_

from app.db.models import Tag
from app.dependencies.db import TagRepository
from app.dependencies.path import TagId
from app.enums import TagResourceType


async def fetch_tag_or_404(
    resource_id: str,
    tag_id_or_name: TagId,
    tag_repo: TagRepository,
    resource_type: TagResourceType,
) -> Tag:
    tag = await tag_repo.first(
        where_clauses=[
            Tag.resource_id == resource_id,
            Tag.deleted_at.is_(None),
            Tag.resource_type == resource_type,
            or_(Tag.id == tag_id_or_name, Tag.name == tag_id_or_name),
        ]
    )

    if tag is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tag {tag_id_or_name} for {resource_type} {resource_id} not found",
        )

    return tag
