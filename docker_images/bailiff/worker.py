import os
import signal
import json
import traceback
import asyncio
import logging
import random
from enum import StrEnum
from datetime import datetime, timezone, timedelta

import aio_pika
import httpx
import requests
from tenacity import (retry, stop_after_attempt, wait_exponential,
                      retry_if_exception_type)
from optscale_client.config_client.client import Client as ConfigClient
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from optscale_client.subspector_async_client.client import (
    AsyncClient as SubspectorClient)

LOG = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
logging.getLogger("httpx").setLevel(logging.WARNING)
QUEUE_NAME = 'bailiff'
PREFETCH_COUNT = 10
HEARTBEAT_INTERVAL = 60
ALLOWED_LIMITS = [
    'employees', 'cloud_accounts', 'month_expenses'
]
ACTIVE_STATUSES = ['active', 'trialing']
_RETRY_CONFIG = {
    httpx: (httpx.RequestError, httpx.ConnectError, httpx.ReadTimeout),
    requests: (requests.RequestException, requests.ConnectionError, requests.Timeout),
}


def retry_http(module):
    return retry(
        retry=retry_if_exception_type(_RETRY_CONFIG[module]),
        stop=stop_after_attempt(5),
        wait=wait_exponential(max=10),
        reraise=True
    )


class SubscriptionStatus(StrEnum):
    ACTIVE = 'active'
    LIMIT_EXCEEDED = 'limit_exceeded'
    SUSPENDED = 'suspended'


class BaseConsumer:
    def __init__(self, config):
        self.config: dict = config

        self.connection: aio_pika.RobustConnection | None = None
        self.channel: aio_pika.abc.AbstractChannel | None = None
        self.queue: aio_pika.Queue | None = None
        self.consumer_tag: aio_pika.abc.ConsumerTag | None = None

    async def process_task(self, message):
        raise NotImplementedError()

    async def _ensure_connection(self):
        if not self.connection or self.connection.is_closed:
            amqp_url = 'amqp://{}:{}@{}:{}'.format(
                *self.config['rabbit_params'])
            self.connection = await aio_pika.connect_robust(
                amqp_url, heartbeat=HEARTBEAT_INTERVAL)
            LOG.info("Reconnected to RabbitMQ")

        if not self.channel or self.channel.is_closed:
            self.channel = await self.connection.channel()
            await self.channel.set_qos(prefetch_count=PREFETCH_COUNT)
            self.queue = None
            LOG.info("Channel reopened")

        if not self.queue:
            self.queue = await self.channel.declare_queue(QUEUE_NAME,
                                                          durable=True)

    async def run(self, stop_event: asyncio.Event):
        while not stop_event.is_set():
            try:
                await self._ensure_connection()
                if self.consumer_tag and self.queue:
                    await self.queue.cancel(self.consumer_tag)
                    self.consumer_tag = None
                LOG.info("Worker started, waiting for tasks...")
                self.consumer_tag = await self.queue.consume(
                    self.process_task, no_ack=False)
                await stop_event.wait()
            except Exception:
                LOG.exception("Connection broken, retrying...")
                await asyncio.sleep(5 + random.random() * 2)

    async def shutdown(self):
        if self.consumer_tag and self.queue:
            await self.queue.cancel(self.consumer_tag)
        if self.channel and not self.channel.is_closed:
            await self.channel.close()
        if self.connection and not self.connection.is_closed:
            await self.connection.close()
        LOG.info("Shutdown complete")


