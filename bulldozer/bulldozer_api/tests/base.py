import uuid
from mongomock_motor import AsyncMongoMockClient
from optscale_client.aconfig_cl.aconfig_cl import AConfigCl
from bulldozer.bulldozer_api.models import RunsetState


DB_MOCK = AsyncMongoMockClient()["bulldozer"]

TOKEN = "token_value"
SECRET = "secret"


class AConfigClMock(AConfigCl):

    async def bulldozer_params(self):
        return "mongodb://name:password@127.0.0.1:80", "bulldozer"

    async def cluster_secret(self):
        return SECRET


class Urls:
    template = "/bulldozer/v2/templates/{}"
    templates = "/bulldozer/v2/templates"
    token = "/bulldozer/v2/tokens/{}"
    tokens = "/bulldozer/v2/tokens"
    runner = "/bulldozer/v2/runners/{}"
    runners = "/bulldozer/v2/runners"
    runners_for_runset = "/bulldozer/v2/runsets/{}/runners"
    runset = "/bulldozer/v2/runsets/{}"
    runsets = "/bulldozer/v2/templates/{}/runsets"


async def prepare_token():
    await DB_MOCK["token"].insert_one(
        {"_id": str(uuid.uuid4()), "token": TOKEN, "disabled": False,
         "deleted_at": 0})
    return await DB_MOCK["token"].find_one({"token": TOKEN})


async def prepare_template():
    template = {
        "_id": str(uuid.uuid4()),
        "token": TOKEN,
        "name": "my template",
        "name_prefix": "my template",
        "budget": 100,
        "task_ids": ["task_id"],
        "instance_types": ["t2.large"],
        "region_ids": ["us-east-1"],
        "cloud_account_ids": ["cloud_account_id"],
        "tags": {"key": "value"},
        "hyperparameters": {"hyperparam_key": "hyperparam_value"},
        "max_runner_num": 15,
        "created_at": 1,
        "deleted_at": 0
    }
    await DB_MOCK["template"].insert_one(template)
    return await DB_MOCK["template"].find_one({"_id": template["_id"]})


async def prepare_runset(template_id):
    runset = {
        "_id": str(uuid.uuid4()),
        "token": TOKEN,
        "template_id": template_id,
        "name": "my runset",
        "name_prefix": "my runset",
        "number": 7,
        "state": RunsetState.CREATED,
        "task_id": "task_id",
        "instance_type": "t2.large",
        "region_id": "us-east-1",
        "cloud_account_id": "cloud_account_id",
        "tags": {"key": "value"},
        "destroy_conditions": {"max_budget": 1, "reached_goals": True},
        "hyperparameters": {"hyperparam_key": "hyperparam_value"},
        "owner_id": str(uuid.uuid4()),
        "open_ingress": False,
        "image": "",
        "commands": "rm -rf /test",
        "spot_settings": {"tries": 1},
        "created_at": 1,
        "started_at": 1,
        "destroyed_at": 0,
        "deleted_at": 0
    }
    await DB_MOCK["runset"].insert_one(runset)
    return await DB_MOCK["runset"].find_one({"_id": runset["_id"]})


async def prepare_runner(runset_id):
    runner = {
        "_id": str(uuid.uuid4()),
        "runset_id": runset_id,
        "state": 7,
        "cloud_account_id": "cloud_account_id",
        "hyperparameters": {"EPOCHS": "2"},
        "region_id": "us-west-1",
        "instance_type": "t2.large",
        "name_prefix": "test",
        "tags": {"test": "test"},
        "destroy_conditions": {"max_budget": 1, "max_duration": 300},
        "commands": "rm -rf /test",
        "token": TOKEN,
        "created_at": 1,
        "destroyed_at": 2,
        "started_at": 1,
        "name": "tm_jovial_johnson",
        "instance_id": "i-0f7180da11b8f941c",
        "ip_addr": "54.151.86.224",
        "return_code": 0,
        "run_id": "73104139-46cf-4e30-af4c-71e146f268a2",
        "reason": "task completed successfully",
        "task_id": "task_id"
    }
    await DB_MOCK["runner"].insert_one(runner)
    return await DB_MOCK["runner"].find_one({"_id": runner["_id"]})
