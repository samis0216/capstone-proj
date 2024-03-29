from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.models.expense import Expense
from app.models.expense_detail import ExpenseDetail
from app.models.group import Group
from app.models.payment import Payment
from app.forms.expense_form import ExpenseForm
from app.forms.group_form import GroupForm
from app.api.aws_images import upload_img_to_s3, remove_img_from_s3, get_unique_filename_img

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/groups')
def allGroups(id):
    userGroups = [group.to_dict() for group in Group.query.filter(Group.organizer_id == id)]
    return userGroups

@user_routes.route('/<int:id>/groups/<int:groupId>')
def oneGroup(id, groupId):
    userGroup = Group.query.get(groupId).to_dict()
    return userGroup

@user_routes.route('/<int:id>/groups', methods=['POST'])
def createGroup(id):
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        form.group_pic_url.data.filename = get_unique_filename_img(form.group_pic_url.data.filename)
        print(form.group_pic_url.data)
        img_url = upload_img_to_s3(form.group_pic_url.data)
        print('url:', img_url)
        newGroup = Group(
            name=data['name'],
            organizer_id=id,
            group_pic_url=img_url.get('url')
            # group_pic_url = "https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png"
        )
        print(newGroup)
        db.session.add(newGroup)
        db.session.commit()
        return newGroup.to_dict()
    return "Bad Data"

@user_routes.route('/<int:id>/groups/<int:groupId>', methods=['DELETE'])
def deleteGroup(id, groupId):
    group = Group.query.get(groupId)
    db.session.delete(group)
    db.session.commit()
    return {
        'id': groupId,
        'status': 'Successfully Deleted'
        }


@user_routes.route('/<int:id>/expenses', methods=['POST'])
def postExpense(id):
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        data = form.data
        newExpense = Expense(
            category=data['category'],
            description=data['description'],
            payer_id=data['payer_id'],
            group_id=data['group_id'],
            amount=data['amount']
        )
        db.session.add(newExpense)
        db.session.commit()
        return [newExpense.to_dict()]
    return "Bad Data"

@user_routes.route('/<int:id>/expenses')
def userExpenses(id):
    owned = [expense.to_dict() for expense in Expense.query.filter(Expense.payer_id == id).all()]
    partof = [Expense.query.get(expense.expense_id).to_dict() for expense in ExpenseDetail.query.filter(ExpenseDetail.contributer_id == id).all()]
    for i in owned:
        if i in partof:
            continue
        else:
            partof.append(i)
    return partof


@user_routes.route('/expenses/<int:id>')
def oneExpense(id):
    expense = Expense.query.get(id)
    print(expense)
    return expense.to_dict()

@user_routes.route('/expenses/<int:id>', methods=['DELETE'])
def deleteExpense(id):
    expense = Expense.query.get(id)
    db.session.delete(expense)
    db.session.commit()
    return 'Successfully deleted'

@user_routes.route('/<int:id>/payments')
def getPayments():
    return [payment.to_dict() for payment in Payment.query.filter(Payment.payer_id == id).all()]

@user_routes.route('/<int:id>/expenses/details')
def getDetails(id):
    details = [expense.to_dict() for expense in ExpenseDetail.query.filter(ExpenseDetail.contributer_id == id, ExpenseDetail.settled == False).all()]
    return details
