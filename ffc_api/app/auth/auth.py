import logging

from fastapi import Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pymacaroons import Macaroon, Verifier

from app.auth.constants import UNAUTHORIZED_EXCEPTION


LOG = logging.getLogger(__name__)


class TokenBearer(HTTPBearer):
    def __init__(self):
        super().__init__(auto_error=False)

    async def __call__(self, request: Request) -> str | None:
        credentials: HTTPAuthorizationCredentials | None = await super().__call__(request)

        if not credentials:
            return None

        if credentials.scheme.lower() != "bearer":
            raise UNAUTHORIZED_EXCEPTION

        return credentials.credentials


class MacaroonToken:
    def __init__(self, secret: str, ident: str, location: str = ""):
        self._secret = secret
        self._ident = ident
        self._location = location

    def verify(self, token: str) -> bool:
        try:
            macaroon = Macaroon.deserialize(token)
            verifier = Verifier()
            verifier.satisfy_general(lambda x: True)
            return verifier.verify(macaroon, self._secret)
        except Exception as exc:
            LOG.warning("Cannot verify token %s, exception %s", token, str(exc))
            return False
