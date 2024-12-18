# pylint: disable=C0103
""""rename_budget_to_pool"

Revision ID: 66dbed1e88e6
Revises: 36a230e78da1
Create Date: 2021-05-04 19:23:22.646503

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.orm import Session

# revision identifiers, used by Alembic.
revision = "66dbed1e88e6"
down_revision = "36a230e78da1"
branch_labels = None
depends_on = None

REPORT_NAMES = [
    ("pool_limit_exceed_resources", "budget_exceed_resources"),
    ("pool_limit_exceed", "budget_exceed"),
]
MODULE_NAMES = [
    ("pool_limit_exceed_resources", "budget_exceed_resources"),
    ("pool_limit_exceed", "budget_exceed"),
]
DESCRIPTIONS = [
    ("Pool limit exceed resources report", "Budget exceed resources report"),
    ("Pool owner constraints report", "Budget owner constraints report"),
    ("Pool limit exceed report", "Budget exceed report"),
]

report_table = sa.table(
    "report",
    sa.column("id", sa.String(length=36)),
    sa.column("name", sa.String(50)),
    sa.column("module_name", sa.String(128)),
    sa.column("description", sa.TEXT()),
)


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    bind = op.get_bind()
    session = Session(bind=bind)
    try:
        for new_name, old_name in REPORT_NAMES:
            session.execute(
                sa.update(report_table)
                .values(name=new_name)
                .where(report_table.c.name == old_name)
            )
        for new_name, old_name in MODULE_NAMES:
            session.execute(
                sa.update(report_table)
                .values(module_name=new_name)
                .where(report_table.c.module_name == old_name)
            )
        for new_name, old_name in DESCRIPTIONS:
            session.execute(
                sa.update(report_table)
                .values(description=new_name)
                .where(report_table.c.description == old_name)
            )
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
        for old_name, new_name in REPORT_NAMES:
            session.execute(
                sa.update(report_table)
                .values(name=new_name)
                .where(report_table.c.name == old_name)
            )
        for old_name, new_name in MODULE_NAMES:
            session.execute(
                sa.update(report_table)
                .values(module_name=new_name)
                .where(report_table.c.module_name == old_name)
            )
        for old_name, new_name in DESCRIPTIONS:
            session.execute(
                sa.update(report_table)
                .values(description=new_name)
                .where(report_table.c.description == old_name)
            )
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
    # ### end Alembic commands ###
