import logging
import uuid
from datetime import datetime, timezone
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import and_, exists

from rest_api.rest_api_server.utils import check_list_attribute, \
    check_dict_attribute
from tools.optscale_exceptions.common_exc import (
    ConflictException, WrongArgumentsException, NotFoundException)
from rest_api.rest_api_server.controllers.base import (
    BaseController, OrganizationValidatorMixin, MongoMixin,
    ResourceFormatMixin)
from rest_api.rest_api_server.controllers.base_async import (
    BaseAsyncControllerWrapper)
from rest_api.rest_api_server.controllers.cloud_resource import (
    CloudResourceController
)
from rest_api.rest_api_server.models.models import (
    PowerSchedule, PowerScheduleTrigger
)
from rest_api.rest_api_server.exceptions import Err

LOG = logging.getLogger(__name__)


class PowerScheduleController(BaseController, OrganizationValidatorMixin,
                              MongoMixin, ResourceFormatMixin):
    def __init__(self, db_session, config=None, token=None, engine=None):
        super().__init__(db_session, config, token, engine)
        self._power_schedule_trigger_ctrl = None

    def _get_model_type(self):
        return PowerSchedule

    def _validate(self, item, is_new=True, **kwargs):
        query = self.session.query(exists().where(
            and_(*(item.get_uniqueness_filter(is_new)))))
        ps_exists = query.scalar()
        if ps_exists:
            raise ConflictException(Err.OE0149, [
                self.model_type.__name__, kwargs['name']])
        if (item.end_date and item.start_date and
                item.start_date >= item.end_date):
            raise WrongArgumentsException(
                Err.OE0541, ['start_date', 'end_date'])
        now = int(datetime.now(tz=timezone.utc).timestamp())
        end_date = kwargs.get('end_date')
        if isinstance(end_date, int) and end_date < now:
            raise WrongArgumentsException(Err.OE0461, ['end_date'])

    def _set_resources(self, power_schedule, show_resources=False):
        resources = list(self.resources_collection.find(
            {'power_schedule': power_schedule['id']}))
        power_schedule['resources_count'] = len(resources)
        if show_resources:
            power_schedule['resources'] = []
            res_ctrl = CloudResourceController(
                self.session, self._config, self.token)
            for resource in resources:
                resource = self.format_resource(resource)
                resource.update(
                    {'details': res_ctrl.get_resource_details(resource)})
                power_schedule['resources'].append(resource)

    @staticmethod
    def _validate_triggers(triggers):
        check_list_attribute('triggers', triggers)
        times = []
        required = ('action', 'time')
        for trigger in triggers:
            check_dict_attribute('trigger', trigger)
            unexpected = set(trigger.keys()) - set(required)
            if unexpected:
                raise WrongArgumentsException(
                    Err.OE0212, [', '.join(unexpected)])
            missing = set(required) - set(trigger.keys())
            if missing:
                raise WrongArgumentsException(Err.OE0216, [missing.pop()])
            time = trigger.get('time')
            if time in times:
                raise WrongArgumentsException(Err.OE0562, [time])
            times.append(time)

    def _create_triggers(self, power_schedule_id, triggers):
        for trigger in triggers:
            self.session.add(PowerScheduleTrigger(
                power_schedule_id=power_schedule_id, **trigger))

    def _delete_triggers(self, power_schedule_id):
        self.session.query(PowerScheduleTrigger).filter(
            PowerScheduleTrigger.power_schedule_id == power_schedule_id,
        ).delete()

    def create(self, organization_id: str, **kwargs):
        self.check_organization(organization_id)
        start_date = kwargs.get('start_date')
        if start_date is None:
            kwargs['start_date'] = int(datetime.now(timezone.utc).timestamp())
        triggers = kwargs.pop("triggers", [])
        self._validate_triggers(triggers)
        self.check_create_restrictions(**kwargs)
        try:
            ps_id = str(uuid.uuid4())
            item = PowerSchedule(id=ps_id, organization_id=organization_id,
                                 **kwargs)
            self._validate(item, True, **kwargs)
            LOG.info("Creating %s with parameters %s",
                     self._get_model_type().__name__, kwargs)
            self.session.add(item)
            self._create_triggers(ps_id, triggers)
            self.session.commit()
        except IntegrityError as ex:
            self.session.rollback()
            raise WrongArgumentsException(Err.OE0003, [str(ex)])
        except TypeError as ex:
            raise WrongArgumentsException(Err.OE0004, [str(ex)])
        power_schedule = item.to_dict()
        power_schedule['resources_count'] = 0
        self.publish_activities_task(
            organization_id, power_schedule["id"], "power_schedule",
            "power_schedule_created", {"object_name": power_schedule["name"]},
            "power_schedule.power_schedule_created"
        )
        return power_schedule

    def list(self, organization_id: str, **kwargs):
        if organization_id:
            self.check_organization(organization_id)
        result = []
        ps_list = super().list(organization_id=organization_id)
        for ps in ps_list:
            ps = ps.to_dict()
            self._set_resources(ps, show_resources=False)
            result.append(ps)
        return result

    def get_item(self, item_id: str):
        item = super().get(item_id)
        if not item:
            raise NotFoundException(
                Err.OE0002, [self.model_type.__name__, item_id])
        item = item.to_dict()
        self._set_resources(item, show_resources=True)
        return item

    def edit(self, item_id: str, **kwargs):
        item = super().get(item_id)
        if not item:
            raise NotFoundException(
                Err.OE0002, [self.model_type.__name__, item_id])
        triggers = kwargs.pop("triggers", None)
        if triggers is not None:
            self._validate_triggers(triggers)
            self._delete_triggers(item_id)
            self._create_triggers(item_id, triggers)
            if not kwargs:
                self.session.commit()
        super().edit(item_id, **kwargs)
        schedule = self.get_item(item_id)
        self._set_resources(schedule, show_resources=True)
        # not spam events on every schedule run
        if set(kwargs) - {'last_eval', 'last_run_error', 'last_run'}:
            self.publish_activities_task(
                item.organization_id, item_id, "power_schedule",
                "power_schedule_updated", {"object_name": item.name},
                "power_schedule.power_schedule_created"
            )
        return schedule

    def bulk_action(self, power_schedule_id: str, data: dict):
        item = super().get(power_schedule_id)
        if not item:
            raise NotFoundException(
                Err.OE0002, [self.model_type.__name__, power_schedule_id])
        action = data['action']
        instance_ids = data['instance_id']
        resources = self.resources_collection.find(
            {'_id': {'$in': instance_ids}, 'resource_type': 'Instance',
             'active': True}, ['_id'])
        res_exist = [x['_id'] for x in resources]
        if res_exist and action == 'attach':
            self.resources_collection.update_many(
                {'_id': {'$in': res_exist}},
                {'$set': {'power_schedule': power_schedule_id}})
        elif res_exist and action == 'detach':
            self.resources_collection.update_many(
                {'_id': {'$in': res_exist}},
                {'$unset': {'power_schedule': 1}})
        failed = [x for x in instance_ids if x not in res_exist]
        return {
            'failed': failed,
            'succeeded': res_exist
        }

    def delete(self, power_schedule_id):
        item = super().get(power_schedule_id)
        if not item:
            raise NotFoundException(
                Err.OE0002, [self.model_type.__name__, power_schedule_id])
        self.resources_collection.update_many(
            {'power_schedule': power_schedule_id},
            {'$unset': {'power_schedule': 1}})
        self.publish_activities_task(
            item.organization_id, power_schedule_id, "power_schedule",
            "power_schedule_deleted", {"object_name": item.name},
            "power_schedule.power_schedule_deleted"
        )
        self._delete_triggers(power_schedule_id)
        super().delete(power_schedule_id)


class PowerScheduleAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self) -> type:
        return PowerScheduleController
