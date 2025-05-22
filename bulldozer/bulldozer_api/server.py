import asyncio
from typing import Tuple
from urllib.parse import urlparse
import os
from pydantic import ValidationError
from sanic import Sanic
from sanic.response import json
from sanic.log import logger
from sanic.exceptions import SanicException
from sanic_ext import validate
import motor.motor_asyncio
from etcd import Lock as EtcdLock, Client as EtcdClient
from mongodb_migrations.cli import MigrationManager
from mongodb_migrations.config import Configuration

from bulldozer.bulldozer_api.cost_calc import CostCalc
from bulldozer.bulldozer_api.producer import (
    ActivitiesTaskProducer, TaskProducer
)
from bulldozer.bulldozer_api.name_generator import NameGenerator
from bulldozer.bulldozer_api.models import (
    BulkRunnerQuery, RunsetState, RunsetStatePatchIn, RunsetPostIn, Runset,
    RunnerPatchIn, Runner, TaskState, TemplatePatchIn, TemplatePostIn,
    Template, TokenPatchIn, TokenPostIn, Token
)
from bulldozer.bulldozer_api.utils import permutation

from optscale_client.aconfig_cl.aconfig_cl import AConfigCl
from tools.optscale_time import utcnow_timestamp

app = Sanic("bulldozer")


etcd_host = os.environ.get('HX_ETCD_HOST')
etcd_port = int(os.environ.get('HX_ETCD_PORT', 0))
config_client = AConfigCl(host=etcd_host, port=etcd_port)


def get_db_params() -> Tuple[str, str]:
    db_params = config_client.bulldozer_params()
    return asyncio.run(db_params)


async def get_cluster_secret() -> str:
    return await config_client.cluster_secret()


conn_url, db_name = get_db_params()
components = urlparse(conn_url)
user_data, host_data = components.netloc.split("@", 1)
name, password = user_data.split(":", 1)
host, port = host_data.split(":", 1)
uri = f"{components.scheme}://{components.netloc}/admin?{components.query}"
client = motor.motor_asyncio.AsyncIOMotorClient(uri)
db = client[db_name]

cost_calc = CostCalc()


async def publish_activities_task(infrastructure_token, object_id, object_name,
                                  object_type, action, **kwargs):
    task = {
        "infrastructure_token": infrastructure_token,
        "object_id": object_id,
        "object_name": object_name,
        "object_type": object_type,
        "action": action,
        **kwargs
    }
    routing_key = ".".join([object_type, action])
    producer = ActivitiesTaskProducer()
    logger.info("Creating activities task:%s, routing_key:%s", task,
                routing_key)
    await producer.run_async(producer.create_task, task, routing_key)


async def extract_token(request, raise_on=True):
    token = request.headers.get('x-api-key')
    if not token and raise_on:
        raise SanicException("API key is required", status_code=401)
    return token


async def check_token(token, request, raise_on=True):
    token = await db.token.find_one({
        "$and": [
            {"deleted_at": 0},
            {"token": token},
        ]
    })
    if not token and raise_on:
        raise SanicException("Token not found", status_code=401)
    if request.method != "GET" and token.get("disabled"):
        raise SanicException("Token is disabled", status_code=401)
    return bool(token)


async def extract_secret(request, raise_on=True):
    secret = request.headers.get('Secret')
    if not secret and raise_on:
        raise SanicException("secret is required", status_code=401)
    return secret


async def check_secret(secret, raise_on=True):
    required = await get_cluster_secret()
    if raise_on:
        if secret != required:
            raise SanicException("secret is invalid", status_code=401)
    return secret == required


AUTH_VALIDATION_TYPES = ['secret', 'token', 'secret_or_token']


@app.on_request
async def handle_auth(request):
    # different validations according to route context

    if not request.route:
        # request.route is None on unknown URLs, sanic will raise 404
        return

    # having one of supported labels is a mandatory for bulldozer requests
    if (not hasattr(request.route.ctx, 'label')
            or request.route.ctx.label not in AUTH_VALIDATION_TYPES):
        raise SanicException('Unknown auth validation type', status_code=500)
    elif request.route.ctx.label == 'token':
        token = await extract_token(request)
        await check_token(token, request, raise_on=True)
        request.ctx.token = token
    elif request.route.ctx.label == 'secret':
        secret = await extract_secret(request, raise_on=True)
        await check_secret(secret, raise_on=True)
    elif request.route.ctx.label == 'secret_or_token':
        secret = await extract_secret(request, raise_on=False)
        is_valid_secret = await check_secret(secret, raise_on=False)
        if not is_valid_secret:
            token = await extract_token(request)
            await check_token(token, request, raise_on=True)
            request.ctx.token = token


