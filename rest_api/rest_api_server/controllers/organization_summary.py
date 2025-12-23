import logging
from sqlalchemy import func
from datetime import datetime, timezone, timedelta
from rest_api.rest_api_server.models.models import Employee, CloudAccount
from rest_api.rest_api_server.controllers.base_async import (
    BaseAsyncControllerWrapper)
from rest_api.rest_api_server.controllers.base import (
    BaseController, ClickHouseMixin, OrganizationValidatorMixin)

LOG = logging.getLogger(__name__)
DEFAULT_CURRENCY = 'USD'


class OrganizationSummaryController(
    BaseController, ClickHouseMixin, OrganizationValidatorMixin
):
    def _get_entities_cnt(self, model, organization_id):
        return self.session.query(
            func.count(model.id)
        ).filter(
            model.organization_id == organization_id,
            model.deleted.is_(False)
        ).scalar()

    def _get_cloud_account_ids(self, organization_id):
        ca_ids = self.session.query(CloudAccount.id).filter(
            CloudAccount.organization_id == organization_id,
            CloudAccount.deleted.is_(False),
        ).all()
        return [x[0] for x in ca_ids]

    def _get_expenses(self, cloud_account_ids):
        if not cloud_account_ids:
            return {}
        now = datetime.now(tz=timezone.utc)
        this_month_start = now.replace(day=1)
        prev_month_start = (this_month_start - timedelta(days=1)).replace(day=1)
        start_date = (prev_month_start - timedelta(days=1)).replace(day=1)
        expenses = self.execute_clickhouse(
            query="""
                SELECT toStartOfMonth(date) AS month_start, SUM(cost * sign)
                FROM expenses
                WHERE cloud_account_id IN %(cloud_account_ids)s
                    AND expenses.date >= %(start_date)s
                    AND expenses.date <= %(end_date)s
                GROUP BY month_start
            """,
            parameters={
                'start_date': int(start_date.timestamp()),
                'end_date': int(now.timestamp()),
                'cloud_account_ids': cloud_account_ids
            },
        )
        return {r[0].strftime('%Y-%m'): r[1] for r in expenses}

    def _get_cloud_accounts_cnt(self, organization):
        return self._get_entities_cnt(CloudAccount, organization.id)

    def _get_employees_cnt(self, organization):
        return self._get_entities_cnt(Employee, organization.id)

    def _get_expenses_summary(self, organization):
        currency = organization.currency
        ca_ids = self._get_cloud_account_ids(organization.id)
        expenses = self._get_expenses(ca_ids)
        if currency != DEFAULT_CURRENCY:
            rates = self._config.exchange_rates()
            rate = rates.get(currency)
            if rate is None:
                LOG.warning(f"Exchange rate for {currency} not found")
            for k, v in expenses.items():
                # expeneses is 0 if rate was not found
                expenses[k] = v * float(rate) if rate else 0
        return expenses

    def get(self, organization_id, entities=None):
        common_entities_map = {
            'cloud_accounts': self._get_cloud_accounts_cnt,
            'employees': self._get_employees_cnt,
            'month_expenses': self._get_expenses_summary
        }
        common_entities_keys = common_entities_map.keys()
        common_entities = list(set(common_entities_keys) & set(entities))
        organization = self.get_organization(organization_id)
        org_entities = {}
        for entity in common_entities:
            func = common_entities_map[entity]
            org_entities[entity] = func(organization)
        return {
            'entities': org_entities,
            **organization.to_dict()
        }


class OrganizationSummaryAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return OrganizationSummaryController
