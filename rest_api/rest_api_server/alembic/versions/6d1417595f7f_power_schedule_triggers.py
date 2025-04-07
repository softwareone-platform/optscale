"""power_schedule_triggers

Revision ID: 6d1417595f7f
Revises: b300318bb5e7
Create Date: 2025-02-17 09:41:27.067255

"""
import logging
import uuid
from datetime import datetime, timezone
import sqlalchemy as sa
from alembic import op
from sqlalchemy import insert, select, update
from sqlalchemy.orm import Session
from sqlalchemy.sql import table, column

# revision identifiers, used by Alembic.
revision = "6d1417595f7f"
down_revision = "b300318bb5e7"
branch_labels = None
depends_on = None

LOG = logging.getLogger(__name__)


def upgrade():
    bind = op.get_bind()
    session = Session(bind=bind)
    op.create_table(
        "power_schedule_trigger",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("power_schedule_id", sa.String(length=36), nullable=False),
        sa.Column("action", sa.Enum("POWER_ON", "POWER_OFF"), nullable=False),
        sa.Column("time", sa.String(length=5), nullable=False),
        sa.Column("created_at", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "power_schedule_id",
            "time",
            name="uc_power_schedule_id_time",
        ),
        sa.ForeignKeyConstraint(["power_schedule_id"], ["power_schedule.id"], )
    )
    LOG.info("Created power_schedule_trigger table")
    try:
        power_schedule_t = table(
            "power_schedule",
            column("id", sa.String(36)),
            column("power_on", sa.String(36)),
            column("power_off", sa.String(36)),
            column("deleted_at", sa.Integer())
        )
        power_schedule_trigger_t = table(
            "power_schedule_trigger",
            column("id", sa.String(36)),
            column("power_schedule_id", sa.String(36)),
            column("action", sa.String(36)),
            column("time", sa.String(36)),
            column("created_at", sa.Integer())
        )
        power_schedules = session.execute(select([
            power_schedule_t.c.id, power_schedule_t.c.power_on,
            power_schedule_t.c.power_off
        ]).where(power_schedule_t.c.deleted_at == 0))
        now = int(datetime.now(tz=timezone.utc).timestamp())
        for power_schedule in power_schedules:
            session.execute(insert(power_schedule_trigger_t).values(
                id=str(uuid.uuid4()),
                power_schedule_id=power_schedule["id"],
                action="power_on",
                time=power_schedule["power_on"],
                created_at=now
            ))
            session.execute(insert(power_schedule_trigger_t).values(
                id=str(uuid.uuid4()),
                power_schedule_id=power_schedule["id"],
                action="power_off",
                time=power_schedule["power_off"],
                created_at=now
            ))
        session.commit()
        LOG.info("Filled in power_schedule_trigger table")
    except Exception:
        session.rollback()
        op.drop_table("power_schedule_trigger")
        raise
    finally:
        session.close()
    op.drop_column("power_schedule", "power_on")
    op.drop_column("power_schedule", "power_off")
    LOG.info("Dropped in power_schedule columns")


def downgrade():
    bind = op.get_bind()
    session = Session(bind=bind)
    op.add_column("power_schedule",
                  sa.Column("power_on", sa.String(length=5), nullable=False,
                            default=None))
    op.add_column("power_schedule",
                  sa.Column("power_off", sa.String(length=5), nullable=False,
                            default=None))
    LOG.info("Updated power_schedule columns")
    try:
        power_schedule_t = table(
            "power_schedule",
            column("id", sa.String(36)),
            column("power_on", sa.String(36)),
            column("power_off", sa.String(36)),
            column("deleted_at", sa.Integer())
        )
        power_schedule_trigger_t = table(
            "power_schedule_trigger",
            column("power_schedule_id", sa.String(36)),
            column("action", sa.String(36)),
            column("time", sa.String(36))
        )
        power_schedule_triggers = session.execute(select([
            power_schedule_trigger_t.c.power_schedule_id,
            power_schedule_trigger_t.c.action,
            power_schedule_trigger_t.c.time
        ]))
        for ps_trigger in power_schedule_triggers:
            values = {ps_trigger["action"].lower(): ps_trigger["time"]}
            session.execute(update(power_schedule_t).values(**values).where(
                power_schedule_t.c.id == ps_trigger["power_schedule_id"]))
        session.commit()
        LOG.info("Filled in power_schedule table")
    except Exception:
        session.rollback()
        op.drop_column("power_schedule", "power_on")
        op.drop_column("power_schedule", "power_off")
        raise
    finally:
        session.close()
    op.drop_table("power_schedule_trigger")
    LOG.info("Dropped power_schedule_trigger table")
