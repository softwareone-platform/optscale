#!/usr/bin/env python
import os
import urllib3
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta
from functools import cached_property
import pytz
from pymongo import MongoClient
from itertools import zip_longest
from kombu.mixins import ConsumerMixin
from kombu.log import get_logger
from kombu import Connection
from kombu.utils.debug import setup_logging
from kombu import Exchange, Queue
from kombu.pools import producers

from optscale_client.config_client.client import Client as ConfigClient
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from tools.cloud_adapter.cloud import Cloud
from tools.cloud_adapter.exceptions import (
    ResourceNotFound, InvalidResourceStateException)

from docker_images.power_schedule.utils import is_schedule_outdated

ACTIVITIES_EXCHANGE_NAME = 'activities-tasks'
EXCHANGE_NAME = 'power-schedule'
QUEUE_NAME = 'power-schedule'
LOG = get_logger(__name__)
TASK_EXCHANGE = Exchange(EXCHANGE_NAME, type='direct')
TASK_QUEUE = Queue(QUEUE_NAME, TASK_EXCHANGE, routing_key=QUEUE_NAME)
THREADS_NUM = 10


class PowerScheduleException(Exception):
    pass


class PowerScheduleReasons:
    """
    Class for saving valid reasons why power schedule may not iterate
    with some instances in cloud.
    Power schedule with this reason is considered successful.
    These reasons are not sent to `last_error_reason` of power schedule
    """
    NO_RESOURCES = 'No resources assigned'
    DISABLED = 'Power schedule is disabled'
    DISABLED_ORG = 'Organization is disabled'
    OUTDATED = 'Power schedule is outdated'
    NO_CHANGES = 'Changing state is not required'
    CONFLICT = 'Conflicting triggers'


