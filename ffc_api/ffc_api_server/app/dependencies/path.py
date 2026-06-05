import uuid
from typing import Annotated

from fastapi import Path

OrganizationId = Annotated[str, Path()]
DataSourceId = Annotated[str, Path()]
TagId = Annotated[uuid.UUID, Path()]
UserId = Annotated[str, Path()]
