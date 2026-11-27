import os
import tempfile
import unittest
from unittest.mock import MagicMock, patch
from urllib.parse import quote

import mongomock

from insider.insider_worker.processors import azure as azure_module
from insider.insider_worker.processors.azure import (
    AzurePriceProcessor, BASE_PRICES_URL, CHINA_PRICESHEET_URL)


def _price(meter_id, price=1.0, **overrides):
    p = {
        'meterId': meter_id,
        'type': 'Consumption',
        'productName': 'Virtual Machines Dv3 Series',
        'reservationTerm': None,
        'tierMinimumUnits': 0.0,
        'currencyCode': 'USD',
        'retailPrice': price,
        'unitPrice': price,
        'meterName': 'D2 v3',
        'effectiveStartDate': '2024-01-01T00:00:00Z',
        'armSkuName': 'Standard_D2_v3',
        'armRegionName': 'westeurope',
        'serviceName': 'Virtual Machines',
    }
    p.update(overrides)
    return p


class FakeHttpClient:
    """
    Serves the Azure retail prices API for one currency and one price type
    ('Consumption') from in-memory pages, plus the China pricesheet.
    """

    def __init__(self, pages, csv_lines=None):
        self.pages = pages
        self.csv_lines = csv_lines or []
        self.requested = []
        self.page_urls = [self._page_url(i) for i in range(len(pages))]

    @staticmethod
    def _page_url(index):
        url = BASE_PRICES_URL + '?currencyCode=USD&$filter=%s' % quote(
            "type eq 'Consumption'")
        if index:
            url += '&$skip=%d' % (index * 100)
        return url

    def get(self, url):
        self.requested.append(url)
        if url == CHINA_PRICESHEET_URL:
            return 200, {'DownloadUrl': 'https://download/pricesheet.csv'}
        if 'type%20ne' in url:
            # all types already discovered
            return 200, {'Items': [], 'Count': 0}
        if url in self.page_urls:
            index = self.page_urls.index(url)
            items = self.pages[index]
            next_link = (self.page_urls[index + 1]
                         if index + 1 < len(self.pages) else None)
            return 200, {'Items': items, 'Count': len(items),
                         'NextPageLink': next_link}
        # type discovery request (no filter)
        first = self.pages[0] if self.pages else []
        return 200, {'Items': first[:1], 'Count': len(first[:1])}

    def stream(self, url):
        self.requested.append(url)
        response = MagicMock()
        response.iter_lines.return_value = iter(self.csv_lines)
        return response


