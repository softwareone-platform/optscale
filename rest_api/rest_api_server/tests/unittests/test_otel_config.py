import os
import unittest
from unittest.mock import patch, MagicMock, call
import logging

from rest_api.rest_api_server.otel_config import OTelConfig


class TestOTelConfig(unittest.TestCase):
    """Unit tests for OpenTelemetry configuration."""

    def setUp(self):
        """Reset OTelConfig state before each test."""
        OTelConfig._initialized = False
        OTelConfig._enabled = False
        # Clear environment variables
        for key in ['OTEL_ENABLED', 'OTEL_EXPORTER_OTLP_ENDPOINT',
                    'OTEL_SERVICE_NAME', 'OTEL_SERVICE_VERSION']:
            os.environ.pop(key, None)

    def tearDown(self):
        """Clean up after each test."""
        OTelConfig._initialized = False
        OTelConfig._enabled = False
        for key in ['OTEL_ENABLED', 'OTEL_EXPORTER_OTLP_ENDPOINT',
                    'OTEL_SERVICE_NAME', 'OTEL_SERVICE_VERSION']:
            os.environ.pop(key, None)

    def test_is_enabled_default(self):
        """Test that OpenTelemetry is disabled by default."""
        self.assertFalse(OTelConfig.is_enabled())

    def test_is_enabled_true(self):
        """Test that OpenTelemetry can be enabled via environment variable."""
        test_cases = ['true', 'True', 'TRUE', '1', 'yes', 'YES']
        for value in test_cases:
            with self.subTest(value=value):
                os.environ['OTEL_ENABLED'] = value
                self.assertTrue(OTelConfig.is_enabled())
                os.environ.pop('OTEL_ENABLED')

    def test_is_enabled_false(self):
        """Test that invalid values don't enable OpenTelemetry."""
        test_cases = ['false', 'False', '0', 'no', 'random']
        for value in test_cases:
            with self.subTest(value=value):
                os.environ['OTEL_ENABLED'] = value
                self.assertFalse(OTelConfig.is_enabled())
                os.environ.pop('OTEL_ENABLED')

    def test_get_otlp_endpoint_default(self):
        """Test default OTLP endpoint."""
        endpoint = OTelConfig.get_otlp_endpoint()
        self.assertEqual(endpoint, 'http://localhost:4317')

    def test_get_otlp_endpoint_custom(self):
        """Test custom OTLP endpoint from environment."""
        custom_endpoint = 'http://otel-collector:4317'
        os.environ['OTEL_EXPORTER_OTLP_ENDPOINT'] = custom_endpoint
        endpoint = OTelConfig.get_otlp_endpoint()
        self.assertEqual(endpoint, custom_endpoint)

    def test_get_service_name_default(self):
        """Test default service name."""
        name = OTelConfig.get_service_name()
        self.assertEqual(name, 'rest_api')

    def test_get_service_name_custom(self):
        """Test custom service name from environment."""
        custom_name = 'my_rest_api'
        os.environ['OTEL_SERVICE_NAME'] = custom_name
        name = OTelConfig.get_service_name()
        self.assertEqual(name, custom_name)

    def test_get_service_version_default(self):
        """Test default service version."""
        version = OTelConfig.get_service_version()
        self.assertEqual(version, '0.1.0')

    def test_get_service_version_custom(self):
        """Test custom service version from environment."""
        custom_version = '1.2.3'
        os.environ['OTEL_SERVICE_VERSION'] = custom_version
        version = OTelConfig.get_service_version()
        self.assertEqual(version, custom_version)

    def test_initialize_when_disabled(self):
        """Test that initialization returns False when OTEL_ENABLED is not set."""
        result = OTelConfig.initialize()
        self.assertFalse(result)
        self.assertTrue(OTelConfig._initialized)
        self.assertFalse(OTelConfig._enabled)

    def test_initialize_already_initialized(self):
        """Test that subsequent initialization calls return cached state."""
        OTelConfig._initialized = True
        OTelConfig._enabled = True

        with patch('rest_api.rest_api_server.otel_config.trace') as mock_trace:
            result = OTelConfig.initialize()
            self.assertTrue(result)
            # Verify no setup was done
            mock_trace.set_tracer_provider.assert_not_called()

    @patch('rest_api.rest_api_server.otel_config.OTelLogHandler')
    @patch('rest_api.rest_api_server.otel_config.LoggingInstrumentor')
    @patch('rest_api.rest_api_server.otel_config.trace')
    @patch('rest_api.rest_api_server.otel_config.BatchSpanProcessor')
    @patch('rest_api.rest_api_server.otel_config.OTLPSpanExporter')
    @patch('rest_api.rest_api_server.otel_config.TracerProvider')
    @patch('rest_api.rest_api_server.otel_config.Resource')
    def test_initialize_success(self, mock_resource, mock_tracer_provider,
                                mock_otlp_exporter, mock_batch_processor,
                                mock_trace, mock_logging_instrumentor,
                                mock_log_handler):
        """Test successful OpenTelemetry initialization."""
        os.environ['OTEL_ENABLED'] = 'true'
        os.environ['OTEL_EXPORTER_OTLP_ENDPOINT'] = 'http://test:4317'

        # Mock the instances
        mock_provider_instance = MagicMock()
        mock_tracer_provider.return_value = mock_provider_instance
        mock_exporter_instance = MagicMock()
        mock_otlp_exporter.return_value = mock_exporter_instance
        mock_processor_instance = MagicMock()
        mock_batch_processor.return_value = mock_processor_instance
        mock_instrumentor_instance = MagicMock()
        mock_logging_instrumentor.return_value = mock_instrumentor_instance

        result = OTelConfig.initialize()

        # Verify initialization was successful
        self.assertTrue(result)
        self.assertTrue(OTelConfig._initialized)
        self.assertTrue(OTelConfig._enabled)

        # Verify all components were set up
        mock_resource.assert_called_once()
        mock_tracer_provider.assert_called_once()
        mock_otlp_exporter.assert_called_once_with(
            endpoint='http://test:4317',
            insecure=True
        )
        mock_batch_processor.assert_called_once_with(mock_exporter_instance)
        mock_provider_instance.add_span_processor.assert_called_once_with(
            mock_processor_instance
        )
        mock_trace.set_tracer_provider.assert_called_once_with(
            mock_provider_instance
        )
        mock_instrumentor_instance.instrument.assert_called_once()
        mock_log_handler.setup.assert_called_once()

    @patch('rest_api.rest_api_server.otel_config.TracerProvider')
    def test_initialize_exception_handling(self, mock_tracer_provider):
        """Test that initialization handles exceptions gracefully."""
        os.environ['OTEL_ENABLED'] = 'true'
        mock_tracer_provider.side_effect = Exception("Test error")

        result = OTelConfig.initialize()

        # Verify initialization failed gracefully
        self.assertFalse(result)
        self.assertTrue(OTelConfig._initialized)
        self.assertFalse(OTelConfig._enabled)

    @patch('rest_api.rest_api_server.otel_config.trace')
    def test_shutdown_when_enabled(self, mock_trace):
        """Test shutdown when OpenTelemetry is enabled."""
        OTelConfig._enabled = True
        mock_provider = MagicMock()
        mock_trace.get_tracer_provider.return_value = mock_provider

        with patch('rest_api.rest_api_server.otel_config.OTelLogHandler') as mock_log_handler:
            OTelConfig.shutdown()

            mock_log_handler.shutdown.assert_called_once()
            mock_trace.get_tracer_provider.assert_called_once()
            mock_provider.shutdown.assert_called_once()

    @patch('rest_api.rest_api_server.otel_config.trace')
    def test_shutdown_when_disabled(self, mock_trace):
        """Test shutdown when OpenTelemetry is disabled."""
        OTelConfig._enabled = False

        OTelConfig.shutdown()

        # Verify shutdown was not called
        mock_trace.get_tracer_provider.assert_not_called()

    @patch('rest_api.rest_api_server.otel_config.trace')
    def test_shutdown_exception_handling(self, mock_trace):
        """Test that shutdown handles exceptions gracefully."""
        OTelConfig._enabled = True
        mock_trace.get_tracer_provider.side_effect = Exception("Test error")

        # Should not raise exception
        try:
            OTelConfig.shutdown()
        except Exception:
            self.fail("shutdown() raised Exception unexpectedly")


if __name__ == '__main__':
    unittest.main()
