from django.utils.translation import ugettext as _
from rest_framework import serializers

from groups.services import GroupService
from groups.validators import GroupValidator


class CopyGroupSerializer(serializers.Serializer):
    color = serializers.CharField(max_length=255)
    group_id = serializers.IntegerField(required=False)
    name = serializers.CharField(allow_blank=False, max_length=50, required=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for key in ['required', 'null', 'blank']:
            self.fields['name'].error_messages[key] = _("Class name required")

    def validate_name(self, value):
        user = self.context.get('user')
        return GroupValidator.validate_name(None, value, user)

    def create(self, validated_data):
        color = validated_data['color']
        group_id = validated_data['group_id']
        name = validated_data['name']
        return GroupService.copy_group(color, group_id, name)
