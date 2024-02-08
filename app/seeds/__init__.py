from flask.cli import AppGroup
from .users import seed_users, undo_users
from .groups import seed_groups, undo_groups
from .expenses import seed_expenses, undo_expenses
from .expense_details import seed_expense_details, undo_expense_details
from .group_members import seed_group_members, undo_group_members

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_expense_details()
        undo_expenses()
        undo_group_members()
        undo_groups()
        undo_users()
    seed_users()
    seed_groups()
    seed_group_members()
    seed_expenses()
    seed_expense_details()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_expense_details()
    undo_expenses()
    undo_group_members()
    undo_groups()
    undo_users()
    # Add other undo functions here
