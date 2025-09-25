import abc
import pathlib
from dataclasses import dataclass

from migrate.utils import PROJECT_ROOT


@dataclass
class BaseMigrator(abc.ABC):
    service_name: str
    db_host: str
    db_port: int
    db_username: str
    db_password: str
    db_name: str
    db_secure: bool = False

    @property
    def service_path(self) -> pathlib.Path:
        match self.service_name:
            case "risp_worker":
                return PROJECT_ROOT / "risp" / "risp_worker"
            case "metroculus_worker":
                return PROJECT_ROOT / "metroculus" / "metroculus_worker"
            case "gemini_worker":
                return PROJECT_ROOT / "gemini" / "gemini_worker"
            case "rest_api" | "restapi":
                return PROJECT_ROOT / "rest_api" / "rest_api_server"
            case "auth":
                return PROJECT_ROOT / "auth" / "auth_server"
            case "herald":
                return PROJECT_ROOT / "herald" / "herald_server"
            case "jira_bus" | "jira-bus":
                return PROJECT_ROOT / "jira_bus" / "jira_bus_server"
            case "katara":
                return PROJECT_ROOT / "katara" / "katara_service"
            case "slacker":
                return PROJECT_ROOT / "slacker" / "slacker_server"
            case "insider_worker":
                return PROJECT_ROOT / "insider" / "insider_worker"
            case "diworker":
                return PROJECT_ROOT / "diworker" / "diworker"
            case _:
                raise ValueError(f"Unknown service name: {self.service_name}")

    @abc.abstractmethod
    def generate_migration(self, name: str) -> None:
        """Generate a new migration file with the given name."""
        pass

    @abc.abstractmethod
    def migrate(self) -> None:
        """Apply all the pending migrations to the database."""
        pass
