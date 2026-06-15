from pydantic import Field

from subspector.subspector_server.schemas.base import Base, BaseResponse


class CustomerCreate(Base):
    owner_id: str = Field(min_length=1, max_length=36)
    name: str | None = Field(min_length=1, max_length=255, default=None)


class CustomerList(Base):
    connected_only: bool = False


class CustomerResponse(BaseResponse, CustomerCreate):
    stripe_customer_id: str | None = Field(min_length=1, max_length=36, default=None)
