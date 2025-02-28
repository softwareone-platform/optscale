import logging

from sqlalchemy.sql import and_

from tools.cloud_adapter.model import ResourceTypes, RES_MODEL_MAP
from tools.optscale_time import utcfromtimestamp
from rest_api.rest_api_server.controllers.base import BaseController
from rest_api.rest_api_server.controllers.base_async import (
    BaseAsyncControllerWrapper
)
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.models.models import (
    CloudAccount, DiscoveryInfo, Organization)

from tools.optscale_exceptions.common_exc import (
    NotFoundException, WrongArgumentsException)

LOG = logging.getLogger(__name__)


class DiscoveryInfoController(BaseController):
    def _get_model_type(self):
        return DiscoveryInfo

    @staticmethod
    def initialize_discovery_infos(cloud_account_id, adapter_cls, config):
        adapter = adapter_cls(config)
        discovery_calls = adapter.discovery_calls_map()
        cloud_resource_types = [
            ResourceTypes[rt] for rt, model in RES_MODEL_MAP.items()
            if model in discovery_calls.keys()]
        return [DiscoveryInfo(
            cloud_account_id=cloud_account_id, resource_type=rt
        ) for rt in cloud_resource_types]

    def switch_enable(self, cloud_account_id, resource_type, enabled):
        discovery_infos = self.list(cloud_account_id,
                                    resource_type=resource_type)
        if len(discovery_infos) > 1:
            raise WrongArgumentsException(Err.OE0177, [])
        if len(discovery_infos) == 0:
            raise NotFoundException(
                Err.OE0002, [DiscoveryInfo.__name__, resource_type])
        discovery_info = discovery_infos[0]
        return super().edit(discovery_info.id, enabled=enabled)

    def check_cloud_acc_and_org(self, cloud_account_id):
        data_set = self.session.query(
            CloudAccount, Organization
        ).outerjoin(Organization, and_(
            Organization.id == CloudAccount.organization_id,
            Organization.deleted.is_(False)
        )).filter(and_(
            CloudAccount.id == cloud_account_id,
            CloudAccount.deleted.is_(False)
        )).one_or_none()
        if data_set:
            cloud_acc, org = data_set
            if not org:
                raise NotFoundException(
                    Err.OE0002,
                    [Organization.__name__, cloud_acc.organization_id])
        else:
            raise NotFoundException(
                Err.OE0002,
                [CloudAccount.__name__, cloud_account_id])

    def list(self, cloud_account_id, **kwargs):
        resource_type = kwargs.get('resource_type')
        if (resource_type and
                resource_type not in ResourceTypes.__members__):
            raise WrongArgumentsException(Err.OE0384, [resource_type])
        self.check_cloud_acc_and_org(cloud_account_id)
        data_set_q = self.session.query(DiscoveryInfo).filter(and_(
            DiscoveryInfo.deleted.is_(False),
            DiscoveryInfo.cloud_account_id == cloud_account_id))
        if resource_type:
            data_set_q = data_set_q.filter(
                DiscoveryInfo.resource_type == resource_type)
        res = data_set_q.all()
        return list(res)

    def edit(self, item_id, **kwargs):
        last_error_at = kwargs.get('last_error_at')
        if last_error_at:
            # send event once a day
            item = self.get(item_id)
            old_date_t = tuple(utcfromtimestamp(
                item.last_error_at).timetuple())[:3]
            new_date_t = tuple(utcfromtimestamp(last_error_at).timetuple())[:3]
            if new_date_t != old_date_t:
                cloud_account = self.session.query(CloudAccount).filter(
                    CloudAccount.id == item.cloud_account_id).one_or_none()
                action = 'resource_discovery_failed'
                object_type = 'cloud_account'
                meta = {
                    'object_name': cloud_account.name,
                    'resource_type': item.to_dict()['resource_type'],
                    'message': kwargs.get('last_error')
                }
                self.publish_activities_task(
                    cloud_account.organization_id, item.cloud_account_id,
                    object_type, action, meta, '.'.join([object_type, action]))
        return super().edit(item_id, **kwargs)


class DiscoveryInfoAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return DiscoveryInfoController
