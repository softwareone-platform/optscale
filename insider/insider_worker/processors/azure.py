import codecs
import csv
import hashlib
import time
from datetime import datetime, timezone
from urllib.parse import quote
from bson import ObjectId
from kombu import Connection as QConnection
from kombu import Exchange
from kombu.log import get_logger
from kombu.pools import producers
from requests.exceptions import SSLError
from optscale_client.rest_api_client.client_v2 import Client as RestClient
from insider.insider_worker import liveness
from insider.insider_worker.processors.base import BasePriceProcessor
from insider.insider_worker.http_client.client import Client


ACTIVITIES_EXCHANGE_NAME = 'activities-tasks'
ACTIVITIES_EXCHANGE = Exchange(ACTIVITIES_EXCHANGE_NAME, type='topic')
LOG = get_logger(__name__)
PRICES_COUNT_TO_LOG = 10000
CHINA_CURRENCY_CODE = 'CNY'
BASE_PRICES_URL = 'https://prices.azure.com/api/retail/prices'
CHINA_PRICESHEET_URL = ('https://prices.azure.cn/api/retail/pricesheet/'
                        'download?api-version=2023-06-01-preview')
# rows of the China pricesheet CSV diffed per batch
CHINA_CSV_CHUNK_SIZE = 5000
# how often to report progress while loading the previous catalog from Mongo
OLD_PRICES_LOG_EVERY = 100000
REST_API_TIMEOUT = (10, 60)
PUBLISH_RETRY_POLICY = {'max_retries': 15, 'interval_start': 0,
                        'interval_step': 1, 'interval_max': 3}
PUBLISH_ACQUIRE_TIMEOUT = 30
# digest sizes for the in-memory diff state; see unique_key / change_key
UNIQUE_DIGEST_SIZE = 16
CHANGE_DIGEST_SIZE = 8
_FIELD_SEPARATOR = b'\x1f'


def _normalize(value):
    """
    Stable textual form of a price field. Numbers are normalised so that the
    retail API's ``0.0`` and the pricesheet CSV's ``0`` compare equal, like
    the former tuple comparison did (``0 == 0.0``).
    """
    if value is None:
        return b''
    if isinstance(value, bool):
        return str(value).encode('utf-8')
    if isinstance(value, (int, float)):
        return repr(float(value)).encode('utf-8')
    return str(value).encode('utf-8')


