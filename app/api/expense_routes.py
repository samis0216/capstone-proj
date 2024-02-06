from flask import Blueprint, request
from app.models import db
from app.models.expense import Expense
from app.models.expense_detail import ExpenseDetail
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
    print(form)
    if form.validate_on_submit:
        data = form.data
        expense.category=data['category']
        expense.description=form.data['description']
        expense.payer_id=form.data['payer_id']
        expense.group_id=form.data['group_id']
        expense.amount=data['amount']
        db.session.commit()
        return expense.to_dict()
    return 'Bad Data'

@expense_routes.route('/<int:id>/details')
def getDetails(id):
    details = [expense.to_dict() for expense in ExpenseDetail.query.filter(ExpenseDetail.expense_id == id).all()]
    return details

@expense_routes.route('/<int:id>/details/new', methods=['POST'])
def newDetails(id):
    details = [expense.to_dict() for expense in ExpenseDetail.query.filter(ExpenseDetail.expense_id == id).all()]
    return details
