import logging

from fastapi import HTTPException, status
from sqlalchemy import and_, select
from starlette.concurrency import run_in_threadpool
from tools.stripe_client.client import get_subscription
from tools.stripe_client.exceptions import SubscriptionNotFound

from subspector.subspector_server.controllers import (
    subscription as subscription_controller,
)
from subspector.subspector_server.models.models import Customer, Subscription
from subspector.subspector_server.schemas.subscription import SubscriptionUpdate
from subspector.subspector_server.utils import get_current_timestamp

LOG = logging.getLogger(__name__)


async def stripe_webhook(session, producer, event):
    event_type = event["type"]
    if event_type not in {
        "customer.subscription.created",
        "customer.subscription.updated",
        "customer.subscription.deleted",
    }:
        return
    subscription = event["data"]["object"]
    stripe_subscription_id = subscription["id"]
    customer_id = subscription["customer"]
    subscription_info = await _get_subscription_info(session, customer_id)
    if not subscription_info:
        _raise_404("Customer", customer_id)
    subscription_id, updated_at = subscription_info
    event_time = event["created"]
    if event_time <= updated_at:
        try:
            event_time = get_current_timestamp()
            subscription = await _get_stripe_subscription(stripe_subscription_id)
        except SubscriptionNotFound:
            _raise_404("Subscription", stripe_subscription_id)
    subscription_item = subscription["items"]["data"][0]
    body = {
        "quantity": subscription_item["quantity"],
        "stripe_status": subscription["status"],
        "cancel_at_period_end": subscription["cancel_at_period_end"],
        "end_date": subscription_item["current_period_end"],
        "updated_at": event_time,
        "stripe_subscription_id": stripe_subscription_id,
        "price_id": subscription_item["price"]["id"],
    }
    await subscription_controller.edit(
        session, producer, subscription_id, SubscriptionUpdate(**body)
    )


async def _get_stripe_subscription(stripe_subscription_id):
    return await run_in_threadpool(get_subscription, stripe_subscription_id)


def _raise_404(entity, entity_id):
    detail = f"{entity} {entity_id} not found"
    LOG.warning(detail)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


async def _get_subscription_info(session, stripe_customer_id):
    query = select(Subscription.id, Subscription.updated_at).where(
        and_(
            Subscription.deleted_at == 0,
            Subscription.customer_id == (
                select(Customer.id).where(
                    and_(
                        Customer.stripe_customer_id == stripe_customer_id,
                        Customer.deleted_at == 0,
                    )
                ).scalar_subquery()
            )
        )
    )
    result = await session.execute(query)
    return result.one_or_none()
