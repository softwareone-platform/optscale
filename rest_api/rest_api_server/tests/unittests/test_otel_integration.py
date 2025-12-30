import logging
import os
import unittest
from unittest.mock import MagicMock, patch

from rest_api.rest_api_server.otel_config import OTelConfig
from rest_api.rest_api_server.otel_log_handler import OTelLogHandler


class TestOTelIntegration(unittest.TestCase):
    def setUp(self):
        OTelConfig._initialized = False
        OTelConfig._enabled = False
        OTelLogHandler._log_handler = None
        OTelLogHandler._logger_provider = None
        # Clear environment variables
        for key in ['OTEL_ENABLED', 'OTEL_EXPORTER_OTLP_ENDPOINT',
                    'OTEL_SERVICE_NAME', 'OTEL_SERVICE_VERSION']:
            os.environ.pop(key, None)

    def tearDown(self):
        OTelConfig._initialized = False
        OTelConfig._enabled = False
        OTelLogHandler._log_handler = None
        OTelLogHandler._logger_provider = None
        for key in ['OTEL_ENABLED', 'OTEL_EXPORTER_OTLP_ENDPOINT',
                    'OTEL_SERVICE_NAME', 'OTEL_SERVICE_VERSION']:
            os.environ.pop(key, None)

    @patch('rest_api.rest_api_server.otel_config.OTelLogHandler')
    @patch('rest_api.rest_api_server.otel_config.LoggingInstrumentor')
    @patch('rest_api.rest_api_server.otel_config.trace')
    @patch('rest_api.rest_api_server.otel_config.BatchSpanProcessor')
    @patch('rest_api.rest_api_server.otel_config.OTLPSpanExporter')
    @patch('rest_api.rest_api_server.otel_config.TracerProvider')
    @patch('rest_api.rest_api_server.otel_config.Resource')
    def test_full_initialization_flow(self, mock_resource, mock_tracer_provider,
                                      mock_otlp_exporter, mock_batch_processor,
                                      mock_trace, mock_logging_instrumentor,
                                      mock_log_handler):
        # Set environment variables
        os.environ['OTEL_ENABLED'] = 'true'
        os.environ['OTEL_EXPORTER_OTLP_ENDPOINT'] = 'http://collector:4317'
        os.environ['OTEL_SERVICE_NAME'] = 'test_service'
        os.environ['OTEL_SERVICE_VERSION'] = '1.0.0'

        # Mock instances
        mock_resource_instance = MagicMock()
        mock_resource.return_value = mock_resource_instance
        mock_provider_instance = MagicMock()
        mock_tracer_provider.return_value = mock_provider_instance
        mock_exporter_instance = MagicMock()
        mock_otlp_exporter.return_value = mock_exporter_instance
        mock_processor_instance = MagicMock()
        mock_batch_processor.return_value = mock_processor_instance
        mock_instrumentor_instance = MagicMock()
        mock_logging_instrumentor.return_value = mock_instrumentor_instance

        # Initialize
        result = OTelConfig.initialize()

        # Verify initialization was successful
        self.assertTrue(result)
        self.assertTrue(OTelConfig._initialized)
        self.assertTrue(OTelConfig._enabled)

        # Verify resource was created with correct attributes
        mock_resource.assert_called_once()
        resource_call = mock_resource.call_args
        self.assertIn('attributes', resource_call[1])
        attributes = resource_call[1]['attributes']
        self.assertEqual(attributes['service.name'], 'test_service')
        self.assertEqual(attributes['service.version'], '1.0.0')

        # Verify OTLP exporter was configured with correct endpoint
        mock_otlp_exporter.assert_called_once_with(
            endpoint='http://collector:4317',
            insecure=True
        )

        # Verify logging instrumentation was set up
        mock_instrumentor_instance.instrument.assert_called_once()

        # Verify log handler was set up with resource and endpoint
        mock_log_handler.setup.assert_called_once_with(
            resource=mock_resource_instance,
            otlp_endpoint='http://collector:4317'
        )

    @patch('rest_api.rest_api_server.otel_config.OTelLogHandler')
    @patch('rest_api.rest_api_server.otel_config.trace')
    def test_full_shutdown_flow(self, mock_trace, mock_log_handler):
        OTelConfig._enabled = True
        mock_provider = MagicMock()
        mock_trace.get_tracer_provider.return_value = mock_provider

        OTelConfig.shutdown()

        # Verify log handler is shut down first
        mock_log_handler.shutdown.assert_called_once()
        # Verify tracer provider is shut down after
        mock_provider.shutdown.assert_called_once()

        # Verify shutdown order (log handler before tracer)
        self.assertEqual(len(mock_log_handler.method_calls), 1)
        self.assertEqual(mock_log_handler.method_calls[0][0], 'shutdown')

    def test_idempotent_initialization(self):
        # First initialization (disabled)
        result1 = OTelConfig.initialize()
        self.assertFalse(result1)
        self.assertTrue(OTelConfig._initialized)

        # Second initialization should return same result without doing work
        result2 = OTelConfig.initialize()
        self.assertFalse(result2)
        self.assertTrue(OTelConfig._initialized)

    @patch('rest_api.rest_api_server.otel_config.OTelLogHandler')
    @patch('rest_api.rest_api_server.otel_config.LoggingInstrumentor')
    @patch('rest_api.rest_api_server.otel_config.trace')
    @patch('rest_api.rest_api_server.otel_config.BatchSpanProcessor')
    @patch('rest_api.rest_api_server.otel_config.OTLPSpanExporter')
    @patch('rest_api.rest_api_server.otel_config.TracerProvider')
    @patch('rest_api.rest_api_server.otel_config.Resource')
    def test_environment_variable_precedence(self, mock_resource, mock_tracer_provider,
                                             mock_otlp_exporter, mock_batch_processor,
                                             mock_trace, mock_logging_instrumentor,
                                             mock_log_handler):
        custom_config = {
            'OTEL_ENABLED': 'true',
            'OTEL_EXPORTER_OTLP_ENDPOINT': 'http://custom-collector:9999',
            'OTEL_SERVICE_NAME': 'custom_service',
            'OTEL_SERVICE_VERSION': '2.3.4'
        }

        for key, value in custom_config.items():
            os.environ[key] = value

        # Mock instances
        mock_resource_instance = MagicMock()
        mock_resource.return_value = mock_resource_instance
        mock_provider_instance = MagicMock()
        mock_tracer_provider.return_value = mock_provider_instance
        mock_exporter_instance = MagicMock()
        mock_otlp_exporter.return_value = mock_exporter_instance

        OTelConfig.initialize()

        # Verify custom values were used
        resource_attrs = mock_resource.call_args[1]['attributes']
        self.assertEqual(resource_attrs['service.name'], 'custom_service')
        self.assertEqual(resource_attrs['service.version'], '2.3.4')
        self.assertEqual(
            mock_otlp_exporter.call_args[1]['endpoint'],
            'http://custom-collector:9999'
        )

    def test_disabled_by_default_no_side_effects(self):
        with patch('rest_api.rest_api_server.otel_config.TracerProvider') as mock_tracer:
            result = OTelConfig.initialize()

            self.assertFalse(result)
            self.assertTrue(OTelConfig._initialized)
            self.assertFalse(OTelConfig._enabled)
            # Verify no tracer provider was created
            mock_tracer.assert_not_called()

    @patch('rest_api.rest_api_server.otel_config.OTelLogHandler')
    @patch('rest_api.rest_api_server.otel_config.LoggingInstrumentor')
    @patch('rest_api.rest_api_server.otel_config.trace')
    @patch('rest_api.rest_api_server.otel_config.BatchSpanProcessor')
    @patch('rest_api.rest_api_server.otel_config.OTLPSpanExporter')
    @patch('rest_api.rest_api_server.otel_config.TracerProvider')
    @patch('rest_api.rest_api_server.otel_config.Resource')
    def test_log_handler_receives_resource(self, mock_resource, mock_tracer_provider,
                                           mock_otlp_exporter, mock_batch_processor,
                                           mock_trace, mock_logging_instrumentor,
                                           mock_log_handler):
        os.environ['OTEL_ENABLED'] = 'true'

        mock_resource_instance = MagicMock()
        mock_resource.return_value = mock_resource_instance
        mock_provider_instance = MagicMock()
        mock_tracer_provider.return_value = mock_provider_instance

        OTelConfig.initialize()

        # Verify log handler setup was called with the resource
        mock_log_handler.setup.assert_called_once()
        call_kwargs = mock_log_handler.setup.call_args[1]
        self.assertEqual(call_kwargs['resource'], mock_resource_instance)


