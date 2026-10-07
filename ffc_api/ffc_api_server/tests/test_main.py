from fastapi import FastAPI
from httpx import AsyncClient
from pytest_mock import MockerFixture

from ffc_api.ffc_api_server.app import main
from ffc_api.ffc_api_server.app.main import lifespan


async def test_openapi_schema_is_generated(api_client: AsyncClient):
    response = await api_client.get("/openapi.json")

    assert response.status_code == 200
    schema = response.json()
    assert schema["info"]["title"] == "Extended FinOps API"
    assert "/admin/tags" in schema["paths"]


async def test_lifespan_wires_up_the_infrastructure(mocker: MockerFixture, test_settings):
    configure_db_engine = mocker.patch.object(main, "configure_db_engine")
    verify_db_connection = mocker.patch.object(main, "verify_db_connection")
    configure_roles = mocker.patch.object(main, "configure_roles")
    get_clickhouse_client = mocker.patch.object(main, "get_clickhouse_client")
    get_mongo_client = mocker.patch.object(main, "get_mongo_client")
    app = FastAPI()

    async with lifespan(app):
        assert app.debug == test_settings.debug

    configure_db_engine.assert_called_once()
    verify_db_connection.assert_awaited_once()
    configure_roles.assert_awaited_once()
    get_clickhouse_client.assert_called_once()
    get_mongo_client.assert_called_once()
