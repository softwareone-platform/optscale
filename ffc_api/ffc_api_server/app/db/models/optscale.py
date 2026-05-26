"""
OptScale database models (read-only).

These models are NOT tracked by Alembic migrations.
"""

from datetime import datetime
from typing import Optional

from sqlalchemy import TIMESTAMP, Boolean, ForeignKey, Integer, String, Text, and_, func, select
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    column_property,
    declared_attr,
    foreign,
    mapped_column,
    relationship,
)

from ffc_api.ffc_api_server.app.conf import get_settings
from ffc_api.ffc_api_server.app.db.models.ffc import Tag
from ffc_api.ffc_api_server.app.enums import TagResourceType

settings = get_settings()

DB_SCHEMA = settings.mysql_db
AUTH_DB_SCHEMA = settings.auth_db


class Base(DeclarativeBase):
    pass


class IDMixin:
    id: Mapped[str | int] = mapped_column(String(36), primary_key=True)


class Organization(Base, IDMixin):
    __tablename__ = "organization"
    __table_args__ = {"schema": DB_SCHEMA}

    name: Mapped[str] = mapped_column(String)
    is_demo: Mapped[bool] = mapped_column(Boolean)
    currency: Mapped[str] = mapped_column(String)
    disabled: Mapped[bool] = mapped_column(Boolean)

    cloudaccounts: Mapped[list["DataSource"]] = relationship(
        "DataSource",
        back_populates="organization",
    )

    tags = relationship(
        Tag,
        primaryjoin=lambda: and_(
            foreign(Tag.resource_id) == Organization.id,
            Tag.resource_type == TagResourceType.ORGANIZATION,
            Tag.deleted_at.is_(None),
        ),
        viewonly=True,
        lazy="selectin",
    )


class Pool(Base, IDMixin):
    __tablename__ = "pool"
    __table_args__ = {"schema": DB_SCHEMA}

    limit: Mapped[int] = mapped_column(Integer)
    name: Mapped[str] = mapped_column(String)
    organization_id: Mapped[str] = mapped_column(String)
    purpose: Mapped[str] = mapped_column(String)
    default_owner_id: Mapped[str | None] = mapped_column(String, nullable=True)
    deleted_at: Mapped[int] = mapped_column(Integer)


class User(Base, IDMixin):
    __tablename__ = "employee"
    __table_args__ = {"schema": DB_SCHEMA}

    name: Mapped[str | None] = mapped_column(String)
    organization_id: Mapped[str] = mapped_column(String)
    auth_user_id: Mapped[str | None] = mapped_column(String)
    auth_user: Mapped[Optional["AuthUser"]] = relationship(
        "AuthUser",
        primaryjoin="foreign(User.auth_user_id) == AuthUser.id",
        viewonly=True,
        lazy="raise",
    )
    created_at: Mapped[int] = mapped_column(Integer)
    deleted_at: Mapped[int] = mapped_column(Integer)

    tags = relationship(
        Tag,
        primaryjoin=lambda: and_(
            foreign(Tag.resource_id) == User.id,
            Tag.resource_type == TagResourceType.USER,
            Tag.deleted_at.is_(None),
        ),
        viewonly=True,
        lazy="selectin",
    )


class DataSource(Base):
    __tablename__ = "cloudaccount"
    __table_args__ = {"schema": DB_SCHEMA}

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)
    config: Mapped[str] = mapped_column(Text)
    deleted_at: Mapped[int] = mapped_column(Integer)
    organization_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey(f"{DB_SCHEMA}.organization.id"),
    )
    organization: Mapped["Organization"] = relationship(back_populates="cloudaccounts")
    account_id: Mapped[str | None] = mapped_column(String, nullable=True)
    parent_id: Mapped[str | None] = mapped_column(
        String(36),
        ForeignKey(f"{DB_SCHEMA}.cloudaccount.id"),
        nullable=True,
    )
    parent: Mapped[Optional["DataSource"]] = relationship(
        remote_side="DataSource.id",
    )

    tags = relationship(
        Tag,
        primaryjoin=lambda: and_(
            foreign(Tag.resource_id) == DataSource.id,
            Tag.resource_type == TagResourceType.DATA_SOURCE,
            Tag.deleted_at.is_(None),
        ),
        viewonly=True,
        lazy="selectin",
    )


class Token(Base):
    __tablename__ = "token"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    digest: Mapped[str] = mapped_column(String(32), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey(f"{AUTH_DB_SCHEMA}.user.id"))
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP)


class AuthUser(Base, IDMixin):
    __tablename__ = "user"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    email: Mapped[str] = mapped_column(String(256))

    assignments: Mapped[list["Assignment"]] = relationship(
        "Assignment",
        back_populates="user",
    )

    @declared_attr
    def last_login(cls) -> Mapped[datetime | None]:
        return column_property(
            select(func.max(Token.created_at))
            .where(Token.user_id == cls.id)
            .correlate_except(Token)
            .scalar_subquery(),
            deferred=True,
        )


class Role(Base):
    __tablename__ = "role"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(64), index=True)
    purpose: Mapped[str] = mapped_column(String(64))
    deleted_at: Mapped[int] = mapped_column(Integer)


class Type(Base):
    __tablename__ = "type"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(24), index=True)


class Assignment(Base, IDMixin):
    __tablename__ = "assignment"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    type_id: Mapped[int] = mapped_column(Integer)
    role_id: Mapped[int] = mapped_column(Integer)
    resource_id: Mapped[str | None] = mapped_column(String(36), nullable=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey(f"{AUTH_DB_SCHEMA}.user.id"))
    user: Mapped["AuthUser"] = relationship(back_populates="assignments")
