import logging
import unittest
from unittest.mock import MagicMock, patch

from rest_api.rest_api_server.otel_log_handler import OTelLogHandler


class TestOTelLogHandler(unittest.TestCase):
    def setUp(self):
        OTelLogHandler._log_handler = None
        OTelLogHandler._logger_provider = None

    def tearDown(self):
        OTelLogHandler._log_handler = None
        OTelLogHandler._logger_provider = None

    @patch('rest_api.rest_api_server.otel_log_handler.set_logger_provider')
    @patch('rest_api.rest_api_server.otel_log_handler.LoggingHandler')
    @patch('rest_api.rest_api_server.otel_log_handler.BatchLogRecordProcessor')
    @patch('rest_api.rest_api_server.otel_log_handler.OTLPLogExporter')
    @patch('rest_api.rest_api_server.otel_log_handler.LoggerProvider')
    def test_setup_success(
        self,
        mock_logger_provider,
        mock_otlp_exporter,
        mock_batch_processor,
        mock_logging_handler,
        mock_set_logger_provider,
    ):
        # Create mock resource
        mock_resource = MagicMock()

        # Mock instances
        mock_provider_instance = MagicMock()
        mock_logger_provider.return_value = mock_provider_instance
        mock_exporter_instance = MagicMock()
        mock_otlp_exporter.return_value = mock_exporter_instance
        mock_processor_instance = MagicMock()
        mock_batch_processor.return_value = mock_processor_instance
        mock_handler_instance = MagicMock()
        mock_logging_handler.return_value = mock_handler_instance

        # Mock root logger
        with patch('rest_api.rest_api_server.otel_log_handler.logging.getLogger') as mock_get_logger:
            mock_root_logger = MagicMock()
            mock_get_logger.return_value = mock_root_logger

            result = OTelLogHandler.setup(
                resource=mock_resource,
                otlp_endpoint='http://test:4317'
            )

            # Verify setup was successful
            self.assertTrue(result)

            # Verify logger provider was created and configured
            mock_logger_provider.assert_called_once_with(resource=mock_resource)
            mock_set_logger_provider.assert_called_once_with(mock_provider_instance)

            # Verify exporter was created
            mock_otlp_exporter.assert_called_once_with(
                endpoint='http://test:4317',
                insecure=True
            )

            # Verify processor was added
            mock_batch_processor.assert_called_once_with(mock_exporter_instance)
            mock_provider_instance.add_log_record_processor.assert_called_once_with(
                mock_processor_instance
            )

            # Verify handler was created and attached
            mock_logging_handler.assert_called_once_with(
                level=logging.NOTSET,
                logger_provider=mock_provider_instance
            )
            mock_root_logger.addHandler.assert_called_once_with(mock_handler_instance)

            # Verify state was saved
            self.assertEqual(OTelLogHandler._log_handler, mock_handler_instance)
            self.assertEqual(OTelLogHandler._logger_provider, mock_provider_instance)

    @patch('rest_api.rest_api_server.otel_log_handler.LoggerProvider')
    def test_setup_exception_handling(self, mock_logger_provider):
        mock_resource = MagicMock()
        mock_logger_provider.side_effect = Exception("Test error")

        result = OTelLogHandler.setup(
            resource=mock_resource,
            otlp_endpoint='http://test:4317'
        )

        # Verify setup failed gracefully
        self.assertFalse(result)
        self.assertIsNone(OTelLogHandler._log_handler)
        self.assertIsNone(OTelLogHandler._logger_provider)

    def test_shutdown_with_handler(self):
        # Set up mock handler and provider
        mock_handler = MagicMock()
        mock_provider = MagicMock()
        OTelLogHandler._log_handler = mock_handler
        OTelLogHandler._logger_provider = mock_provider

        with patch('rest_api.rest_api_server.otel_log_handler.logging.getLogger') as mock_get_logger:
            mock_root_logger = MagicMock()
            mock_get_logger.return_value = mock_root_logger

            OTelLogHandler.shutdown()

            # Verify handler was removed
            mock_root_logger.removeHandler.assert_called_once_with(mock_handler)
            # Verify provider was shut down
            mock_provider.shutdown.assert_called_once()

    def test_shutdown_without_handler(self):
        OTelLogHandler._log_handler = None
        OTelLogHandler._logger_provider = None

        # Should not raise exception
        try:
            OTelLogHandler.shutdown()
        except Exception:
            self.fail("shutdown() raised Exception unexpectedly")

    def test_shutdown_exception_handling(self):
        mock_handler = MagicMock()
        OTelLogHandler._log_handler = mock_handler

        with patch('rest_api.rest_api_server.otel_log_handler.logging.getLogger') as mock_get_logger:
            mock_get_logger.side_effect = Exception("Test error")

            # Should not raise exception
            try:
                OTelLogHandler.shutdown()
            except Exception:
                self.fail("shutdown() raised Exception unexpectedly")

    @patch('rest_api.rest_api_server.otel_log_handler.set_logger_provider')
    @patch('rest_api.rest_api_server.otel_log_handler.LoggingHandler')
    @patch('rest_api.rest_api_server.otel_log_handler.BatchLogRecordProcessor')
    @patch('rest_api.rest_api_server.otel_log_handler.OTLPLogExporter')
    @patch('rest_api.rest_api_server.otel_log_handler.LoggerProvider')
    def test_handler_captures_all_log_levels(
        self,
        mock_logger_provider,
        mock_otlp_exporter,
        mock_batch_processor,
        mock_logging_handler,
        mock_set_logger_provider,
    ):
        mock_resource = MagicMock()
        mock_provider_instance = MagicMock()
        mock_logger_provider.return_value = mock_provider_instance
        mock_handler_instance = MagicMock()
        mock_logging_handler.return_value = mock_handler_instance

        with patch('rest_api.rest_api_server.otel_log_handler.logging.getLogger') as mock_get_logger:
            mock_root_logger = MagicMock()
            mock_get_logger.return_value = mock_root_logger

            OTelLogHandler.setup(
                resource=mock_resource,
                otlp_endpoint='http://test:4317'
            )

            # Verify handler is set to NOTSET to capture all levels
            mock_logging_handler.assert_called_once()
            call_kwargs = mock_logging_handler.call_args[1]
            self.assertEqual(call_kwargs['level'], logging.NOTSET)


if __name__ == '__main__':
    unittest.main()
