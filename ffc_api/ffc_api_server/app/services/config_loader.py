from optscale_client.config_client.client import Client as ConfigClient

IDENTIFIER = "etcd_loader"


def load(obj, env=None, silent=True, key=None, filename=None):
    etcd_host = obj.get("ETCD_HOST")
    etcd_port = obj.get("ETCD_PORT")

    if not etcd_host or not etcd_port:
        raise RuntimeError("ETCD_HOST / ETCD_PORT not set before etcd loader runs")

    config_client = ConfigClient(host=etcd_host, port=int(etcd_port))

    user, password, host, db = config_client.rest_db_params()

    _, _, _, auth_db = config_client.auth_db_params()

    c_user, c_password, c_host, c_db_name, c_port, c_secure = config_client.clickhouse_params()

    data = {
        "MYSQL_USER": user,
        "MYSQL_PASSWORD": password,
        "MYSQL_HOST": host,
        "MYSQL_DB": db,
        "CLUSTER_SECRET": config_client.cluster_secret(),
        "AUTH_URL": config_client.auth_url(),
        "AUTH_DB": auth_db,
        "CLICKHOUSE_USER": c_user,
        "CLICKHOUSE_PASSWORD": c_password,
        "CLICKHOUSE_HOST": c_host,
        "CLICKHOUSE_DB": c_db_name,
        "CLICKHOUSE_PORT": c_port,
        "CLICKHOUSE_SECURE": c_secure,
        "MONGO_URL": config_client.mongo_params()[0],
    }

    if any(v is None for v in data.values()):
        raise RuntimeError("Configuration not fully loaded from ETCD")

    obj.update(data, loader_identifier=IDENTIFIER)


def write(*args, **kwargs):
    # required by the loader protocol but not needed for this loader since it's read-only
    raise NotImplementedError
