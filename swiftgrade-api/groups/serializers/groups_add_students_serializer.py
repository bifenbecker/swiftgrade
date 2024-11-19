from rest_framework import serializers


class GroupsAddStudentsSerializer(serializers.Serializer):
    groups = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)
    students = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)
