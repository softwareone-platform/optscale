import pathlib
from urllib.parse import quote

from pydantic import MySQLDsn, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

from app.services.config_loader import load_etcd_config


PROJECT_ROOT = pathlib.Path(__file__).parent.parent


class Settings(BaseSettings):
    """
    Project settings loaded from environment variables
    """

    model_config = SettingsConfigDict(
        env_file=PROJECT_ROOT / ".env",
        env_file_encoding="utf-8",
        env_prefix="ffc_api_",
        extra="ignore",
    )

    etcd_host: str
    etcd_port: int

    db_name: str
    debug: bool = False

    mysql_db: str = "my-db"
    mysql_user: str = "user"
    mysql_password: str = "password"
    mysql_host: str = "mysql.database.azure.com"
    mysql_port: int = 3306
    cluster_secret: str = "secret"
    auth_db: str = "auth-db"

    @computed_field
    def mysql_async_url(self) -> MySQLDsn:
        return MySQLDsn.build(
            scheme="mysql+asyncmy",
            username=self.mysql_user,
            password=quote(self.mysql_password),
            host=self.mysql_host,
            port=self.mysql_port,
            path=self.mysql_db,
        )

    @computed_field
    def mysql_async_url_ffc(self) -> MySQLDsn:
        return MySQLDsn.build(
            scheme="mysql+asyncmy",
            username=self.mysql_user,
            password=quote(self.mysql_password),
            host=self.mysql_host,
            port=self.mysql_port,
            path=self.db_name,
        )

_settings = None


def get_settings() -> Settings:
    global _settings
    if not _settings:
        _settings = Settings()  # type: ignore[call-arg]
        load_etcd_config(_settings)
    return _settings
