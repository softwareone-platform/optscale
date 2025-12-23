import json
import logging
import requests
from optscale_client.subspector_client.client import Client as SubspectorClient
from tools.optscale_exceptions.common_exc import (
    ForbiddenException, NotFoundException, WrongArgumentsException)
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.controllers.base import BaseController
from rest_api.rest_api_server.controllers.base_async import (
    BaseAsyncControllerWrapper)

LOG = logging.getLogger(__name__)


class OrganizationSubscriptionController(BaseController):
    @staticmethod
    def _extract_error(exception: requests.exceptions.HTTPError):
        code = exception.response.status_code
        reason = json.loads(exception.response.text).get('detail')
        return code, reason

    def _is_billing_enabled(self):
        stripe_settings = self._config.stripe_settings()
        return stripe_settings.get('enabled') or False

    def edit(self, organization_id, plan_id):
        if not self._is_billing_enabled():
            raise ForbiddenException(Err.OE0234, [])
        return self._edit(organization_id, plan_id)

    def _edit(self, organization_id, plan_id):
        subspector_cl = self._get_subspector_client()
        try:
            _, response = subspector_cl.update_owner_subscription(
                organization_id, plan_id)
        except requests.exceptions.HTTPError as exc:
            _, reason = self._extract_error(exc)
            raise WrongArgumentsException(Err.OE0287, [reason])
        finally:
            subspector_cl.close()
        return response

    def get(self, organization_id):
        if not self._is_billing_enabled():
            raise ForbiddenException(Err.OE0234, [])
        return self._get(organization_id)

    def _get(self, organization_id):
        subspector_cl = self._get_subspector_client()
        try:
            _, subscription = subspector_cl.get_owner_subscription(organization_id)
        except requests.exceptions.HTTPError as exc:
            if exc.response.status_code == 404:
                raise NotFoundException(Err.OE0002, ['subscription'])
            raise
        finally:
            subspector_cl.close()
        return subscription

    def plan_list(self, organization_id):
        if not self._is_billing_enabled():
            raise ForbiddenException(Err.OE0234, [])
        return self._plan_list(organization_id)

    def _plan_list(self, organization_id):
        subspector_cl = self._get_subspector_client()
        try:
            _, plans = subspector_cl.plan_list(organization_id)
        finally:
            subspector_cl.close()
        return plans

    def _get_subspector_client(self):
        return SubspectorClient(
            url=self._config.subspector_url(),
            secret=self._config.cluster_secret()
        )

    def create_subscription(self, organization_id, name):
        if self._is_billing_enabled():
            subspector_cl = self._get_subspector_client()
            subspector_cl.customer_create({
                'owner_id': organization_id,
                'name': name
            })
            subspector_cl.close()

    def delete_subscription(self, organization_id):
        if self._is_billing_enabled():
            subspector_cl = self._get_subspector_client()
            try:
                subspector_cl.customer_delete(organization_id)
            except requests.exceptions.HTTPError as exc:
                if exc.response.status_code != 404:
                    raise
            finally:
                subspector_cl.close()


class OrganizationSubscriptionAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return OrganizationSubscriptionController
