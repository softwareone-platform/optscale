import logging
from contextlib import asynccontextmanager

import fastapi_pagination
from fastapi import Depends, FastAPI
from fastapi.routing import APIRoute, APIRouter

from app.conf import get_settings
from app.db.base import configure_db_engine, verify_db_connection
from app.dependencies.auth import verify_cluster_secret
from app.routers import organizations, tags
from app.services.roles_loader import configure_roles

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    app.debug = settings.debug
    configure_db_engine(settings)
    await verify_db_connection(settings)
    await configure_roles()
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
    app = FastAPI(
        title="Extended FinOps API",
        description="API to be used to manage FinOps for Cloud tool",
        swagger_ui_parameters={"showExtensions": False, "showCommonExtensions": False},
        openapi_tags=tags_metadata,
        version="4.0.0",
        root_path="/ffc/v1",
        lifespan=lifespan,
    )
    fastapi_pagination.add_pagination(app)

    for router in (organizations.router, tags.router):
        setup_custom_serialization(router)

    app.include_router(
        organizations.router,
        prefix="/organizations",
        dependencies=[Depends(verify_cluster_secret)],
    )
    app.include_router(
        tags.router,
        prefix="/tags",
        dependencies=[Depends(verify_cluster_secret)],
    )

    # app.include_router(auth.router, prefix="/auth", tags=["Auth"])

    # settings = get_settings()
    # app.openapi = partial(generate_openapi_spec, app, settings)

    return app


app = setup_app()
