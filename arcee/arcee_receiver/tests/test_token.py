import uuid
import json
import pytest

from arcee.arcee_receiver.tests.base import (
    Urls, SECRET, prepare_token
)


@pytest.mark.asyncio
async def test_invalid_token(app):
    client = app.asgi_client
    for path, method in [
        (Urls.tokens, client.post),
        (Urls.token.format(str(uuid.uuid4())), client.get),
        (Urls.token.format(str(uuid.uuid4())), client.delete),
    ]:
        _, response = await method(path, headers={"secret": "wrong"})
        assert response.status == 401
        assert "secret is invalid" in response.text

        _, response = await method(path)
        assert response.status == 401
        assert "secret is required" in response.text


@pytest.mark.asyncio
async def test_create_token(app):
    client = app.asgi_client
    token = {'token': 'test'}
    _, response = await client.post(Urls.tokens,
                                    data=json.dumps(token),
                                    headers={"secret": SECRET})
    assert response.status == 200
    assert response.json['token'] == token['token']


@pytest.mark.asyncio
async def test_update_token(app):
    client = app.asgi_client
    tokens = await prepare_token()
    token_id = tokens[0]['_id']
    _, response = await client.patch(Urls.token.format(token_id),
                                     data=json.dumps({"disabled": True}),
                                     headers={"secret": SECRET})
    assert response.status == 200
    assert response.json['disabled'] is True


@pytest.mark.asyncio
async def test_update_invalid_params(app):
    client = app.asgi_client
    tokens = await prepare_token()
    token_id = tokens[0]['_id']
    _, response = await client.patch(Urls.token.format(token_id),
                                     data=json.dumps({"token": "test"}),
                                     headers={"secret": SECRET})
    assert response.status == 400
    assert "Extra inputs are not permitted" in response.text

    _, response = await client.patch(Urls.token.format(token_id),
                                     data=json.dumps({"disabled": "test"}),
                                     headers={"secret": SECRET})
    assert response.status == 400
    assert "Input should be a valid boolean" in response.text


@pytest.mark.asyncio
async def test_update_token_not_exist(app):
    client = app.asgi_client
    _, response = await client.patch(Urls.token.format("test"),
                                     data=json.dumps({"disabled": True}),
                                     headers={"secret": SECRET})
    assert response.status == 404
    assert "Token not found" in response.text


@pytest.mark.asyncio
async def test_get_token(app):
    client = app.asgi_client
    tokens = await prepare_token()
    token_id = tokens[0]['_id']
    _, response = await client.get(Urls.token.format(token_id),
                                   headers={"secret": SECRET})
    assert response.status == 200
    assert response.json['_id'] == token_id


@pytest.mark.asyncio
async def test_get_token_invalid(app):
    client = app.asgi_client
    _, response = await client.get(Urls.token.format('token_id'),
                                   headers={"secret": SECRET})
    assert response.status == 404
    assert "Not found" in response.text


@pytest.mark.asyncio
async def test_delete_token(app):
    client = app.asgi_client
    tokens = await prepare_token()
    token_id = tokens[0]['_id']
    _, response = await client.delete(Urls.token.format(token_id),
                                      headers={"secret": SECRET})
    assert response.status == 200


@pytest.mark.asyncio
async def test_delete_token_invalid(app):
    client = app.asgi_client
    _, response = await client.delete(Urls.token.format('token_id'),
                                      headers={"secret": SECRET})
    assert response.status == 404
    assert "Not found" in response.text


@pytest.mark.asyncio
async def test_disabled_token(app):
    client = app.asgi_client
    tokens = await prepare_token()
    token_id = tokens[0]['token']
    await client.patch(Urls.token.format(token_id),
                       data=json.dumps({"disabled": True}),
                       headers={"secret": SECRET})
    _, response = await client.post(Urls.tasks,
                                    data=json.dumps({}),
                                    headers={"x-api-key": token_id})
    assert response.status == 401
    assert "Token is disabled" in response.text
