""""employee_emails"

Revision ID: a1d0494e9815
Revises: 7d91396a219d
Create Date: 2024-08-30 04:17:27.866034

"""
import uuid
from alembic import op
import sqlalchemy as sa
from sqlalchemy import and_, Boolean, insert, Integer, select, String
from sqlalchemy.orm import Session
from sqlalchemy.sql import table, column
from rest_api.rest_api_server.models.types import (
    MediumLargeNullableString, NullableBool, NullableUuid
)

# revision identifiers, used by Alembic.
revision = 'a1d0494e9815'
down_revision = '7d91396a219d'
branch_labels = None
depends_on = None

EMAIL_TEMPLATES = [
    'alert',
    'anomaly_detection_alert',
    'employee_greetings',
    'environment_changes',
    'invite',
    'new_security_recommendation',
    'organization_policy_expiring_budget',
    'organization_policy_quota',
    'organization_policy_recurring_budget',
    'organization_policy_tagging',
    'pool_exceed_report',
    'pool_exceed_resources_report',
    'pool_owner_violation_report',
    'resource_owner_violation_alert',
    'resource_owner_violation_report',
    'report_imports_passed_for_org',
    'saving_spike',
    'weekly_expense_report'
]


def _fill_table():
    bind = op.get_bind()
    session = Session(bind=bind)
    try:
        org_t = table('organization',
                      column('id', String(36)),
                      column('deleted_at', Integer()),
                      column('is_demo', Integer()))
        emp_t = table('employee',
                      column('id', String(36)),
                      column('organization_id', String(36)),
                      column('deleted_at', Integer()))
        emp_email_t = table('employee_email',
                            column('id', String(36)),
                            column('employee_id', String(36)),
                            column('email_template', String(256)),
                            column('enabled', Boolean()),
                            column('deleted_at', Integer()))
        cmd = select([emp_t.c.id]).where(
            and_(emp_t.c.deleted_at == 0,
                 emp_t.c.organization_id.in_(
                     select([org_t.c.id]).where(
                         and_(org_t.c.deleted_at == 0,
                              org_t.c.is_demo.is_(False)))))
        )
        employee_ids = session.execute(cmd)
        for employee in employee_ids:
            for email_template in EMAIL_TEMPLATES:
                insert_cmd = insert(emp_email_t).values(
                    id=str(uuid.uuid4()),
                    employee_id=employee['id'],
                    email_template=email_template,
                    enabled=True,
                    deleted_at=0
                )
                session.execute(insert_cmd)
        session.commit()
    finally:
        session.close()


def upgrade():
    op.create_table(
        'employee_email',
        sa.Column('id', NullableUuid(length=36), nullable=False),
        sa.Column('employee_id', NullableUuid(length=36), nullable=False),
        sa.Column('email_template', MediumLargeNullableString(length=128),
                  nullable=False),
        sa.Column('enabled', NullableBool(), nullable=False),
        sa.Column('deleted_at', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['employee_id'], ['employee.id'], ),
        sa.UniqueConstraint('employee_id', 'email_template', 'deleted_at',
                            name='uc_employee_email_template')
    )
    _fill_table()


def downgrade():
    op.drop_table('employee_email')
