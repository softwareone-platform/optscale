# from app.conf import Settings
from config_client.client import Client as ConfigClient


def load_etcd_config(settings):
    config_client = ConfigClient(host=settings.etcd_host, port=settings.etcd_port)

    # load mysql params from etcd
    user, password, host, db = config_client.rest_db_params()
    settings.mysql_user = user
    settings.mysql_password = password
    settings.mysql_host = host
    settings.mysql_db = db

    settings.cluster_secret = config_client.cluster_secret()
    _, _, _, auth_db = config_client.auth_db_params()
    settings.auth_db = auth_db

    required = [
        settings.mysql_host,
        settings.mysql_port,
        settings.mysql_user,
        settings.mysql_password,
        settings.mysql_db,
        settings.cluster_secret,
        settings.auth_db,
    ]

    if any(v is None for v in required):
        raise RuntimeError("Configuration not fully loaded from ETCD")
