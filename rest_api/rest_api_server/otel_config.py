import atexit
import enum
import logging
import os
from typing import Any

import optscale_client.config_client.client

from opentelemetry import trace
from opentelemetry.instrumentation.urllib3 import RequestInfo
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.sdk.resources import SERVICE_NAME, SERVICE_VERSION, Resource
from opentelemetry.sdk.trace import Span, TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
from urllib3.connectionpool import HTTPConnectionPool


LOG = logging.getLogger(__name__)


class OTELException(Exception):
    pass


class OpenTelemetryExporter(str, enum.Enum):
    CONSOLE = "console"
    OTLP = "otlp"
    AZURE_MONITOR = "azure_monitor"

    @classmethod
    def from_env(cls) -> 'OpenTelemetryExporter':
        exporter_str = os.environ.get('OTEL_EXPORTER', 'console').lower()

        try:
            return cls(exporter_str)
        except ValueError:
            LOG.warning("Invalid OTEL_EXPORTER value: %s, defaulting to CONSOLE", exporter_str)
            return cls.CONSOLE


class OpenTelemetryConfig:
    service_name: str
    service_version: str
    otel_exporter: OpenTelemetryExporter
    params: dict[str, Any]

    def __init__(
        self,
        *,
        service_name: str | None = None,
        service_version: str | None = None,
        otel_exporter: OpenTelemetryExporter | None = None,
    ):
        self.service_name = service_name or os.environ.get('OTEL_SERVICE_NAME')
        self.service_version = service_version or os.environ.get('OTEL_SERVICE_VERSION')
        self.otel_exporter = otel_exporter or OpenTelemetryExporter.from_env()

    @classmethod
    def is_enabled(cls) -> bool:
        return os.environ.get('OTEL_ENABLED', '0').lower() in ('true', '1', 'yes')

    def setup_open_telemetry(self, etcd_host, etcd_port, wait=True):
        resource = Resource(attributes={
            SERVICE_NAME: self.service_name,
            SERVICE_VERSION: self.service_version,
        })

        config_cl = optscale_client.config_client.client.Client(
            host=etcd_host,
            port=etcd_port,
        )
        if wait:
            config_cl.wait_configured()
        self.params = config_cl.read_branch('/opentelemetry')

        self.setup_tracing(resource)

    def setup_tracing(self, resource: Resource):
        tracer_provider = TracerProvider(resource=resource)

        if self.otel_exporter == OpenTelemetryExporter.OTLP:
            from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

            tempo_host = self.params.get('tempo_host')
            tempo_port = self.params.get('tempo_port')
            if not (tempo_host and tempo_port):
                raise OTELException("OTLP tempo exporter is misconfigured")

            span_exporter = OTLPSpanExporter(endpoint=f"http://{tempo_host}:{tempo_port}")
            LOG.info("Configured gRPC OTLP Span Exporter")

        elif self.otel_exporter == OpenTelemetryExporter.AZURE_MONITOR:
            from azure.monitor.opentelemetry.exporter import AzureMonitorTraceExporter

            connection_string = self.params.get('connection_string')
            if not connection_string:
                raise OTELException("Azure Monitor exporter is misconfigured")

            span_exporter = AzureMonitorTraceExporter(connection_string=connection_string)
            LOG.info("Configured Azure Monitor Exporter with endpoint")

        else:
            span_exporter = ConsoleSpanExporter()
            LOG.info("Configured ConsoleSpanExporter")

        span_processor = BatchSpanProcessor(span_exporter)
        tracer_provider.add_span_processor(span_processor)

        trace.set_tracer_provider(tracer_provider)

    def shutdown(self):
        if not self.is_enabled():
            return

        tracer_provider = trace.get_tracer_provider()
        if hasattr(tracer_provider, 'shutdown'):
            tracer_provider.shutdown()
            LOG.info("OpenTelemetry tracer provider shutdown complete")

    def instrument_asyncio(self):
        if self.params.get('enable_future_traces') not in ('true', '1'):
            return

        from opentelemetry.instrumentation.asyncio import AsyncioInstrumentor

        AsyncioInstrumentor().instrument()

    def instrument_mongo(self):
        from opentelemetry.instrumentation.pymongo import PymongoInstrumentor

        capture_statement = self.params.get('enable_mongo_statements') in ('true', '1')
        PymongoInstrumentor().instrument(capture_statement=capture_statement)

    def instrument_requests(self):
        from opentelemetry.instrumentation.requests import RequestsInstrumentor

        RequestsInstrumentor().instrument()

    def instrument_sqlalchemy(self, engine):
        if self.params.get('enable_sqlalchemy') not in ('true', '1'):
            return

        from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor

        SQLAlchemyInstrumentor().instrument(engine=engine, enable_commenter=True)

    def instrument_threading(self):
        from opentelemetry.instrumentation.threading import ThreadingInstrumentor

        ThreadingInstrumentor().instrument()

    def instrument_tornado(self):
        from opentelemetry.instrumentation.tornado import TornadoInstrumentor

        TornadoInstrumentor().instrument()

    def instrument_urllib3(self):
        from opentelemetry.instrumentation.urllib3 import URLLib3Instrumentor

        def urllib3_request_hook(
            span: Span,
            pool: HTTPConnectionPool,
            request_info: RequestInfo,
        ) -> Any:
            if not span or not span.is_recording():
                return

            url = request_info.url.lower()

            if "clickhouse" in url:
                span.set_attribute("peer.service", "clickhouse")
                span.set_attribute("db.system", "clickhouse")
                span.update_name("HTTP clickhouse")
                return

            if "etcd" in url:
                span.set_attribute("peer.service", "etcd")
                span.set_attribute("component", "etcd")
                span.update_name("HTTP etcd")
                return

        URLLib3Instrumentor().instrument(
            request_hook=urllib3_request_hook,
        )


def setup_otel_config(etcd_host, etcd_port, wait=True) -> OpenTelemetryConfig | None:
    otel_config = OpenTelemetryConfig()

    if otel_config.is_enabled():
        try:
            otel_config.setup_open_telemetry(etcd_host, etcd_port, wait)
        except OTELException as exc:
            LOG.error(exc)
            return None

        otel_config.instrument_threading()
        otel_config.instrument_asyncio()
        otel_config.instrument_tornado()
        otel_config.instrument_requests()
        otel_config.instrument_urllib3()
        otel_config.instrument_mongo()

        atexit.register(otel_config.shutdown)

    return otel_config
