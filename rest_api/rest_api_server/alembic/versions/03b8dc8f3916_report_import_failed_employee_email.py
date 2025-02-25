""""report_import_failed_employee_email"

Revision ID: 03b8dc8f3916
Revises: a8dfe40f34a8
Create Date: 2024-12-09 13:25:23.392399

"""
import uuid
from alembic import op
from sqlalchemy import and_, Boolean, Integer, String, delete, insert, select
from sqlalchemy.orm import Session
from sqlalchemy.sql import table, column


# revision identifiers, used by Alembic.
revision = '03b8dc8f3916'
down_revision = 'a8dfe40f34a8'
branch_labels = None
depends_on = None


EMAIL_TEMPLATE = 'report_import_failed'


def upgrade():
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
            insert_cmd = insert(emp_email_t).values(
                id=str(uuid.uuid4()),
                employee_id=employee['id'],
                email_template='report_import_failed',
                enabled=True,
                deleted_at=0
            )
            session.execute(insert_cmd)
        session.commit()
    finally:
        session.close()


def downgrade():
    emp_email_t = table('employee_email',
                        column('email_template', String(256)))
    op.execute(emp_email_t.delete().where(
        emp_email_t.c.email_template == EMAIL_TEMPLATE))
