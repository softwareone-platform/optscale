import json
import aio_pika
from tenacity import retry, stop_after_attempt, wait_exponential

QUEUE_NAME = 'bailiff'


class TaskProducer:
    def __init__(self, amqp_params: tuple[str]):
        conn_str = 'amqp://{}:{}@{}:{}'.format(*amqp_params)
        self.amqp_conn_str = conn_str
        self.connection: aio_pika.RobustConnection | None = None
        self.channel: aio_pika.abc.AbstractRobustChannel | None = None

    async def connect(self):
        self.connection = await aio_pika.connect_robust(self.amqp_conn_str)
        self.channel = await self.connection.channel()

    async def disconnect(self):
        if self.channel:
            await self.channel.close()
        if self.connection:
            await self.connection.close()

    async def _ensure_connection(self):
        if self.connection is None or self.connection.is_closed:
            await self.connect()
        elif self.channel is None or self.channel.is_closed:
            self.channel = await self.connection.channel()

    @retry(stop=stop_after_attempt(10), wait=wait_exponential(max=10))
    async def publish(self, payload: dict, priority: int = 0):
        await self._ensure_connection()
        if not self.channel:
            raise RuntimeError('Channel is not connected')
        message = aio_pika.Message(
            body=json.dumps(payload).encode(),
            priority=priority,
            content_type='application/json'
        )
        await self.channel.default_exchange.publish(
            message,
            routing_key=QUEUE_NAME
        )