@app.route('/bulldozer/v2/tokens/<token>', methods=["GET", ],
           ctx_label='secret')
async def get_token(request, token: str):
    """
    get token
    :param request:
    :param token:
    :return:
    """
    token = await db.token.find_one({
        "$and": [
            {"deleted_at": 0},
            {
                "$or": [
                    {"token": token},
                    {"_id":  token}
                ]
            }
        ]
    })
    if not token:
        raise SanicException("Token not found", status_code=404)
    return json(token)


@app.route('/bulldozer/v2/tokens', methods=["POST", ], ctx_label='secret')
@validate(json=TokenPostIn)
async def create_token(request, body: TokenPostIn):
    """
    creates token
    :param request:
    :param body:
    :return:
    """
    o = await db.token.find_one({"token": body.token})
    if o:
        raise SanicException("Token exists", status_code=409)
    token = Token(**body.model_dump()).model_dump(by_alias=True)
    await db.token.insert_one(token)
    return json(token)


@app.route('/bulldozer/v2/tokens/<token>', methods=["PATCH", ],
           ctx_label='secret')
@validate(json=TokenPatchIn)
async def update_token(request, body: TokenPatchIn, token: str):
    """
    updates token
    :param request:
    :param token:
    :return:
    """
    o = await db.token.find_one({
        "$and": [
            {"deleted_at": 0},
            {
                "$or": [
                    {"token": token},
                    {"_id": token}
                ]
            }
        ]
    })
    if not o:
        raise SanicException("Token not found", status_code=404)
    if body.disabled is not None:
        await db.token.update_one({"_id": o["_id"]},
                                  {"$set": {"disabled": body.disabled}})
        o = await db.token.find_one({"_id": o["_id"]})
    return json(o)


@app.route('/bulldozer/v2/tokens/<token>', methods=["DELETE", ],
           ctx_label='secret')
async def delete_token(request, token: str):
    """
    deletes token
    :param request:
    :param token:
    :return:
    """
    token = await db.token.find_one(
        {
            "$or": [
                {"token": token},
                {"_id": token}
            ]}
    )
    if not token:
        raise SanicException("Token not found", status_code=404)
    token_id = token["_id"]
    await db.token.update_one(
        {"_id": token_id}, {
            '$set': {
                "deleted_at": utcnow_timestamp(),
            }
        })
    return json(
        '',
        status=204
    )


async def _create_template(**kwargs) -> dict:
    template = Template(**kwargs).model_dump(by_alias=True)
    await db.template.insert_one(template)
    return template


@app.route('/bulldozer/v2/templates', methods=["POST", ], ctx_label='token')
@validate(json=TemplatePostIn)
async def create_template(request, body: TemplatePostIn):
    token = request.ctx.token
    o = await db.template.find_one(
        {"$and": [
            {"token": token},
            {"name": body.name},
            {"deleted_at": 0}
        ]})
    if o:
        raise SanicException(
            f"Template with name {body.name} exists", status_code=409)
    template = await _create_template(
            token=token, **body.model_dump(exclude_unset=True))
    await publish_activities_task(
        token, template["_id"], template.get("name"), "runset_template",
        "runset_template_created"
    )
    return json(template, status=201)


@app.route('/bulldozer/v2/templates/', methods=["GET", ], ctx_label='token')
async def get_templates(request):
    """
    get templates
    :param request:
    :return:
    """
    token = request.ctx.token
    res = [doc async for doc in db.template.find(
        {"$and": [
            {"token": token},
            {"deleted_at": 0}
        ]})]
    return json(res)


@app.route('/bulldozer/v2/templates/<id_>', methods=["GET", ],
           ctx_label='token')
async def get_template(request, id_: str):
    """
    gets template
    :param request:
    :param id_
    :return:
    """
    token = request.ctx.token
    o = await db.template.find_one(
        {"$and": [
            {"token": token},
            {"_id": id_},
            {"deleted_at": 0}
        ]})
    if not o:
        raise SanicException("Template not found", status_code=404)
    return json(o)


@app.route('/bulldozer/v2/templates/<id_>', methods=["PATCH", ],
           ctx_label='token')
