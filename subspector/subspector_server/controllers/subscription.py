import logging

from fastapi import HTTPException, status
from sqlalchemy import and_, exists, select
from sqlalchemy.orm import selectinload
from starlette.concurrency import run_in_threadpool
from tools.stripe_client.client import (
    create_billing_portal, create_checkout_session, create_customer,
    deactivate_subscription, get_subscription, reactivate_subscription,
    update_subscription_price,
)
from tools.stripe_client.exceptions import (
    SubscriptionNotFound, UpdateSubscriptionError
)
from subspector.subspector_server.controllers.plan import (
    _get_plan, get_default_plan, get_plan_id_by_price_id,
)
from subspector.subspector_server.models.models import (
    Customer, Plan, StripeSubscriptionStatus, Subscription, SubscriptionStatus,
)
from subspector.subspector_server.schemas import (
    subscription as subscription_schemas,
)

LOG = logging.getLogger(__name__)


async def _validate_plan_id(session, plan_id: str, include_deleted=False):
    base_filters = Plan.id == plan_id
    if not include_deleted:
        base_filters = and_(base_filters, Plan.deleted_at == 0)
    stmt = select(exists().where(base_filters))
    result = await session.execute(stmt)
    plan_exists = result.scalar()
    if not plan_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Plan {plan_id} not found',
        )


async def _get_subscription(session, subscription_id: str):
    query = select(Subscription).where(
        and_(Subscription.id == subscription_id, Subscription.deleted_at == 0)
    )
    result = await session.execute(query)
    subscription = result.scalars().one_or_none()
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Subscription {subscription_id} not found',
        )
    return subscription


async def _get_owner_subscription(session, owner_id: str,
                                  join_customer=False, join_plan=False):
    query = select(Subscription).where(
        and_(
            Subscription.deleted_at == 0,
            Subscription.customer_id == (
                select(Customer.id).where(and_(
                    Customer.owner_id == owner_id,
                    Customer.deleted_at == 0
                )).scalar_subquery()
            )
        )
    )
    options = []
    if join_customer:
        options.append(selectinload(Subscription.customer))
    if join_plan:
        options.append(selectinload(Subscription.plan))
    if options:
        query = query.options(*options)
    result = await session.execute(query)
    subscription = result.scalars().one_or_none()
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Subscription for owner {owner_id} was not found',
        )
    return subscription


async def create_default_subscription(session, customer_id):
    params = await _get_free_plan_subscription_params(session)
    subscription = Subscription(
        customer_id=customer_id,
        status=SubscriptionStatus.active,
        **params
    )
    session.add(subscription)


async def mark_subscriptions_with_deleted_at(session, customer_id, deleted_at):
    subscriptions_query = await session.execute(
        select(Subscription).filter(
            Subscription.customer_id == customer_id,
            Subscription.deleted_at == 0,
        )
    )
    subscriptions = subscriptions_query.scalars().all()
    for subscription in subscriptions:
        subscription.deleted_at = deleted_at


async def list(session):
    stmt = select(Subscription).filter(Subscription.deleted_at == 0)
    result = await session.execute(stmt)
    return result.scalars().all()


async def _get_free_plan_subscription_params(session):
    default_plan = await get_default_plan(session)
    return {
        'plan_id': default_plan.id,
        'stripe_subscription_id': None,
        'cancel_at_period_end': False,
        'stripe_status': None,
        'quantity': 1,
        'end_date': 0,
        'updated_at': 0
    }


async def _process_edit_params(session, subscription, params):
    params_dict = params.model_dump(exclude_unset=True)
    price_id = params_dict.pop('price_id', None)
    if price_id:
        plan_id = await get_plan_id_by_price_id(session, price_id)
        params_dict['plan_id'] = plan_id
    stripe_status = params_dict.get('stripe_status', None)
    if stripe_status in {
        StripeSubscriptionStatus.incomplete_expired, StripeSubscriptionStatus.canceled
    }:
        free_plan_params = await _get_free_plan_subscription_params(session)
        params_dict.update(free_plan_params)
    elif not subscription.trial_used and stripe_status in {
        StripeSubscriptionStatus.active, StripeSubscriptionStatus.trialing
    }:
        params_dict['trial_used'] = True
    return params_dict


async def edit(session, producer, subscription_id,
               params: subscription_schemas.SubscriptionUpdate):
    subscription = await _get_subscription(session, subscription_id)
    updated = False
    params_dict = await _process_edit_params(session, subscription, params)
    task_priority = 0
    for param, value in params_dict.items():
        current_value = getattr(subscription, param, None)
        if value != current_value:
            setattr(subscription, param, value)
            priority = params.get_priority(param)
            if priority > task_priority:
                task_priority = priority
            updated = True
    customer_id = subscription.customer_id
    if updated:
        await session.commit()
    if task_priority:
        query = select(Customer.owner_id).where(Customer.id == customer_id)
        result = await session.execute(query)
        owner_id = result.scalars().one_or_none()
        await _publish_task(producer, owner_id, task_priority)
    await session.refresh(subscription)
    return subscription


async def get(session, owner_id):
    return await _get_owner_subscription(session, owner_id, join_plan=True)