class TestAzurePriceProcessor(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        os.environ['LIVENESS_FILE'] = os.path.join(self.tmp.name, 'alive')
        self.mongo = mongomock.MongoClient()
        self.config_cl = MagicMock()
        self.processor = AzurePriceProcessor(self.mongo, self.config_cl)
        patch.object(AzurePriceProcessor, '_get_currencies_list',
                     return_value=['USD']).start()

    def tearDown(self):
        patch.stopall()
        os.environ.pop('LIVENESS_FILE', None)
        self.tmp.cleanup()

    @property
    def prices(self):
        return self.mongo.insider.azure_prices

    def run_discovery(self, pages, last_discovery_ts=0):
        http = FakeHttpClient(pages)
        with patch.object(azure_module, 'Client', return_value=http):
            self.processor.process_prices(last_discovery_ts)
        return http

    def test_first_run_inserts_everything(self):
        self.run_discovery([[_price('m1'), _price('m2')], [_price('m3')]])
        docs = list(self.prices.find())
        self.assertEqual(len(docs), 3)
        for doc in docs:
            self.assertIn('created_at', doc)
            self.assertEqual(doc['created_at'], doc['last_seen'])

    def test_unchanged_prices_only_bump_last_seen(self):
        self.run_discovery([[_price('m1'), _price('m2')]])
        first = {d['meterId']: d for d in self.prices.find()}
        self.prices.update_many({}, {'$set': {'last_seen': 100}})
        self.run_discovery([[_price('m1'), _price('m2')]],
                           last_discovery_ts=50)
        docs = list(self.prices.find())
        self.assertEqual(len(docs), 2)
        for doc in docs:
            self.assertEqual(doc['_id'], first[doc['meterId']]['_id'])
            self.assertGreater(doc['last_seen'], 100)
            self.assertEqual(doc['created_at'],
                             first[doc['meterId']]['created_at'])

    def test_changed_price_creates_new_document(self):
        self.run_discovery([[_price('m1', price=1.0), _price('m2')]])
        self.prices.update_many({}, {'$set': {'last_seen': 100}})
        self.run_discovery([[_price('m1', price=2.0), _price('m2')]],
                           last_discovery_ts=50)
        m1_docs = list(self.prices.find({'meterId': 'm1'}).sort('created_at'))
        self.assertEqual(len(m1_docs), 2)
        # the superseded row is not touched
        self.assertEqual(m1_docs[0]['last_seen'], 100)
        self.assertEqual(m1_docs[0]['retailPrice'], 1.0)
        self.assertEqual(m1_docs[1]['retailPrice'], 2.0)
        self.assertGreater(m1_docs[1]['last_seen'], 100)
        m2_docs = list(self.prices.find({'meterId': 'm2'}))
        self.assertEqual(len(m2_docs), 1)
        self.assertGreater(m2_docs[0]['last_seen'], 100)

    def test_rows_outside_last_discovery_are_not_matched(self):
        self.run_discovery([[_price('m1')]])
        # the previous row was last seen before the last completed discovery,
        # so it is treated as gone and the new one is inserted again
        self.prices.update_many({}, {'$set': {'last_seen': 10}})
        self.run_discovery([[_price('m1')]], last_discovery_ts=50)
        self.assertEqual(self.prices.count_documents({'meterId': 'm1'}), 2)

    def test_duplicate_rows_across_pages_are_inserted_once(self):
        self.run_discovery([[_price('m1'), _price('m2')],
                            [_price('m2'), _price('m3')]])
        self.assertEqual(self.prices.count_documents({}), 3)
        self.assertEqual(self.prices.count_documents({'meterId': 'm2'}), 1)

    def test_keys_normalise_numbers_and_missing_values(self):
        a = _price('m1', tierMinimumUnits=0)
        b = _price('m1', tierMinimumUnits=0.0)
        self.assertEqual(AzurePriceProcessor.unique_key(a),
                         AzurePriceProcessor.unique_key(b))
        c = _price('m1')
        del c['reservationTerm']
        self.assertEqual(AzurePriceProcessor.unique_key(a),
                         AzurePriceProcessor.unique_key(c))
        self.assertNotEqual(AzurePriceProcessor.unique_key(a),
                            AzurePriceProcessor.unique_key(_price('m2')))
        self.assertEqual(len(AzurePriceProcessor.unique_key(a)), 16)
        self.assertNotEqual(AzurePriceProcessor.change_key(_price('m1', 1.0)),
                            AzurePriceProcessor.change_key(_price('m1', 2.0)))
        self.assertEqual(len(AzurePriceProcessor.change_key(a)), 8)

    def test_old_prices_map_is_compact(self):
        self.run_discovery([[_price('m1'), _price('m2')]])
        old = self.processor._load_old_prices(0, 'USD')
        self.assertEqual(len(old), 2)
        for key, value in old.items():
            self.assertIsInstance(key, bytes)
            self.assertIsInstance(value, bytes)
            self.assertEqual(len(key), 16)
            self.assertEqual(len(value), 12 + 8)
            doc = self.prices.find_one(
                {'_id': AzurePriceProcessor._old_value_id(value)})
            self.assertIsNotNone(doc)
            self.assertEqual(AzurePriceProcessor.unique_key(doc), key)

    def test_other_currency_is_not_loaded(self):
        self.run_discovery([[_price('m1')]])
        self.prices.insert_one(_price('m9', currencyCode='EUR',
                                      created_at=1, last_seen=1))
        old = self.processor._load_old_prices(0, 'USD')
        self.assertEqual(len(old), 1)


class TestChinaPricesheet(unittest.TestCase):
    HEADER = ('meterId,type,productName,reservationTerm,tierMinimumUnits,'
              'currencyCode,retailPrice,unitPrice,meterName,'
              'effectiveStartDate,armRegionName')

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        os.environ['LIVENESS_FILE'] = os.path.join(self.tmp.name, 'alive')
        self.mongo = mongomock.MongoClient()
        self.processor = AzurePriceProcessor(self.mongo, MagicMock())
        patch.object(AzurePriceProcessor, '_get_currencies_list',
                     return_value=['CNY']).start()
        patch.object(azure_module, 'CHINA_CSV_CHUNK_SIZE', 2).start()

    def tearDown(self):
        patch.stopall()
        os.environ.pop('LIVENESS_FILE', None)
        self.tmp.cleanup()

    @property
    def prices(self):
        return self.mongo.insider.azure_prices

    @staticmethod
    def _row(meter_id, price='1.5'):
        return ','.join([meter_id, 'Consumption', 'Virtual Machines', '', '0',
                         'CNY', price, price, 'D2 v3', '2024-01-01', 'chinaeast'])

    def run_discovery(self, rows, last_discovery_ts=0):
        lines = [('﻿' + self.HEADER).encode('utf-8')]
        lines += [r.encode('utf-8') for r in rows]
        http = FakeHttpClient([], csv_lines=lines)
        with patch.object(azure_module, 'Client', return_value=http):
            self.processor.process_prices(last_discovery_ts)
        return http

    def test_csv_is_streamed_in_chunks_and_inserted(self):
        http = self.run_discovery([self._row('c1'), self._row('c2'),
                                   self._row('c3'), self._row('c4'),
                                   self._row('c5')])
        self.assertIn('https://download/pricesheet.csv', http.requested)
        docs = list(self.prices.find())
        self.assertEqual(len(docs), 5)
        # BOM must not leak into the first column name
        self.assertEqual(sorted(d['meterId'] for d in docs),
                         ['c1', 'c2', 'c3', 'c4', 'c5'])
        for doc in docs:
            self.assertEqual(doc['currencyCode'], 'CNY')
            self.assertIn('last_seen', doc)

    def test_second_csv_run_matches_unchanged_rows(self):
        self.run_discovery([self._row('c1'), self._row('c2'),
                            self._row('c3')])
        self.prices.update_many({}, {'$set': {'last_seen': 100}})
        self.run_discovery([self._row('c1'), self._row('c2', price='9'),
                            self._row('c3')], last_discovery_ts=50)
        self.assertEqual(self.prices.count_documents({}), 4)
        self.assertEqual(self.prices.count_documents({'meterId': 'c2'}), 2)
        c1 = self.prices.find_one({'meterId': 'c1'})
        self.assertGreater(c1['last_seen'], 100)