@validate(json=TemplatePatchIn)
async def update_template(request, id_: str, body: TemplatePatchIn):
    """
    update template
    :param request:
    :param id_
    :return:
    """
    token = request.ctx.token
    o = await db.template.find_one(
        {"$and": [
            {"token": token},
            {"_id": id_},
            {"deleted_at": 0}
        ]})
    if not o:
        raise SanicException("Template not found", status_code=404)
    if body.name is not None:
        if body.name != o["name"]:
            o = await db.template.find_one(
                {"$and": [
                    {"token": token},
                    {"name": body.name},
                    {"deleted_at": 0}
                ]})
            if o:
                raise SanicException(
                    f"Template with {body.name} exists", status_code=409)
    d = body.model_dump(exclude_defaults=True)
    if d:
        await db.template.update_one(
            {"_id": id_}, {'$set': d})
    o = await db.template.find_one({"_id": id_})
    await publish_activities_task(
        token, id_, o.get("name"), "runset_template", "runset_template_updated"
    )
    return json(o)


@app.route('/bulldozer/v2/templates/<id_>', methods=["DELETE", ],
           ctx_label='token')
async def delete_template(request, id_: str):
    """
    Deletes template
    :param request:
    :param id_
    :return:
    """
    token = request.ctx.token
    # TODO: deleted?
    o = await db.template.find_one({"token": token, "_id": id_})
    if not o:
        raise SanicException("Template not found", status_code=404)
    # check for create runsets
    runset_ids = [doc["_id"] async for doc in db.runset.find(
        {"template_id": id_})]
    if runset_ids:
        runsets = ",".join(runset_ids)
        raise SanicException(f"Template has runsets: {runsets}",
                             status_code=409)

    await db.template.update_one({"_id": id_}, {'$set': {
        "deleted_at": utcnow_timestamp()
    }})
    await publish_activities_task(
        token, id_, o.get("name"), "runset_template", "runset_template_deleted"
    )
    return json("", status=204)


async def submit_tasks(runners, state):

    producer = TaskProducer()
    for runner in runners:
        task = {
            "state": state,
            "runner_id": runner,
            "try": 0,
            "updated": utcnow_timestamp(),
            "reason": "",
            "infra_try": 0
        }
        logger.info("submitting task for runner:%s, state:%d", runner, state)
        await TaskProducer.run_async(producer.create_task, task)


@app.route('/bulldozer/v2/templates/<template_id>/runsets', methods=["POST", ],
           ctx_label='token')
@validate(json=RunsetPostIn)
async def create_runset(request, template_id: str, body: RunsetPostIn):
    """
    Creates runset
    :param request:
    :param template_id:
    :param body:
    :return:
    """
    token = request.ctx.token
    o = await db.template.find_one(
        {"$and": [
            {"token": token},
            {"_id": template_id},
            {"deleted_at": 0}
        ]})
    if not o:
        raise SanicException(
            "Template not exists", status_code=404)
    runset_cnt = await db.runset.count_documents({"template_id": template_id})
    runset = Runset(token=token, number=runset_cnt + 1,
                    template_id=template_id, **body.model_dump(
                        exclude_unset=True)).model_dump(by_alias=True)
    # create runners
    runners_hp = permutation(body.hyperparameters)
    runners = list()
    max_runner_num = o["max_runner_num"]
    name_prefix = runset["name_prefix"]
    for num, i in enumerate(runners_hp):
        if num == max_runner_num:
            logger.info("Max runner limit is reached")
            break
        runner_name = f"{name_prefix}_{NameGenerator.get_random_name()}"
        runner_model = Runner(
            runset_id=runset['_id'],
            token=token,
            cloud_account_id=runset['cloud_account_id'],
            name=runner_name,
            region_id=runset['region_id'],
            instance_type=runset['instance_type'],
            name_prefix=runset['name_prefix'],
            task_id=runset['task_id'],
            commands=runset['commands'],
            destroy_conditions=runset['destroy_conditions'],
            spot_settings=runset['spot_settings'],
            open_ingress=runset['open_ingress'],
            tags=runset['tags'],
            hyperparameters=i
        )
        runner_params = runner_model.model_dump(by_alias=True)
        await db.runner.insert_one(runner_model.model_dump(by_alias=True))
        runners.append(runner_params["_id"])
        await publish_activities_task(
            token, runner_params["_id"], runner_name, "runner",
            "runner_created"
        )
    # submit tasks
    await submit_tasks(
        runners,
        TaskState.STARTING_PREPARING
    )

    await db.runset.insert_one(runset)
    await publish_activities_task(
        token, runset['_id'], runset.get('name'), "runset", "runset_created"
    )
    return json(runset, status=201)


