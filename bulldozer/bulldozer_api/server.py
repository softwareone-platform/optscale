import datetime
import asyncio
from typing import Tuple
from enum import Enum
import os
import uuid
from sanic import Sanic
from sanic.response import json
from sanic.log import logger
from sanic.exceptions import SanicException
import motor.motor_asyncio
from etcd import Lock as EtcdLock, Client as EtcdClient
from mongodb_migrations.cli import MigrationManager
from mongodb_migrations.config import Configuration

from bulldozer.bulldozer_api.cost_calc import CostCalc
from bulldozer.bulldozer_api.producer import (
    ActivitiesTaskProducer, TaskProducer
)
from bulldozer.bulldozer_api.name_generator import NameGenerator
from bulldozer.bulldozer_api.utils import permutation

from optscale_client.aconfig_cl.aconfig_cl import AConfigCl
from tools.optscale_time import utcnow_timestamp

app = Sanic("bulldozer")


etcd_host = os.environ.get('HX_ETCD_HOST')
etcd_port = int(os.environ.get('HX_ETCD_PORT'))
config_client = AConfigCl(host=etcd_host, port=etcd_port)


class TaskState(int, Enum):
    STARTING_PREPARING = 1
    STARTING = 2
    STARTED = 3
    DESTROYING_SCHEDULED = 4
    DESTROY_PREPARING = 5
    DESTROYING = 6
    DESTROYED = 7
    ERROR = 9
    WAITING_ARCEE = 10


class RunsetState(int, Enum):
    CREATED = 1
    RUNNING = 2
    STOPPING = 3
    ERROR = 4
    STARTED = 5
    STOPPED = 6


# runner number is limited
MAX_RUNNER_NUM = 15


def get_db_params() -> Tuple[str, str, str, str, str]:
    db_params = config_client.bulldozer_params()
    return asyncio.run(db_params)


async def get_cluster_secret() -> str:
    return await config_client.cluster_secret()


name, password, host, port, db_name = get_db_params()
uri = f"mongodb://{name}:{password}@{host}:{port}/admin"
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


async def extract_token(request):
    # TODO: middleware
    token = request.headers.get('x-api-key')
    if not token:
        raise SanicException("API key is required", status_code=401)
    return token


async def check_token(token):
    token = await db.token.find_one({
        "$and": [
            {"deleted_at": 0},
            {"token": token},
        ]
    })
    if not token:
        raise SanicException("Token not found", status_code=401)


async def extract_secret(request, raise_on):
    # TODO: middleware
    secret = request.headers.get('Secret')
    if not secret:
        if raise_on:
            raise SanicException("secret is required", status_code=401)
    return secret


async def check_secret(request, raise_on=True):
    secret = await extract_secret(request, raise_on)
    required = await get_cluster_secret()
    if raise_on:
        if secret != required:
            raise SanicException("secret is invalid", status_code=401)
    return secret == required


@app.route('/bulldozer/v2/tokens/<token>', methods=["GET", ])
async def get_token(request, token: str):
    """
    get token
    :param request:
    :param token:
    :return:
    """
    await check_secret(request)
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


@app.route('/bulldozer/v2/tokens', methods=["POST", ])
async def create_token(request):
    """
    creates token
    :param request:
    :return:
    """
    await check_secret(request)
    doc = request.json
    token = doc.get("token")
    if not token:
        raise SanicException('token is required', status_code=400)
    o = await db.token.find_one({"token": token})
    if o:
        raise SanicException("Token exists", status_code=409)
    d = {
        "_id": str(uuid.uuid4()),
        "token": token,
        "created": utcnow_timestamp(),
        "deleted_at": 0,
    }
    await db.token.insert_one(
        d
    )
    return json(d)


@app.route('/bulldozer/v2/tokens/<token>', methods=["DELETE", ])
async def delete_token(request, token: str):
    """
    deletes token
    :param request:
    :param token:
    :return:
    """
    await check_secret(request)
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


