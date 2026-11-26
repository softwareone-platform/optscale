import enum


@enum.unique
class TagResourceType(str, enum.Enum):
    """Types of resources that can be tagged"""

    USER = "user"
    ORGANIZATION = "organization"
    DATA_SOURCE = "data_source"


class RolePurposes(enum.Enum):
    optscale_member = "optscale_member"
    optscale_engineer = "optscale_engineer"
    optscale_manager = "optscale_manager"


class RoleType(enum.Enum):
    POOL = "pool"
    ORGANIZATION = "organization"


class RoleName(enum.Enum):
    MANAGER = "manager"
    ENGINEER = "engineer"
    MEMBER = "member"
