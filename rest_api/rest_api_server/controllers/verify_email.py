import logging
from rest_api.rest_api_server.controllers.restore_password import RestorePasswordController
from rest_api.rest_api_server.controllers.base_async import BaseAsyncControllerWrapper
from rest_api.rest_api_server.utils import query_url
from optscale_client.herald_client.client_v2 import Client as HeraldClient

LOG = logging.getLogger(__name__)


class VerifyEmailController(RestorePasswordController):

    def _generate_link(self, email, code):
        host = self._config.public_ip()
        params = query_url(email=email, code=code)
        return f'https://{host}/email-verification{params}'

    def send_verification_email(self, email, code):
        link = self._generate_link(email, code)
        HeraldClient(
            url=self._config.herald_url(),
            secret=self._config.cluster_secret()
        ).email_send(
            [email], 'OptScale email verification',
            template_type="verify_email",
            template_params={
                'texts': {
                    'code': code,
                },
                'links': {
                    'verify_button': link
                }
            }
        )


class VerifyEmailAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return VerifyEmailController