@app.route('/bulldozer/v2/templates', methods=["POST", ])
async def create_template(request):
    token = await extract_token(request)
    await check_token(token)
    doc = request.json
    # TODO: validators
    template_name = doc.get("name")
    if not template_name or not isinstance(template_name, str):
        raise SanicException("Name required and should be string",
                             status_code=400)
    o = await db.template.find_one(
        {"$and": [
            {"token": token},
            {"name": template_name},
            {"deleted_at": 0}
        ]})
    if o:
        raise SanicException(
            f"Template with {template_name} exists", status_code=409)
    task_ids = (doc.get("task_ids") or list())
    cloud_account_ids = (doc.get("cloud_account_ids") or list())

    if len(task_ids) < 1:
        raise SanicException("At least 1 task is required",
                             status_code=400)
    region_ids = (doc.get("region_ids") or list())
    if len(region_ids) < 1:
        raise SanicException("At least 1 region is required",
                             status_code=400)
    instance_types = (doc.get("instance_types") or list())
    if len(instance_types) < 1:
        raise SanicException("At least 1 instance type is required",
                             status_code=400)
    # TODO: raise if not set?
    budget = (doc.get("budget") or 0.00)
    name_prefix = doc.get("name_prefix")
    if not name_prefix:
        raise SanicException("name_prefix is required",
                             status_code=400)
    tags = (doc.get("tags") or dict())
    hyperparameters = doc.get("hyperparameters")
    runset_template_id = str(uuid.uuid4())
    d = {
        "_id": runset_template_id,
        "name": template_name,
        "task_ids": task_ids,
        "cloud_account_ids": cloud_account_ids,
        "region_ids": region_ids,
        "instance_types": instance_types,
        "budget": budget,
        "name_prefix": name_prefix,
        "token": token,
        "tags": tags,
        "hyperparameters": hyperparameters,
        "created_at": utcnow_timestamp(),
        "deleted_at": 0
    }
    await db.template.insert_one(d)
    await publish_activities_task(
        token, runset_template_id, template_name, "runset_template",
        "runset_template_created"
    )
    return json(d, status=201)


@app.route('/bulldozer/v2/templates/', methods=["GET", ])
async def get_templates(request):
    """
    get templates
    :param request:
    :return:
    """
    token = await extract_token(request)
    await check_token(token)
    # TODO: exclude deleted
    res = [doc async for doc in db.template.find(
        {"$and": [
            {"token": token},
            {"deleted_at": 0}
        ]})]
    return json(res)


@app.route('/bulldozer/v2/templates/<id_>', methods=["GET", ])
async def get_template(request, id_: str):
    """
    gets template
    :param request:
    :param id_
    :return:
    """
    token = await extract_token(request)
    await check_token(token)
    o = await db.template.find_one(
        {"$and": [
            {"token": token},
            {"_id": id_},
            {"deleted_at": 0}
        ]})
    if not o:
        raise SanicException("Template not found", status_code=404)
    return json(o)


