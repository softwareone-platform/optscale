import logging
import os
import traceback
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from optscale_client.config_client.client import Client as ConfigClient
from tools.stripe_client.client import init_stripe

from subspector.subspector_server.api.routes import api_router, webhook_router
from subspector.subspector_server.models.database import Database, DBType
from subspector.subspector_server.models.dbs.db_base import BaseDB
from subspector.subspector_server.producer import TaskProducer

logging.basicConfig(level=logging.INFO)
LOG = logging.getLogger(__name__)


def get_config() -> ConfigClient:
    etcd_host = os.environ.get('HX_ETCD_HOST')
    etcd_port = int(os.environ.get('HX_ETCD_PORT', 0))
    return ConfigClient(host=etcd_host, port=etcd_port)


def get_lifespan(db: BaseDB, stripe_params: dict, producer: TaskProducer):
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        await db.prepare()
        init_stripe(stripe_params['api_key'])
        yield
        await db.dispose()
        await producer.disconnect()

    return lifespan


def common_exception_handler(request, exc: Exception) -> JSONResponse:
    tb_lines = traceback.format_exception(type(exc), exc, exc.__traceback__)
    LOG.error('Unexpected error: \\n%s', repr("".join(tb_lines)))
    return JSONResponse(status_code=500, content={'detail': 'Internal server error'})


def make_app(db_type: DBType = DBType.MYSQL,
             config_client: ConfigClient | None = None) -> FastAPI:
    if config_client is None:
        config_client = get_config()
    db = Database(db_type, config_client).db
    task_producer = TaskProducer(config_client.rabbit_params())
    stripe_params = config_client.stripe_settings()
    app = FastAPI(lifespan=get_lifespan(
        db=db, stripe_params=stripe_params, producer=task_producer))
    for router in [api_router, webhook_router]:
        app.include_router(router)
    app.add_exception_handler(Exception, common_exception_handler)
    app.state.cluster_secret = config_client.cluster_secret()
    app.state.stripe_webhook_secret = stripe_params['webhook_secret']
    app.state.public_ip = config_client.public_ip()
    app.state.producer = task_producer
    app.state.db = db
    return app
