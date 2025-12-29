import logging

from fastapi import HTTPException, status
from sqlalchemy import and_, exists, select
from starlette.concurrency import run_in_threadpool
from tools.stripe_client.client import delete_customer as delete_stripe_customer
from tools.stripe_client.exceptions import CustomerNotFound

from subspector.subspector_server.controllers.subscription import (
    create_default_subscription, mark_subscriptions_with_deleted_at,
)
from subspector.subspector_server.models.models import Customer
from subspector.subspector_server.schemas import customer as customer_schemas
from subspector.subspector_server.utils import get_current_timestamp

LOG = logging.getLogger(__name__)


async def _validate_owner_id(owner_id: str, session):
    stmt = select(
        exists().where(and_(
            Customer.owner_id == owner_id,
            Customer.deleted_at == 0))
    )
    result = await session.execute(stmt)
    customer_exists = result.scalar()
    if customer_exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f'Customer for owner {owner_id} already exists',
        )


async def _get_customer(owner_id, session) -> Customer:
    stmt = select(Customer).filter(
        Customer.owner_id == owner_id, Customer.deleted_at == 0
    )
    result = await session.execute(stmt)
    plan = result.scalars().one_or_none()
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Customer for owner {owner_id} not found',
        )
    return plan


async def create(session, params: customer_schemas.CustomerCreate):
    await _validate_owner_id(params.owner_id, session)
    customer = Customer(**params.model_dump())
    session.add(customer)
    await session.flush()
    await create_default_subscription(session, customer.id)
    await session.commit()
    await session.refresh(customer)
    return customer


async def delete(session, owner_id):
    customer = await _get_customer(owner_id, session)
    deleted_at = get_current_timestamp()
    customer.deleted_at = deleted_at
    await mark_subscriptions_with_deleted_at(session, customer.id, deleted_at)
    stripe_customer_id = customer.stripe_customer_id
    if stripe_customer_id:
        try:
            await run_in_threadpool(delete_stripe_customer, stripe_customer_id)
        except CustomerNotFound:
            LOG.warning(f'Customer {stripe_customer_id} already deleted')
    LOG.info(f'Customer for owner {owner_id} deleted')
    await session.commit()


async def list_stripe_customers(session, params: customer_schemas.CustomerList):
    conditions = [Customer.deleted_at == 0]
    if params.connected_only:
        conditions.append(Customer.stripe_customer_id.isnot(None))
    stmt = select(Customer).filter(*conditions)
    result = await session.execute(stmt)
    return result.scalars().all()
