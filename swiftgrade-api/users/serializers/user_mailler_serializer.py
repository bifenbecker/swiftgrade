from rest_framework import serializers


class UserMailerSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, allow_blank=False)