async def change_plan(session, owner_id, params: subscription_schemas.ChangePlan,
                      return_url):
    subscription = await _get_owner_subscription(
        session, owner_id, join_customer=True, join_plan=True
    )
    if not params.plan_id:
        return await _change_plan_billing_portal(subscription, return_url)
    stripe_sub_id = subscription.stripe_subscription_id
    current_stripe_sub = await _get_stripe_subscription(stripe_sub_id)
    plan = await _get_plan(params.plan_id, session)
    if plan.customer_id and subscription.customer_id != plan.customer_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Plan {params.plan_id} not found',
        )
    plan_id, price_id, trial_days = plan.id, plan.price_id, plan.trial_days
    if subscription.trial_used:
        trial_days = 0
    if plan_id == subscription.plan_id:
        return await _reactivate_subscription_if_cancel_period(current_stripe_sub)
    if price_id:
        customer = subscription.customer
        if not customer.stripe_customer_id:
            stripe_customer_id = await _create_stripe_customer(
                customer.owner_id, customer.name
            )
            customer.stripe_customer_id = stripe_customer_id
            await session.commit()
            await session.refresh(customer)
        return await _upgrade_subscription_plan(
            customer.stripe_customer_id,
            current_stripe_sub,
            price_id,
            return_url,
            trial_days,
        )
    if current_stripe_sub:
        return await _cancel_subscription(stripe_sub_id)
    subscription.plan_id = plan_id
    await session.commit()
    return subscription_schemas.ChangePlanResponse(result='plan_changed')


async def _change_plan_billing_portal(
    subscription, return_url
) -> subscription_schemas.ChangePlanResponse:
    current_plan = subscription.plan
    if not current_plan.price_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Cannot modify a free subscription',
        )
    else:
        stripe_customer_id = subscription.customer.stripe_customer_id
        portal = await _create_stripe_billing_portal(
            stripe_customer_id, return_url)
        LOG.info(f'billing_portal_created: {stripe_customer_id}')
        return subscription_schemas.ChangePlanResponse(
            result='billing_portal_created', url=portal['url']
        )


async def _get_stripe_subscription(
    stripe_subscription_id,
) -> subscription_schemas.ChangePlanResponse | None:
    current_stripe_sub = None
    if stripe_subscription_id:
        try:
            current_stripe_sub = await run_in_threadpool(
                get_subscription, stripe_subscription_id
            )
        except SubscriptionNotFound:
            pass
    return current_stripe_sub


async def _reactivate_subscription_if_cancel_period(
    stripe_subscription,
) -> subscription_schemas.ChangePlanResponse:
    if stripe_subscription and stripe_subscription.get('cancel_at_period_end', False):
        stripe_subscription_id = stripe_subscription['id']
        await _reactivate_stripe_subscription(stripe_subscription_id)
        LOG.info(f'subscription_reactivated: {stripe_subscription_id}')
        return subscription_schemas.ChangePlanResponse(
            result='subscription_reactivated'
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Subscription is already on the selected plan',
        )


async def _upgrade_subscription_plan(
    stripe_customer_id, current_stripe_sub, price_id, return_url, trial_days
) -> subscription_schemas.ChangePlanResponse:
    if not current_stripe_sub or current_stripe_sub['status'] in (
        'incomplete_expired',
        'canceled',
    ):
        session = await _create_stripe_checkout_session(
            stripe_customer_id, price_id, return_url, trial_days
        )
        LOG.info(f'checkout_session_created: {stripe_customer_id}, {price_id}')
        return subscription_schemas.ChangePlanResponse(
            result='checkout_session_created', url=session['url']
        )
    else:
        await _update_stripe_subscription_price(current_stripe_sub, price_id)
        LOG.info(f'plan_changed: {stripe_customer_id}, {price_id}')
        return subscription_schemas.ChangePlanResponse(result='plan_changed')


async def _create_stripe_checkout_session(
        stripe_customer_id, price_id, return_url, trial_days):
    return await run_in_threadpool(
        create_checkout_session, stripe_customer_id, price_id,
        return_url, trial_days
    )


async def _create_stripe_billing_portal(stripe_customer_id, return_url):
    return await run_in_threadpool(
        create_billing_portal, stripe_customer_id, return_url)


async def _update_stripe_subscription_price(current_stripe_sub, price_id):
    try:
        return await run_in_threadpool(
            update_subscription_price, current_stripe_sub, price_id
        )
    except UpdateSubscriptionError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update subscription. "
                   "Please visit customer's billing portal",
        )


async def _create_stripe_customer(owner_id, name) -> str:
    stripe_cust = await run_in_threadpool(create_customer, owner_id, name)
    return stripe_cust.id


async def _publish_task(producer, owner_id, priority):
    LOG.info('Publish task with priority %s for owner %s', priority, owner_id)
    payload = {'owner_id': owner_id}
    await producer.publish(payload, priority)


async def _cancel_subscription(
    stripe_sub_id,
) -> subscription_schemas.ChangePlanResponse:
    await _cancel_stripe_subscription(stripe_sub_id)
    LOG.info(f'subscription_canceled: {stripe_sub_id}')
    return subscription_schemas.ChangePlanResponse(result='subscription_canceled')


async def _cancel_stripe_subscription(stripe_sub_id):
    return await run_in_threadpool(deactivate_subscription, stripe_sub_id)


async def _reactivate_stripe_subscription(stripe_subscription_id):
    return await run_in_threadpool(reactivate_subscription, stripe_subscription_id)
