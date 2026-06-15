import stripe
import logging
from stripe import (InvalidRequestError, Event, SignatureVerificationError,
                    APIConnectionError, RateLimitError)
from tenacity import (retry, stop_after_attempt, wait_exponential,
                      retry_if_exception_type)
from tools.stripe_client.exceptions import (
    PriceNotFound, CustomerNotFound, UpdateSubscriptionError,
    InvalidWebhookSecret, SubscriptionNotFound
)

retry_connection = retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    retry=retry_if_exception_type((APIConnectionError, RateLimitError))
)


def init_stripe(api_key):
    logging.getLogger("stripe").setLevel(logging.WARNING)
    stripe.api_key = api_key


@retry_connection
def find_price(price_id):
    try:
        return stripe.Price.retrieve(price_id)
    except InvalidRequestError:
        raise PriceNotFound('Price %s not found' % price_id)


@retry_connection
def find_customer(customer_id):
    try:
        return stripe.Customer.retrieve(customer_id)
    except InvalidRequestError:
        raise CustomerNotFound('Customer %s not found' % customer_id)


@retry_connection
def create_billing_portal(customer_id, return_url):
    try:
        return stripe.billing_portal.Session.create(
            customer=customer_id,
            return_url=(
                f"https://{return_url}/settings" \
                "?tab=subscription&return_code=billing_portal"
            )
        )
    except InvalidRequestError:
        raise CustomerNotFound('Customer %s not found' % customer_id)


@retry_connection
def create_customer(owner_id, name):
    return stripe.Customer.create(name=name, description=owner_id)


@retry_connection
def list_subscriptions(customer_id=None, status=None):
    try:
        body = {}
        if customer_id:
            body['customer'] = customer_id
        if status:
            body['status'] = status
        return stripe.Subscription.list(**body)
    except InvalidRequestError:
        raise CustomerNotFound('Customer %s not found' % customer_id)


@retry_connection
def get_subscription(subscription_id):
    try:
        return stripe.Subscription.retrieve(subscription_id)
    except InvalidRequestError:
        raise SubscriptionNotFound(
            'Subscription %s not found' % subscription_id)


@retry_connection
def _update_subscription(subscription_id, **params):
    try:
        return stripe.Subscription.modify(
            subscription_id,
            **params
        )
    except InvalidRequestError as ex:
        raise UpdateSubscriptionError(
            'Update subscription error: %s', str(ex))


def deactivate_subscription(subscription_id):
    return _update_subscription(
        subscription_id, cancel_at_period_end=True)


def reactivate_subscription(subscription_id):
    return _update_subscription(
        subscription_id, cancel_at_period_end=False)


def update_subscription_price(subscription, price_id):
    return _update_subscription(
        subscription['id'],
        items=[{
            'id': subscription['items']['data'][0]['id'],
            'price': price_id
        }],
        cancel_at_period_end=False,
        proration_behavior='create_prorations',
        billing_cycle_anchor='now')


@retry_connection
def delete_customer(customer_id):
    try:
        return stripe.Customer.delete(customer_id)
    except InvalidRequestError:
        raise CustomerNotFound('Customer %s not found' % customer_id)


@retry_connection
def create_checkout_session(customer_id, price_id, return_url, trial_days=0):
    try:
        subscription_data = {}
        if trial_days:
            subscription_data['trial_period_days'] = trial_days
        return stripe.checkout.Session.create(
            customer=customer_id,
            line_items=[
                {
                    'price': price_id,
                    'quantity': 1,
                    'adjustable_quantity': {
                        'enabled': True,
                        'minimum': 1
                    }
                },
            ],
            mode='subscription',
            success_url=(
                f"https://{return_url}/settings" \
                "?tab=subscription&return_code=checkout_success"
            ),
            cancel_url=(
                f"https://{return_url}/settings" \
                "?tab=subscription&return_code=checkout_cancel"
            ),
            subscription_data=subscription_data,
            allow_promotion_codes=True
        )
    except InvalidRequestError as ex:
        raise UpdateSubscriptionError(
            'Update subscription error: %s', str(ex))


def verify_event(payload, stripe_signature, secret) -> Event:
    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=stripe_signature,
            secret=secret,
        )
    except SignatureVerificationError:
        raise InvalidWebhookSecret("Invalid Stripe signature")
    return event
