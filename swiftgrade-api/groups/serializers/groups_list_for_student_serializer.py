from rest_framework import serializers
from groups.models import Group


class GroupsListForStudentSerializer(serializers.ModelSerializer):
    teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ('id', 'name', 'category', 'category_img_number', 'color', 'teacher_name', )

    def get_teacher_name(self, instance):
        if instance.user:
            gender = f'{instance.user.gender.capitalize()}. ' if instance.user.gender else ''
            return f'{gender}{instance.user.last_name}'
        return None
