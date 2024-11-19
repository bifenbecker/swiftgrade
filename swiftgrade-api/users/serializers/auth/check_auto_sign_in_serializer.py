from rest_framework import serializers


class CheckAutoSignInSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
