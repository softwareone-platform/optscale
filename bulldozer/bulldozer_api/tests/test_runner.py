import sys
import json
import pytest

from bulldozer.bulldozer_api.tests.base import (
    Urls, TOKEN, SECRET, prepare_token, prepare_runner, prepare_runset
)

sys.path.append(".")


@pytest.mark.asyncio
async def test_invalid_token(app):
    client = app.asgi_client
    for path, method in [
        (Urls.runners, client.get),
        (Urls.runners_for_runset, client.get),
    ]:
        _, response = await method(path, headers={"x-api-key": "wrong"})
        assert response.status == 401
        assert "Token not found" in response.text

        _, response = await method(path)
        assert response.status == 401
        assert "API key is required" in response.text


@pytest.mark.asyncio
async def test_invalid_secret(app):
    client = app.asgi_client
    runner = await prepare_runner("ruset_id")
    for method in [client.patch, client.get]:
        _, response = await method(Urls.runner.format(runner["_id"]),
                                   headers={"Secret": "wrong"})
        assert response.status == 401
        assert "secret is invalid" in response.text

        _, response = await method(Urls.runner.format(runner["_id"]))
        assert response.status == 401
        assert "secret is required" in response.text


@pytest.mark.asyncio
async def test_get_runner_by_runset(app, mock_cost_calc):
    client = app.asgi_client
    await prepare_token()
    runset = await prepare_runset("template_id")
    runner = await prepare_runner(runset["_id"])
    _, response = await client.get(
        Urls.runners_for_runset.format(runset["_id"]),
        headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 1
    assert response.json[0]["_id"] == runner["_id"]


@pytest.mark.asyncio
async def test_get_runner_by_invalid_runset(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.get(Urls.runners_for_runset.format("runset_id"),
                                   headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 0


@pytest.mark.asyncio
async def test_get_runner_by_runset_empty(app):
    client = app.asgi_client
    await prepare_token()
    runset = await prepare_runset("template_id")
    _, response = await client.get(
        Urls.runners_for_runset.format(runset["_id"]),
        headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 0


@pytest.mark.asyncio
async def test_get_runner(app, mock_cost_calc):
    client = app.asgi_client
    await prepare_token()
    runset = await prepare_runset("template_id")
    runner = await prepare_runner(runset["_id"])
    _, response = await client.get(Urls.runner.format(runner["_id"]),
                                   headers={"secret": SECRET})
    assert response.status == 200
    assert response.json["_id"] == runner["_id"]


@pytest.mark.asyncio
async def test_get_runner_invalid(app, mock_cost_calc):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.get(Urls.runner.format("runner_id"),
                                   headers={"secret": SECRET})
    assert response.status == 404
    assert "runner not found" in response.text


@pytest.mark.asyncio
async def test_patch_runner(app, mock_cost_calc):
    client = app.asgi_client
    body = {
        "return_code": 0,
        "reason": "error",
        "instance_id": "instance_id",
        "run_id": "run_id",
        "name": "name",
        "state": 1,
        "ip_addr": "1.1.1.1"
    }
    await prepare_token()
    runset = await prepare_runset("template_id")
    runner = await prepare_runner(runset["_id"])
    _, response = await client.patch(Urls.runner.format(runner["_id"]),
                                     data=json.dumps(body),
                                     headers={"secret": SECRET})
    assert response.status == 200
    for param, value in body.items():
        assert response.json[param] == value


@pytest.mark.asyncio
async def test_patch_runner_invalid(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.patch(Urls.runner.format("runner_id"),
                                     data=json.dumps({"state": 6}),
                                     headers={"secret": SECRET})
    assert response.status == 404
    assert "runner not found" in response.text


@pytest.mark.asyncio
async def test_patch_runner_empty(app):
    client = app.asgi_client
    await prepare_token()
    runset = await prepare_runset("template_id")
    runner = await prepare_runner(runset["_id"])
    _, response = await client.patch(Urls.runner.format(runner["_id"]),
                                     data=json.dumps({}),
                                     headers={"secret": SECRET})
    assert response.status == 200
    assert response.json["_id"] == runner["_id"]


@pytest.mark.asyncio
async def test_patch_invalid(app):
    client = app.asgi_client
    await prepare_token()
    runset = await prepare_runset("template_id")
    runner = await prepare_runner(runset["_id"])
    for param in ["reason", "instance_id", "name", "run_id"]:
        for value in [1, ["test"], {"test": 1}]:
            body = {param: value}
            _, response = await client.patch(Urls.runner.format(runner["_id"]),
                                             data=json.dumps(body),
                                             headers={"secret": SECRET})
            assert response.status == 400
            assert "Input should be a valid string" in response.text

    for param in ["return_code", "state", "destroyed_at", "started_at"]:
        for value in ["test", ["test"], {"test": 1}]:
            body = {param: value}
            _, response = await client.patch(Urls.runner.format(runner["_id"]),
                                             data=json.dumps(body),
                                             headers={"secret": SECRET})
            assert response.status == 400
            assert "Input should be a valid integer" in response.text


@pytest.mark.asyncio
async def test_patch_unexpected(app):
    client = app.asgi_client
    await prepare_token()
    runset = await prepare_runset("template_id")
    runner = await prepare_runner(runset["_id"])
    for param in ["_id", "token", "created_at", "deleted_at", "number",
                  "task_id", "runset_id", "cloud_account_id", "region_id",
                  "instance_type", "tags", "name_prefix", "hyperparameters",
                  "commands", "destroy_conditions", "spot_settings",
                  "owner_id", "open_ingress", "unexpected"]:
        body = {param: "test"}
        _, response = await client.patch(
            Urls.runner.format(runner["_id"]),
            data=json.dumps(body),
            headers={"secret": SECRET})
        assert response.status == 400
        assert "Extra inputs are not permitted" in response.text


@pytest.mark.asyncio
async def test_get_runners(app, mock_cost_calc):
    client = app.asgi_client
    await prepare_token()
    runset1 = await prepare_runset("template_id")
    runset2 = await prepare_runset("template_id")
    runset1_id = runset1["_id"]
    runset2_id = runset2["_id"]
    runner1 = await prepare_runner(runset1["_id"])
    runner2 = await prepare_runner(runset2["_id"])
    _, response = await client.get(
        Urls.runners + f"?runset_id={runset1_id}&runset_id={runset2_id}",
        headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 2
    runners_ids = [x["_id"] for x in response.json]
    assert (runner1["_id"] in runners_ids and runner2["_id"] in runners_ids)

    _, response = await client.get(
        Urls.runners + f"?runset_id={runset1_id}",
        headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 1
    assert response.json[0]["_id"] == runner1["_id"]


@pytest.mark.asyncio
async def test_get_runners_empty(app):
    client = app.asgi_client
    await prepare_token()
    runset = await prepare_runset("template_id")
    runset_id = runset["_id"]
    _, response = await client.get(
        Urls.runners + f"?runset_id={runset_id}",
        headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 0


@pytest.mark.asyncio
async def test_get_runners_invalid_params(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.get(
        Urls.runners + "?runset_id=test&unexpected=true",
        headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 0
