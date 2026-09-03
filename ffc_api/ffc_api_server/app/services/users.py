from typing import Any

from ffc_api.ffc_api_server.app.db.models.optscale import User
from ffc_api.ffc_api_server.app.schemas.core import convert_model_to_schema
from ffc_api.ffc_api_server.app.schemas.users import AssignmentRead, AuthUserRead, UserRead


def build_user_read(user: User, resource_map: dict[str, dict[str, Any]]) -> UserRead:
    assignments = [
        convert_model_to_schema(
            AssignmentRead,
            assignment,
            resource_name=resource_map.get(assignment.resource_id, {}).get("name"),
            resource_purpose=resource_map.get(assignment.resource_id, {}).get("purpose"),
        )
        for assignment in user.auth_user.assignments
    ]
    if user.auth_user:
        auth_user_read = convert_model_to_schema(
            AuthUserRead,
            user.auth_user,
            assignments=assignments,
        )
    else:
        auth_user_read = None
    return convert_model_to_schema(UserRead, user, auth_user=auth_user_read)