def _digest(price, fields, size):
    hasher = hashlib.blake2b(digest_size=size)
    for i, field in enumerate(fields):
        if i:
            hasher.update(_FIELD_SEPARATOR)
        hasher.update(_normalize(price.get(field)))
    return hasher.digest()


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

    @staticmethod
    def unique_key(price):
        """16-byte digest identifying a price row (UNIQUE_FIELDS)."""
        return _digest(price, AzurePriceProcessor.UNIQUE_FIELDS,
                       UNIQUE_DIGEST_SIZE)

    @staticmethod
    def change_key(price):
        """8-byte digest of the fields whose change creates a new row."""
        return _digest(price, AzurePriceProcessor.CHANGE_FIELDS,
                       CHANGE_DIGEST_SIZE)

    @staticmethod
    def _old_value(price):
        # 12 raw ObjectId bytes + change digest, as one bytes object: this is
        # the whole per-row state kept in memory for the previous catalog
        return price['_id'].binary + AzurePriceProcessor.change_key(price)

    @staticmethod
    def _old_value_id(value):
        return ObjectId(value[:12])

    @staticmethod
    def _old_value_change_key(value):
        return value[12:]

    def publish_activities_tasks(self, task):
        queue_conn = QConnection('amqp://{user}:{pass}@{host}:{port}'.format(
            **self.config_client.read_branch('/rabbit')),
            transport_options=PUBLISH_RETRY_POLICY)
        with producers[queue_conn].acquire(
                block=True, timeout=PUBLISH_ACQUIRE_TIMEOUT) as producer:
            producer.publish(
                task,
                serializer='json',
                exchange=ACTIVITIES_EXCHANGE,
                declare=[ACTIVITIES_EXCHANGE],
                routing_key='insider.error.sslerror',
                retry=True,
                retry_policy=PUBLISH_RETRY_POLICY
            )

    def send_sslerror_service_email(self):
        task = {
            'action': 'insider_prices_sslerror',
            'object_id': None
        }
        try:
            self.publish_activities_tasks(task)
        except Exception as exc:  # pylint: disable=broad-exception-caught
            # the e-mail is a courtesy; never let it break the discovery
            LOG.error('Unable to publish sslerror activity: %s', exc)

    def _get_currencies_list(self):
        rest_cl = RestClient(
            url=self.config_client.restapi_url(),
            secret=self.config_client.cluster_secret(),
            verify=False, timeout=REST_API_TIMEOUT)
        _, orgs = rest_cl.organization_list()
        currencies = set(map(lambda x: x['currency'], orgs['organizations']))
        return list(currencies)

    def _load_old_prices(self, last_discovery_ts, currency):
        """
        Previous catalog of a currency as {unique_key: ObjectId bytes +
        change_key}. Roughly 200 bytes per row instead of a full document.
        """
        cursor = self.prices.find(
            {
                'last_seen': {'$gte': last_discovery_ts},
                'currencyCode': currency
            },
            {k: 1 for k in self.UNIQUE_FIELDS + self.CHANGE_FIELDS}
        )
        old_prices_map = {}
        for i, price in enumerate(cursor, 1):
            old_prices_map[self.unique_key(price)] = self._old_value(price)
            if i % OLD_PRICES_LOG_EVERY == 0:
                LOG.info('Loaded %s previous prices for currency %s',
                         i, currency)
                liveness.touch()
        LOG.info('Loaded %s previous prices for currency %s',
                 len(old_prices_map), currency)
        return old_prices_map

    def _process_global_prices(self, http_client, old_prices_map, currency):
        price_types = self._get_all_price_types(http_client, currency)
        # break down by type to avoid 1000000 record limit
        for price_type in price_types:
            type_start = time.monotonic()
            LOG.info('Processing Azure prices for currency: %s, type: %s',
                     currency, price_type)
            processed_keys = set()
            prices_counter = 0
            next_page = BASE_PRICES_URL + '?currencyCode=%s&$filter=%s' % (
                currency, quote("type eq '%s'" % price_type))
            while True:
                if prices_counter % PRICES_COUNT_TO_LOG == 0:
                    LOG.info('Total number of prices got from '
                             'cloud: %s', prices_counter)
                _, response = self._make_ratail_price_request(
                    http_client, next_page)
                items = response.get('Items', [])
                new_prices_map = {self.unique_key(p): p for p in items}
                self.update_price_records(new_prices_map, old_prices_map,
                                          processed_keys)
                liveness.touch()
                new_url = response.get('NextPageLink')
                if not new_url or new_url == next_page:
                    LOG.info('Total number of prices got from '
                             'cloud: %s', prices_counter)
                    break
                next_page = new_url
                prices_counter += response.get('Count', 0)
            LOG.info('Azure prices for currency %s, type %s processed in '
                     '%s seconds', currency, price_type,
                     int(time.monotonic() - type_start))

    def _process_china_prices(self, http_client, old_prices_map, currency):
        LOG.info('Start processing Azure China prices (%s)', currency)
        _, response = http_client.get(CHINA_PRICESHEET_URL)
        download_url = response['DownloadUrl']
        processed_keys = set()
        total = 0
        chunk = {}
        stream = http_client.stream(download_url)
        try:
            # iterdecode strips a UTF-8 BOM and decodes incrementally, so the
            # pricesheet is never held in memory as a whole
            lines = codecs.iterdecode(stream.iter_lines(), 'utf-8-sig')
            for row in csv.DictReader(lines):
                chunk[self.unique_key(row)] = row
                total += 1
                if len(chunk) >= CHINA_CSV_CHUNK_SIZE:
                    self.update_price_records(chunk, old_prices_map,
                                              processed_keys)
                    chunk = {}
                    liveness.touch()
                    if total % (CHINA_CSV_CHUNK_SIZE * 10) == 0:
                        LOG.info('Total number of prices got from '
                                 'cloud: %s', total)
        finally:
            stream.close()
        if chunk:
            self.update_price_records(chunk, old_prices_map, processed_keys)
        LOG.info('Total number of prices got from cloud: %s', total)

    def _make_ratail_price_request(self, http_client, url):
        try:
            code, response = http_client.get(url)
        except SSLError:
            LOG.error('Getting Azure prices failed with SSL '
                      'verification error. Will try to get prices'
                      'without SSL verification')
            self.send_sslerror_service_email()
            http_client = Client(verify=False)
            code, response = http_client.get(url)
        return code, response

    def _get_all_price_types(self, http_client, currency):
        def _get_next_price_types(http_client, currency, excluded_types=None):
            next_page = BASE_PRICES_URL + '?currencyCode=%s' % currency
            if excluded_types:
                conditions = ["type ne '%s'" % f for f in excluded_types]
                filter_str = ' and '.join(conditions)
                next_page += '&$filter=%s' % quote(filter_str)
            _, response = self._make_ratail_price_request(
                http_client, next_page)
            items = response.get('Items', [])
            return set(item['type'] for item in items)

        all_types = set()
        while True:
            new_types = _get_next_price_types(
                http_client, currency, list(all_types))
            if not new_types:
                return all_types
            all_types |= new_types

    def process_prices(self, last_discovery_ts):
        http_client = Client()
        process_func_map = {
            CHINA_CURRENCY_CODE: self._process_china_prices
        }
        for currency in self._get_currencies_list():
            currency_start = time.monotonic()
            old_prices_map = self._load_old_prices(last_discovery_ts, currency)
            process_func = process_func_map.get(
                currency, self._process_global_prices)
            process_func(http_client, old_prices_map, currency)
            # release the previous catalog before loading the next one
            old_prices_map = None
            LOG.info('Azure prices for currency %s processed in %s seconds',
                     currency, int(time.monotonic() - currency_start))

    def update_price_records(self, new_prices_map, old_prices_map,
                             processed_keys):
        """
        new_prices_map: {unique_key: price dict} for one page / chunk.
        old_prices_map: {unique_key: ObjectId bytes + change_key} of the
            previous catalog.
        processed_keys: set of unique_keys already handled in this run, so a
            row repeated on several pages is counted once.
        Unchanged rows get their last_seen bumped; new and changed rows are
        inserted as new documents (price history is kept).
        """
        if not new_prices_map:
            return
        now_ts = int(datetime.now(tz=timezone.utc).timestamp())
        update_ids = []
        for key, new_price in list(new_prices_map.items()):
            if key in processed_keys:
                new_prices_map.pop(key)
                continue
            processed_keys.add(key)
            old_value = old_prices_map.get(key)
            if old_value is not None and (
                    self._old_value_change_key(old_value) ==
                    self.change_key(new_price)):
                update_ids.append(self._old_value_id(old_value))
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
