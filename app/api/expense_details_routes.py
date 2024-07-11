from flask import Blueprint, request
from app.models import db
from app.models.expense import Expense
from app.models.payment import Payment
from app.models.expense_detail import ExpenseDetail

expense_details_routes = Blueprint('expenseDetail', __name__)

@expense_details_routes.route('/<int:id>/<int:userId>', methods=['DELETE'])
def deleteDetail(id, userId):
    detail = ExpenseDetail.query.get(id)
    expense = Expense.query.get(detail.expense_id)
    expense.amount = expense.amount - detail.amount
    payment = Payment(
        payer_id=userId,
        payee_id=expense.payer_id,
        amount_paid=detail.amount,
        complete=True
    )
    if expense.amount == 0:
        db.session.delete(expense)
    db.session.delete(detail)
    db.session.add(payment)
    db.session.commit()
    return {
        'id': id
    }

@expense_details_routes.route('/new/<int:userId>/<int:expenseId>', methods=['POST'])
def createDetail(userId, expenseId):
    detail = ExpenseDetail(
        expense_id = expenseId,
        contributor_id = userId,
        amount = 100,
        settled = False
    )
    return {
        'detail': detail
    }
