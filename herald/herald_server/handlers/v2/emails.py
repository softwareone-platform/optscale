from herald.herald_server.controllers.email import EmailAsyncController
from herald.herald_server.handlers.v1.base import BaseAuthHandler
from herald.herald_server.handlers.v1.base_async import BaseAsyncCollectionHandler
from herald.herald_server.utils import is_email_format, raise_invalid_argument_exception, raise_not_provided_error
from herald.modules.email_generator.generator import does_template_exist


class EmailAsyncHandler(BaseAsyncCollectionHandler, BaseAuthHandler):
    def _get_controller_class(self):
        return EmailAsyncController

    def _validate_params(self, **kwargs):
        email_list = kwargs.get("email")
        template_type = kwargs.get("template_type")
        template_params = kwargs.get("template_params")
        subject = kwargs.get("subject")
        if not email_list:
            raise_not_provided_error("email")
        if not isinstance(email_list, list):
            raise_invalid_argument_exception("email")
        for email in email_list:
            if not is_email_format(email):
                raise_invalid_argument_exception("email")
        if not template_type:
            raise_not_provided_error("template_type")
        if not subject:
            raise_not_provided_error("subject")
        if not does_template_exist(f"{template_type}.html"):
            raise_invalid_argument_exception("template_type")
        if template_params is not None and not isinstance(template_params, dict):
            raise_invalid_argument_exception("template_params")

    async def post(self):
        self.check_cluster_secret(raises=True)
        data = self._request_body()
        self._validate_params(**data)
        res = await self.controller.create(**data)
        self.set_status(201)
        self.write(res)