@app.route('bulldozer/v2/templates/<template_id>/runsets', methods=["GET", ],
           ctx_label='token')
async def get_runsets(request, template_id: str):
    """
    get runsets
    :param request:
    :param template_id
    :return:
    """
    res = [doc async for doc in db.runset.find({"token": request.ctx.token,
                                                "template_id": template_id,
                                                "deleted_at": 0})]
    return json(res)


@app.route('/bulldozer/v2/runsets/<id_>', methods=["GET", ],
           ctx_label='secret_or_token')
async def get_runset(request, id_: str):
    """
    gets runsets
    :param request:
    :param id_
    :return:
    """
    token = getattr(request.ctx, 'token', None)
    if token:
        o = await db.runset.find_one({"token": token, "_id": id_})
    else:
        o = await db.runset.find_one({"_id": id_})
    if not o:
        raise SanicException("runset not found", status_code=404)
    runners = [doc async for doc in db.runner.find({"runset_id": id_})]

    cost = await CostCalc.run_async(
        cost_calc.calc_runset_cost,
        runners,
    )
    logger.info("cost for runset %s: %f", id_, cost)
    o["cost"] = cost
    return json(o)


@app.route('/bulldozer/v2/runsets/<id_>', methods=["PATCH", ],
           ctx_label='secret_or_token')
@validate(json=RunsetStatePatchIn)
async def set_runset_state(request, id_: str, body: RunsetStatePatchIn):
    """
    sets runset state (stop)
    :param request:
    :param id_:
    :param body:
    :return:
    """
    token = getattr(request.ctx, 'token', None)
    if token:
        o = await db.runset.find_one({"token": token, "_id": id_})
    else:
        o = await db.runset.find_one({"_id": id_})

    if not o:
        raise SanicException("runset not found", status_code=404)

    if not token:
        token = o.get("token")

    requestor_runner_id = body.runner_id
    state = body.state
    if requestor_runner_id:
        # if requestor runner id is set we should skip setting
        # destroy flag for it
        filter_ = {
                "$and": [
                    {"runset_id": id_},
                    {"_id": {"$nin": [requestor_runner_id]}},
                ]
            }
    else:
        filter_ = {"runset_id": id_}

    # to avoid conflicting tasks in queue, we just set destroy flag
    # worker will check this flag and destroy if it set
    await db.runner.update_many(filter_, {'$set': {
            "destroy": True}})

    await db.runset.update_one({"_id": id_}, {'$set': {
        "state": state}})

    o = await db.runset.find_one({"_id": id_})
    await publish_activities_task(
        token, id_, o.get("name"), "runset", "runset_state_updated",
        state=state
    )
    return json(o)


@app.route('/bulldozer/v2/runsets/<id_>/runners', methods=["GET", ],
           ctx_label='token')
async def get_runners(request, id_: str):
    """
    get runsets
    :param request:
    :param id_
    :return:
    """
    # TODO: exclude deleted
    runners = [doc async for doc in db.runner.find({"token": request.ctx.token,
                                                    "runset_id": id_})]
    for runner in runners:
        cost = await CostCalc.run_async(
            cost_calc.calc_runner_cost,
            runner
        )
        runner["cost"] = cost
    return json(runners)


@app.route('/bulldozer/v2/runners/<id_>', methods=["GET", ],
           ctx_label='secret')
async def get_runner(request, id_: str):
    """
    get runner
    :param request:
    :param id_
    :return:
    """
    # gets runner by secret
    o = await db.runner.find_one({"_id": id_})
    if not o:
        raise SanicException("runner not found", status_code=404)

    cost = await CostCalc.run_async(
        cost_calc.calc_runner_cost,
        o
    )
    o["cost"] = cost
    return json(o)


@app.route('/bulldozer/v2/runners', methods=["GET", ], ctx_label='token')
async def bulk_get_runners(request):
    """
    bulk get runners
    :param request:
    :return:
    """
    try:
        query = BulkRunnerQuery(**request.args)
    except ValidationError as e:
        raise SanicException(f'Invalid query params: {str(e)}',
                             status_code=400)
    runners = [doc async for doc in db.runner.find(
        {"runset_id": {"$in": query.runset_id}})]
    for runner in runners:
        cost = await CostCalc.run_async(
            cost_calc.calc_runner_cost,
            runner
        )
        runner["cost"] = cost
    return json(runners)


@app.route('/bulldozer/v2/runners/<id_>', methods=["PATCH", ],
           ctx_label='secret')
