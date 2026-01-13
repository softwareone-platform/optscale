from pydantic import Field

from subspector.subspector_server.schemas.base import Base, BaseResponse


class PlanUpdate(Base):
    limits: dict = Field(default_factory=dict)
    trial_days: int = Field(0, ge=0, le=365)
    grace_period_days: int = Field(0, ge=0, le=365)
    qty_unit: str | None = Field(min_length=1, max_length=36, default=None)


class PlanCreate(PlanUpdate):
    name: str = Field(min_length=1, max_length=255)
    price_id: str | None = Field(min_length=1, max_length=36, default=None)
    customer_id: str | None = Field(min_length=1, max_length=36, default=None)


class PlanList(Base):
    owner_id: str | None = None
    include_deleted: bool = False


class PlanResponse(BaseResponse, PlanCreate):
    default: bool
    price: float | None = None
    currency: str | None = None
