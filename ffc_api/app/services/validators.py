from app.dependencies.db import DataSourceRepository, OrganizationRepository
from app.db.handlers import NotFoundError


class ResourceValidator:
    repo: Any = None

    async def exists(self, resource_id: str) -> bool:
        count = await self.repo.count(where_clause=[self.repo.model_cls.id == resource_id])
        return count == 1


class OrganizationValidator(ResourceValidator):
    def __init__(self, repo: OrganizationRepository):
        self.repo = repo



class DataSourceValidator(ResourceValidator):
    def __init__(self, repo: DataSourceRepository):
        self.repo = repo
