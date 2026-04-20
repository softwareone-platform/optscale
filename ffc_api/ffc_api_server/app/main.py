import logging
from contextlib import asynccontextmanager

import fastapi_pagination
from fastapi import Depends, FastAPI
from fastapi.routing import APIRoute, APIRouter

from ffc_api.ffc_api_server.app.conf import get_settings
from ffc_api.ffc_api_server.app.clickhouse.clients import configure_clickhouse_client
from ffc_api.ffc_api_server.app.db.base import configure_db_engine, verify_db_connection
from ffc_api.ffc_api_server.app.dependencies.auth import verify_cluster_secret
from ffc_api.ffc_api_server.app.routers import datasources, organizations, tags, users
from ffc_api.ffc_api_server.app.routers.ffc_client import organizations as client_organizations
from ffc_api.ffc_api_server.app.services.roles_loader import configure_roles

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(ffc_app: FastAPI):
    settings = get_settings()
    ffc_app.debug = settings.debug
    configure_db_engine(settings)
    await verify_db_connection()
    await configure_roles()
    configure_clickhouse_client()
    yield


tags_metadata = []


def setup_custom_serialization(router: APIRouter):
    for api_route in router.routes:
        if (
            isinstance(api_route, APIRoute)
            and hasattr(api_route, "response_model")
            and api_route.response_model
        ):
            api_route.response_model_exclude_none = True


def setup_app():
    ffc_app = FastAPI(
        title="Extended FinOps API",
        description="API to be used to manage FinOps for Cloud tool",
        swagger_ui_parameters={"showExtensions": False, "showCommonExtensions": False},
        openapi_tags=tags_metadata,
        version="4.0.0",
        root_path="/ffc/v1",
        lifespan=lifespan,
    )
    fastapi_pagination.add_pagination(ffc_app)

    for router in (organizations.router, datasources.router, tags.router, users.router):
        setup_custom_serialization(router)

    admin_router = APIRouter(prefix="/admin")
    client_router = APIRouter(prefix="/client")

    admin_router.include_router(
        organizations.router,
        prefix="/organizations",
        dependencies=[Depends(verify_cluster_secret)],
    )
    admin_router.include_router(
        datasources.router,
        prefix="/datasources",
        dependencies=[Depends(verify_cluster_secret)],
    )
    admin_router.include_router(
        tags.router,
        prefix="/tags",
        dependencies=[Depends(verify_cluster_secret)],
    )
    admin_router.include_router(
        users.router,
        prefix="/users",
        dependencies=[Depends(verify_cluster_secret)],
    )

    client_router.include_router(
        client_organizations.router,
        prefix="/organizations",
    )

    ffc_app.include_router(admin_router)
    ffc_app.include_router(client_router)

    return ffc_app


app = setup_app()
