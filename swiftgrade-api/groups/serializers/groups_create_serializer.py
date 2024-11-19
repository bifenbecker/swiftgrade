from rest_framework import serializers

from groups.models import Group
from groups.services import GroupService
from groups.validators import GroupValidator
from users.services import UserChecklistService
from users.models import Checklist


class GroupsCreateSerializer(serializers.Serializer):
    groups = serializers.ListField(required=True)

    def create(self, validated_data):
        user = self.context.get('user')

        groups = validated_data['groups']
        groups.reverse()

        groups = GroupService.set_categories_by_names(groups, user.id)
        data = [Group(**item) for item in groups]

        groups = Group.manager.bulk_create(data)
        GroupService.update_last_img_numbers(user.id, validated_data['groups'])
        UserChecklistService.create_or_update(user, Checklist.CLASS_CREATED)
        return groups

    def validate_groups(self, value):
        user = self.context.get('user')
        return GroupValidator.validate_groups(value, user)
