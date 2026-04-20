from optscale_client.config_client.client import Client as ConfigClient


def load_etcd_config(settings):
    config_client = ConfigClient(host=settings.etcd_host, port=settings.etcd_port)

    # load mysql params from etcd
    user, password, host, db = config_client.rest_db_params()
    settings.mysql_user = user
    settings.mysql_password = password
    settings.mysql_host = host
    settings.mysql_db = db

    settings.cluster_secret = config_client.cluster_secret()

    settings.auth_url = config_client.auth_url()

    _, _, _, auth_db = config_client.auth_db_params()
    settings.auth_db = auth_db

    # load clickhouse params from etcd
    user, password, host, db_name, port, secure = config_client.clickhouse_params()
    settings.clickhouse_user = user
    settings.clickhouse_password = password
    settings.clickhouse_host = host
    settings.clickhouse_db = db_name
    settings.clickhouse_port = port
    settings.clickhouse_secure = secure

    # load mongo params from etcd
    settings.mongo_url = config_client.mongo_params()[0]

    required = [
        settings.mysql_host,
        settings.mysql_port,
        settings.mysql_user,
        settings.mysql_password,
        settings.mysql_db,
        settings.cluster_secret,
        settings.auth_url,
        settings.auth_db,
        settings.clickhouse_user,
        settings.clickhouse_password,
        settings.clickhouse_host,
        settings.clickhouse_db,
        settings.clickhouse_port,
        settings.clickhouse_secure,
        settings.mongo_url,
    ]

    if any(v is None for v in required):
        raise RuntimeError("Configuration not fully loaded from ETCD")
