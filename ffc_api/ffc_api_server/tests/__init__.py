import os

from ffc_api.ffc_api_server.app.services import config_loader

FFC_DB_SCHEMA = "ffc_test"
OPTSCALE_DB_SCHEMA = "restapi_test"
AUTH_DB_SCHEMA = "auth_test"

TEST_CLUSTER_SECRET = "test_cluster_secret"  # noqa: S105
TEST_AUTH_URL = "http://auth.test:8080"
TEST_REST_API_URL = "http://rest-api.test:8080"
TEST_MONGO_URL = "mongodb://mongo.test:27017"

os.environ.setdefault("FFC_API_DB_NAME", FFC_DB_SCHEMA)
os.environ.setdefault("FFC_API_ETCD_HOST", "etcd.test")
os.environ.setdefault("FFC_API_ETCD_PORT", "2379")


class FakeConfigClient:
    """Replaces `optscale_client.config_client.client.Client`.

    Returns fixed values in the same way the real client does, so the etcd
    loader populates the settings without any network access.
    """

    def __init__(self, host: str | None = None, port: int | None = None, **kwargs):
        self.host = host
        self.port = port

    def rest_db_params(self) -> tuple[str, str, str, str]:
        return ("user", "password", "mysql.test", OPTSCALE_DB_SCHEMA)

    def auth_db_params(self) -> tuple[str, str, str, str]:
        return ("user", "password", "mysql.test", AUTH_DB_SCHEMA)

    def clickhouse_params(self) -> tuple[str, str, str, str, int, bool]:
        return ("user", "password", "clickhouse.test", "clickhouse_test", 9000, False)

    def mongo_params(self) -> tuple[str]:
        return (TEST_MONGO_URL,)

    def cluster_secret(self) -> str:
        return TEST_CLUSTER_SECRET

    def auth_url(self) -> str:
        return TEST_AUTH_URL

    def restapi_url(self) -> str:
        return TEST_REST_API_URL


config_loader.ConfigClient = FakeConfigClient