@validate(json=RunnerPatchIn)
async def update_runner(request, id_: str, body: RunnerPatchIn):
    """
    update runner
    :param request:
    :param id_:
    :param body:
    :return:
    """
    # updates runner by secret
    o = await db.runner.find_one({"_id": id_})
    if not o:
        raise SanicException("runner not found", status_code=404)

    runset_id = o["runset_id"]
    runset = await db.runset.find_one({"_id": runset_id})
    token = runset["token"]
    d = body.model_dump(exclude_defaults=True)
    if d:
        await db.runner.update_one({"_id": id_}, {"$set": d})
        if body.state:
            await publish_activities_task(
                token, id_, o.get("name"), "runner",
                "runner_state_updated", state=TaskState(d["state"]).name
            )
        if body.destroyed_at:
            await publish_activities_task(
                token, id_, o.get("name"), "runner", "runner_destroyed"
            )

    o = await db.runner.find_one({"_id": id_})

    sd = dict()
    runners = [doc async for doc in db.runner.find({"runset_id": runset_id})]
    if not runset.get("started_at", 0):
        started = sorted(
            list(filter(lambda x: x.get("started_at", 0) != 0, runners)),
            key=lambda s: s["started_at"]
        )
        if started:
            started_at = started[0]["started_at"]
            sd.update({"started_at": started_at})
    if not runset.get("destroyed_at", 0):
        if all(map(lambda x: x.get("destroyed_at", 0) != 0, runners)):
            destroyed_at = sorted(
                list(map(lambda x: x, runners)),
                key=lambda s: s["destroyed_at"])[-1]["destroyed_at"]
            sd.update({"destroyed_at": destroyed_at})

    # update runset state
    runner_state_map = {x["_id"]: x["state"] for x in runners}

    # TODO: check usage
    if all(map(lambda x: x["state"] == TaskState.ERROR, runners)):
        sd.update({"state": RunsetState.ERROR})
    elif any(map(lambda x: x["state"] == TaskState.STARTED, runners)
             ) and not all(map(
                 lambda x: x["state"] in [
                     TaskState.STARTING_PREPARING,
                     TaskState.STARTING,
                     TaskState.WAITING_ARCEE,
                     TaskState.DESTROYING_SCHEDULED,
                     TaskState.DESTROYING],
                 runners,
             )):
        sd.update({"state": RunsetState.STARTED})
    elif any(map(lambda x: x["state"] in [
        TaskState.STARTING_PREPARING,
        TaskState.STARTING,
        TaskState.WAITING_ARCEE
    ], runners)):
        sd.update({"state": RunsetState.RUNNING})
    elif any(map(lambda x: x["state"] in [
        TaskState.DESTROYING_SCHEDULED,
        TaskState.DESTROYING,
        TaskState.DESTROY_PREPARING
    ], runners)):
        sd.update({"state": RunsetState.STOPPING})
    elif any(map(lambda x: x["state"] == TaskState.DESTROYED, runners)
             ) and not all(map(lambda x: x["state"] in [
                                   TaskState.STARTING_PREPARING,
                                   TaskState.STARTING,
                                   TaskState.WAITING_ARCEE,
                                   TaskState.DESTROYING_SCHEDULED,
                                   TaskState.DESTROYING],
                               runners)):
        sd.update({"state": RunsetState.STOPPED})
    # log update state map
    logger.info(
        "runset: %s state map: %s, update: %s",
        runset_id,
        str(runner_state_map),
        str(sd)
    )

    if sd:
        await db.runset.update_one({"_id": runset_id}, {"$set": sd})
        if "state" in sd and sd["state"] != runset["state"]:
            await publish_activities_task(
                token, runset["_id"], runset.get("name"),
                "runset", "runset_state_updated",
                state=RunsetState(sd["state"]).name
            )
    return json(o)


if __name__ == '__main__':
    logger.info('Waiting for migration lock')
    # trick to lock migrations
    with EtcdLock(EtcdClient(host=etcd_host, port=etcd_port),
                  'bulldozer_migrations'):
        config_params = {
            'mongo_username': name,
            'mongo_password': password,
            'mongo_url': uri,
            'mongo_database': db_name,
            'mongo_migrations_path': os.path.join(
                os.path.dirname(os.path.abspath(__file__)), 'migrations')
        }
        manager = MigrationManager(config=Configuration(config=config_params))
        manager.run()
    logger.info('Starting server')
    app.run(host='0.0.0.0', port=8896)