@app.route('/bulldozer/v2/templates/<id_>', methods=["PATCH", ])
async def update_template(request, id_: str):
    """
    update template
    :param request:
    :param id_
    :return:
    """
    token = await extract_token(request)
    await check_token(token)
    o = await db.template.find_one(
        {"$and": [
            {"token": token},
            {"_id": id_},
            {"deleted_at": 0}
        ]})
    if not o:
        raise SanicException("Template not found", status_code=404)
    doc = request.json
    # TODO: validators
    d = dict()
    template_name = doc.get("name")
    if template_name is not None:
        if not isinstance(template_name, str):
            raise SanicException("Name required and should be string",
                                 status_code=400)
        # TODO: exclude deleted
        if template_name != o["name"]:
            o = await db.template.find_one(
                {"$and": [
                    {"token": token},
                    {"name": template_name},
                    {"deleted_at": 0}
                ]})
            if o:
                raise SanicException(
                    f"Template with {template_name} exists", status_code=409)
        d.update({"name": template_name})

    task_ids = doc.get("task_ids")
    if task_ids is not None:
        if len(task_ids) < 1:
            raise SanicException("At least 1 task is required",
                                 status_code=400)
        d.update({"task_ids": task_ids})

    region_ids = doc.get("region_ids")
    if region_ids is not None:
        if len(region_ids) < 1:
            raise SanicException("At least 1 region is required",
                                 status_code=400)
        d.update({"region_ids": region_ids})

    instance_types = doc.get("instance_types")
    if instance_types is not None:
        if len(instance_types) < 1:
            raise SanicException("At least 1 instance type is required",
                                 status_code=400)
        d.update({"instance_types": instance_types})

    budget = doc.get("budget")
    if budget is not None:
        d.update({"budget": budget})

    name_prefix = doc.get("name_prefix")
    if name_prefix is not None:
        d.update({"name_prefix": name_prefix})

    cloud_account_ids = doc.get("cloud_account_ids")
    if cloud_account_ids is not None:
        d.update({"cloud_account_ids": cloud_account_ids})

    tags = doc.get("tags")
    if tags is not None:
        d.update({"tags": tags})

    hp = doc.get("hyperparameters")
    if hp is not None:
        d.update({"hyperparameters": hp})
    if d:
        await db.template.update_one(
            {"_id": id_}, {'$set': d})
    o = await db.template.find_one({"_id": id_})
    await publish_activities_task(
        token, id_, o.get("name"), "runset_template", "runset_template_updated"
    )
    return json(o)


@app.route('/bulldozer/v2/templates/<id_>', methods=["DELETE", ])
async def delete_template(request, id_: str):
    """
    Deletes template
    :param request:
    :param id_
    :return:
    """
    token = await extract_token(request)
    await check_token(token)
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


async def _create_runner(
        runset_id: str,
        cloud_account_id: str,
        hyperparameters: dict,
        region_id: str,
        instance_type: str,
        name_prefix: str,
        task_id: str,
        tags: dict,
        destroy_conditions: dict,
        commands: str,
        token: str,
        created_at: int,
        spot_settings: dict,
        open_ingress: bool,
):
    runner_name = f"{name_prefix}_{NameGenerator.get_random_name()}"
    runner = {
        "_id": str(uuid.uuid4()),
        "runset_id": runset_id,
        "state": TaskState.STARTING_PREPARING,
        "cloud_account_id": cloud_account_id,
        "hyperparameters": hyperparameters,
        "region_id": region_id,
        "instance_type": instance_type,
        "name_prefix": name_prefix,
        "task_id": task_id,
        "tags": tags,
        "destroy_conditions": destroy_conditions,
        "commands": commands,
        "token": token,
        "created_at": created_at,
        "destroyed_at": 0,
        "started_at": 0,
        "name": runner_name,
        "spot_settings": spot_settings,
        "open_ingress": open_ingress,
    }
    await db.runner.insert_one(runner)
    await publish_activities_task(
        token, runner["_id"], runner_name, "runner", "runner_created"
    )
    return runner["_id"]


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


