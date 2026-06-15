import os
import logging
import traceback
from datetime import datetime, timezone

import asyncio
import httpx
from tenacity import (retry, stop_after_attempt, wait_exponential,
                      retry_if_exception_type)
from optscale_client.config_client.client import Client as ConfigClient
from optscale_client.subspector_async_client.client import AsyncClient as Client
from tools.stripe_client.client import list_subscriptions, init_stripe

DEFAULT_ETCD_HOST = 'etcd'
DEFAULT_ETCD_PORT = 80
LOG = logging.getLogger(__name__)
logging.getLogger("httpx").setLevel(logging.WARNING)
MAX_PARALLEL_REQUESTS = 10
CANCELED_STATUS = 'canceled'
STATUS_PRIORITY = [
    'active', 'trialing', 'past_due', 'unpaid', 'paused', 'incomplete'
]


retry_httpx = retry(
    retry=retry_if_exception_type(
        (httpx.RequestError, httpx.ConnectError, httpx.ReadTimeout)
    ),
    stop=stop_after_attempt(5),
    wait=wait_exponential(max=10),
    reraise=True,
)


async def async_iter(sync_iterable):
    _sentinel = object()
    while True:
        item = await asyncio.to_thread(
            lambda: next(sync_iterable, _sentinel)
        )
        if item is _sentinel:
            break
        yield item


async def fetch_all_subscriptions():
    tasks = {
        status: asyncio.to_thread(
            list_subscriptions, status=status, customer_id=None)
        for status in STATUS_PRIORITY
    }
    results = await asyncio.gather(*tasks.values())
    return dict(zip(STATUS_PRIORITY, results))


async def collect_actual_subscriptions(all_subs_by_status):
    actual_subscriptions = {}
    dt = int(datetime.now(timezone.utc).timestamp())
    for status in STATUS_PRIORITY:
        subscriptions = all_subs_by_status[status]
        async for sub in async_iter(subscriptions.auto_paging_iter()):
            customer_id = sub['customer']
            if customer_id not in actual_subscriptions:
                items = sub.get('items', {}).get('data', [])
                if not items:
                    continue
                subscription_item = items[0]
                body = {
                    'quantity': subscription_item['quantity'],
                    'stripe_status': sub['status'],
                    'cancel_at_period_end': sub['cancel_at_period_end'],
                    'end_date': subscription_item['current_period_end'],
                    'stripe_subscription_id': sub['id'],
                    'price_id': subscription_item['price']['id'],
                    'updated_at': dt,
                }
                actual_subscriptions[customer_id] = body
    return actual_subscriptions


async def _update_subscription(semaphore, subscription_id, subscription_body,
                               subspector_cl):
    try:
        async with semaphore:
            await subspector_cl.subscription_update(
                subscription_id, subscription_body)
    except Exception as ex:
        tb_lines = traceback.format_exception(type(ex), ex, ex.__traceback__)
        LOG.error('Unable to update subscription %s: \\n%s',
                  subscription_id, repr("".join(tb_lines)))


async def update_subscriptions(
        subspector_cl, subscriptions, stripe_customer_subscription_map):
    semaphore = asyncio.Semaphore(MAX_PARALLEL_REQUESTS)
    tasks = []
    for stripe_cust, subscription_id in stripe_customer_subscription_map.items():
        subscription_body = subscriptions.get(stripe_cust)
        if not subscription_body:
            subscription_body = dict(stripe_status=CANCELED_STATUS)
        tasks.append(
            _update_subscription(
                semaphore, subscription_id, subscription_body, subspector_cl
            )
        )
    if tasks:
        await asyncio.gather(*tasks)


@retry_httpx
async def _customer_list(subspector_cl):
    _, customers = await subspector_cl.customer_list(connected_only=True)
    return customers


@retry_httpx
async def _subscription_list(subspector_cl):
    _, subscriptions = await subspector_cl.subscription_list()
    return subscriptions


async def main(config_cl):
    start_time = datetime.now()
    subspector_cl = Client(
        url=config_cl.subspector_url(),
        secret=config_cl.cluster_secret(),
        verify=False)
    stripe_params = config_cl.stripe_settings()
    init_stripe(stripe_params['api_key'])
    try:
        customers = await _customer_list(subspector_cl)
        customers_map = {c['id']: c['stripe_customer_id'] for c in customers}

        subscriptions = await _subscription_list(subspector_cl)
        stripe_customer_subscription_map = {
            customers_map[s['customer_id']]: s['id']
            for s in subscriptions if s['customer_id'] in customers_map
        }
        LOG.info('Fetching subscriptions from Stripe...')
        all_subs_by_status = await fetch_all_subscriptions()

        LOG.info('Selecting actual subscriptions per customer...')
        actual_subscriptions = await collect_actual_subscriptions(
            all_subs_by_status)
        LOG.info('Updating subscriptions in Subspector...')
        await update_subscriptions(subspector_cl, actual_subscriptions,
                                   stripe_customer_subscription_map)
        unknown_subscriptions = set(actual_subscriptions.keys()) - set(
            stripe_customer_subscription_map.keys())
        if unknown_subscriptions:
            LOG.warning('Unknown subscriptions for customers: %s',
                        unknown_subscriptions)
    except Exception as ex:
        tb_lines = traceback.format_exception(type(ex), ex, ex.__traceback__)
        LOG.error('Job failed: \\n%s', repr("".join(tb_lines)))
    finally:
        await subspector_cl.close()
    LOG.info('Job completed in %.2f seconds',
             (datetime.now() - start_time).total_seconds())


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    etcd_host = os.environ.get('HX_ETCD_HOST', DEFAULT_ETCD_HOST)
    etcd_port = os.environ.get('HX_ETCD_PORT', DEFAULT_ETCD_PORT)
    config_client = ConfigClient(host=etcd_host, port=int(etcd_port))
    config_client.wait_configured()
    asyncio.run(main(config_client))
