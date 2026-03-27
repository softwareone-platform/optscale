import enum

class TagResourceType(str, enum.Enum):
    """Types of resources that can be tagged"""
    USER = "user"
    ORGANIZATION = "organization"
    DATA_SOURCE = "data_source"
