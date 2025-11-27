# pylint: disable=C0103
"""add deployment admin action

Revision ID: 998f27cb8c46
Revises: 76fd6db54f65
Create Date: 2024-11-18 09:57:42.103381

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import delete, func, insert, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy.sql import table, column
from datetime import datetime, timezone

# revision identifiers, used by Alembic.
revision = '998f27cb8c46'
down_revision = '76fd6db54f65'
branch_labels = None
depends_on = None

ACTION_GROUP = "GLOBAL_MANAGEMENT"
ACTION_NAME = "DEPLOYMENT_ADMIN"
TYPE_NAME = "root"


def upgrade():
    action_table = table(
        'action',
        column('name', String(length=64)),
        column('order', Integer()),
        column('action_group_id', Integer()),
        column('type_id', Integer()),
        column('created_at', Integer()),
        column('deleted_at', Integer()),
    )
    action_group_table = table(
        'action_group',
        column('id', Integer()),
        column('name', String(length=50)),
        column('order', Integer()),
    )
    type_table = table(
        'type',
        column('id', Integer()),
        column('name', sa.String(length=24)),
    )
    bind = op.get_bind()
    session = Session(bind=bind)
    try:
        query = session.query(
            action_group_table.c.id,
            action_group_table.c.order,
            func.count()
        ).join(
            action_table,
            action_group_table.c.id == action_table.c.action_group_id
        ).filter(
            action_group_table.c.name == "GLOBAL_MANAGEMENT"
        ).group_by(
            action_group_table.c.id,
            action_group_table.c.order
        )
        data = session.execute(query).first()
        group_id, order, count = data
        type_id = session.query(type_table.c.id).filter(
            type_table.c.name == TYPE_NAME).scalar()
        created_at = int(datetime.now(tz=timezone.utc).timestamp())
        session.execute(insert(action_table).values(
            action_group_id=group_id, type_id=type_id, name=ACTION_NAME,
            order=order + (count + 1) * 10, created_at=created_at,
            deleted_at=0
        ))
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def downgrade():
    action_table = table(
        'action',
        column('name', String(length=64))
    )
    bind = op.get_bind()
    session = Session(bind=bind)
    try:
        session.execute(
            delete(action_table).where(action_table.c.name == ACTION_NAME))
        session.commit()
    finally:
        session.close()