@app.route('/bulldozer/v2/templates/<template_id>/runsets', methods=["POST", ])
async def create_runset(request, template_id: str):
    """
    Creates runset
    :param request:
    :param template_id:
    :return:
    """
    token = await extract_token(request)
    await check_token(token)
    doc = request.json
    # TODO: validators
    o = await db.template.find_one(
        {"$and": [
            {"token": token},
            {"_id": template_id},
            {"deleted_at": 0}
        ]})
    if not o:
        raise SanicException(
            "Template not exists", status_code=404)
    # TODO: strict check args!
    task_id = doc.get("task_id")
    cloud_account_id = doc.get("cloud_account_id")
    region_id = doc.get("region_id")
    instance_type = doc.get("instance_type")
    name_prefix = doc.get("name_prefix")
    tags = doc.get("tags")
    hyperparameters = doc.get("hyperparameters")
    destroy_conditions = doc.get("destroy_conditions")
    owner_id = doc.get("owner_id")
    commands = doc.get("commands")
    spot_settings = doc.get("spot_settings")
    open_ingress = doc.get("open_ingress", False)
    runset_id = str(uuid.uuid4())
    runset_cnt = await db.runset.count_documents({"template_id": template_id})
    runset_name = NameGenerator.get_random_name()
    created_at = utcnow_timestamp()
    d = {
        "_id": runset_id,
        "name": runset_name,
        "number": runset_cnt + 1,
        "template_id": template_id,
        "task_id": task_id,
        "cloud_account_id": cloud_account_id,
        "region_id": region_id,
        "instance_type": instance_type,
        "name_prefix": name_prefix,
        "tags": tags,
        "hyperparameters": hyperparameters,
        "destroy_conditions": destroy_conditions,
        "owner_id": owner_id,
        "commands": commands,
        "token": token,
        "state": RunsetState.CREATED,
        "created_at": created_at,
        "started_at": 0,
        "destroyed_at": 0,
        "deleted_at": 0,
        "spot_settings": spot_settings,
        "open_ingress": open_ingress,
    }
    # TODO: create runners
    runners_hp = permutation(hyperparameters)
    runners = list()
    for num, i in enumerate(runners_hp):
        if num == MAX_RUNNER_NUM:
            break
        id_ = await _create_runner(
            runset_id,
            cloud_account_id,
            i,
            region_id,
            instance_type,
            name_prefix,
            task_id,
            tags,
            destroy_conditions,
            commands,
            token,
            created_at,
            spot_settings,
            open_ingress,
        )
        runners.append(id_)
    # submit tasks
    await submit_tasks(
        runners,
        TaskState.STARTING_PREPARING
    )

    await db.runset.insert_one(d)
    await publish_activities_task(
        token, runset_id, runset_name, "runset", "runset_created"
    )
    return json(d, status=201)


@app.route('bulldozer/v2/templates/<template_id>/runsets', methods=["GET", ])
async def get_runsets(request, template_id: str):
    """
    get runsets
    :param request:
    :param template_id
    :return:
    """
    token = await extract_token(request)
    await check_token(token)
    # TODO: exclude deleted
    res = [doc async for doc in db.runset.find({"token": token,
                                                "template_id": template_id})]
    return json(res)


@app.route('/bulldozer/v2/runsets/<id_>', methods=["GET", ])
async def get_runset(request, id_: str):
    """
    gets runsets
    :param request:
    :param id_
    :return:
    """

    token = None
    res = await check_secret(request, False)
    if not res:
        token = await extract_token(request)
        await check_token(token)
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


@app.route('/bulldozer/v2/runsets/<id_>', methods=["PATCH", ])
async def set_runset_state(request, id_: str):
    """
    sets runset state (stop)
    :param request:
    :param id_
    :return:
    """
    token = None

    res = await check_secret(request, False)
    if not res:
        token = await extract_token(request)
        await check_token(token)
    if token:
        o = await db.runset.find_one({"token": token, "_id": id_})
    else:
        o = await db.runset.find_one({"_id": id_})

    if not o:
        raise SanicException("runset not found", status_code=404)

    if not token:
        token = o.get("token")

    doc = request.json
    # TODO: validators?
    state = doc.get("state")
    requestor_runner_id = doc.get("runner_id")

    if state not in [RunsetState.STOPPED]:
        raise SanicException(
            "only stop state is supported", status_code=409)

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


