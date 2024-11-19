from rest_framework import serializers


class StudentSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    name = serializers.CharField(max_length=255, required=True)
