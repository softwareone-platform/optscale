from rest_api.rest_api_server.controllers.base import (
    BaseProfilingTokenController
)


class BaseProfilingController(BaseProfilingTokenController):
    def get_profiling_token(self, organization_id):
        profiling_token = self.get_or_create_profiling_token(organization_id)
        return profiling_token.token
