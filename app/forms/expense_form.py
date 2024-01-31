from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired

class ExpenseForm(FlaskForm):
    category = StringField('Category', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    payer_id = StringField('Payer_Id', validators=[DataRequired()])
    group_id = StringField('Group_Id')
