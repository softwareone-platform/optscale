import pathlib
from urllib.parse import quote

from dynaconf import Dynaconf

PROJECT_ROOT = pathlib.Path(__file__).parent.parent.parent

settings = Dynaconf(
    envvar_prefix="FFC_API",
    load_dotenv=True,
    dotenv_path=str(PROJECT_ROOT / ".env"),
    LOADERS_FOR_DYNACONF=[
        "dynaconf.loaders.env_loader",
        "ffc_api.ffc_api_server.app.services.config_loader",
    ],
    DEBUG=False,
    MYSQL_DB="my-db",
    MYSQL_USER="user",
    MYSQL_PASSWORD="password",
    MYSQL_HOST="mysql.database.azure.com",
    MYSQL_PORT=3306,
    AUTH_DB="auth-db",
    AUTH_URL="http://auth.service:8080",
    CLUSTER_SECRET="secret",
    CLICKHOUSE_HOST="clickhouse.database.azure.com",
    CLICKHOUSE_PORT=9000,
    CLICKHOUSE_USER="user",
    CLICKHOUSE_PASSWORD="password",
    CLICKHOUSE_DB="clickhouse-db",
    CLICKHOUSE_SECURE=False,
    MONGO_URL="mongodb://mongo:27017",
)


def mysql_async_url() -> str:
    return (
        f"mysql+asyncmy://{settings.mysql_user}:{quote(settings.mysql_password)}"
        f"@{settings.mysql_host}:{settings.mysql_port}/{settings.mysql_db}"
    )


def mysql_async_url_ffc() -> str:
    return (
        f"mysql+asyncmy://{settings.mysql_user}:{quote(settings.mysql_password)}"
        f"@{settings.mysql_host}:{settings.mysql_port}/{settings.db_name}"
    )


def get_settings():
    return settings
