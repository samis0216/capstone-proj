from .db import db, environment, SCHEMA, add_prefix_for_prod

class Payment(db.Model) :
    __tablename__ = 'payments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('group_members.id')), nullable=False)
    payee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('group_members.id')), nullable=False)
    amount_paid = db.Column(db.Float, nullable=False)
    complete = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'payee_id': self.payee_id,
            'amount_paid': self.amount_paid,
            'complete': self.complete
        }
