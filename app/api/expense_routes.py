from flask import Blueprint, request
from app.models import db
from app.models.expense import Expense
from app.forms.expense_form import ExpenseForm

expense_routes = Blueprint('expense', __name__ )

# @expense_routes.route('/<int:id>')
# def allExpenses():
#     expenses = Expense.query.filter()

@expense_routes.route('/<int:id>', methods=['PUT'])
def updateExpense(id):
    expense = Expense.query.get(id)
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        data = form.data
        expense.category=data['category']
        expense.description=form.data['description']
        expense.payer_id=form.data['payer_id']
        expense.group_id=form.data['group_id']
        expense.amount=data['amount']
        db.session.commit()
    return 'Bad Data'
