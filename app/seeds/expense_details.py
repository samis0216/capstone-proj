from app.models.expense_detail import ExpenseDetail
from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_expense_details():
    det1=ExpenseDetail(expense_id= 1, contributer_id= 1, amount= 120.34, settled = False)
    det2=ExpenseDetail(expense_id= 1, contributer_id= 2, amount= 120.33, settled = False)
    det3=ExpenseDetail(expense_id= 1, contributer_id= 3, amount= 120.33, settled = False)
    det12=ExpenseDetail(expense_id= 2, contributer_id= 1, amount= 20.68, settled = False)
    det22=ExpenseDetail(expense_id= 2, contributer_id= 2, amount= 20.66, settled = False)
    det32=ExpenseDetail(expense_id= 2, contributer_id= 3, amount= 20.66, settled = False)
    det4=ExpenseDetail(expense_id= 3, contributer_id= 4, amount= 40.68, settled = False)
    det5=ExpenseDetail(expense_id= 3, contributer_id= 5, amount= 40.66, settled = False)
    det6=ExpenseDetail(expense_id= 3, contributer_id= 6, amount= 40.66, settled = False)
    det42=ExpenseDetail(expense_id= 4, contributer_id= 4, amount= 70, settled = False)
    det52=ExpenseDetail(expense_id= 4, contributer_id= 5, amount= 70, settled = False)
    det62=ExpenseDetail(expense_id= 4, contributer_id= 6, amount= 70, settled = False)
    det7=ExpenseDetail(expense_id= 5, contributer_id= 7, amount= 33.34, settled = False)
    det8=ExpenseDetail(expense_id= 5, contributer_id= 8, amount= 33.33, settled = False)
    det9=ExpenseDetail(expense_id= 5, contributer_id= 9, amount= 33.33, settled = False)
    det72=ExpenseDetail(expense_id= 6, contributer_id= 7, amount= 27.68, settled = False)
    det82=ExpenseDetail(expense_id= 6, contributer_id= 8, amount= 27.66, settled = False)
    det92=ExpenseDetail(expense_id= 6, contributer_id= 9, amount= 27.66, settled = False)

    db.session.add(det1)
    db.session.add(det12)
    db.session.add(det2)
    db.session.add(det12)
    db.session.add(det22)
    db.session.add(det32)
    db.session.add(det4)
    db.session.add(det5)
    db.session.add(det6)
    db.session.add(det42)
    db.session.add(det52)
    db.session.add(det62)
    db.session.add(det7)
    db.session.add(det8)
    db.session.add(det9)
    db.session.add(det72)
    db.session.add(det82)
    db.session.add(det92)
    db.session.commit()

def undo_expense_details():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expense_details RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expense_details"))

    db.session.commit()
