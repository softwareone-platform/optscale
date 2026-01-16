import datetime
import enum
import functools
import logging
import os

from opentelemetry import trace
from opentelemetry._events import set_event_logger_provider
from opentelemetry._logs import set_logger_provider
from opentelemetry.sdk._events import EventLoggerProvider
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import (BatchLogRecordProcessor,
                                            ConsoleLogExporter)
from opentelemetry.sdk.resources import SERVICE_NAME, SERVICE_VERSION, Resource
from opentelemetry.sdk.trace import Span, TracerProvider
from opentelemetry.sdk.trace.export import (BatchSpanProcessor,
                                            ConsoleSpanExporter)

LOG = logging.getLogger(__name__)


class OpenTelemetryExporter(str, enum.Enum):
    CONSOLE = "console"
    OTLP = "otlp"

    @classmethod
    def from_env(cls) -> 'OpenTelemetryExporter':
        exporter_str = os.environ.get('OTEL_EXPORTER', 'console').lower()

        try:
            return cls(exporter_str)
        except ValueError:
            LOG.warning("Invalid OTEL_EXPORTER value: %s, defaulting to CONSOLE", exporter_str)
            return cls.CONSOLE


class OTLPProtocol(str, enum.Enum):
    GRPC = "grpc"
    HTTP = "http"


def only_if_enabled(method):
    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        if not self.is_enabled():
            LOG.info("OpenTelemetry is disabled via OTEL_ENABLED environment variable.")
            return

        return method(self, *args, **kwargs)

    return wrapper


