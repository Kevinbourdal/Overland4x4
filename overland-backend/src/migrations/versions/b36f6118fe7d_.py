"""empty message

Revision ID: b36f6118fe7d
Revises: 9d8256b5da41
Create Date: 2022-07-20 18:29:46.110101

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b36f6118fe7d'
down_revision = '9d8256b5da41'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('data_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'client', 'data', ['data_id'], ['id_data'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'client', type_='foreignkey')
    op.drop_column('client', 'data_id')
    # ### end Alembic commands ###
