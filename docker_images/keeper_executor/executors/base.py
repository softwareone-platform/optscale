import hashlib
import logging
import requests
from optscale_client.auth_client.client_v2 import Client as AuthClient
from optscale_client.report_client.client_v2 import Client as ReportClient
from optscale_client.rest_api_client.client_v2 import Client as RestClient

LOG = logging.getLogger(__name__)


class BaseEventExecutor:
    def __init__(self, config_client):
        self.config_cl = config_client
        self._auth_cl = None
        self._report_cl = None
        self._rest_cl = None

    @property
    def action_event_map(self):
        return {}

    def routing_keys(self):
        return list(self.action_event_map.keys())

    @property
    def auth_cl(self):
        if not self._auth_cl:
            self._auth_cl = AuthClient(
                url=self.config_cl.auth_url(),
                secret=self.config_cl.cluster_secret()
            )
        return self._auth_cl

    @property
    def rest_cl(self):
        if self._rest_cl is None:
            self._rest_cl = RestClient(
                url=self.config_cl.restapi_url(),
                secret=self.config_cl.cluster_secret(),
                verify=False)
        return self._rest_cl

    @property
    def report_cl(self):
        if not self._report_cl:
            self._report_cl = ReportClient(
                url=self.config_cl.keeper_url(),
                secret=self.config_cl.cluster_secret()
            )
        return self._report_cl

    def get_user_id(self, token):
        user_digest = hashlib.md5(token.encode('utf-8')).hexdigest()
        _, token_meta = self.auth_cl.token_meta_get([user_digest])
        return token_meta.get(user_digest, {}).get('user_id')

    def _get_user(self, token):
        user_id = self.get_user_id(token)
        if user_id is None:
            return {}
        self.auth_cl.token = token
        _, user = self.auth_cl.user_get(user_id)
        return user

    def _get_user_info(self, token):
        if not token:
            return None, None, None
        user_info = {}
        try:
            user_info = self._get_user(token)
        except requests.exceptions.HTTPError as ex:
            LOG.exception("Service call error: %s", str(ex))
        user_id = user_info.get('id', None)
        user_display_name = user_info.get('display_name', None)
        user_email = user_info.get('email', None)
        return user_id, user_display_name, user_email

    @staticmethod
    def get_localized(localized_code: str, param_list: list, params: dict):
        localized_tmp = localized_code + '(' + ','.join(
            ['{' + param + '}' for param in param_list]) + ')'
        return localized_tmp.format(**params)

    def push_event(
            self, evt_class, organization_id, level='INFO', object_id=None,
            object_type=None, object_name=None, description=None,
            localized=None, ack=False, user_display_name=None,
            user_id=None):
        event = {
            'level': level,
            'evt_class': evt_class,
            'object_id': object_id,
            'object_type': object_type,
            'object_name': object_name,
            'organization_id': organization_id,
            'description': description,
            'localized': localized,
            'ack': ack,
            'initiator_id': user_id,
            'initiator_name': user_display_name,
        }
        self.report_cl.event_submit(**event)

    def _execute(self, event, body):
        raise NotImplementedError

    def _custom_format_params(self, task):
        return task

    def execute(self, task):
        action = task.get('action')
        event = self.action_event_map.get(action)
        if not event:
            LOG.error('Invalid action: %s', action)
            return
        task = self._custom_format_params(task)
        event_params = self._execute(event, task)
        self.push_event(**event_params)
