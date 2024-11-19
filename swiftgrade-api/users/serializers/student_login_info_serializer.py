from rest_framework import serializers


class StudentLoginInfoSerializer(serializers.Serializer):
    user_ids = serializers.ListField()
    passwords = serializers.ListField()
