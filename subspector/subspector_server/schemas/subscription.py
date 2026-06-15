from pydantic import Field

from subspector.subspector_server.models.models import (
    StripeSubscriptionStatus,
    SubscriptionStatus,
)
from subspector.subspector_server.schemas.plan import PlanResponse
from subspector.subspector_server.schemas.base import Base, BaseResponse
from subspector.subspector_server.utils import MAX_32_INT, get_current_timestamp


class SubscriptionUpdate(Base):
    updated_at: int = Field(default=get_current_timestamp, ge=0, le=MAX_32_INT)
    price_id: str = Field(min_length=1, max_length=36, default=None)
    quantity: int = Field(default=1, ge=1)
    status: SubscriptionStatus = SubscriptionStatus.active
    stripe_status: StripeSubscriptionStatus | None = None
    stripe_subscription_id: str | None = Field(
        min_length=1, max_length=36, default=None
    )
    end_date: int = Field(default=0, ge=0, le=MAX_32_INT)
    grace_period_start: int = Field(default=0, ge=0, le=MAX_32_INT)
    cancel_at_period_end: bool = False

    @staticmethod
    def get_priority(param):
        field_priority_map = {
            'plan_id': 10,
            'stripe_subscription_id': 10,
            'quantity': 7,
            'stripe_status': 5,
        }
        return field_priority_map.get(param) or 0


class SubscriptionResponse(BaseResponse, SubscriptionUpdate):
    customer_id: str
    plan_id: str
    price_id: str = Field(default=None, exclude=True)


class OwnerSubscriptionResponse(Base):
    id: str
    plan: PlanResponse
    quantity: int = 1
    status: str
    stripe_status: str | None = None
    end_date: int | None = 0
    grace_period_start: int | None = 0
    cancel_at_period_end: bool | None = False
    trial_used: bool = False


class ChangePlan(Base):
    plan_id: str | None = Field(min_length=1, max_length=36)


class ChangePlanResponse(Base):
    result: str
    url: str | None = None
