from typing import Annotated

from fastapi import Path

OrganizationId = Annotated[str, Path()]
TagId = Annotated[str, Path()]
