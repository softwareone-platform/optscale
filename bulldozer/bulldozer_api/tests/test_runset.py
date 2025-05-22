import uuid
import json
import pytest

from bulldozer.bulldozer_api.tests.base import (
    Urls, TOKEN, prepare_token, prepare_template, prepare_runset
)


VALID_RUNSET = {
        "name": "my runset",
        "name_prefix": "my runset",
        "state": 1,
        "task_id": "task_id",
        "instance_type": "t2.large",
        "region_id": "us-east-1",
        "cloud_account_id": "cloud_account_id",
        "tags": {"key": "value"},
        "destroy_conditions": {"max_budget": 1, "reached_goals": True},
        "hyperparameters": {"hyperparam_key": "hyperparam_value"},
        "owner_id": str(uuid.uuid4()),
        "open_ingress": False,
        "commands": "rm -rf /test",
        "image": "",
        "spot_settings": {"tries": 1},
        "venv": "/tmp/venv",
    }


@pytest.mark.asyncio
async def test_invalid_token(app):
    client = app.asgi_client
    for path, method in [
        (Urls.runsets, client.post),
        (Urls.runsets, client.get),
        (Urls.runset.format(str(uuid.uuid4())), client.get),
        (Urls.runset.format(str(uuid.uuid4())), client.patch)
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
    runset = await prepare_runset("template_id")
    for method in [client.patch, client.get]:
        _, response = await method(Urls.runset.format(runset["_id"]),
                                   headers={"Secret": "wrong"})
        assert response.status == 401
        assert "API key is required" in response.text

        _, response = await method(Urls.runset.format(runset["_id"]))
        assert response.status == 401
        assert "API key is required" in response.text


@pytest.mark.asyncio
async def test_create_runset(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    _, response = await client.post(Urls.runsets.format(template["_id"]),
                                    data=json.dumps(VALID_RUNSET),
                                    headers={"x-api-key": TOKEN})
    assert response.status == 201
    for key, value in VALID_RUNSET.items():
        assert response.json[key] == value


@pytest.mark.asyncio
async def test_create_unexpected(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    for param in ["_id", "token", "created_at", "deleted_at", "unexpected",
                  "template_id", "started_at", "destroyed_at", "number"]:
        body = VALID_RUNSET.copy()
        body[param] = "test"
        _, response = await client.post(Urls.runsets.format(template["_id"]),
                                        data=json.dumps(body),
                                        headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "Extra inputs are not permitted" in response.text


@pytest.mark.asyncio
async def test_create_invalid_params(app):
    client = app.asgi_client
    await prepare_token()
    for param in ["name", "name_prefix", "region_id", "instance_type", "image",
                  "cloud_account_id", "task_id", "owner_id", "commands",
                  "venv"]:
        for value in [{"test": 1}, ["test"], 1]:
            body = VALID_RUNSET.copy()
            body[param] = value
            _, response = await client.post(Urls.runsets,
                                            data=json.dumps(body),
                                            headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid string" in response.text

    for param in ["hyperparameters", "tags", "destroy_conditions",
                  "spot_settings"]:
        for value in ["test", ["test"], 1]:
            body = VALID_RUNSET.copy()
            body[param] = value
            _, response = await client.post(Urls.runsets,
                                            data=json.dumps(body),
                                            headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid dictionary" in response.text

    for value in ["test", ["test"], {"test": 1}]:
        body = VALID_RUNSET.copy()
        body["state"] = value
        _, response = await client.post(Urls.runsets,
                                        data=json.dumps(body),
                                        headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "Input should be a valid integer" in response.text

    for value in ["test", ["test"], {"test": 1}]:
        body = VALID_RUNSET.copy()
        body["open_ingress"] = value
        _, response = await client.post(Urls.runsets,
                                        data=json.dumps(body),
                                        headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "Input should be a valid boolean" in response.text


@pytest.mark.asyncio
async def test_create_runset_without_spot(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    body = VALID_RUNSET.copy()
    body["spot_settings"] = {}
    _, response = await client.post(Urls.runsets.format(template["_id"]),
                                    data=json.dumps(body),
                                    headers={"x-api-key": TOKEN})
    assert response.status == 201
    assert response.json["spot_settings"] == {}


@pytest.mark.asyncio
async def test_get_runsets(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    await prepare_runset(template["_id"])
    _, response = await client.get(Urls.runsets.format(template["_id"]),
                                   headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 1


@pytest.mark.asyncio
async def test_get_runsets_empty(app):
    client = app.asgi_client
    await prepare_token()
    temlate = await prepare_template()
    _, response = await client.get(Urls.runsets.format(temlate["_id"]),
                                   headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 0


@pytest.mark.asyncio
async def test_get_runset(app):
    client = app.asgi_client
    await prepare_token()
    runset = await prepare_runset("template_id")
    _, response = await client.get(Urls.runset.format(runset["_id"]),
                                   headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert response.json["_id"] == runset["_id"]


@pytest.mark.asyncio
async def test_get_runset_invalid(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.get(Urls.runset.format("runset_id"),
                                   headers={"x-api-key": TOKEN})
    assert response.status == 404
    assert "runset not found" in response.text


@pytest.mark.asyncio
async def test_patch_runset(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    runset = await prepare_runset(template["_id"])
    body = {"state": 6, "runner_id": "test"}
    _, response = await client.patch(Urls.runset.format(runset["_id"]),
                                     data=json.dumps(body),
                                     headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert response.json["state"] == 6


@pytest.mark.asyncio
async def test_patch_runset_state(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    runset = await prepare_runset(template["_id"])
    for state in range(1, 5):
        body = {"state": state}
        _, response = await client.patch(Urls.runset.format(runset["_id"]),
                                         data=json.dumps(body),
                                         headers={"x-api-key": TOKEN})
        assert response.status == 409
        assert "only stop state is supported" in response.text


@pytest.mark.asyncio
async def test_patch_runset_invalid(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.patch(Urls.runset.format("runset_id"),
                                     data=json.dumps({"state": 6}),
                                     headers={"x-api-key": TOKEN})
    assert response.status == 404
    assert "runset not found" in response.text


@pytest.mark.asyncio
async def test_patch_runset_empty(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    runset = await prepare_runset(template["_id"])
    _, response = await client.patch(Urls.runset.format(runset["_id"]),
                                     data=json.dumps({}),
                                     headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert response.json["_id"] == runset["_id"]


@pytest.mark.asyncio
async def test_patch_invalid_state(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    runset = await prepare_runset(template["_id"])
    for value in ["test", ["test"], {"test": 1}]:
        body = {"state": value}
        _, response = await client.patch(Urls.runset.format(runset["_id"]),
                                         data=json.dumps(body),
                                         headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "Input should be a valid integer" in response.text

    body = {"state": 100}
    _, response = await client.patch(Urls.runset.format(runset["_id"]),
                                     data=json.dumps(body),
                                     headers={"x-api-key": TOKEN})
    assert response.status == 400
    assert "Unknown state" in response.text


@pytest.mark.asyncio
async def test_patch_unexpected(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    runset = await prepare_runset(template["_id"])
    for param in ["_id", "token", "created_at", "deleted_at", "number",
                  "started_at", "destroyed_at", "name", "state", "task_id",
                  "cloud_account_id", "region_id", "instance_type", "tags",
                  "name_prefix", "hyperparameters", "commands",
                  "destroy_conditions", "spot_settings", "owner_id",
                  "open_ingress", "venv", "unexpected"]:
        body = VALID_RUNSET.copy()
        body[param] = "test"
        _, response = await client.patch(
            Urls.runset.format(runset["_id"]),
            data=json.dumps(body),
            headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "Extra inputs are not permitted" in response.text
