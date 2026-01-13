from fastapi import Depends, Header, HTTPException, Request, status

from tools.stripe_client.client import verify_event
from tools.stripe_client.exceptions import InvalidWebhookSecret


def get_secret(request: Request):
    return request.app.state.cluster_secret


def get_stripe_webhook_secret(request: Request):
    return request.app.state.stripe_webhook_secret


def get_public_ip(request: Request):
    return request.app.state.public_ip


def get_producer(request: Request):
    return request.app.state.producer


async def get_session(request: Request):
    db = request.app.state.db
    session = await db.session()
    try:
        yield session
    except Exception:
        await session.rollback()
        raise
    finally:
        await session.close()


async def verify_secret(
    secret: str = Header(None, alias='Secret'),
    cluster_secret=Depends(get_secret),
):
    if not secret:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Secret is required',
        )
    if secret != cluster_secret:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail='Secret is invalid'
        )


async def verify_stripe_event(
    request: Request,
    stripe_signature: str = Header(..., alias='stripe-signature'),
    stripe_webhook_secret=Depends(get_stripe_webhook_secret),
):
    if not stripe_webhook_secret:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Webhook secret is required',
        )
    payload = await request.body()
    try:
        return verify_event(payload, stripe_signature, stripe_webhook_secret)
    except InvalidWebhookSecret:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Webhook secret is invalid',
        )