class PowerScheduleWorker(ConsumerMixin):
    def __init__(self, connection, config_client):
        self.connection = connection
        self.config_cl = config_client
        self.running = True
        self.result = None

    @cached_property
    def rest_cl(self):
        return RestClient(url=self.config_cl.restapi_url(),
                          secret=self.config_cl.cluster_secret())

    @cached_property
    def mongo_cl(self):
        mongo_params = self.config_cl.mongo_params()
        return MongoClient(mongo_params[0])

    def get_consumers(self, consumer, channel):
        return [consumer(queues=[TASK_QUEUE], accept=['json'],
                         callbacks=[self.process_task], prefetch_count=3)]

    def publish_activities_task(self, organization_id, object_id, object_type,
                                object_name, action, meta):
        task = {
            'organization_id': organization_id,
            'object_id': object_id,
            'object_type': object_type,
            'object_name': object_name,
            'action': action,
            'meta': meta
        }
        task_exchange = Exchange(ACTIVITIES_EXCHANGE_NAME, type='topic')
        with producers[self.connection].acquire(block=True) as producer:
            producer.publish(
                task,
                serializer='json',
                exchange=task_exchange,
                declare=[task_exchange],
                routing_key='.'.join((object_type, action)),
                retry=True
            )

    @staticmethod
    def _local_time_to_utc(time_str, local_tz):
        return local_tz.localize(datetime.combine(
            datetime.now(tz=local_tz).date(),
            datetime.strptime(time_str, '%H:%M').time()
        )).astimezone(pytz.utc)

    @staticmethod
    def default_result():
        return {
            'start_instance': 0,
            'stop_instance': 0,
            'error': 0,
            'not_active': 0,
            'reason': None
        }

    def is_executable_ps(self, power_schedule: dict):
        if not power_schedule.get('enabled'):
            self.result['reason'] = PowerScheduleReasons.DISABLED
            return False
        if is_schedule_outdated(power_schedule):
            self.result['reason'] = PowerScheduleReasons.OUTDATED
            return False
        _, org = self.rest_cl.organization_get(
            power_schedule['organization_id'])
        if org.get('disabled'):
            self.result['reason'] = PowerScheduleReasons.DISABLED_ORG
            return False
        return True

    @staticmethod
    def _intersect(segment_1, segment_2):
        a = list(zip_longest(segment_1, segment_2))
        first_point = max(a[0])
        last_point = min(a[1])
        if first_point < last_point:
            result = (first_point, last_point)
        elif first_point == last_point:
            result = (first_point,)
        else:
            result = ()
        return result

    def get_action(self, schedule):
        local_tz = pytz.timezone(schedule['timezone'])
        now_dt = datetime.now(tz=pytz.utc)
        last_eval_dt = datetime.fromtimestamp(
            schedule['last_eval'], tz=pytz.utc)
        times_today = []
        time_action_map = {}
        for trigger in schedule['triggers']:
            action = trigger['action']
            time = self._local_time_to_utc(trigger['time'], local_tz)
            if time in time_action_map:
                raise PowerScheduleException(
                    'Conflicting triggers for time: {}'.format(
                        trigger['time']))
            times_today.append(time)
            time_action_map[time] = action
        # collect power on/off segments during day
        times_today = sorted(times_today)
        time_periods = zip(times_today[:-1], times_today[1:])

        run_dt = (last_eval_dt, now_dt)
        if len(times_today) == 1:
            time = times_today[0]
            if last_eval_dt <= time <= now_dt:
                action = time_action_map[times_today[0]]
                LOG.info('Action required: %s', action)
                return action

        candidate = None
        for period in time_periods:
            cross = self._intersect(period, run_dt)
            if cross and cross == run_dt:
                # trigger's time hasn't come
                # (period_start <= last_eval <= now <= period_end)
                self.result['reason'] = PowerScheduleReasons.NO_CHANGES
                return None
            elif cross and cross != run_dt and cross != period:
                # found nearest trigger in the past
                # (last_eval <= period_start <= now <= period_end) OR
                # (period_start <= last_eval <= period_end <= now)
                time = max([x for x in period if x <= now_dt])
                action = time_action_map[time]
                LOG.info('Action required: %s', action)
                return action
            elif cross and cross == period:
                # too much time passed between runs, continue iterating between
                # periods to find the nearest trigger
                # (last_eval <= period_start <= period_end <= now)
                if not candidate:
                    candidate = period[1]
                else:
                    candidate = max(candidate, period[1])
        if not candidate:
            # triggers' times hasn't come
            self.result['reason'] = PowerScheduleReasons.NO_CHANGES
            return None
        action = time_action_map[candidate]
        LOG.info('Action required: %s', action)
        return action

    @staticmethod
    def get_resource_data(resource, cloud_type):
        data = None
        if cloud_type in ['aws_cnr', 'alibaba_cnr']:
            data = ([resource['cloud_resource_id']], resource.get('region'))
        elif cloud_type == 'azure_cnr':
            parts = resource['cloud_resource_id'].split('/')
            name = parts[-1]
            res_group = parts[parts.index('resourcegroups') + 1]
            data = (name,  res_group)
        elif cloud_type == 'nebius':
            data = (resource['cloud_resource_id'],)
        elif cloud_type == 'gcp_cnr':
            data = (resource['name'],
                    resource.get('meta', {}).get('zone_id'))
        return data

    @staticmethod
    def _cloud_action(cloud_adapter, resource_data, action):
        func = getattr(cloud_adapter, action)
        func(*resource_data)

    def cloud_action(self, action, resource, cloud_type, cloud_adapter):
        resource_data = self.get_resource_data(resource, cloud_type)
        self._cloud_action(cloud_adapter, resource_data, action)
        self.result[action] += 1

    def process_resources(self, power_schedule, action):
        power_schedule_id = power_schedule['id']
        resources = list(self.mongo_cl.restapi.resources.find(
            {'power_schedule': power_schedule_id}))
        if not resources:
            self.result['reason'] = PowerScheduleReasons.NO_RESOURCES
            return

        cloud_acc_resources = defaultdict(list)
        for resource in resources:
            if not resource.get('active'):
                self.result['not_active'] += 1
                continue
            cloud_account_id = resource.get('cloud_account_id')
            cloud_acc_resources[cloud_account_id].append(resource)

        for cloud_account_id, resources in cloud_acc_resources.items():
            _, cloud_acc = self.rest_cl.cloud_account_get(cloud_account_id)
            config = cloud_acc['config']
            config['type'] = cloud_acc['type']
            cloud_adapter = Cloud.get_adapter(config)
            executor = ThreadPoolExecutor(max_workers=THREADS_NUM)
            futures = []
            for resource in resources:
                futures.append(executor.submit(
                    self.cloud_action, action=action, resource=resource,
                    cloud_type=cloud_acc['type'], cloud_adapter=cloud_adapter))
            # handle all instances and raise exception in the end
            errors = []
            for result in as_completed(futures):
                try:
                    result.result()
                except Exception as exc:
                    self.result['error'] += 1
                    if (isinstance(exc, ResourceNotFound) or
                            isinstance(exc, InvalidResourceStateException)):
                        LOG.warning('Action %s failed as resource '
                                    'doesn\'t exist or is in a wrong '
                                    'state: %s', action, str(exc))
                    else:
                        LOG.exception('Action %s failed', action)
                        errors.append(exc)
            meta = {
                'success_count': (self.result['start_instance'] +
                                  self.result['stop_instance']),
                'error_count': self.result['error'],
                'not_active_count': self.result['not_active'],
                'vm_action': 'on' if action == 'start_instance' else 'off'
            }
            self.publish_activities_task(
                power_schedule['organization_id'], power_schedule_id,
                'power_schedule', power_schedule['name'],
                'power_schedule_processed', meta)
            if errors:
                raise errors[0]

    def process_schedule(self, power_schedule_id):
        LOG.info('Start processing for schedule %s', power_schedule_id)
        _, schedule = self.rest_cl.power_schedule_get(power_schedule_id)
        if not self.is_executable_ps(schedule):
            return
        required_action = self.get_action(schedule)
        if required_action:
            action_func_map = {
                'power_on': 'start_instance',
                'power_off': 'stop_instance',
            }
            self.process_resources(schedule, action_func_map[required_action])

    def process_task(self, body, message):
        now_ts = int(datetime.now(tz=pytz.utc).timestamp())
        self.result = self.default_result().copy()
        error = None
        power_schedule_id = body.get('power_schedule_id')
        try:
            if not power_schedule_id:
                raise PowerScheduleException(
                    'Invalid task received: {}'.format(body))
            self.process_schedule(power_schedule_id)
        except Exception as exc:
            error = str(exc)
            self.result['reason'] = error
            LOG.error('Task failed: %s', error)
        LOG.info('Power schedule %s results:\n%s',
                 power_schedule_id, self.result)
        updates = {
            'last_eval': now_ts,
        }
        if self.result['reason'] not in [PowerScheduleReasons.NO_CHANGES,
                                         PowerScheduleReasons.DISABLED,
                                         PowerScheduleReasons.OUTDATED,
                                         PowerScheduleReasons.DISABLED_ORG]:
            updates['last_run'] = now_ts
            # we should reset error only if instances have been powered on/off
            # during this run
            updates['last_run_error'] = None
        if error:
            updates['last_run_error'] = error
        self.rest_cl.power_schedule_update(power_schedule_id, updates)
        message.ack()


if __name__ == '__main__':
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
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
            worker = PowerScheduleWorker(conn, config_cl)
            worker.run()
        except KeyboardInterrupt:
            worker.running = False
            worker.thread.join()
            LOG.info('Shutdown received')
