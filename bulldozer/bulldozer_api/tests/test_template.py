import uuid
import json
import pytest
from copy import deepcopy
from bulldozer.bulldozer_api.tests.base import (
    Urls, TOKEN, prepare_token, prepare_template
)

VALID_TEMPLATE = {
        "name": "my template",
        "name_prefix": "my template",
        "budget": 100,
        "task_ids": ["task_id"],
        "instance_types": ["t2.large"],
        "region_ids": ["us-east-1"],
        "cloud_account_ids": ["cloud_account_id"],
        "max_runner_num": 15,
        "tags": {"key": "value"},
        "hyperparameters": {"hyperparam_key": "hyperparam_value"}
    }


@pytest.mark.asyncio
async def test_invalid_token(app):
    client = app.asgi_client
    for path, method in [
        (Urls.templates, client.post),
        (Urls.templates, client.get),
        (Urls.template.format(str(uuid.uuid4())), client.get),
        (Urls.template.format(str(uuid.uuid4())), client.patch),
        (Urls.template.format(str(uuid.uuid4())), client.delete),
    ]:
        _, response = await method(path, headers={"x-api-key": "wrong"})
        assert response.status == 401
        assert "Token not found" in response.text

        _, response = await method(path)
        assert response.status == 401
        assert "API key is required" in response.text


