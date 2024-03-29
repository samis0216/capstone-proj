from flask import Blueprint, request
from app.models import db
from app.models.expense import Expense
from app.models.expense_detail import ExpenseDetail
from app.forms.expense_form import ExpenseForm

expense_routes = Blueprint('expense', __name__ )

@expense_routes.route('/<int:id>', methods=['PUT'])
def updateExpense(id):
    expense = Expense.query.get(id)
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        data = form.data
        print(form.data)
        expense.category=form.data['category']
        expense.description=form.data['description']
        expense.payer_id=form.data['payer_id']
        expense.group_id=form.data['group_id']
        expense.amount=data['amount']
        db.session.commit()
        return expense.to_dict()
    return 'Bad Data'

@expense_routes.route('/groups/<int:id>')
def loadGroupExpenses(id):
    expenses = [expense.to_dict() for expense in Expense.query.filter(Expense.group_id == id).all()]
    return expenses

@expense_routes.route('/all')
def allExpenses():
    expenses = [expense.to_dict() for expense in Expense.query.all()]
    return expenses
