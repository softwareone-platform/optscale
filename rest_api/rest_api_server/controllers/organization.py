import logging

import requests
from sqlalchemy import and_, true, false, or_
from sqlalchemy.exc import IntegrityError
from rest_api.rest_api_server.controllers.base import (
    BaseController, ClickHouseMixin)
from rest_api.rest_api_server.controllers.base_async import BaseAsyncControllerWrapper
from rest_api.rest_api_server.controllers.employee import EmployeeController
from rest_api.rest_api_server.controllers.organization_bi import OrganizationBIController
from rest_api.rest_api_server.controllers.organization_gemini import OrganizationGeminiController
from rest_api.rest_api_server.controllers.organization_constraint import OrganizationConstraintController
from rest_api.rest_api_server.controllers.pool import PoolController
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.models.enums import (
    RolePurposes, OrganizationConstraintTypes, OrganizationDisableTypes)
from rest_api.rest_api_server.models.models import (
    CloudAccount, CloudTypes, Organization, Pool, ShareableBooking,
    ProfilingToken)

from tools.optscale_exceptions.common_exc import (
    FailedDependency, NotFoundException, UnauthorizedException,
    WrongArgumentsException)
from rest_api.rest_api_server.utils import Config, check_bool_attribute

from optscale_client.auth_client.client_v2 import Client as AuthClient
from optscale_client.katara_client.client import Client as KataraClient
from currency_symbols.currency_symbols import CURRENCY_SYMBOLS_MAP

LOG = logging.getLogger(__name__)

POOL_EXCEED_REPORT_NAME = 'pool_limit_exceed'
POOL_EXCEED_REPORT_CRONTAB = '0 0 * * *'

ORGANIZATION_EXPENSES_REPORT_NAME = 'organization_expenses'
ORGANIZATION_EXPENSES_CRONTAB = '0 13 * * FRI'

POOL_EXCEED_RESOURCES_REPORT_NAME = 'pool_limit_exceed_resources'
POOL_EXCEED_RESOURCES_CRONTAB = '0 0 * * *'

VIOLATED_CONSTRAINTS_REPORT_NAME = 'violated_constraints'
VIOLATED_CONSTRAINTS_CRONTAB = '0 0 * * MON'

VIOLATED_CONSTRAINTS_DIFF_REPORT_NAME = 'violated_constraints_diff'
VIOLATED_CONSTRAINTS_DIFF_CRONTAB = '0 0 * * MON'

RETRY_POLICY = {'max_retries': 15, 'interval_start': 0,
                'interval_step': 1, 'interval_max': 3}
DEFAULT_CONSTRAINT_SETTINGS = {
    'definition': {'threshold_days': 7, 'threshold': 30},
    'filters': {}
}