class OpenTelemetryConfig:
    service_name: str
    service_version: str
    otel_exporter: OpenTelemetryExporter
    otlp_endpoint: str | None

    def __init__(
        self,
        *,
        service_name: str | None = None,
        service_version: str | None = None,
        otel_exporter: OpenTelemetryExporter | None = None,
        otlp_protocol: OTLPProtocol | None = None,
        otlp_endpoint: str | None = None,
    ):
        self.service_name = service_name or os.environ.get('OTEL_SERVICE_NAME')
        self.service_version = service_version or os.environ.get('OTEL_SERVICE_VERSION')
        self.otel_exporter = otel_exporter or OpenTelemetryExporter.from_env()
        self.otlp_protocol = otlp_protocol or OTLPProtocol(os.environ.get('OTEL_OTLP_PROTOCOL'))
        self.otlp_endpoint = otlp_endpoint or os.environ.get('OTEL_EXPORTER_OTLP_ENDPOINT')
        self.logger_provider: LoggerProvider | None = None

    @property
    def otlp_traces_endpoint(self) -> str | None:
        if not self.otlp_endpoint:
            return None

        if self.otlp_protocol == OTLPProtocol.GRPC:
            return self.otlp_endpoint

        return self.otlp_endpoint.removesuffix('/') + '/v1/traces'

    @property
    def otlp_logs_endpoint(self) -> str | None:
        if not self.otlp_endpoint:
            return None

        if self.otlp_protocol == OTLPProtocol.GRPC:
            return self.otlp_endpoint

        return self.otlp_endpoint.removesuffix('/') + '/v1/logs'

    @classmethod
    def is_enabled(cls) -> bool:
        return os.environ.get('OTEL_ENABLED', '0').lower() in ('true', '1', 'yes')

    @only_if_enabled
    def setup_open_telemetry(self):
        resource = Resource(attributes={
            SERVICE_NAME: self.service_name,
            SERVICE_VERSION: self.service_version,
        })

        self.setup_tracing(resource)
        self.setup_logging(resource)

    def setup_tracing(self, resource: Resource):
        tracer_provider = TracerProvider(resource=resource)

        if self.otel_exporter == OpenTelemetryExporter.OTLP and self.otlp_protocol == OTLPProtocol.HTTP:
            from opentelemetry.exporter.otlp.proto.http.trace_exporter import \
                OTLPSpanExporter

            LOG.info("Configuring HTTP OTLP Span Exporter with endpoint: %s", self.otlp_traces_endpoint)
            span_exporter = OTLPSpanExporter(endpoint=self.otlp_traces_endpoint)
        elif self.otel_exporter == OpenTelemetryExporter.OTLP and self.otlp_protocol == OTLPProtocol.GRPC:
            from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import \
                OTLPSpanExporter

            LOG.info("Configuring gRPC OTLP Span Exporter with endpoint: %s", self.otlp_traces_endpoint)
            span_exporter = OTLPSpanExporter(endpoint=self.otlp_traces_endpoint)
        else:
            LOG.info("Configuring ConsoleSpanExporter")
            span_exporter = ConsoleSpanExporter()

        span_processor = BatchSpanProcessor(span_exporter)
        tracer_provider.add_span_processor(span_processor)

        trace.set_tracer_provider(tracer_provider)

    def setup_logging(self, resource: Resource):
        self.logger_provider = LoggerProvider(resource=resource)
        set_logger_provider(self.logger_provider)

        if self.otel_exporter == OpenTelemetryExporter.OTLP and self.otlp_protocol == OTLPProtocol.HTTP:
            from opentelemetry.exporter.otlp.proto.http._log_exporter import \
                OTLPLogExporter

            LOG.info("Configuring HTTP OTLP Log Exporter with endpoint: %s", self.otlp_logs_endpoint)
            log_exporter = OTLPLogExporter(endpoint=self.otlp_logs_endpoint)
        elif self.otel_exporter == OpenTelemetryExporter.OTLP and self.otlp_protocol == OTLPProtocol.GRPC:
            from opentelemetry.exporter.otlp.proto.grpc._log_exporter import \
                OTLPLogExporter
            LOG.info("Configuring gRPC OTLP Log Exporter with endpoint: %s", self.otlp_logs_endpoint)

            log_exporter = OTLPLogExporter(endpoint=self.otlp_logs_endpoint)
        else:
            LOG.info("Configuring ConsoleLogExporter")
            log_exporter = ConsoleLogExporter()

        log_processor = BatchLogRecordProcessor(log_exporter)
        self.logger_provider.add_log_record_processor(log_processor)

        log_handler = LoggingHandler(
            level=logging.NOTSET,
            logger_provider=self.logger_provider
        )

        root_logger = logging.getLogger()
        root_logger.addHandler(log_handler)
        root_logger.setLevel(logging.NOTSET)

        event_logger_provider = EventLoggerProvider(logger_provider=self.logger_provider)
        set_event_logger_provider(event_logger_provider)

    def shutdown(self):
        if not self.is_enabled():
            return

        tracer_provider = trace.get_tracer_provider()
        if hasattr(tracer_provider, 'shutdown'):
            tracer_provider.shutdown()
            LOG.info("OpenTelemetry tracer provider shutdown complete")

        if self.logger_provider and hasattr(self.logger_provider, 'shutdown'):
            self.logger_provider.shutdown()
            LOG.info("OpenTelemetry logger provider shutdown complete")

    @only_if_enabled
    def instrument_asyncio(self):
        from opentelemetry.instrumentation.asyncio import AsyncioInstrumentor

        AsyncioInstrumentor().instrument()

    @only_if_enabled
    def instrument_logging(self):
        from opentelemetry.instrumentation.logging import LoggingInstrumentor

        def log_hook(span: Span | None, log_record: logging.LogRecord):
            if span is None:
                return

            if log_record.exc_info:
                span.record_exception(log_record.exc_info)
            else:
                log_dt = datetime.datetime.fromtimestamp(log_record.created)
                log_dict = {
                    "message": log_record.getMessage(),
                    "logger": log_record.name,
                    "severity": log_record.levelname,
                    "timestamp": log_dt.isoformat(),
                    "thread": log_record.thread,
                    "thread_name": log_record.threadName,
                    "process": log_record.process,
                    "process_name": log_record.processName,
                    "path": log_record.pathname,
                    "lineno": log_record.lineno,
                    "func_name": log_record.funcName,
                }

                if getattr(log_record, 'taskName', None):
                    log_dict["task_name"] = log_record.taskName

                for key, value in getattr(log_record, "extra", {}).items():
                    if value is not None:
                        log_dict[key] = value

                span.add_event("log", log_dict)

        LoggingInstrumentor().instrument(
            set_logging_format=True,
            log_level=logging.NOTSET,
            log_hook=log_hook,
        )

    @only_if_enabled
    def instrument_tornado(self):
        from opentelemetry.instrumentation.tornado import TornadoInstrumentor

        TornadoInstrumentor().instrument()

    @only_if_enabled
    def instrument_threading(self):
        from opentelemetry.instrumentation.threading import \
            ThreadingInstrumentor

        ThreadingInstrumentor().instrument()

    @only_if_enabled
    def instrument_sqlalchemy(self, engine):
        from opentelemetry.instrumentation.sqlalchemy import \
            SQLAlchemyInstrumentor

        if os.environ.get('OTEL_SQLALCHEMY_ENABLED', '0').lower() not in ('true', '1', 'yes'):
            LOG.info("SQLAlchemy instrumentation is disabled.")
            return

        SQLAlchemyInstrumentor().instrument(engine=engine, enable_commenter=True)
