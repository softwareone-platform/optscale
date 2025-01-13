""""checking_email_settings_task_state"

Revision ID: f15bef09d604
Revises: 66dbed1e88e6
Create Date: 2024-08-30 12:02:40.374500

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.orm import Session
from sqlalchemy.sql import table, column
from sqlalchemy import update, String

# revision identifiers, used by Alembic.
revision = "f15bef09d604"
down_revision = "66dbed1e88e6"
branch_labels = None
depends_on = None


old_states = sa.Enum(
    "created",
    "started",
    "getting_scopes",
    "got_scopes",
    "getting_recipients",
    "got_recipients",
    "generating_data",
    "generated_data",
    "putting_to_object_storage",
    "put_to_object_storage",
    "putting_to_herald",
    "completed",
    "error",
)
new_states = sa.Enum(
    "created",
    "started",
    "getting_scopes",
    "got_scopes",
    "getting_recipients",
    "got_recipients",
    "checking_email_settings",
    "generating_data",
    "generated_data",
    "putting_to_object_storage",
    "put_to_object_storage",
    "putting_to_herald",
    "completed",
    "error",
)


def upgrade():
    op.alter_column("task", "state", existing_type=new_states, nullable=False)


def downgrade():
    task_table = table(
        "task",
        column("state", String(128)),
    )
    bind = op.get_bind()
    session = Session(bind=bind)
    try:
        update_task_stmt = (
            update(task_table)
            .values(state="started")
            .where(task_table.c.state == "checking_email_settings")
        )
        session.execute(update_task_stmt)
        session.commit()
    finally:
        session.close()

    op.alter_column("task", "state", existing_type=old_states, nullable=False)
