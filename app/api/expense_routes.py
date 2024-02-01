# from flask import Blueprint, request
# from app.models import db
# from app.models.expense import Expense
# from app.forms.expense_form import ExpenseForm

# expense_routes = Blueprint('expense', __name__ )

# @expense_routes.route('/<int:id>')
# def allExpenses():
#     expenses = Expense.query.filter()

# @expense_routes.route('/new/<int:id>')
# def postExpense():
#     form = ExpenseForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit:
#         data = form.data
#         newExpense = Expense(
#             category=data['category'],
#             description=data['description']

#         )