class OrganizationController(BaseController, ClickHouseMixin):

    def __init__(self, db_session, config=None, token=None, engine=None):
        super().__init__(db_session, config, token, engine)
        self._katara_client = None

    @property
    def katara_client(self):
        if not self._katara_client:
            self._katara_client = KataraClient(
                url=Config().katara_url, secret=Config().cluster_secret)
        return self._katara_client

    def _get_model_type(self):
        return Organization

    def _validate(self, item, is_new=True, **kwargs):
        currency = kwargs.get('currency')
        if currency is not None and currency not in CURRENCY_SYMBOLS_MAP:
            raise WrongArgumentsException(Err.OE0536, [currency])

    def get_cloud_accounts(self, item_id, only_external=False):
        conditions = and_(CloudAccount.organization_id == item_id,
                          CloudAccount.deleted.is_(False))
        internal_clouds = [CloudTypes.ENVIRONMENT]
        if only_external:
            conditions.append(CloudAccount.type.notin_(internal_clouds))
        return self.session.query(CloudAccount).filter(conditions).all()

    def edit(self, item_id, **kwargs):
        if kwargs.get('currency'):
            ca_list = self.get_cloud_accounts(item_id, only_external=True)
            if ca_list:
                raise FailedDependency(Err.OE0500, ['currency'])
        current_org = super().get(item_id)
        name = kwargs.get('name')
        pool_id = current_org.pool_id
        if name and pool_id:
            pool_item = PoolController(
                self.session, self._config, self.token).get(pool_id)
            pool_item.name = name
            try:
                self.session.commit()
            except IntegrityError as ex:
                raise WrongArgumentsException(Err.OE0003, [str(ex)])
        organization = self._handle_disabled_in_kwargs(current_org, kwargs)
        if not kwargs:
            return organization
        organization = super().edit(item_id, **kwargs)
        self._publish_organization_activity(
            organization, 'organization_updated')
        return organization

    def _handle_disabled_in_kwargs(self, organization, kwargs):
        disable_type = kwargs.pop('disable_type',
                                  OrganizationDisableTypes.HARD.value)
        if 'disabled' in kwargs:
            disabled = kwargs.pop('disabled')
            check_bool_attribute('disabled', disabled)
            organization = self.set_organization_disabled(
                organization.id, disabled, disable_type)
        return organization

    def set_organization_disabled(self, organization_id, disabled: bool,
                                  disable_type: str):
        organization = self.get(organization_id)
        try:
            disable_type = OrganizationDisableTypes(disable_type)
        except ValueError:
            raise WrongArgumentsException(Err.OE0217, ['disable_type'])
        disabled_value = disable_type if disabled else None

        # exclude if value already set
        exclude_subquery = self.model_type.disabled.isnot(None)
        if disabled_value:
            exclude_subquery = or_(
                self.model_type.disabled.is_(None),
                self.model_type.disabled != disabled_value
            )
        if disable_type != OrganizationDisableTypes.HARD:
            # exclude hard disabled
            exclude_subquery = and_(
                exclude_subquery,
                or_(
                    self.model_type.disabled != OrganizationDisableTypes.HARD,
                    self.model_type.disabled.is_(None)
                )
            )
        query = self.session.query(self.model_type).filter(
            self.model_type.id == organization_id,
            self.model_type.deleted.is_(False),
            exclude_subquery
        )
        if query.update({self.model_type.disabled: disabled_value}):
            self.session.commit()
            disabled = False if not disabled_value else True
            action = 'organization_%s' % ('disabled' if disabled else 'enabled')
            self._publish_organization_activity(organization, action)
        return organization

    def get_pools(self, org_id):
        pools = self.session.query(
            Pool
        ).filter(
            Pool.organization_id == org_id,
            Pool.deleted.is_(False)
        ).all()
        return list(map(lambda x: x.to_dict(), pools))

    def create_report_subscriptions(self, org_id):
        _, reports = self.katara_client.report_list()
        reports = reports.get('reports', [])

        _, manager_recipient = self.katara_client.recipient_create(
            scope_id=org_id,
            role_purpose=RolePurposes.optscale_manager.value)
        _, engineer_recipient = self.katara_client.recipient_create(
            scope_id=org_id,
            role_purpose=RolePurposes.optscale_engineer.value)
        _, member_recipient = self.katara_client.recipient_create(
            scope_id=org_id,
            role_purpose=RolePurposes.optscale_member.value)
        # hardcoded for now. Will be moved somewhere else later (UI/Herald)
        report_crontab_recipients_map = {
            POOL_EXCEED_REPORT_NAME:
                (POOL_EXCEED_REPORT_CRONTAB, [manager_recipient]),
            ORGANIZATION_EXPENSES_REPORT_NAME:
                (ORGANIZATION_EXPENSES_CRONTAB, [manager_recipient]),
            POOL_EXCEED_RESOURCES_REPORT_NAME:
                (POOL_EXCEED_RESOURCES_CRONTAB, [engineer_recipient]),
            VIOLATED_CONSTRAINTS_REPORT_NAME:
                (VIOLATED_CONSTRAINTS_CRONTAB, [engineer_recipient]),
            VIOLATED_CONSTRAINTS_DIFF_REPORT_NAME:
                (VIOLATED_CONSTRAINTS_DIFF_CRONTAB, [manager_recipient])
        }
        for report in reports:
            report_module_name = report.get('module_name')
            crontab, recipients = report_crontab_recipients_map.get(
                report_module_name)
            if not crontab:
                LOG.warning('Unhandled report module %s',
                            report.get('module_name'))
                continue
            for recipient in recipients:
                self.katara_client.schedule_create(
                    crontab=crontab,
                    recipient_id=recipient['id'],
                    report_id=report['id'])

    def delete_report_subscriptions(self, org_id):
        # hardcoded for now. Will be moved somewhere else later (UI/Herald)
        self.katara_client.recipients_delete(scope_ids=[org_id])

    def create_organization_pool(self, organization):
        b_ctrl = PoolController(self.session, self._config, self.token)
        return b_ctrl.create(organization_id=organization.id,
                             name=organization.name)

    def create_organization_constraints(self, organization):
        org_constr_ctrl = OrganizationConstraintController(
            self.session, self._config, self.token)
        for _type in [
            OrganizationConstraintTypes.EXPENSE_ANOMALY,
            OrganizationConstraintTypes.RESOURCE_COUNT_ANOMALY
        ]:
            params = DEFAULT_CONSTRAINT_SETTINGS.copy()
            name = 'Default - %s' % _type.value.replace('_', ' ')
            params.update({
                'organization_id': organization.id,
                'type': _type, 'name': name
            })
            org_constr_ctrl.create(**params)

    def create(self, **kwargs):
        kwargs['currency'] = kwargs.get('currency') or 'USD'
        organization = super().create(**kwargs)
        org_id = organization.id
        try:
            pool = self.create_organization_pool(organization)
            organization.pool_id = pool.id
            if not organization.is_demo:
                self.create_organization_constraints(organization)
            self.session.commit()
        except Exception as exc:
            LOG.warning('Error on pool (or org constraint) creation, '
                        'deleting organization {0} ({1})'.format(org_id, exc))
            self.session.delete(organization)
            self.session.commit()
            raise
        self._publish_organization_activity(
            organization, 'organization_created')
        if not organization.is_demo:
            self.create_report_subscriptions(organization.id)
        return organization

    def _apply_limit_offset(self, query, limit=0, offset=0):
        query = query.order_by(self.model_type.created_at)
        if limit:
            query = query.limit(limit)
        if offset:
            query = query.offset(offset)
        return query

    def root_organizations_list(self, token, limit=0, offset=0):
        assignments = self._get_assignments_by_token(token)
        resource_ids = list(map(
            lambda x: x['assignment_resource'], assignments))
        query = self.session.query(self.model_type).filter(
            and_(
                self.model_type.deleted.is_(False),
                self.model_type.id.in_(resource_ids)
            )
        )
        total_count = query.count()
        query = self._apply_limit_offset(query, limit, offset)
        return query.all(), total_count

    def get_org_list(self, is_demo=False, with_shareable_bookings=False,
                     with_connected_accounts=False, limit=0, offset=0,
                     disabled=None):
        organizations_query = self.session.query(self.model_type).filter(
            and_(
                self.model_type.deleted.is_(False),
                self.model_type.is_demo.is_(true() if is_demo else false())
            )
        )
        if disabled is not None:
            disabled_expr = self.model_type.disabled.is_(None)
            if disabled:
                disabled_expr = self.model_type.disabled.isnot(None)
            organizations_query = organizations_query.filter(disabled_expr)
        if with_shareable_bookings:
            organizations_query = organizations_query.join(
                ShareableBooking, and_(
                    ShareableBooking.organization_id == self.model_type.id,
                    ShareableBooking.deleted.is_(False))
            )
        if with_connected_accounts:
            organizations_query = organizations_query.join(
                CloudAccount, and_(
                    CloudAccount.organization_id == self.model_type.id,
                    CloudAccount.deleted.is_(False)
                )
            )
        total_count = organizations_query.count()
        organizations_query = self._apply_limit_offset(organizations_query,
                                                       limit, offset)
        return organizations_query.all(), total_count

    @staticmethod
    def _get_assignments_by_token(token):
        auth_client = AuthClient(url=Config().auth_url, token=token)
        try:
            _, result = auth_client.my_assignment_list()
        except requests.exceptions.HTTPError as exc:
            if exc.response.status_code == 401:
                raise UnauthorizedException(Err.OE0235, [])
            raise
        return result

    def clean_clickhouse(self, cloud_accounts_map=None, gemini_ids=None):
        if cloud_accounts_map:
            cloud_account_ids = list(cloud_accounts_map.keys())
            self.execute_clickhouse(
                """ALTER TABLE expenses DELETE
                   WHERE cloud_account_id IN %s""" % cloud_account_ids
            )
            self.execute_clickhouse(
                """ALTER TABLE traffic_expenses DELETE
                   WHERE cloud_account_id IN %s""" % cloud_account_ids
            )
            self.execute_clickhouse(
                """ALTER TABLE average_metrics DELETE
                   WHERE cloud_account_id IN %s""" % cloud_account_ids
            )
            k8s_accs = [
                id_ for id_, type_ in cloud_accounts_map.items()
                if type_ == CloudTypes.KUBERNETES_CNR
            ]
            if k8s_accs:
                self.execute_clickhouse(
                    """ALTER TABLE k8s_metrics DELETE
                       WHERE cloud_account_id IN %s""" % k8s_accs
                )
            aws_accs = [
                id_ for id_, type_ in cloud_accounts_map.items()
                if type_ == CloudTypes.AWS_CNR
            ]
            if aws_accs:
                self.execute_clickhouse(
                    """ALTER TABLE risp.ri_sp_usage DELETE
                       WHERE cloud_account_id IN %s""" % aws_accs
                )
                self.execute_clickhouse(
                    """ALTER TABLE risp.uncovered_usage DELETE
                       WHERE cloud_account_id IN %s""" % aws_accs
                )
        if gemini_ids:
            self.execute_clickhouse(
                """ALTER TABLE gemini.gemini DELETE
                   WHERE id IN %s""" % gemini_ids
            )

    def delete(self, item_id):
        organization = self.get(item_id)
        if organization.pool_id:
            b_ctrl = PoolController(self.session, self._config, self.token)
            try:
                b_ctrl.delete(organization.pool_id, allow_root_deletion=True)
            except NotFoundException:
                pass
        e_ctrl = EmployeeController(self.session, self._config, self.token)
        employees_list = e_ctrl.list(item_id)
        auth_user_ids = set()
        for employee in employees_list:
            e_ctrl.delete(employee['id'], reassign_resources=False)
            if organization.is_demo:
                user_id = employee['auth_user_id']
                if user_id not in auth_user_ids:
                    self.auth_client.user_delete(user_id)
                    auth_user_ids.add(user_id)
        OrganizationConstraintController(self.session, self._config, self.token
                                         ).delete_constraints_with_hits(item_id)
        OrganizationBIController(
            self.session, self._config).delete_bis_for_org(item_id)
        gemini_ctrl = OrganizationGeminiController(self.session, self._config)
        geminis_ids = [x.id for x in gemini_ctrl.list(item_id)]
        gemini_ctrl.delete_for_org(item_id)
        cloud_accounts = {
            x.id: x.type for x in self.get_cloud_accounts(item_id)
        }
        self.clean_clickhouse(cloud_accounts, geminis_ids)
        super().delete(item_id)
        if organization.pool_id:
            self._publish_organization_activity(
                organization, 'organization_deleted')
            self.delete_report_subscriptions(organization.id)

    def _publish_organization_activity(self, organization, action):
        meta = {
            'object_name': organization.name
        }
        self.publish_activities_task(
            organization.id, organization.id, 'organization',
            action, meta, 'organization.{action}'.format(action=action))


class OrganizationAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return OrganizationController
