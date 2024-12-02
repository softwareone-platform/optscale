#!/usr/bin/env python
import os
import time
from threading import Thread
from kombu.mixins import ConsumerMixin
from kombu.log import get_logger
from kombu.utils.debug import setup_logging
from kombu import Exchange, Queue, binding, Connection
import urllib3

from optscale_client.config_client.client import Client as ConfigClient

from docker_images.keeper_executor.executors.main_events import (
    MainEventExecutor
)
from docker_images.keeper_executor.executors.ml_events import MlEventsExecutor

LOG = get_logger(__name__)

EXCHANGE_NAME = 'activities-tasks'
QUEUE_NAME = 'keeper-task'

TASK_EXCHANGE = Exchange(EXCHANGE_NAME, type='topic')
ROUTING_KEYS = [
    'pool.#', 'employee.#', 'calendar_synchronization.#', 'cloud_account.#',
    'organization.*', 'cluster_type.#', 'report_import.#', 'resource.#',
    'alert.action.added', 'alert.action.removed', 'rule.#', 'environment.#',
    'task.*', 'metric.*', 'run.*', 'platform.*', 'leaderboard_template.*',
    'leaderboard.*', 'dataset.*', 'model.*', 'model_version.*', 'artifact.*',
    'runset_template.*', 'runset.*', 'runner.*', 'power_schedule.*'
]
TASK_QUEUE = Queue(QUEUE_NAME, TASK_EXCHANGE, bindings=[
    binding(TASK_EXCHANGE, routing_key=routing_key)
    for routing_key in ROUTING_KEYS])


class KeeperExecutorWorker(ConsumerMixin):
    def __init__(self, connection, config_client):
        self.connection = connection
        self.config_cl = config_client
        self.running = True
        self.thread = Thread(target=self.heartbeat)
        self.thread.start()

    def get_consumers(self, consumer, channel):
        return [consumer(queues=[TASK_QUEUE], accept=['json'],
                         callbacks=[self.process_task], prefetch_count=10)]

    @staticmethod
    def get_executor_class(task):
        if 'profiling_token' in task or 'infrastructure_token' in task:
            executor_class = MlEventsExecutor
        else:
            executor_class = MainEventExecutor
        return executor_class

    def process_task(self, body, message):
        try:
            executor = self.get_executor_class(body)
            executor(self.config_cl).execute(body)
        except Exception as exc:
            LOG.exception('Processing task failed: %s', str(exc))
        message.ack()

    def heartbeat(self):
        while self.running:
            self.connection.heartbeat_check()
            time.sleep(1)


if __name__ == '__main__':
    urllib3.disable_warnings(
        category=urllib3.exceptions.InsecureRequestWarning
    )
    debug = os.environ.get('DEBUG', False)
    log_level = 'DEBUG' if debug else 'INFO'
    setup_logging(loglevel=log_level, loggers=[''])

    config_cl = ConfigClient(
        host=os.environ.get('HX_ETCD_HOST'),
        port=int(os.environ.get('HX_ETCD_PORT')),
    )
    config_cl.wait_configured()
    conn_str = 'amqp://{user}:{pass}@{host}:{port}'.format(
        **config_cl.read_branch('/rabbit'))
    with Connection(conn_str) as conn:
        try:
            worker = KeeperExecutorWorker(conn, config_cl)
            worker.run()
        except KeyboardInterrupt:
            worker.running = False
            worker.thread.join()
            LOG.info('Shutdown received')
