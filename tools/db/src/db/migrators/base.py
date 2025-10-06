import abc
import pathlib

from optscale_client.config_client.client import Client as ConfigClient


class BaseMigrator(abc.ABC):
    service_path: pathlib.Path
    config_client: ConfigClient

    def __init__(self, service_path: pathlib.Path, config_client: ConfigClient) -> None:
        self.service_path = service_path
        self.config_client = config_client

    @abc.abstractmethod
    def migrate(self) -> None:
        """Apply all the pending migrations to the database."""
        pass
