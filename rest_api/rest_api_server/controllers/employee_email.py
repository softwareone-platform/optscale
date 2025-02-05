import logging
from sqlalchemy import and_
from sqlalchemy.exc import IntegrityError
from tools.optscale_exceptions.common_exc import (
    NotFoundException, WrongArgumentsException
)

from rest_api.rest_api_server.controllers.base import BaseController
from rest_api.rest_api_server.controllers.base_async import (
    BaseAsyncControllerWrapper
)
from rest_api.rest_api_server.controllers.pool import PoolController
from rest_api.rest_api_server.exceptions import Err
from rest_api.rest_api_server.models.models import Employee, EmployeeEmail

LOG = logging.getLogger(__name__)

ROLE_TEMPLATES = {
    'optscale_manager': [
        'anomaly_detection_alert',
        'new_security_recommendation',
        'saving_spike',
        'organization_policy_expiring_budget',
        'organization_policy_quota',
        'organization_policy_recurring_budget',
        'organization_policy_tagging',
        'pool_exceed_report',
        'pool_owner_violation_report',
        'report_imports_passed_for_org',
        'weekly_expense_report',
        'environment_changes',
        'resource_owner_violation_alert',
    ],
    'optscale_engineer': [
        'pool_exceed_resources_report',
        'resource_owner_violation_report',
        'environment_changes',
        'resource_owner_violation_alert',
    ],
    'optscale_member': [
        'alert',
        'invite',
        'employee_greetings',
    ]
}


class EmployeeEmailController(BaseController):

    def _get_model_type(self):
        return EmployeeEmail

    def get_employee(self, employee_id):
        employee = self.session.query(Employee).filter(
            Employee.id == employee_id,
            Employee.deleted_at == 0).scalar()
        if not employee:
            raise NotFoundException(Err.OE0002,
                                    [Employee.__name__, employee_id])
        return employee

    def create_all_email_templates(self, employee_id):
        email_templates = set(t for t_list in ROLE_TEMPLATES.values()
                              for t in t_list)
        model = self._get_model_type()
        for template in email_templates:
            employee_email = model(employee_id=employee_id,
                                   email_template=template,
                                   enabled=True)
            self.session.add(employee_email)
        try:
            self.session.commit()
        except IntegrityError as exc:
            self.session.rollback()
            raise WrongArgumentsException(Err.OE0003, [str(exc)])

    def _get_scopes(self, organization_id):
        pool_ctrl = PoolController(self.session, self._config)
        pools = pool_ctrl.get_organization_pools(organization_id)
        scopes = [x['id'] for x in pools]
        scopes.append(organization_id)
        return scopes

    def list(self, employee_id, **kwargs):
        employee = self.get_employee(employee_id)
        model = self._get_model_type()
        email_template = kwargs.get('email_template')
        employee_emails = self.session.query(model).filter(and_(
            model.employee_id == employee_id,
            model.deleted_at == 0
        )).all()
        if email_template:
            employee_emails = self.session.query(model).filter(and_(
                model.employee_id == employee_id,
                model.deleted_at == 0,
                model.email_template == email_template
            )).all()
        result = {'employee_emails': [
            x.to_dict() for x in employee_emails
        ]}
        scopes = self._get_scopes(employee.organization_id)
        _, roles = self.auth_client.user_roles_get(
            [employee.auth_user_id],
            scope_ids=scopes
        )
        role_purposes = [x['role_purpose'] for x in roles]
        available_emails = set(
            template for purpose, templates in ROLE_TEMPLATES.items()
            for template in templates if purpose in role_purposes
        )
        available_emails.update(ROLE_TEMPLATES['optscale_member'])
        for employee_email in result['employee_emails']:
            employee_email['available_by_role'] = True
            if employee_email['email_template'] not in available_emails:
                employee_email['available_by_role'] = False
        return result

    def bulk_update(self, employee_id, **kwargs):
        self.get_employee(employee_id)
        enable = kwargs.get('enable', [])
        disable = kwargs.get('disable', [])
        model = self._get_model_type()
        employee_emails = self.session.query(model).filter(
                model.employee_id == employee_id,
                model.deleted_at == 0,
                model.id.in_(enable + disable)).all()
        for employee_email in employee_emails:
            if employee_email.id in enable:
                employee_email.enabled = True
            elif employee_email.id in disable:
                employee_email.enabled = False
            self.session.add(employee_email)
        try:
            self.session.commit()
        except IntegrityError as exc:
            raise WrongArgumentsException(Err.OE0003, [str(exc)])
        return self.list(employee_id)


class EmployeeEmailAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return EmployeeEmailController
