from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired
from app.api.aws_images import IMAGES_ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired

class GroupForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    organizer_id=IntegerField('ogranizer_id', validators=[DataRequired()])
    # group_pic_url = FileField('Group Pic URL', validators=[FileAllowed(list(IMAGES_ALLOWED_EXTENSIONS)), FileRequired()])
    group_pic_url = StringField('Group Pic URL', validators=[DataRequired()])
