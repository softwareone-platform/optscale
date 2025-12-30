import logging
import os
from typing import Optional

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.logging import LoggingInstrumentor
from opentelemetry.sdk.resources import SERVICE_NAME, SERVICE_VERSION, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

from rest_api.rest_api_server.otel_log_handler import OTelLogHandler

LOG = logging.getLogger(__name__)


class OTelConfig:
    _initialized = False
    _enabled = False

    @classmethod
    def is_enabled(cls) -> bool:
        return os.environ.get('OTEL_ENABLED', '').lower() in ('true', '1', 'yes')

    @classmethod
    def get_otlp_endpoint(cls) -> str:
        return os.environ.get('OTEL_EXPORTER_OTLP_ENDPOINT', 'http://localhost:4317')

    @classmethod
    def get_service_name(cls) -> str:
        return os.environ.get('OTEL_SERVICE_NAME', 'rest_api')

    @classmethod
    def get_service_version(cls) -> Optional[str]:
        return os.environ.get('OTEL_SERVICE_VERSION', '0.1.0')

    @classmethod
    def initialize(cls) -> bool:
        if cls._initialized:
            LOG.info("OpenTelemetry already initialized")
            return cls._enabled

        cls._initialized = True

        if not cls.is_enabled():
            LOG.info("OpenTelemetry is disabled (OTEL_ENABLED not set to true)")
            cls._enabled = False
            return False

        try:
            resource = Resource(attributes={
                SERVICE_NAME: cls.get_service_name(),
                SERVICE_VERSION: cls.get_service_version(),
            })

            tracer_provider = TracerProvider(resource=resource)

            otlp_endpoint = cls.get_otlp_endpoint()
            otlp_exporter = OTLPSpanExporter(
                endpoint=otlp_endpoint,
                insecure=True,
            )

            span_processor = BatchSpanProcessor(otlp_exporter)
            tracer_provider.add_span_processor(span_processor)

            trace.set_tracer_provider(tracer_provider)

            LoggingInstrumentor().instrument(
                set_logging_format=False,
                log_level=logging.INFO
            )

            OTelLogHandler.setup(resource=resource, otlp_endpoint=otlp_endpoint)

            cls._enabled = True
            LOG.info(
                "OpenTelemetry initialized successfully. Service: %s, Endpoint: %s",
                cls.get_service_name(),
                otlp_endpoint
            )
            return True

        except Exception as exc:  # pylint: disable=W0718
            LOG.exception("Failed to initialize OpenTelemetry: %s", exc)
            cls._enabled = False
            return False

    @classmethod
    def shutdown(cls):
        if cls._enabled:
            try:
                OTelLogHandler.shutdown()

                tracer_provider = trace.get_tracer_provider()
                if hasattr(tracer_provider, 'shutdown'):
                    tracer_provider.shutdown()

                LOG.info("OpenTelemetry shutdown complete")
            except Exception as exc:  # pylint: disable=W0718
                LOG.exception("Error during OpenTelemetry shutdown: %s", exc)
