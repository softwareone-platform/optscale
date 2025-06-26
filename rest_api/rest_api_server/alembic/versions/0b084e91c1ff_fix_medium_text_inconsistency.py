""""fix_medium_text_inconsistency"

Revision ID: 0b084e91c1ff
Revises: ae0f9ea8378d
Create Date: 2025-04-30 05:53:47.563909

"""
from alembic import op
from sqlalchemy.dialects import mysql
from rest_api.rest_api_server.models.types import (
    NullableMediumJSON,
    NullableMediumText
)

# revision identifiers, used by Alembic.
revision = '0b084e91c1ff'
down_revision = 'ae0f9ea8378d'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('layout', 'data',
                    existing_type=mysql.MEDIUMTEXT(),
                    type_=NullableMediumJSON(),
                    existing_nullable=False)
    op.alter_column('organization_gemini', 'stats',
                    existing_type=mysql.MEDIUMTEXT(),
                    type_=NullableMediumText(),
                    existing_nullable=True)


def downgrade():
    # since it's inconsistency fix, no downgrade
    pass
