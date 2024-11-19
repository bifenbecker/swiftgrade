from rest_framework import serializers


class DeleteScanSessionSerializer(serializers.Serializer):
    session_id = serializers.CharField(required=True)
