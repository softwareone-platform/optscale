import os
import logging
from etcd import Lock
from sqlalchemy import create_engine
from subspector.subspector_server.models.migrator import Migrator
from optscale_client.config_client.client import Client as ConfigClient

LOG = logging.getLogger(__name__)
DEFAULT_ETCD_PORT = 2379


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    LOG.info('Migration started')
    config_cl = ConfigClient(
        host=os.environ.get('HX_ETCD_HOST'),
        port=int(os.environ.get('HX_ETCD_PORT') or DEFAULT_ETCD_PORT),
    )
    user, password, host, db = config_cl.subspector_db_params()
    engine = create_engine(
        f'mysql+mysqlconnector://{user}:{password}@{host}/{db}'
        f'?charset=utf8mb4',
        pool_recycle=500,
        pool_size=25,
        max_overflow=10,
    )
    migrator = Migrator(engine=engine)
    with Lock(config_cl, 'subspector_migrations'):
        migrator.migrate_all()
    LOG.info('Migration completed')
