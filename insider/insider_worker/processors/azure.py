import csv
from io import StringIO
from datetime import datetime, timezone
from kombu.log import get_logger
from kombu import Connection as QConnection
from kombu import Exchange
from kombu.log import get_logger
from kombu.pools import producers
from requests.exceptions import SSLError
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from insider.insider_worker.processors.base import BasePriceProcessor
from insider.insider_worker.http_client.client import Client


ACTIVITIES_EXCHANGE_NAME = 'activities-tasks'
ACTIVITIES_EXCHANGE = Exchange(ACTIVITIES_EXCHANGE_NAME, type='topic')
LOG = get_logger(__name__)
PRICES_PER_REQUEST = 100
PRICES_COUNT_TO_LOG = 1000


class AzurePriceProcessor(BasePriceProcessor):
    # common unique params + 2 additional keys for reservations
    UNIQUE_FIELDS = ['meterId', 'type', 'productName', 'reservationTerm',
                     'tierMinimumUnits', 'currencyCode']
    CHANGE_FIELDS = ['retailPrice', 'unitPrice', 'meterName',
                     'effectiveStartDate']
    CLOUD_TYPE = 'azure_cnr'

    @property
    def discoveries(self):
        return self.mongo_client.insider.discoveries

    @property
    def prices(self):
        return self.mongo_client.insider.azure_prices

    def get_last_discovery(self):
        discoveries = self.discoveries.find(
            {'cloud_type': self.CLOUD_TYPE, 'completed_at': {'$ne': 0}}
        ).sort(
            [('completed_at', -1)]).limit(1)
        try:
            return next(discoveries)
        except StopIteration:
            return {}

    @staticmethod
    def unique_values(price):
        return tuple(price.get(p) for p in AzurePriceProcessor.UNIQUE_FIELDS)

    @staticmethod
    def change_values(price):
        return tuple(price.get(p) for p in AzurePriceProcessor.CHANGE_FIELDS)

    def publish_activities_tasks(self, task):
        queue_conn = QConnection('amqp://{user}:{pass}@{host}:{port}'.format(
            **self.config_client.read_branch('/rabbit')))
        with producers[queue_conn].acquire(block=True) as producer:
            producer.publish(
                task,
                serializer='json',
                exchange=ACTIVITIES_EXCHANGE,
                declare=[ACTIVITIES_EXCHANGE],
                routing_key='insider.error.sslerror',
                retry=True
            )

    def send_sslerror_service_email(self):
        task = {
            'action': 'insider_prices_sslerror',
            'object_id': None
        }
        self.publish_activities_tasks(task)

    def _get_currencies_list(self):
        rest_cl = RestClient(
            url=self.config_client.restapi_url(),
            secret=self.config_client.cluster_secret(),
            verify=False)
        _, orgs = rest_cl.organization_list()
        currencies = set(map(lambda x: x['currency'], orgs['organizations']))
        return list(currencies)

    def _get_old_prices_map(self, started_at, currency):
        old_prices = self.prices.find(
            {'last_seen': {'$gte': started_at}, 'currencyCode': currency},
            {k: 1 for k in self.UNIQUE_FIELDS + self.CHANGE_FIELDS + ['last_seen']}
        )
        return {self.unique_values(p): p for p in old_prices}

    def _process_global_prices(self, http_client, started_at):
        LOG.info('Start processing Azure Global prices')
        for currency in self._get_currencies_list():
            LOG.info('Processing Azure prices for currency: %s', currency)
            old_prices_map = self._get_old_prices_map(started_at, currency)
            processed_keys = {}
            prices_counter = 0

            next_page = 'https://prices.azure.com/api/retail/prices'
            next_page += '?currencyCode=%s' % currency
            while True:
                if prices_counter % PRICES_COUNT_TO_LOG == 0:
                    LOG.info('Total number of prices got from '
                             'cloud: %s', prices_counter)
                try:
                    code, response = http_client.get(next_page)
                except SSLError:
                    LOG.error('Getting Azure prices failed with SSL '
                              'verification error. Will try to get prices'
                              'without SSL verification')
                    self.send_sslerror_service_email()
                    http_client = Client(verify=False)
                    code, response = http_client.get(next_page)
                items = response.get('Items', [])
                new_prices_map = {self.unique_values(p): p for p in items}
                self.update_price_records(new_prices_map, old_prices_map,
                                          processed_keys)
                new_url = response.get('NextPageLink')
                if not new_url or new_url == next_page:
                    LOG.info('Total number of prices got from '
                             'cloud: %s', prices_counter)
                    break
                next_page = new_url
                prices_counter += response.get('Count', 0)

    def _process_china_prices(self, http_client, started_at):
        LOG.info('Start processing Azure China prices')
        url = 'https://prices.azure.cn/api/retail/pricesheet/download?' \
              'api-version=2023-06-01-preview'
        _, response = http_client.get(url)
        download_url = response['DownloadUrl']
        _, response = http_client.get(download_url)
        stream = StringIO(response.decode('utf-8'))
        csv_reader = csv.DictReader(stream)
        # Stream the price sheet in batches instead of materializing the whole
        # catalog at once. Old prices are loaded lazily per currency so peak
        # memory stays bounded by a single batch + the currencies actually seen.
        old_prices_map = {}
        loaded_currencies = set()
        processed_keys = {}
        new_prices_map = {}
        prices_counter = 0
        for price in csv_reader:
            prices_counter += 1
            currency = price.get('currencyCode')
            if currency not in loaded_currencies:
                old_prices_map.update(
                    self._get_old_prices_map(started_at, currency))
                loaded_currencies.add(currency)
            new_prices_map[self.unique_values(price)] = price
            if len(new_prices_map) >= PRICES_PER_REQUEST:
                self.update_price_records(
                    new_prices_map, old_prices_map, processed_keys)
                new_prices_map = {}
        if new_prices_map:
            self.update_price_records(
                new_prices_map, old_prices_map, processed_keys)
        LOG.info('Total number of prices got from cloud: %s', prices_counter)

    def process_prices(self):
        last_discovery = self.get_last_discovery()
        started_at = last_discovery.get('started_at', 0)

        http_client = Client()
        self._process_global_prices(http_client, started_at)
        self._process_china_prices(http_client, started_at)

    def update_price_records(self, new_prices_map, old_prices_map,
                             processed_keys):
        if not new_prices_map:
            return
        now_ts = int(datetime.now(tz=timezone.utc).timestamp())
        update_ids = []
        for key in list(new_prices_map.keys()):
            new_price = new_prices_map[key]
            if processed_keys.get(key):
                new_prices_map.pop(key)
                continue
            processed_keys[key] = True
            old_price = old_prices_map.get(key, {})
            if self.change_values(new_price) == self.change_values(old_price):
                update_ids.append(old_price['_id'])
                new_prices_map.pop(key)
                continue

            new_price.update({'created_at': now_ts, 'last_seen': now_ts})
        if update_ids:
            self.prices.update_many(
                filter={
                    '_id': {'$in': update_ids},
                },
                update={'$set': {'last_seen': now_ts}}
            )
        if new_prices_map:
            self.prices.insert_many(new_prices_map.values())
