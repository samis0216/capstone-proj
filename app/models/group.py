from .db import db, environment, SCHEMA, add_prefix_for_prod

class Group(db.Model):
    __tablename__ = 'groups'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(30), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    group_pic_url = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'organizer_id': self.organizer_id,
            'group_pic_url': self.group_pic_url,
        }

    expenses = db.relationship('Expense', backref='group', cascade="all, delete-orphan")
    members = db.relationship('GroupMember', backref='group', cascade="all, delete-orphan")
