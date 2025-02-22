# pylint: disable=C0103
""""added_violation_constraints_modules"

Revision ID: 36a230e78da1
Revises: fb5d8764b7aa
Create Date: 2020-08-28 09:43:42.646503

"""
from datetime import datetime, timezone
import uuid

from alembic import op
from sqlalchemy.orm import Session
from sqlalchemy.sql import table, column
from sqlalchemy import (
    Integer, insert, delete, String, TEXT, Enum, select, and_
)


# revision identifiers, used by Alembic.
revision = "36a230e78da1"
down_revision = "fb5d8764b7aa"
branch_labels = None
depends_on = None

schedule_table = table(
    "schedule",
    column("id", String(length=36)),
    column("report_id", String(length=36)),
    column("recipient_id", String(length=36)),
    column("crontab", String(length=128)),
    column("last_run", Integer),
    column("next_run", Integer),
    column("created_at", Integer),
)

recipient_table = table(
    "recipient",
    column("id", String(length=36)),
    column("role_purpose", String(128)),
)

report_table = table(
    "report",
    column("id", String(length=36)),
    column("created_at", Integer()),
    column("name", String(50)),
    column("module_name", String(128)),
    column("report_format", Enum("html")),
    column("description", TEXT()),
)

CRONTAB = "0 0 * * MON"
modules = [
    ("violated_constraints", "optscale_engineer",
     "Resource owner constraints report"),
    (
        "violated_constraints_diff",
        "optscale_manager",
        "Budget owner constraints report",
    ),
]


def get_current_timestamp():
    return int(datetime.now(tz=timezone.utc).timestamp())


def gen_id():
    return str(uuid.uuid4())


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    bind = op.get_bind()
    session = Session(bind=bind)

    try:
        for module_name, purpose, module_description in modules:
            ins_stmt = insert(report_table).values(
                id=str(uuid.uuid4()),
                created_at=get_current_timestamp(),
                name=module_name,
                module_name=module_name,
                report_format="html",
                description=module_description,
            )
            session.execute(ins_stmt)

            recipients_stmt = select([recipient_table]).where(
                recipient_table.c.role_purpose == purpose
            )
            budget_exceed_resources_stmt = select([report_table]).where(
                report_table.c.module_name == module_name
            )
            schedules = []
            now = get_current_timestamp()
            for budget_exceed_resources_report in session.execute(
                budget_exceed_resources_stmt
            ):
                for recipient in session.execute(recipients_stmt):
                    schedules.append(
                        {
                            "id": gen_id(),
                            "report_id": budget_exceed_resources_report["id"],
                            "recipient_id": recipient["id"],
                            "crontab": CRONTAB,
                            "last_run": 0,
                            "next_run": now,
                            "created_at": now,
                        }
                    )
                op.bulk_insert(schedule_table, schedules)
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    bind = op.get_bind()
    session = Session(bind=bind)

    try:
        for module_name, purpose, _ in modules:
            recipients_stmt = select([recipient_table]).where(
                recipient_table.c.role_purpose == purpose
            )
            recipients = session.execute(recipients_stmt)
            recipients_ids = list(map(lambda x: x["id"], recipients))
            budget_exceed_res_stmt = select([report_table]).where(
                report_table.c.module_name == module_name
            )
            for budget_exceed_res_report in session.execute(
                    budget_exceed_res_stmt):
                delete_schedule_stmt = delete(schedule_table).where(
                    and_(
                        schedule_table.c.recipient_id.in_(recipients_ids),
                        schedule_table.c.report_id == budget_exceed_res_report[
                            "id"],
                    )
                )
                session.execute(delete_schedule_stmt)
            ins_stmt = delete(report_table).where(
                report_table.c.module_name == module_name
            )
            session.execute(ins_stmt)
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
    # ### end Alembic commands ###
