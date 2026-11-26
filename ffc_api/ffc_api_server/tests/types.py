from collections.abc import Awaitable, Callable
from typing import Any, Protocol, TypeVar

from ffc_api.ffc_api_server.app.db.models.ffc import Base as FFCBase
from ffc_api.ffc_api_server.app.db.models.optscale import Base as OptScaleBase

ModelT = TypeVar("ModelT", bound=FFCBase | OptScaleBase)
ModelFactory = Callable[..., Awaitable[ModelT]]
ForecastsFactory = Callable[..., dict[str, dict[str, Any]]]


class RQLRequest(Protocol):
    scope: dict[str, Any]
