from app.models import db, environment, SCHEMA
from app.models.group import Group
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_groups():
    skitrip = Group(name='Ski Trip 2023', organizer_id=1, group_pic_url='https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png')
    hawaii = Group(name='Hawaii Trip 2023', organizer_id=2, group_pic_url='https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png')
    gamblers= Group(name='Gamblers', organizer_id=3, group_pic_url='https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png')
    db.session.add(skitrip)
    db.session.add(hawaii)
    db.session.add(gamblers)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
