from .db import db, environment, SCHEMA, add_prefix_for_prod

class Group(db.Model):
    __tablename__ = 'groups'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(30), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    group_pic_url = db.Column(db.String, nullable=False, default='https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'organizer_id': self.organizer_id,
            'group_pic_url': self.group_pic_url,
        }