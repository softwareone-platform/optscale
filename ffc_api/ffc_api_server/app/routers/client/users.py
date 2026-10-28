import logging

from fastapi import APIRouter, HTTPException, status
from fastapi.concurrency import run_in_threadpool
from sqlalchemy import func

from ffc_api.ffc_api_server.app.clients.auth import get_auth_client
from ffc_api.ffc_api_server.app.db.models.optscale import Invite
from ffc_api.ffc_api_server.app.dependencies.db import InviteRepository
from ffc_api.ffc_api_server.app.schemas.core import convert_dict_to_schema
from ffc_api.ffc_api_server.app.schemas.users import UserCreate, UserRegistrationRead
from ffc_api.ffc_api_server.app.utils import proxy_optscale_errors, utcnow_timestamp

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
    response_model=UserRegistrationRead,
)
async def create_user(
    data: UserCreate,
    invite_repo: InviteRepository,
):
    invite = await invite_repo.first(
        where_clauses=[
            func.lower(Invite.email) == str(data.email).lower(),
            Invite.ttl > utcnow_timestamp(),
            Invite.deleted_at == 0,
        ],
    )
    if invite is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"No invitation found for email {data.email}.",
        )

    with proxy_optscale_errors():
        auth_client = get_auth_client()
        _, user = await run_in_threadpool(
            auth_client.user_create,
            email=str(data.email),
            password=data.password,
            display_name=data.display_name,
            verified=False,
        )

    return convert_dict_to_schema(UserRegistrationRead, user)