@app.route('/bulldozer/v2/runsets/<id_>/runners', methods=["GET", ])
async def get_runners(request, id_: str):
    """
    get runsets
    :param request:
    :param id_
    :return:
    """
    token = await extract_token(request)
    await check_token(token)
    # TODO: exclude deleted
    runners = [doc async for doc in db.runner.find({"token": token,
                                                    "runset_id": id_})]
    for runner in runners:
        cost = await CostCalc.run_async(
            cost_calc.calc_runner_cost,
            runner
        )
        runner["cost"] = cost
    return json(runners)


@app.route('/bulldozer/v2/runners/<id_>', methods=["GET", ])
async def get_runner(request, id_: str):
    """
    get runner
    :param request:
    :param id_
    :return:
    """
    # gets runner by secret
    await check_secret(request)
    o = await db.runner.find_one({"_id": id_})
    if not o:
        raise SanicException("runner not found", status_code=404)

    cost = await CostCalc.run_async(
        cost_calc.calc_runner_cost,
        o
    )
    o["cost"] = cost
    return json(o)


@app.route('/bulldozer/v2/runners', methods=["GET", ])
async def bulk_get_runners(request):
    """
    bulk get runners
    :param request:
    :return:
    """
    token = await extract_token(request)
    await check_token(token)

    runset_ids = []
    runset_id = "runset_id"
    args = request.args
    supported_keys = [runset_id]
    if len(args) < 1:
        raise SanicException("at list one param required", status_code=400)
    if not any(filter(lambda x: x in supported_keys, request.args.keys())):
        raise SanicException(f"{runset_id} is required", status_code=400)

    if runset_id in request.args.keys():
        runset_ids = request.args[runset_id]

    runners = [doc async for doc in db.runner.find(
        {"runset_id": {"$in": runset_ids}})]
    for runner in runners:
        cost = await CostCalc.run_async(
            cost_calc.calc_runner_cost,
            runner
        )
        runner["cost"] = cost
    return json(runners)


@app.route('/bulldozer/v2/runners/<id_>', methods=["PATCH", ])
async def update_runner(request, id_: str):
    """
    update runner
    :param request:
    :param id_
    :return:
    """
    # updates runner by secret
    await check_secret(request)
    o = await db.runner.find_one({"_id": id_})
    if not o:
        raise SanicException("run not found", status_code=404)
    doc = request.json
    return_code = doc.get("return_code")
    reason = doc.get("reason")
    instance_id = doc.get("instance_id")
    state = doc.get("state")
    runner_name = doc.get("name")
    ip_addr = doc.get("ip_addr")
    run_id = doc.get("run_id")
    destroyed_at = doc.get("destroyed_at")
    started_at = doc.get("started_at")

    sd = dict()
    if return_code is not None:
        sd.update({"return_code": return_code})

    if reason is not None:
        sd.update({"reason": reason})

    if instance_id is not None:
        sd.update({"instance_id": instance_id})

    if runner_name is not None:
        sd.update({"name": runner_name})

    if state is not None:
        sd.update({"state": state})

    if ip_addr is not None:
        sd.update({"ip_addr": ip_addr})

    if run_id is not None:
        sd.update({"run_id": run_id})

    if destroyed_at is not None:
        sd.update({"destroyed_at": destroyed_at})

    if started_at is not None:
        sd.update({"started_at": started_at})

    runset_id = o["runset_id"]
    runset = await db.runset.find_one({"_id": runset_id})
    token = runset["token"]
    if sd:
        await db.runner.update_one({"_id": id_}, {"$set": sd})
        if state:
            await publish_activities_task(
                token, id_, o.get("name"), "runner",
                "runner_state_updated", state=TaskState(sd["state"]).name
            )
        if destroyed_at:
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
            'mongo_url': "mongodb://{host}:{port}/admin".format(
                host=host, port=port),
            'mongo_database': db_name
        }
        manager = MigrationManager(config=Configuration(config=config_params))
        manager.run()
    logger.info('Starting server')
    app.run(host='0.0.0.0', port=8896)
