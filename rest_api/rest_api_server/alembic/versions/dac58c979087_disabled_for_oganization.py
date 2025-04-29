""""disabled_for_organization"

Revision ID: dac58c979087
Revises: ae56a2422e31
Create Date: 2025-03-14 05:51:18.354350

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dac58c979087'
down_revision = 'ae56a2422e31'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('organization',
                  sa.Column('disabled', sa.Boolean(), nullable=False,
                            default=False))


def downgrade():
    op.drop_column('organization', 'disabled')
