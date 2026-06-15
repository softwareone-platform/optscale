import logging
from fastapi import HTTPException, status
from sqlalchemy import and_, desc, exists, or_, select, update, ColumnElement
from starlette.concurrency import run_in_threadpool
from tools.stripe_client.client import find_price
from tools.stripe_client.exceptions import PriceNotFound

from subspector.subspector_server.models.models import Customer, Plan
from subspector.subspector_server.schemas import plan as plan_schemas
from subspector.subspector_server.utils import get_current_timestamp

SUPPORTED_CURRENCIES = ['usd']
LOG = logging.getLogger(__name__)


async def _validate_customer_id(customer_id: str, session):
    stmt = select(
        exists().where(and_(Customer.id == customer_id, Customer.deleted_at == 0))
    )
    result = await session.execute(stmt)
    customer_exists = result.scalar()
    if not customer_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Customer {customer_id} not found',
        )


async def _validate_plan(params: plan_schemas.PlanCreate, session):
    stmt = select(
        exists().where(
            Plan.deleted_at == 0,
            Plan.customer_id == params.customer_id,
            or_(
                Plan.name == params.name,
                and_(
                    Plan.price_id == params.price_id,
                    Plan.price_id.is_not(None),
                )
            )
        )
    )
    result = await session.execute(stmt)
    plan_exists = result.scalar()
    if plan_exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='Plan with such price_id or name already exists',
        )


async def _validate_price_id(price_id: str) -> tuple[float, str]:
    try:
        stripe_price = await run_in_threadpool(find_price, price_id)
    except PriceNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Price {price_id} not found',
        )
    currency = stripe_price['currency']
    if currency not in SUPPORTED_CURRENCIES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Price {price_id} has unsupported currency: {currency}',
        )
    unit_amount = stripe_price['unit_amount']
    if not isinstance(unit_amount, int):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Price {price_id} has invalid price: {unit_amount}',
        )
    return unit_amount / 100, currency


async def _unset_default_plan(session):
    await session.execute(
        update(Plan).where(and_(
            Plan.default.is_(True), Plan.deleted_at == 0
        )).values(default=False).execution_options(synchronize_session='fetch')
    )


async def _get_plan(plan_id, session) -> Plan:
    stmt = select(Plan).filter(Plan.id == plan_id, Plan.deleted_at == 0)
    result = await session.execute(stmt)
    plan = result.scalars().one_or_none()
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Plan {plan_id} not found',
        )
    return plan


async def create(session, params: plan_schemas.PlanCreate):
    await _validate_plan(params, session)
    if params.customer_id:
        await _validate_customer_id(params.customer_id, session)
    price, currency = None, None
    if params.price_id:
        price, currency = await _validate_price_id(params.price_id)
    new_plan = Plan(price=price, currency=currency, **params.model_dump())
    if not new_plan.price_id and not new_plan.customer_id:
        new_plan.default = True
        await _unset_default_plan(session)
    session.add(new_plan)
    await session.commit()
    await session.refresh(new_plan)
    return new_plan


async def list(session, params: plan_schemas.PlanList):
    base_filter: ColumnElement = Plan.customer_id.is_(None)
    if params.owner_id:
        base_filter = or_(base_filter, Customer.owner_id == params.owner_id)
    if not params.include_deleted:
        base_filter = and_(base_filter, Plan.deleted_at == 0)
    stmt = select(
        Plan
    ).outerjoin(
        Customer, Plan.customer_id == Customer.id
    ).filter(base_filter)

    result = await session.execute(stmt)
    return result.scalars().all()


async def delete(session, plan_id):
    plan = await _get_plan(plan_id, session)
    if plan.default:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Default plan cannot be deleted',
        )
    plan.deleted_at = get_current_timestamp()
    await session.commit()


async def edit(session, plan_id, params: plan_schemas.PlanUpdate):
    plan = await _get_plan(plan_id, session)
    updated = False
    for param, value in params.model_dump(exclude_unset=True).items():
        current_value = getattr(plan, param, None)
        if value != current_value:
            setattr(plan, param, value)
            updated = True
    if updated:
        await session.commit()
    await session.refresh(plan)
    return plan


async def get_default_plan(session):
    stmt = select(Plan).filter(Plan.default.is_(True), Plan.deleted_at == 0)
    result = await session.execute(stmt)
    plan = result.scalars().first()
    if not plan:
        msg = 'The default plan was not found'
        LOG.error(msg)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=msg,
        )
    return plan


async def get_plan_id_by_price_id(session, price_id):
    query = (
        select(Plan.id).where(Plan.price_id == price_id).order_by(desc(Plan.created_at))
    )
    result = await session.execute(query)
    plan_id = result.scalars().first()
    if not plan_id:
        msg = f'Plan with price {price_id} was not found'
        LOG.error(msg)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=msg,
        )
    return plan_id
