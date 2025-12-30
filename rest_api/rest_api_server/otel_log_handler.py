import logging
from typing import Optional

from opentelemetry._logs import set_logger_provider
from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.sdk.resources import Resource

LOG = logging.getLogger(__name__)


class OTelLogHandler:
    _log_handler: Optional[LoggingHandler] = None
    _logger_provider: Optional[LoggerProvider] = None

    @classmethod
    def setup(cls, resource: Resource, otlp_endpoint: str) -> bool:
        try:
            cls._logger_provider = LoggerProvider(resource=resource)
            set_logger_provider(cls._logger_provider)

            log_exporter = OTLPLogExporter(
                endpoint=otlp_endpoint,
                insecure=True
            )

            cls._logger_provider.add_log_record_processor(
                BatchLogRecordProcessor(log_exporter)
            )

            cls._log_handler = LoggingHandler(
                level=logging.NOTSET,  # Capture all log levels
                logger_provider=cls._logger_provider
            )

            root_logger = logging.getLogger()
            root_logger.addHandler(cls._log_handler)

            LOG.info("OpenTelemetry log handler configured successfully")
            return True

        except Exception as exc:  # pylint: disable=W0718
            LOG.exception("Failed to setup OpenTelemetry log handler: %s", exc)
            return False

    @classmethod
    def shutdown(cls):
        if cls._log_handler:
            try:
                root_logger = logging.getLogger()
                root_logger.removeHandler(cls._log_handler)

                if cls._logger_provider:
                    cls._logger_provider.shutdown()

                LOG.info("OpenTelemetry log handler shutdown complete")
            except Exception as exc:
                LOG.exception("Error during log handler shutdown: %s", exc)
