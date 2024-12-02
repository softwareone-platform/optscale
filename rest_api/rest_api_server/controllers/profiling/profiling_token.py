from tools.optscale_exceptions.common_exc import NotFoundException
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.models.models import ProfilingToken
from rest_api.rest_api_server.controllers.profiling.base import (
    BaseProfilingController
)
from rest_api.rest_api_server.controllers.base_async import (
    BaseAsyncControllerWrapper
)


class ProfilingTokenController(BaseProfilingController):
    def _get_model_type(self):
        return ProfilingToken

    def get(self, organization_id, **kwargs):
        return super().get_or_create_profiling_token(organization_id)

    def get_profiling_token_info(self, profiling_token):
        token = self.session.query(ProfilingToken).filter(
            ProfilingToken.deleted.is_(False),
            ProfilingToken.token == profiling_token
        ).one_or_none()
        if not token:
            raise NotFoundException(
                Err.OE0002, [ProfilingToken.__name__, profiling_token])
        return token


class ProfilingTokenAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return ProfilingTokenController
