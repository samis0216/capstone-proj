"""empty message

Revision ID: 867a4d4fdbfd
Revises:
Create Date: 2024-02-22 20:53:17.861509

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '867a4d4fdbfd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('currency', sa.String(), nullable=False),
    sa.Column('yearJoined', sa.String(), nullable=False),
    sa.Column('profile_pic_url', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('groups',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('organizer_id', sa.Integer(), nullable=False),
    sa.Column('group_pic_url', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['organizer_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('expenses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.Column('description', sa.String(length=20), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('payer_id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['group_id'], ['groups.id'], ),
    sa.ForeignKeyConstraint(['payer_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('group_members',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=15), nullable=False),
    sa.Column('email', sa.String(length=40), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['group_id'], ['groups.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('expense_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('expense_id', sa.Integer(), nullable=False),
    sa.Column('contributer_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('settled', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['contributer_id'], ['group_members.id'], ),
    sa.ForeignKeyConstraint(['expense_id'], ['expenses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('payer_id', sa.Integer(), nullable=False),
    sa.Column('payee_id', sa.Integer(), nullable=False),
    sa.Column('amount_paid', sa.Float(), nullable=False),
    sa.Column('complete', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['payee_id'], ['group_members.id'], ),
    sa.ForeignKeyConstraint(['payer_id'], ['group_members.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE groups SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE expenses SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE group_members SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE expense_details SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE payments SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('payments')
    op.drop_table('expense_details')
    op.drop_table('group_members')
    op.drop_table('expenses')
    op.drop_table('groups')
    op.drop_table('users')
    # ### end Alembic commands ###
