import os
import tempfile
import unittest
from datetime import datetime, timezone
from unittest.mock import MagicMock, PropertyMock, patch

import mongomock

from insider.insider_worker import main as worker_main
from insider.insider_worker.main import InsiderWorker, DISCOVERIES_THRESHOLD


class FakeProcessor:
    calls = []
    # exceptions to raise on successive process_prices calls
    errors = []

    def __init__(self, mongo_client, config_client):
        self.mongo_client = mongo_client
        self.config_client = config_client

    def process_prices(self, last_discovery_ts):
        FakeProcessor.calls.append(last_discovery_ts)
        if FakeProcessor.errors:
            raise FakeProcessor.errors.pop(0)


class TestInsiderWorker(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        os.environ['LIVENESS_FILE'] = os.path.join(self.tmp.name, 'alive')
        self.mongo = mongomock.MongoClient()
        patch.object(InsiderWorker, 'mongo_client', new_callable=PropertyMock,
                     return_value=self.mongo).start()
        patch.object(worker_main, 'get_processor_class',
                     return_value=FakeProcessor).start()
        FakeProcessor.calls = []
        FakeProcessor.errors = []
        self.worker = InsiderWorker(MagicMock(), MagicMock())
        self.message = MagicMock()
        self.events = []
        self.message.ack.side_effect = lambda: self.events.append('ack')
        original = FakeProcessor.process_prices

        def recording(proc, ts):
            self.events.append('process')
            return original(proc, ts)
        patch.object(FakeProcessor, 'process_prices', recording).start()

    def tearDown(self):
        patch.stopall()
        os.environ.pop('LIVENESS_FILE', None)
        self.tmp.cleanup()

    @property
    def discoveries(self):
        return self.mongo.insider.discoveries

    def test_message_is_acked_before_processing(self):
        self.worker.process_task({'cloud_type': 'azure_cnr'}, self.message)
        self.assertEqual(self.events, ['ack', 'process'])
        self.message.ack.assert_called_once_with()

    def test_successful_run_is_recorded(self):
        self.worker.process_task({'cloud_type': 'azure_cnr'}, self.message)
        docs = list(self.discoveries.find())
        self.assertEqual(len(docs), 1)
        self.assertGreater(docs[0]['completed_at'], 0)
        self.assertNotIn('failed_at', docs[0])
        self.assertEqual(FakeProcessor.calls, [0])

    def test_failed_run_is_marked_and_acked(self):
        FakeProcessor.errors = [RuntimeError('azure is down')]
        self.worker.process_task({'cloud_type': 'azure_cnr'}, self.message)
        self.message.ack.assert_called_once_with()
        docs = list(self.discoveries.find())
        self.assertEqual(len(docs), 1)
        self.assertEqual(docs[0]['completed_at'], 0)
        self.assertGreater(docs[0]['failed_at'], 0)
        self.assertIn('azure is down', docs[0]['error'])

    def test_failed_run_does_not_count_as_last_discovery(self):
        FakeProcessor.errors = [RuntimeError('boom')]
        self.worker.process_task({'cloud_type': 'azure_cnr'}, self.message)
        self.assertEqual(self.worker.get_last_discovery_ts('azure_cnr'), 0)

    def test_recent_discovery_skips_processing(self):
        now = int(datetime.now(tz=timezone.utc).timestamp())
        self.discoveries.insert_one({
            'cloud_type': 'azure_cnr',
            'started_at': now - DISCOVERIES_THRESHOLD // 2,
            'completed_at': now - 10})
        self.worker.process_task({'cloud_type': 'azure_cnr'}, self.message)
        self.assertEqual(FakeProcessor.calls, [])
        self.message.ack.assert_called_once_with()
        self.assertEqual(self.discoveries.count_documents({}), 1)

    def test_old_discovery_is_passed_as_floor(self):
        now = int(datetime.now(tz=timezone.utc).timestamp())
        started = now - DISCOVERIES_THRESHOLD * 2
        self.discoveries.insert_one({
            'cloud_type': 'azure_cnr', 'started_at': started,
            'completed_at': started + 3600})
        self.worker.process_task({'cloud_type': 'azure_cnr'}, self.message)
        self.assertEqual(FakeProcessor.calls, [started])

    def test_invalid_task_is_acked_and_logged(self):
        self.worker.process_task({}, self.message)
        self.message.ack.assert_called_once_with()
        self.assertEqual(FakeProcessor.calls, [])

    def test_liveness_file_is_touched(self):
        self.worker.process_task({'cloud_type': 'azure_cnr'}, self.message)
        self.assertTrue(os.path.exists(os.environ['LIVENESS_FILE']))