class TestOTelLoggingCapture(unittest.TestCase):

    def setUp(self):
        self.test_logger = logging.getLogger('test_otel')
        self.test_logger.setLevel(logging.DEBUG)

    def test_log_levels_configuration(self):
        module_prefix = 'rest_api.rest_api_server.otel_log_handler'
        # This test verifies the configuration allows all levels
        with patch('rest_api.rest_api_server.otel_log_handler.LoggingHandler') as mock_handler:
            mock_handler_instance = MagicMock()
            mock_handler.return_value = mock_handler_instance

            with patch(f'{module_prefix}.LoggerProvider'):
                with patch(f'{module_prefix}.OTLPLogExporter'):
                    with patch(f'{module_prefix}.BatchLogRecordProcessor'):
                        with patch(f'{module_prefix}.set_logger_provider'):
                            with patch(f'{module_prefix}.logging.getLogger') as mock_get_logger:
                                mock_root = MagicMock()
                                mock_get_logger.return_value = mock_root

                                mock_resource = MagicMock()
                                OTelLogHandler.setup(mock_resource, 'http://test:4317')

                                # Verify handler was created with NOTSET level
                                handler_call = mock_handler.call_args
                                self.assertEqual(handler_call[1]['level'], logging.NOTSET)


if __name__ == '__main__':
    unittest.main()
