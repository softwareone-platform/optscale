import secrets
from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyHeader

from app.conf import get_settings
from app.auth.auth import TokenBearer, MacaroonToken
from app.utils import get_digest, utcnow
from app.db.handlers import TokenHandler
from app.optscale.models import Token
from app.dependencies.db import DBSession


secret_header = APIKeyHeader(name="Secret", auto_error=False)


def verify_cluster_secret(secret: str | None = Depends(secret_header)):
    if secret is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Missing secret")

    settings = get_settings()

    if not secrets.compare_digest(secret, settings.cluster_secret):  # type: ignore[type-var]
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid cluster secret",
        )

token_bearer = TokenBearer()


async def verify_cluster_token(
    db_session: DBSession,
    token_str: str = Depends(token_bearer),
):
    if not token_str:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Missing token")

    token_handler = TokenHandler(db_session)
    token = await token_handler.first(
        where_clauses=[Token.digest == get_digest(token_str), Token.valid_until >= utcnow()],
    )

    if token is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token not found")

    macaroon_token = MacaroonToken(token.user.salt, token.user.id)
    if not macaroon_token.verify(token_str):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token")

    return
