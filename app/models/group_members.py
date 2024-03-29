from .db import db, environment, SCHEMA, add_prefix_for_prod

class GroupMember(db.Model):
    __tablename__ = 'group_members'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(40), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'group_id': self.group_id
        }