class BailiffWorker(BaseConsumer):
    def __init__(self, config):
        super().__init__(config)
        self._subspector_cl: SubspectorClient | None = None

    @property
    def subspector_cl(self):
        if self._subspector_cl is None:
            self._subspector_cl = SubspectorClient(
                url=self.config['subspector_url'],
                secret=self.config['cluster_secret'],
                verify=False)
        return self._subspector_cl

    @retry_http(httpx)
    async def _get_subscription(self, org_id):
        _, subscription = await self.subspector_cl.get_owner_subscription(org_id)
        return subscription

    @retry_http(httpx)
    async def _create_customer(self, org_id, name):
        _, customer = await self.subspector_cl.customer_create(
            {'owner_id': org_id, 'name': name}
        )
        return customer

    @retry_http(httpx)
    async def _update_subscription(self, subscription_id, body):
        await self.subspector_cl.subscription_update(subscription_id, body)

    @retry_http(requests)
    def _collect_organization_info(
            self, organization_id, rest_client, entities):
        try:
            _, info = rest_client.get_organization_summary(
                organization_id, entities)
        except Exception:
            LOG.warning('Unable to get organization_info for %s', organization_id)
            raise
        return info

    @staticmethod
    async def _process_subscription_status(subscription, organization_info,
                                           limits):
        plan = subscription['plan']
        org_entities = organization_info.get('entities') or {}
        exceeded_reason = None
        for k, v in limits.items():
            org_value = org_entities.get(k)
            if org_value is None:
                continue
            # implementation of the month_expenses limit
            # {'month1': 100, 'month2': 200, ...}
            if k == 'month_expenses':
                for dt, value in org_value.items():
                    if value > v:
                        exceeded_reason = f'{value} > {v} for {dt}'
                        break
            else:
                if org_value > v:
                    exceeded_reason = f'{k} > {v}'
                    break
        stripe_status = subscription.get('stripe_status')
        body = {'status': SubscriptionStatus.SUSPENDED.value}
        if not stripe_status or stripe_status in ACTIVE_STATUSES:
            if not exceeded_reason:
                body.update({
                    'status': SubscriptionStatus.ACTIVE.value,
                    'grace_period_start': 0
                })
            else:
                now_dt = datetime.now(timezone.utc)
                grace_period_days = plan.get('grace_period_days') or 0
                current_grace_period = subscription.get(
                    'grace_period_start') or int(now_dt.timestamp())
                grace_period_threshold = int(
                    (now_dt - timedelta(days=grace_period_days)).timestamp()
                )
                if current_grace_period > grace_period_threshold:
                    body.update({
                        'status': SubscriptionStatus.LIMIT_EXCEEDED.value,
                        'grace_period_start': current_grace_period
                    })
        return body, exceeded_reason

    @staticmethod
    async def _get_subscription_limits(subscription):
        quantity = subscription.get('quantity') or 1
        plan = subscription['plan']
        limits = plan.get('limits') or {}
        qty_unit = plan.get('qty_unit')
        quantity_limit = quantity
        if qty_unit:
            if qty_unit in limits:
                quantity_limit = limits[qty_unit] * quantity
            limits[qty_unit] = quantity_limit
        return limits

    async def check_subscription(self, organization_id, name, rest_client):
        start_time = datetime.now()
        subscription: dict | None = None
        try:
            subscription = await self._get_subscription(organization_id)
        except httpx.HTTPStatusError as ex:
            if ex.response.status_code != 404:
                raise
        if not subscription:
            LOG.info("Subscription not found for %s. Creating",
                     organization_id)
            await self._create_customer(organization_id, name)
            subscription = await self._get_subscription(organization_id)
        limits = await self._get_subscription_limits(subscription)
        entities = list(limits.keys() & ALLOWED_LIMITS)
        org_info = await asyncio.to_thread(
            self._collect_organization_info, organization_id=organization_id,
            rest_client=rest_client, entities=entities)
        body, exceeded_reason = await self._process_subscription_status(
            subscription, org_info, limits)
        log_sub = 'SKIPPED'
        if any(body[k] != subscription[k] for k in body.keys()):
            await self._update_subscription(subscription['id'], body)
            log_sub = 'UPDATED'
        disabled = body['status'] == SubscriptionStatus.SUSPENDED.value
        log_org = f'SKIPPED: [{'inactive' if disabled else 'active'}]'
        if disabled != org_info['disabled']:
            await asyncio.to_thread(
                self._update_organization, organization_id=organization_id,
                disabled=disabled, rest_client=rest_client)
            log_org = 'ENABLED' if not disabled else 'DISABLED'
        process_time = (datetime.now() - start_time).total_seconds()

        log_status = body['status']
        if exceeded_reason:
            log_status += f' ({exceeded_reason})'
        log_sub = f'{log_sub}: [{log_status}]'
        LOG.info(
            'Task %s processed in %.2fs. Subscription %s, Organization %s ',
            organization_id, process_time, log_sub, log_org)

    @retry_http(requests)
    def _update_organization(self, organization_id, disabled=False,
                             rest_client=None):
        rest_client.organization_update(
            organization_id, {'disabled': disabled})

    async def shutdown(self):
        if self._subspector_cl:
            await self._subspector_cl.close()
        await super().shutdown()

    def _get_rest_client(self):
        return RestClient(url=self.config['restapi_url'],
                          secret=self.config['cluster_secret'],
                          verify=False)

    async def process_task(self, message):
        async with message.process():
            rest_client = self._get_rest_client()
            try:
                payload = json.loads(message.body)
                owner_id = payload.get('owner_id')
                name = payload.get('name')
                if not owner_id:
                    raise ValueError(f'Invalid task received: {payload}')
                await self.check_subscription(owner_id, name, rest_client)
            except Exception as ex:
                tb_lines = traceback.format_exception(
                    type(ex), ex, ex.__traceback__)
                LOG.error('Bailiff task %s failed: \\n%s',
                          message.body, repr("".join(tb_lines)))
            finally:
                rest_client.close()


async def main():
    config_cl = ConfigClient(
        host=os.environ.get('HX_ETCD_HOST'),
        port=int(os.environ.get('HX_ETCD_PORT')),
    )
    config_cl.wait_configured()

    config = {
        'rabbit_params': config_cl.rabbit_params(),
        'restapi_url': config_cl.restapi_url(),
        'subspector_url': config_cl.subspector_url(),
        'cluster_secret': config_cl.cluster_secret(),
    }
    worker = BailiffWorker(config)
    stop_event = asyncio.Event()

    def _signal_handler(*_):
        LOG.info("Signal received, stopping...")
        stop_event.set()
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, _signal_handler)
    try:
        await worker.run(stop_event)
    finally:
        await worker.shutdown()


if __name__ == '__main__':
    asyncio.run(main())
