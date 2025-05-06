import asyncio
import importlib
import pytest
from bulldozer.bulldozer_api.tests.base import AConfigClMock, DB_MOCK


async def return_none(*_args, **_kwargs):
    return None


@pytest.fixture
def mock_base(mocker):
    mocker.patch("optscale_client.aconfig_cl.aconfig_cl.AConfigCl",
                 AConfigClMock)
    mocker.patch("bulldozer.bulldozer_api.server.db", DB_MOCK)
    mocker.patch("bulldozer.bulldozer_api.server.submit_tasks")
    mocker.patch("bulldozer.bulldozer_api.server.publish_activities_task",
                 return_none)


async def return_int(*_args):
    return 100


@pytest.fixture
def mock_cost_calc(mock_base, mocker):
    mocker.patch(
        "bulldozer.bulldozer_api.cost_calc.CostCalc.run_async",
        return_int)


@pytest.fixture
def app(mock_base):
    bulldozer_app = importlib.import_module("bulldozer.bulldozer_api.server")
    return bulldozer_app.app


async def clean_env():
    await DB_MOCK["token"].drop()
    await DB_MOCK["template"].drop()
    await DB_MOCK["runner"].drop()
    await DB_MOCK["runset"].drop()


@pytest.fixture(autouse=True)
def clean_db_after_test():
    yield
    asyncio.run(clean_env())
