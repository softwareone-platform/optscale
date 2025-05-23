import logging
import os
import sys
import time
from retrying import retry

import pika
import pika.exceptions
import yaml
import etcd
import boto3
from boto3.session import Config as BotoConfig
from sqlalchemy import create_engine
from sqlalchemy import text
from pymongo import MongoClient
from influxdb import InfluxDBClient
from optscale_client.config_client.client import Client as EtcdClient

LOG = logging.getLogger(__name__)

ETCD_KEYS_TO_DELETE = ['/logstash_host', '/optscale_meter_enabled']
RETRY_ARGS = dict(stop_max_attempt_number=300, wait_fixed=500)
RABBIT_PRECONDIFITON_FAILED_CODE = 406

CH_HTTP_PORT = 8123
CH_LOCAL_NAME = "clickhouse"


class Configurator(object):
    def __init__(self, config_path='config.yml', host='etcd', port=2379):
        LOG.info("INIT CONFIGURATOR")
        self.config = yaml.safe_load(open(config_path, 'r'))
        self.etcd_cl = EtcdClient(host=host, port=port)
        config = self.config['etcd']

        conn_str = 'mysql+mysqlconnector://{user}:{password}@{host}:{port}'
        self.engine = create_engine(conn_str.format(
            user=config['restdb']['user'],
            password=config['restdb']['password'],
            host=config['restdb']['host'],
            port=config['restdb']['port']),
            connect_args={"connect_timeout": 5}
        )
        if "url" in config["mongo"]:
            mongo_url = config["mongo"]["url"]
        else:
            mongo_url = "mongodb://%s:%s@%s:%s" % (
                config['mongo']['user'], config['mongo']['pass'],
                config['mongo']['host'], config['mongo']['port']
            )
        self.mongo_client = MongoClient(mongo_url)

        rabbit_config = config['rabbit']
        credentials = pika.PlainCredentials(rabbit_config['user'],
                                            rabbit_config['pass'])
        rabbit_connection_parameters = pika.ConnectionParameters(
            host=rabbit_config['host'],
            port=int(rabbit_config['port']),
            credentials=credentials,
            connection_attempts=100,
            retry_delay=2
        )
        self.rabbit_client = pika.BlockingConnection(
            rabbit_connection_parameters)
        self.influx_client = InfluxDBClient(
            config['influxdb']['host'],
            config['influxdb']['port'],
            config['influxdb']['user'],
            config['influxdb']['pass'],
            config['influxdb']['database'],
        )
        s3_params = config['minio']
        self.s3_client = boto3.client(
            's3',
            endpoint_url='http://{}:{}'.format(
                s3_params['host'], s3_params['port']),
            aws_access_key_id=s3_params['access'],
            aws_secret_access_key=s3_params['secret'],
            config=BotoConfig(s3={'addressing_style': 'path'})
        )

    @retry(**RETRY_ARGS, retry_on_exception=lambda x: True)
    def configure_influx(self):
        db_name = self.config['etcd']['influxdb']['database']
        LOG.info("Create database Influx %s", db_name)
        try:
            existing_dbs = self.influx_client.get_list_database()
            if not any(db['name'] == db_name for db in existing_dbs):
                self.influx_client.create_database(db_name)
            else:
                LOG.info("Influx database %s already exists", db_name)
        except Exception as e:
            LOG.error("Failed to create influx database %s", e)

    def stitch_ch_to_http(self):
        try:
            ch_host = self.etcd_cl.get('/clickhouse/host').value
            ch_port = self.etcd_cl.get('/clickhouse/port').value
            # switch to http port only for local host
            LOG.info("Ch host: %s", ch_host)
            LOG.info("Ch port: %s", ch_port)
            if ch_host == CH_LOCAL_NAME and str(ch_port) != str(CH_HTTP_PORT):
                LOG.info("Updating clickhouse port to %s", CH_HTTP_PORT)
                self.etcd_cl.write(
                    "/clickhouse/port",
                    CH_HTTP_PORT
                )
        except etcd.EtcdKeyNotFound:
            LOG.info("Skipping update ch port due to missing key")

    def commit_config(self):
        LOG.info("Creating /configured key")
        self.etcd_cl.write('/configured', time.time())

    def pre_configure(self):
        self.create_databases()
        self.configure_influx()
        self.stitch_ch_to_http()
        self.configure_thanos()
        # setting to 0 to block updates until update is finished
        # and new images pushed into registry
        self.etcd_cl.write('/registry_ready', 0)

        config = self.config.get('etcd')
        if self.config.get('skip_config_update', False):
            LOG.info('Only making structure updates')
            self.etcd_cl.update_structure('/', config)
            self.commit_config()
            return
        LOG.info("Writing default etcd keys")
        for key in ETCD_KEYS_TO_DELETE:
            try:
                self.etcd_cl.delete(key)
            except etcd.EtcdKeyNotFound:
                pass
        self.etcd_cl.write_branch('/', config, overwrite_lists=True)

        LOG.info("Configuring database server")
        self.configure_databases()
        self.configure_auth_salt()
        self.configure_mongo()
        self.configure_rabbit()
        self.commit_config()

    def _create_auth_salt_key(self):
        salt = ""
        try:
            salt = self.etcd_cl.encryption_salt()
        except etcd.EtcdKeyNotFound:
            pass
        self.etcd_cl.write("/encryption_salt_auth", salt)

    def configure_auth_salt(self):
        try:
            auth_salt = self.etcd_cl.encryption_salt_auth()
            if not auth_salt:
                self._create_auth_salt_key()
        except etcd.EtcdKeyNotFound:
            self._create_auth_salt_key()

    def _declare_events_queue(self, channel):
        LOG.info('declaring queue')
        channel.queue_declare(
            self.config['etcd']['events_queue'], durable=True
        )

    def configure_rabbit(self):
        channel = self.rabbit_client.channel()
        try:
            self._declare_events_queue(channel)
        except pika.exceptions.ChannelClosed as e:
            if e.args and e.args[0] == RABBIT_PRECONDIFITON_FAILED_CODE:
                LOG.info(
                    'failed to declare queue - %s. Deleting existing queue', e)
                channel = self.rabbit_client.channel()
                channel.queue_delete(self.config['etcd']['events_queue'])
                self._declare_events_queue(channel)
            else:
                raise

    @retry(**RETRY_ARGS, retry_on_exception=lambda x: True)
    def configure_mongo(self):
        """
        according to pymongo documentation it's getting
        (creating if not exists) database
        http://api.mongodb.com/python/current/tutorial.html#getting-a-database
        :return:
        """
        _ = self.mongo_client[self.config['etcd']['mongo']['database']]

    @retry(**RETRY_ARGS, retry_on_exception=lambda x: True)
    def configure_databases(self):
        # in case of foreman model changes recreate db
        if self.config.get('drop_tasks_db'):
            self.engine.execute("DROP DATABASE IF EXISTS tasks")

    @retry(**RETRY_ARGS, retry_on_exception=lambda x: True)
    def create_databases(self):
        LOG.info("Creating databases")
        with self.engine.connect() as conn:
            for db in self.config.get('databases'):
                try:
                    LOG.info("CREATE DATABASE IF NOT EXISTS `%s`", db)
                    result = conn.execute(text("SHOW DATABASES LIKE :name"), {"name": db})
                    if not result.fetchone():
                        # heat migrations fail with utf8mb4
                        if db != 'heat':
                            # http://dev.mysql.com/doc/refman/5.6/en/innodb-row-format-dynamic.html NOQA
                            conn.execute(
                                "CREATE DATABASE IF NOT EXISTS `{0}` "
                                "DEFAULT CHARACTER SET `utf8mb4` "
                                "DEFAULT COLLATE `utf8mb4_unicode_ci`".format(db))
                        else:
                            conn.execute('CREATE DATABASE IF NOT EXISTS `{0}`'.format(db))
                        LOG.info("Database %s created", db)
                    else:
                        LOG.info("Database %s already exists", db)
                except Exception as e:
                    LOG.error("Failed to create database %s, error %s", db, e)

    @retry(**RETRY_ARGS, retry_on_exception=lambda x: True)
    def configure_thanos(self):
        LOG.info("Creating thanos bucket")
        bucket_name = 'thanos'
        prefix = 'data'
        try:
            self.s3_client.create_bucket(Bucket=bucket_name)
            LOG.info('Created %s bucket in minio', bucket_name)
            self.s3_client.put_object(
                Bucket=bucket_name, Body='', Key='%s/' % prefix)
            LOG.info('Created %s folder in %s bucket', prefix, bucket_name)
        except self.s3_client.exceptions.BucketAlreadyOwnedByYou:
            LOG.info('Skipping bucket %s creation. Bucket already exists',
                     bucket_name)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    etcd_host = os.environ.get('HX_ETCD_HOST')
    etcd_port = int(os.environ.get('HX_ETCD_PORT'))
    if len(sys.argv) > 1:
        conf = Configurator(sys.argv[1], host=etcd_host, port=etcd_port)
    else:
        conf = Configurator(host=etcd_host, port=etcd_port)
    stage = os.environ.get('HX_CONFIG_STAGE')
    conf.pre_configure()
