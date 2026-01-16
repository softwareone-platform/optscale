from fastapi import APIRouter, Depends, status

from subspector.subspector_server.api.dependencies import (
    get_session, verify_secret, verify_stripe_event, get_producer, get_public_ip
)
from subspector.subspector_server.controllers import customer, plan, subscription
from subspector.subspector_server.controllers.event import stripe_webhook
from subspector.subspector_server.schemas import customer as customer_schemas
from subspector.subspector_server.schemas import plan as plan_schemas
from subspector.subspector_server.schemas import subscription as subscription_schemas

API_PREFIX = '/subspector/v2'
api_router = APIRouter(prefix=API_PREFIX, dependencies=[Depends(verify_secret)])
webhook_router = APIRouter(prefix=API_PREFIX)


@api_router.post(
    '/plans',
    response_model=plan_schemas.PlanResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_plan(params: plan_schemas.PlanCreate, session=Depends(get_session)):
    return await plan.create(session, params)


@api_router.get('/plans', response_model=list[plan_schemas.PlanResponse])
async def list_plan(
    params: plan_schemas.PlanList = Depends(), session=Depends(get_session)
):
    return await plan.list(session, params)


@api_router.delete('/plans/{plan_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_plan(plan_id, session=Depends(get_session)):
    await plan.delete(session, plan_id)


@api_router.patch('/plans/{plan_id}', response_model=plan_schemas.PlanResponse)
async def update_plan(
    plan_id, params: plan_schemas.PlanUpdate, session=Depends(get_session)
):
    return await plan.edit(session, plan_id, params)


@api_router.post(
    '/customers',
    response_model=customer_schemas.CustomerResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_customer(
    params: customer_schemas.CustomerCreate, session=Depends(get_session)
):
    return await customer.create(session, params)


@api_router.get('/customers',
                response_model=list[customer_schemas.CustomerResponse])
async def list_stripe_customer(params: customer_schemas.CustomerList = Depends(),
                               session=Depends(get_session)):
    return await customer.list_stripe_customers(session, params)


@api_router.get(
    '/subscriptions',
    response_model=list[subscription_schemas.SubscriptionResponse],
)
async def list_subscription(session=Depends(get_session)):
    return await subscription.list(session)


@api_router.patch(
    '/subscriptions/{subscription_id}',
    response_model=subscription_schemas.SubscriptionResponse,
)
async def update_subscription(
    subscription_id,
    params: subscription_schemas.SubscriptionUpdate,
    session=Depends(get_session),
    producer=Depends(get_producer),
):
    return await subscription.edit(session, producer, subscription_id, params)


@api_router.get(
    '/owners/{owner_id}/subscription',
    response_model=subscription_schemas.OwnerSubscriptionResponse,
)
async def get_subscription(owner_id, session=Depends(get_session)):
    return await subscription.get(session, owner_id)


@api_router.patch(
    '/owners/{owner_id}/subscription',
    response_model=subscription_schemas.ChangePlanResponse,
)
async def change_plan(
    owner_id,
    params: subscription_schemas.ChangePlan,
    session=Depends(get_session),
    return_url=Depends(get_public_ip)
):
    return await subscription.change_plan(session, owner_id, params, return_url)


@api_router.delete(
    '/owners/{owner_id}/customer', status_code=status.HTTP_204_NO_CONTENT
)
async def delete_customer(owner_id, session=Depends(get_session)):
    await customer.delete(session, owner_id)


@webhook_router.post('/events')
async def event_webhook(
        session=Depends(get_session), event=Depends(verify_stripe_event),
        producer=Depends(get_producer)):
    return await stripe_webhook(session, producer, event)
