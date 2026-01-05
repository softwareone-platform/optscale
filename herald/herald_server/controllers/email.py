import json
import logging
import re

from herald.herald_server.controllers.base import BaseController
from herald.herald_server.controllers.base_async import BaseAsyncControllerWrapper
from herald.herald_server.utils import is_hystax_email

LOG = logging.getLogger(__name__)


class EmailAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return EmailController


class EmailController(BaseController):
    def skip_email_send(self, data):
        template_type = data.get("template_type")
        template_params = data.get("template_params", {})
        if template_type in ["new_employee", "new_cloud_account", "cloud_account_deleted"]:
            if template_params:
                auth_user_email = template_params.get("texts", {}).get("user_email")
                if auth_user_email is not None and is_hystax_email(auth_user_email):
                    return True

        def _template_param_value(param_name):
            names = [param_name]
            if "." in param_name:
                names = param_name.split(".")
            t_value = template_params
            for name in names:
                t_value = t_value.get(name, {})
                if not t_value:
                    return None
            return t_value

        template_filters = self._config.read_branch("/skip_email_filters")
        if template_type in template_filters:
            for template_param, regex in template_filters[template_type].items():
                value = _template_param_value(template_param)
                result = bool(re.match(re.compile(regex), value))
                if result:
                    return result
        return False

    def publish_message(self, data):
        self.rabbit_client.publish_message(data)

    def create(self, **kwargs):
        need_skip = self.skip_email_send(kwargs)
        if not need_skip:
            self.publish_message(kwargs)
        else:
            LOG.info("Skipped %s email send", kwargs.get("template_type"))
        return json.dumps(kwargs)
