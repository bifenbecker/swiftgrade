from rest_framework import serializers


class DeleteStudentsSerializer(serializers.Serializer):
    group_id = serializers.IntegerField(required=False)
    students_ids = serializers.ListField(required=True)
