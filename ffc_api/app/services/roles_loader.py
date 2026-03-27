from typing import Any, Optional, Sequence

from app.db.base import session_factory
from app.db.handlers import RoleHandler, TypeHandler
from app.optscale.models import Role


class Roles:
    def __init__(self):
        # Add ttl to update cached values, but maybe not worth it
        self.role_map: dict[int, str] = {}
        self.type_map: dict[int, str] = {}


    async def load(self):
        async with session_factory() as session:
            async with session.begin():

                role_handler = RoleHandler(session)
                type_handler = TypeHandler(session)

                roles = await role_handler.query_db(where_clauses=[Role.is_active == True])
                types = await type_handler.query_db()

                self.role_map = {r.id: r.name for r in roles}
                self.type_map = {t.id: t.name for t in types}

    def get_role_name(self, role_id: int) -> Optional[str]:
        return self.role_map.get(role_id)

    def get_type_name(self, type_id: int) -> Optional[str]:
        return self.type_map.get(type_id)


_roles: Roles | None = None


async def configure_roles() -> Any:
    global _roles
    if not _roles:
        _roles = Roles()
        await _roles.load()
    return _roles


def get_roles() -> Roles:
    if _roles is None:
        raise RuntimeError("Roles not configured")
    return _roles
