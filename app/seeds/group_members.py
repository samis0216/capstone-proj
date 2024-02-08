from app.models import db, environment, SCHEMA
from app.models.group_members import GroupMember
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_group_members():
    demo = GroupMember(name='Demo', email='demo@aa.io', group_id=1)
    justin = GroupMember(name='Justin', email='justin@aa.io', group_id=1)
    leo = GroupMember(name='Leo', email='leo@aa.io', group_id=1)
    marnie = GroupMember(name='Marnie', email='marnie@aa.io', group_id=2)
    alex = GroupMember(name='Alex', email='alex@aa.io', group_id=2)
    darin = GroupMember(name='Darin', email='darin@aa.io', group_id=2)
    bobbie=GroupMember(name='Bobbie', email='bobbie@aa.io', group_id=3)
    jake = GroupMember(name='Jake', email='jake@aa.io', group_id = 3)
    kian = GroupMember(name='Kian', email='kian@aa.io', group_id=3)

    db.session.add(demo)
    db.session.add(justin)
    db.session.add(leo)
    db.session.add(marnie)
    db.session.add(alex)
    db.session.add(jake)
    db.session.add(bobbie)
    db.session.add(darin)
    db.session.add(kian)
    db.session.commit()

def undo_group_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_members"))

    db.session.commit()
