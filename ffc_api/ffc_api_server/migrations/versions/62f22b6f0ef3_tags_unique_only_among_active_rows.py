"""tags: unique only among active rows

Revision ID: 62f22b6f0ef3
Revises: 0f57303a227b
Create Date: 2026-09-03 12:45:13.150568

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '62f22b6f0ef3'
down_revision: Union[str, None] = '0f57303a227b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.drop_constraint(
        "uq_tags_active", "tags", type_="unique", schema='ffc-api-db'
    )
    op.add_column(
        "tags",
        sa.Column(
            "active_key",
            sa.BigInteger(),
            sa.Computed("IF(deleted_ts = 0, 0, NULL)", persisted=False),
            nullable=True,
        ),
        schema='ffc-api-db',
    )
    op.create_unique_constraint(
        "uq_tags_active",
        "tags",
        ["name", "resource_id", "resource_type", "active_key"],
        schema='ffc-api-db',
    )


def downgrade() -> None:
    op.drop_constraint(
        "uq_tags_active", "tags", type_="unique", schema='ffc-api-db'
    )
    op.drop_column("tags", "active_key", schema='ffc-api-db')
    op.create_unique_constraint(
        "uq_tags_active",
        "tags",
        ["name", "resource_id", "resource_type", "deleted_ts"],
        schema='ffc-api-db',
    )
