"""add_tag_and_type_models

Revision ID: 2e3b5da63ef4
Revises: 4f92c1b3d8e9
Create Date: 2025-11-19 13:10:47.620503

"""
import logging
from alembic import op
import sqlalchemy as sa

from rest_api.rest_api_server.models.types import (
    AutogenUuid,
    NotWhiteSpaceString,
    NullableInt,
    Uuid,
)

# revision identifiers, used by Alembic.
revision = "2e3b5da63ef4"
down_revision = "4f92c1b3d8e9"
branch_labels = None
depends_on = None

LOG = logging.getLogger(__name__)


def upgrade():
    op.create_table(
        "type",
        sa.Column("deleted_at", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("name", NotWhiteSpaceString(length=256), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name", "deleted_at", name="name_deleted_at")
    )
    LOG.info("Created type table")

    op.create_table(
        "tag",
        sa.Column("deleted_at", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.Integer(), nullable=False),
        sa.Column("id", AutogenUuid(length=36), nullable=False),
        sa.Column("type_id", sa.Integer(), nullable=False),
        sa.Column("resource_id", Uuid(length=36), nullable=False),
        sa.Column("name", NotWhiteSpaceString(length=256), nullable=False),
        sa.Column("value", NotWhiteSpaceString(length=256), nullable=False),
        sa.Column("updated_at", NullableInt(), nullable=False),
        sa.ForeignKeyConstraint(["type_id"], ["type.id"], ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("type_id", "resource_id", "name", "deleted_at", name="uc_type_id_res_id_name_del_at")
    )
    op.create_index(op.f("ix_tag_resource_id"), "tag", ["resource_id"], unique=False)
    LOG.info("Created tag table")


def downgrade():
    op.drop_index(op.f("ix_tag_resource_id"), table_name="tag")
    op.drop_table("tag")
    LOG.info("Dropped tag table")

    op.drop_table("type")
    LOG.info("Dropped type table")
