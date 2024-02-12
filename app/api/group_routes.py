from flask import Blueprint, request
from app.models import db
from app.models.group import Group
from app.models.group_members import GroupMember
from app.forms.group_form import GroupForm
from app.api.aws_images import upload_img_to_s3, remove_img_from_s3, get_unique_filename_img

group_routes = Blueprint('group', __name__)

@group_routes.route('/<int:id>', methods=['PUT'])
def updateGroup(id):
    group = Group.query.get(id)
    form = GroupForm()
    # form.group_pic_url.data.filename = get_unique_filename_img(form.group_pic_url.data.filename)
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        group.name = data['name']
        # group.group_pic_url=upload_img_to_s3(form.group_pic_url.data).get("url")
        db.session.commit()
        return group.to_dict()

@group_routes.route('/<int:id>/members')
def loadGroupMembers(id):
    members = [member.to_dict() for member in GroupMember.query.filter(GroupMember.group_id == id).all()]
    return members
