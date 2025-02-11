import os
import shutil
import logging
import argparse

from herald.herald_server.controllers.message_consumer import Consumer
from herald.herald_server.models.db_factory import DBFactory, DBType
from herald.herald_server.processors.main import MainProcessor

import optscale_client.config_client.client

LOG = logging.getLogger(__name__)

DEFAULT_ETCD_HOST = '127.0.0.1'
DEFAULT_ETCD_PORT = 2379

CUSTOM_TEMPLATES_PATH = '/usr/src/app/herald/modules/email_generator/' \
                        'custom_templates'
README_NAME = 'README.md'
README_PATH_LOCAL = '/usr/src/app/herald/modules/email_generator/' \
                    'CUSTOM_EMAIL_README.md'


def upload_custom_email_template_readme():
    try:
        shutil.copy(README_PATH_LOCAL,
                    os.path.join(CUSTOM_TEMPLATES_PATH, README_NAME))
        LOG.info("Copied README.md")
    except Exception as exc:
        LOG.exception(exc)


def find_custom_email_templates():
    try:
        files = [x for x in os.listdir(CUSTOM_TEMPLATES_PATH)
                 if x.endswith('.html')]
        if files:
            LOG.info('Found custom email templates: %s', files)
    except Exception as exc:
        LOG.exception(exc)


def make_app(etcd_host, etcd_port, wait=False):
    config_cl = optscale_client.config_client.client.Client(
        host=etcd_host, port=etcd_port)
    if wait:
        config_cl.wait_configured()

    rabbit_user, rabbit_pass, rabbit_host, rabbit_port = \
        config_cl.rabbit_params()

    events_queue = config_cl.events_queue()
    consumer = Consumer(
        events_queue, rabbit_host, rabbit_port, rabbit_user, rabbit_pass)

    db = DBFactory(DBType.MySQL, config_cl).db
    engine = db.engine

    upload_custom_email_template_readme()
    find_custom_email_templates()

    tasks_processor = MainProcessor(consumer, engine, config_cl)

    config_cl.tell_everybody_that_i_am_ready()

    consumer.run(tasks_processor.process_task)


def main():
    logging.basicConfig(level=logging.INFO)

    etcd_host = os.environ.get('HX_ETCD_HOST', DEFAULT_ETCD_HOST)
    etcd_port = os.environ.get('HX_ETCD_PORT', DEFAULT_ETCD_PORT)

    parser = argparse.ArgumentParser()
    parser.add_argument('--etcdhost', type=str, default=etcd_host)
    parser.add_argument('--etcdport', type=int, default=etcd_port)
    args = parser.parse_args()
    make_app(args.etcdhost, args.etcdport, wait=False)


if __name__ == "__main__":
    main()