@pytest.mark.asyncio
async def test_create_template(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.post(Urls.templates,
                                    data=json.dumps(VALID_TEMPLATE),
                                    headers={"x-api-key": TOKEN})
    assert response.status == 201
    for key, value in VALID_TEMPLATE.items():
        assert response.json[key] == value


@pytest.mark.asyncio
async def test_create_unexpected(app):
    client = app.asgi_client
    await prepare_token()
    for param in ["_id", "token", "created_at", "deleted_at", "unexpected"]:
        body = VALID_TEMPLATE.copy()
        body[param] = "test"
        _, response = await client.post(Urls.templates,
                                        data=json.dumps(body),
                                        headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "Extra inputs are not permitted" in response.text


@pytest.mark.asyncio
async def test_create_invalid_params(app):
    client = app.asgi_client
    await prepare_token()
    for param in ["name", "name_prefix"]:
        for value in [{"test": 1}, ["test"], 1]:
            body = VALID_TEMPLATE.copy()
            body[param] = value
            _, response = await client.post(Urls.templates,
                                            data=json.dumps(body),
                                            headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid string" in response.text

    for param in ["hyperparameters", "tags"]:
        for value in ["test", ["test"], 1]:
            body = deepcopy(VALID_TEMPLATE)
            body[param] = value
            _, response = await client.post(Urls.templates,
                                            data=json.dumps(body),
                                            headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid dictionary" in response.text

        body = deepcopy(VALID_TEMPLATE)
        body[param] = {"test": None}
        _, response = await client.post(Urls.templates,
                                        data=json.dumps(body),
                                        headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "value is not provided" in response.text

    for param in ["region_ids", "instance_types", "cloud_account_ids",
                  "task_ids"]:
        for value in ["test", {"test": 1}, 1]:
            body = deepcopy(VALID_TEMPLATE)
            body[param] = value
            _, response = await client.post(Urls.templates,
                                            data=json.dumps(body),
                                            headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid list" in response.text

    for param in ["budget", "max_runner_num"]:
        for value in ["test", ["test"], {"test": 1}]:
            body = VALID_TEMPLATE.copy()
            body[param] = value
            _, response = await client.post(Urls.templates,
                                            data=json.dumps(body),
                                            headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid integer" in response.text

    body = VALID_TEMPLATE.copy()
    body["max_runner_num"] = 0
    _, response = await client.post(Urls.templates,
                                    data=json.dumps(body),
                                    headers={"x-api-key": TOKEN})
    assert response.status == 400
    assert "Input should be greater than 0" in response.text


@pytest.mark.asyncio
async def test_create_empty_params(app):
    client = app.asgi_client
    await prepare_token()
    body = VALID_TEMPLATE.copy()
    for param in ["cloud_account_ids", "task_ids", "region_ids",
                  "instance_types"]:
        body[param] = []
        _, response = await client.post(Urls.templates,
                                        data=json.dumps(body),
                                        headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "is required" in response.text


@pytest.mark.asyncio
async def test_get_templates(app):
    client = app.asgi_client
    await prepare_token()
    await prepare_template()
    _, response = await client.get(Urls.templates,
                                   headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 1


@pytest.mark.asyncio
async def test_get_templates_empty(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.get(Urls.templates,
                                   headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert len(response.json) == 0


@pytest.mark.asyncio
async def test_get_template(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    _, response = await client.get(Urls.template.format(template["_id"]),
                                   headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert response.json["_id"] == template["_id"]


@pytest.mark.asyncio
async def test_get_template_invalid(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.get(Urls.template.format("template_id"),
                                   headers={"x-api-key": TOKEN})
    assert response.status == 404
    assert "Template not found" in response.text


@pytest.mark.asyncio
async def test_patch_template_invalid(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.patch(Urls.template.format("template_id"),
                                     data=json.dumps({"name": "test"}),
                                     headers={"x-api-key": TOKEN})
    assert response.status == 404
    assert "Template not found" in response.text


@pytest.mark.asyncio
async def test_patch_template_empty_list_params(app):
    client = app.asgi_client
    await prepare_token()
    body = VALID_TEMPLATE.copy()
    template = await prepare_template()
    for param in ["cloud_account_ids", "task_ids", "region_ids",
                  "instance_types"]:
        body[param] = []
        _, response = await client.patch(Urls.template.format(template["_id"]),
                                         data=json.dumps(body),
                                         headers={"x-api-key": TOKEN})
        assert response.status == 200
        assert response.json[param] != []


@pytest.mark.asyncio
async def test_patch_template_empty(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    _, response = await client.patch(Urls.template.format(template["_id"]),
                                     data=json.dumps({"budget": 10}),
                                     headers={"x-api-key": TOKEN})
    assert response.status == 200
    assert response.json["_id"] == template["_id"]


@pytest.mark.asyncio
async def test_patch_invalid_params(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    for param in ["name", "name_prefix"]:
        for value in [{"test": 1}, ["test"], 1]:
            body = VALID_TEMPLATE.copy()
            body[param] = value
            _, response = await client.patch(
                Urls.template.format(template["_id"]),
                data=json.dumps(body),
                headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid string" in response.text

    for param in ["tags", "hyperparameters"]:
        for value in ["test", ["test"], 1]:
            body = deepcopy(VALID_TEMPLATE)
            body[param] = value
            _, response = await client.patch(
                Urls.template.format(template["_id"]),
                data=json.dumps(body),
                headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid dictionary" in response.text

        body = deepcopy(VALID_TEMPLATE)
        body[param] = {"test": None}
        _, response = await client.patch(
            Urls.template.format(template["_id"]),
            data=json.dumps(body),
            headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "value is not provided" in response.text

    for param in ["region_ids", "instance_types", "cloud_account_ids",
                  "task_ids"]:
        for value in ["test", {"test": 1}, 1]:
            body = VALID_TEMPLATE.copy()
            body[param] = value
            _, response = await client.patch(
                Urls.template.format(template["_id"]),
                data=json.dumps(body),
                headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid list" in response.text
    for param in ["budget"]:
        for value in ["test", ["test"], {"test": 1}]:
            body = VALID_TEMPLATE.copy()
            body[param] = value
            _, response = await client.patch(
                Urls.template.format(template["_id"]),
                data=json.dumps(body),
                headers={"x-api-key": TOKEN})
            assert response.status == 400
            assert "Input should be a valid integer" in response.text


@pytest.mark.asyncio
async def test_patch_unexpected(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    for param in ["_id", "token", "created_at", "deleted_at", "unexpected",
                  "max_run_num"]:
        body = VALID_TEMPLATE.copy()
        body[param] = "test"
        _, response = await client.patch(
            Urls.template.format(template["_id"]),
            data=json.dumps(body),
            headers={"x-api-key": TOKEN})
        assert response.status == 400
        assert "Extra inputs are not permitted" in response.text


@pytest.mark.asyncio
async def test_delete_template(app):
    client = app.asgi_client
    await prepare_token()
    template = await prepare_template()
    _, response = await client.delete(Urls.template.format(template["_id"]),
                                      headers={"x-api-key": TOKEN})
    assert response.status == 204


@pytest.mark.asyncio
async def test_delete_template_invalid(app):
    client = app.asgi_client
    await prepare_token()
    _, response = await client.delete(Urls.template.format("template_id"),
                                      headers={"x-api-key": TOKEN})
    assert response.status == 404
    assert "Template not found" in response.text
