from rest_framework import serializers

from groups.models import Group


class GroupsListSerializer(serializers.ModelSerializer):
    students_count = serializers.IntegerField()
    assessments_count = serializers.IntegerField()
    generic_assessments_count = serializers.IntegerField()

    class Meta:
        model = Group
        fields = ('id', 'name', 'category', 'category_img_number', 'color', 'students_count', 'assessments_count',
                  'generic_assessments_count',)
