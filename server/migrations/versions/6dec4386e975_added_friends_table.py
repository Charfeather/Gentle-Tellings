"""added friends table

Revision ID: 6dec4386e975
Revises: c585973c6e2c
Create Date: 2023-12-13 11:01:03.975876

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6dec4386e975'
down_revision = 'c585973c6e2c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friends_association',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('friend_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], name=op.f('fk_friends_association_friend_id_users')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_friends_association_user_id_users'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('friends_association')
    # ### end Alembic commands ###
