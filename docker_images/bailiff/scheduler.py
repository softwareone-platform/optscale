import asyncio
import logging
import os
import json

from aio_pika import connect_robust, Message
from tenacity import retry, stop_after_attempt, wait_fixed

from optscale_client.rest_api_client.client_v2 import Client as RestClient
from optscale_client.config_client.client import Client as ConfigClient

LOG = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

QUEUE_NAME = 'bailiff'
retry_rules = {'stop': stop_after_attempt(10), 'wait': wait_fixed(1)}
MAX_PARALLEL_TASKS = 100


@retry(**retry_rules)
async def publish(channel, org_id, name):
    body = json.dumps({
        'owner_id': org_id,
        'name': name
    }).encode()
    message = Message(body, content_type='application/json')
    try:
        await channel.default_exchange.publish(
            message,
            routing_key=QUEUE_NAME
        )
    except Exception as e:
        LOG.warning("Failed to publish task for %s: %s", org_id, str(e))
        raise


async def safe_publish(semaphore, channel, org_id, name):
    async with semaphore:
        await publish(channel, org_id, name)


async def publish_tasks(org_ids, config_client):
    amqp_url = 'amqp://{}:{}@{}:{}'.format(*config_client.rabbit_params())
    connection = await connect_robust(amqp_url)
    async with connection:
        channel = await connection.channel()
        semaphore = asyncio.Semaphore(MAX_PARALLEL_TASKS)
        await asyncio.gather(*(
            safe_publish(
                semaphore, channel, org_id, name
            ) for org_id, name in org_ids.items()
        ))


@retry(**retry_rules)
def get_org_ids(config_cl):
    rest_cl = RestClient(
        url=config_cl.restapi_url(), secret=config_cl.cluster_secret())
    _, data = rest_cl.organization_list({'is_demo': False})
    return {x['id']: x.get('name') for x in data['organizations']}


async def main():
    config_cl = ConfigClient(
        host=os.environ.get('HX_ETCD_HOST'),
        port=int(os.environ.get('HX_ETCD_PORT')),
    )
    config_cl.wait_configured()
    org_ids = await asyncio.to_thread(get_org_ids, config_cl)
    LOG.info("Publishing tasks for %s orgs", len(org_ids))
    await publish_tasks(org_ids, config_cl)


if __name__ == '__main__':
    asyncio.run(main())
