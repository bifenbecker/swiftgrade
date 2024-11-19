from django.utils.translation import ugettext as _
from rest_framework import serializers

from groups.services import GroupService
from groups.validators import GroupValidator


class GroupUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_blank=False, max_length=50)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for key in ['required', 'null', 'blank']:
            self.fields['name'].error_messages[key] = _("Class name required")

    def validate_name(self, value):
        group_id = self.instance.id
        user = self.context.get('user')
        return GroupValidator.validate_name(group_id, value, user)

    def update(self, instance, validated_data):
        return GroupService.update_group(instance, validated_data)
