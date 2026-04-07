from datetime import UTC, datetime

import sqlalchemy as sa
from sqlalchemy import BigInteger, Enum, Index, String, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from app.conf import get_settings
from app.db.human_readable_pk import HumanReadablePKMixin
from app.enums import TagResourceType

settings = get_settings()

DB_SCHEMA = settings.db_name
OPT_DB_SCHEMA = settings.mysql_db


class Base(DeclarativeBase):
    id: Mapped[str] = mapped_column(
        String(32),
        primary_key=True,
        unique=True,
        index=True,
    )


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC),
        server_default=sa.func.current_timestamp(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC),
        server_default=sa.func.current_timestamp(),
        onupdate=sa.func.current_timestamp(),
    )
    deleted_at: Mapped[datetime | None] = mapped_column(
        sa.DateTime(timezone=True),
        nullable=True,
    )


class Tag(Base, HumanReadablePKMixin, TimestampMixin):
    __tablename__ = "tags"

    PK_PREFIX = "FTAG"
    PK_NUM_LENGTH = 12

    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    value: Mapped[str] = mapped_column(String(255), nullable=False)
    resource_type: Mapped[TagResourceType] = mapped_column(
        Enum(TagResourceType, values_callable=lambda obj: [e.value for e in obj]),
        nullable=False,
        default=TagResourceType.ORGANIZATION,
        server_default=TagResourceType.ORGANIZATION.value,
    )
    resource_id: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    deleted_ts: Mapped[int] = mapped_column(BigInteger, nullable=False, default=0)

    __table_args__ = (
        Index("ix_tags_resource_lookup", "resource_type", "resource_id"),
        Index("ix_tags_resource_name_lookup", "resource_type", "resource_id", "name"),
        UniqueConstraint(
            "name",
            "resource_id",
            "resource_type",
            "deleted_ts",
            name="uq_tags_active",
        ),
        {"schema": DB_SCHEMA},
    )
