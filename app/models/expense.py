from .db import db, environment, SCHEMA, add_prefix_for_prod

class Expense(db.Model) :
    __tablename__ = 'expenses'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)
    description =db.Column(db.String, nullable=False)
    payer_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    group_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'description': self.description,
            'payer_id': self.payer_id,
            'group_id': self.group_id,
        }
