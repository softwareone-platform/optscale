"""
OptScale database models (read-only).

These models are NOT tracked by Alembic migrations.
"""
from datetime import datetime

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Boolean, String, Text, ForeignKey, TIMESTAMP, Integer
from sqlalchemy.orm import relationship
from typing import Optional

from app.conf import get_settings


settings = get_settings()

DB_SCHEMA = settings.mysql_db
AUTH_DB_SCHEMA = settings.auth_db


class Base(DeclarativeBase):
    id: Mapped[str | int] = mapped_column(String(36), primary_key=True)


class Organization(Base):
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


class User(Base):
    __tablename__ = "employee"
    __table_args__ = {"schema": DB_SCHEMA}

    name: Mapped[Optional[str]] = mapped_column(String)
    organization_id: Mapped[str] = mapped_column(String)
    auth_user_id: Mapped[Optional[str]] = mapped_column(String)
    auth_user: Mapped[Optional["AuthUser"]] = relationship(
        "AuthUser",
        primaryjoin="foreign(User.auth_user_id) == AuthUser.id",
        viewonly=True,
        lazy="raise",
    )


class DataSource(Base):
    __tablename__ = "cloudaccount"
    __table_args__ = {"schema": DB_SCHEMA}

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)   # declare enum maybe
    config: Mapped[str] = mapped_column(Text)
    organization_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey(f"{DB_SCHEMA}.organization.id"),
    )
    organization: Mapped["Organization"] = relationship(back_populates="cloudaccounts")
    account_id: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    parent_id: Mapped[Optional[str]] = mapped_column(
        String(36),
        ForeignKey(f"{DB_SCHEMA}.cloudaccount.id"),
        nullable=True,
    )
    parent: Mapped[Optional["DataSource"]] = relationship(
        remote_side="DataSource.id",
    )


class Token(Base):
    __tablename__ = "token"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    digest: Mapped[str] = mapped_column(String(32), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey(f"{AUTH_DB_SCHEMA}.user.id"))
    user: Mapped["AuthUser"] = relationship(back_populates="tokens")
    valid_until: Mapped[datetime] = mapped_column(TIMESTAMP)


class AuthUser(Base):
    __tablename__ = "user"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    salt: Mapped[str] = mapped_column(String(20))
    email: Mapped[str] = mapped_column(String(256))

    tokens: Mapped[list["Token"]] = relationship(
        "Token",
        back_populates="user",
    )
    assignments: Mapped[list["Assignment"]] = relationship(
        "Assignment",
        back_populates="user",
    )


class Role(Base):

    __tablename__ = "role"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(64), index=True)
    is_active: Mapped[bool] = mapped_column(Boolean)


class Type(Base):

    __tablename__ = 'type'
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(24), index=True)


class Assignment(Base):

    __tablename__ = "assignment"
    __table_args__ = {"schema": AUTH_DB_SCHEMA}

    type_id: Mapped[int] = mapped_column(Integer)
    role_id: Mapped[int] = mapped_column(Integer)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey(f"{AUTH_DB_SCHEMA}.user.id"))
    user: Mapped["AuthUser"] = relationship(back_populates="assignments")
