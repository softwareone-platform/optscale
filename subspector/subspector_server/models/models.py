import uuid
from enum import StrEnum

from sqlalchemy import JSON, Boolean, ForeignKey, Integer, String, Enum, Float
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
)

from subspector.subspector_server.utils import get_current_timestamp


def gen_id():
    return str(uuid.uuid4())


class SubscriptionStatus(StrEnum):
    active = 'active'
    limit_exceeded = 'limit_exceeded'
    suspended = 'suspended'


class StripeSubscriptionStatus(StrEnum):
    incomplete = 'incomplete'
    incomplete_expired = 'incomplete_expired'
    trialing = 'trialing'
    active = 'active'
    past_due = 'past_due'
    canceled = 'canceled'
    unpaid = 'unpaid'
    paused = 'paused'


class Base(DeclarativeBase):
    __abstract__ = True

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_id)
    created_at: Mapped[int] = mapped_column(
        Integer, default=get_current_timestamp, nullable=False
    )
    deleted_at: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Plan(Base):
    __tablename__ = 'plan'

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    limits: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    customer_id: Mapped[str | None] = mapped_column(String(36), nullable=True)
    price_id: Mapped[str | None] = mapped_column(String(36), nullable=True)
    trial_days: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    grace_period_days: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    default: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    price: Mapped[float | None] = mapped_column(Float, nullable=True)
    currency: Mapped[str | None] = mapped_column(String(36), nullable=True)
    qty_unit: Mapped[str] = mapped_column(String(36), nullable=True)


class Customer(Base):
    __tablename__ = 'customer'

    owner_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    stripe_customer_id: Mapped[str | None] = mapped_column(
        String(64), nullable=True, index=True
    )
    name: Mapped[str | None] = mapped_column(String(255), nullable=True)


class Subscription(Base):
    __tablename__ = 'subscription'

    updated_at: Mapped[int] = mapped_column(
        Integer, default=0, nullable=False
    )
    plan_id: Mapped[str] = mapped_column(
        String(36), ForeignKey(Plan.id), nullable=False
    )
    plan: Mapped[Plan] = relationship('Plan')
    customer_id: Mapped[str] = mapped_column(
        String(36), ForeignKey(Customer.id), nullable=False, index=True
    )
    customer: Mapped[Customer] = relationship('Customer')
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    status: Mapped[SubscriptionStatus] = mapped_column(
        Enum(SubscriptionStatus),
        nullable=False, default=SubscriptionStatus.active
    )
    stripe_subscription_id: Mapped[str | None] = mapped_column(
        String(36), nullable=True
    )
    stripe_status: Mapped[StripeSubscriptionStatus | None] = mapped_column(
        Enum(StripeSubscriptionStatus), nullable=True
    )
    cancel_at_period_end: Mapped[bool | None] = mapped_column(
        Boolean, nullable=False, default=False
    )
    end_date: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    grace_period_start: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0)
    trial_used: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
