""""allow_none_meta_info"

Revision ID: 7d91396a219d
Revises: c61830e22bf8
Create Date: 2024-11-08 12:21:27.916938

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '7d91396a219d'
down_revision = 'c61830e22bf8'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('condition', 'meta_info',
                    existing_type=sa.String(length=256),
                    type_=sa.String(length=256), nullable=True)


def downgrade():
    cond_t = sa.sql.table('condition',
                          sa.sql.column('meta_info', sa.String(length=256)))
    op.execute(cond_t.delete().where(cond_t.c.meta_info.is_(None)))
    op.alter_column('condition', 'meta_info',
                    existing_type=sa.String(length=256),
                    type_=sa.String(length=256), nullable=False)
