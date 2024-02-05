from app.models import db, environment, SCHEMA
from app.models.expense import Expense
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_expenses():
    skitrip = Expense(category='Entertainment', description='Ski Lift Tickets', payer_id=1, group_id=1, amount=361)
    skitrip2 = Expense(category='Food', description="Denny's", payer_id=1, group_id=1, amount=62)
    hawaii = Expense(category='Food', description="Seafood dinner", payer_id=2, group_id=2, amount=122)
    hawaii2 = Expense(category='Entertainment', description="Surf lessons", payer_id=2, group_id=2, amount=210)
    gamblers= Expense(category='Other', description="super bowl bet", payer_id=3, group_id=3, amount=100)
    gamblers2= Expense(category='Food', description="groceries", payer_id=3, group_id=3, amount=83)

    db.session.add(skitrip)
    db.session.add(skitrip2)
    db.session.add(hawaii)
    db.session.add(hawaii2)
    db.session.add(gamblers)
    db.session.add(gamblers2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expenses"))

    db.session.commit()
