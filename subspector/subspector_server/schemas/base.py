from pydantic import BaseModel


class Base(BaseModel):
    model_config = {'extra': 'forbid'}


class BaseResponse(BaseModel):
    id: str
    created_at: int
    deleted_at: int
