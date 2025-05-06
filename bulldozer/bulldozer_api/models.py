import uuid
from enum import Enum
from typing import List, Optional
from pydantic import (
    BaseModel, ConfigDict, Field, PositiveInt, model_validator
)
from sanic.exceptions import SanicException

from tools.optscale_time.optscale_time import utcnow_timestamp

from bulldozer.bulldozer_api.name_generator import NameGenerator


DEFAULT_VENV = "/tmp/optscale-venv"


class RunsetState(int, Enum):
    CREATED = 1
    RUNNING = 2
    STOPPING = 3
    ERROR = 4
    STARTED = 5
    STOPPED = 6


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


class BaseClass(BaseModel):
    model_config = ConfigDict(extra="forbid")


id_ = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
now = Field(default_factory=lambda: utcnow_timestamp())


class TokenPostIn(BaseClass):
    token: str


class TokenPatchIn(BaseClass):
    disabled: bool = None


class Token(TokenPostIn, TokenPatchIn):
    id: str = id_
    created_at: int = now
    deleted_at: int = 0


class TemplatePatchIn(BaseClass):
    name: Optional[str] = None
    task_ids: Optional[List[str]] = []
    cloud_account_ids: Optional[List[str]] = []
    region_ids: Optional[List[str]] = []
    instance_types: Optional[List[str]] = []
    budget: Optional[int] = None
    name_prefix: Optional[str] = None
    tags: Optional[dict] = {}
    hyperparameters: Optional[dict] = {}
    max_runner_num: Optional[int] = None

    @model_validator(mode="after")
    def set_task_ids(self):
        if self.task_ids:
            self.task_ids = list(set(self.task_ids))
        return self

    @model_validator(mode="after")
    def set_cloud_account_ids(self):
        if self.cloud_account_ids:
            self.cloud_account_ids = list(set(self.cloud_account_ids))
        return self

    @model_validator(mode="after")
    def set_region_ids(self):
        if self.region_ids:
            self.region_ids = list(set(self.region_ids))
        return self

    @model_validator(mode="after")
    def set_instance_types(self):
        if self.instance_types:
            self.instance_types = list(set(self.instance_types))
        return self

    @model_validator(mode="after")
    def validate_hyperparameters(self):
        if self.hyperparameters:
            for k, v in self.hyperparameters.items():
                if k is None or v is None:
                    raise ValueError("hyperparameter value is not provided")
        return self

    @model_validator(mode="after")
    def validate_tags(self):
        if self.tags:
            for k, v in self.tags.items():
                if k is None or v is None:
                    raise ValueError("tag value is not provided")
        return self


class TemplatePostIn(TemplatePatchIn):
    name: str
    task_ids: List[str]
    cloud_account_ids: List[str]
    region_ids: List[str]
    instance_types: List[str]
    budget: int
    name_prefix: str
    max_runner_num: PositiveInt = 15

    @model_validator(mode="after")
    def set_task_ids(self):
        if self.task_ids:
            self.task_ids = list(set(self.task_ids))
        else:
            raise ValueError("At least 1 task is required")
        return self

    @model_validator(mode="after")
    def set_cloud_account_ids(self):
        if self.cloud_account_ids:
            self.cloud_account_ids = list(set(self.cloud_account_ids))
        else:
            raise ValueError("At least 1 cloud account is required")
        return self

    @model_validator(mode="after")
    def set_region_ids(self):
        if self.region_ids:
            self.region_ids = list(set(self.region_ids))
        else:
            raise ValueError("At least 1 region is required")
        return self

    @model_validator(mode="after")
    def set_instance_types(self):
        if self.instance_types:
            self.instance_types = list(set(self.instance_types))
        else:
            raise ValueError("At least 1 instance type is required")
        return self


class Template(TemplatePostIn):
    id: str = id_
    token: str
    created_at: int = now
    deleted_at: int = 0


class BulkRunnerQuery(BaseModel):
    runset_id: List[str]

    @model_validator(mode="after")
    def validate_runset_id(self):
        if isinstance(self.runset_id, str):
            self.runset_id = [self.runset_id]
        if len(self.runset_id) < 1:
            raise ValueError("at least one param required")


class RunnerPatchIn(BaseClass):
    return_code: Optional[int] = None
    reason: Optional[str] = None
    instance_id: Optional[str] = None
    state: Optional[int] = None
    name: Optional[str] = None
    ip_addr: Optional[str] = None
    run_id: Optional[str] = None
    destroyed_at: Optional[int] = None
    started_at: Optional[int] = None


class RunnerPostIn(RunnerPatchIn):
    state: int = TaskState.STARTING_PREPARING
    token: str
    runset_id: str
    cloud_account_id: str
    hyperparameters: dict
    region_id: str
    instance_type: str
    name_prefix: str
    task_id: str
    tags: dict
    destroy_conditions: dict
    commands: str
    spot_settings: dict
    open_ingress: bool


class Runner(RunnerPostIn):
    id: str = id_
    state: int = 0
    started_at: int = 0
    destroyed_at: int = 0
    created_at: int = now


class RunsetStatePatchIn(BaseClass):
    state: Optional[int] = None
    runner_id: Optional[str] = None

    @model_validator(mode="after")
    def check_state(self):
        if self.state and self.state not in [
                getattr(RunsetState, x) for x in dir(RunsetState)
                if not callable(getattr(RunsetState, x)) and not x.startswith(
                "__")
        ]:
            raise ValueError(f"Unknown state: {self.state}")
        elif self.state and self.state != RunsetState.STOPPED:
            raise SanicException("only stop state is supported",
                                 status_code=409)
        return self


random_name = Field(default_factory=lambda: NameGenerator.get_random_name())


class RunsetPostIn(BaseClass):
    name: str = random_name
    state: int = RunsetState.CREATED
    task_id: str
    cloud_account_id: str
    region_id: str
    instance_type: str
    name_prefix: str
    image: str = ""
    venv: str = DEFAULT_VENV
    tags: dict
    hyperparameters: dict
    destroy_conditions: dict
    commands: str
    spot_settings: dict
    owner_id: str
    open_ingress: Optional[bool] = False


class Runset(RunsetPostIn):
    id: str = id_
    template_id: str
    token: str
    number: int = 0
    state: int = 0
    started_at: int = 0
    destroyed_at: int = 0
    created_at: int = now
    deleted_at: int = 0
