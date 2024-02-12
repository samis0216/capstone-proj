from .db import db, environment, SCHEMA, add_prefix_for_prod

class ExpenseDetail(db.Model):
    __tablename__ = 'expense_details'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expenses.id')), nullable=False)
    contributer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('group_members.id')), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    settled = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'expense_id': self.expense_id,
            'contributer_id': self.contributer_id,
            'amount': self.amount,
            'settled': self.settled
        }
