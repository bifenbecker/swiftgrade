from django.utils.translation import ugettext as _

from groups.models import Group
from groups.services import GroupService
from groups.validators import GroupValidator

from rest_framework import serializers


class GroupCreateSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=50)
    color = serializers.CharField(required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for key in ['required', 'null', 'blank']:
            self.fields['name'].error_messages[key] = _("Class name required")

    def create(self, validated_data):
        user = self.context.get('user')

        group_data = GroupService.set_categories_by_names([validated_data], user.id)[0]
        group_data.update({'code': GroupService.get_unique_code_group()})
        group = Group.manager.create(**group_data)
        GroupService.update_last_img_numbers(user.id, group_data)
        return group

    def validate_name(self, value):
        user = self.context.get('user')
        return GroupValidator.validate_name(None, value, user)
