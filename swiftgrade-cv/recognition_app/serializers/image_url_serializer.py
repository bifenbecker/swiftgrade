from rest_framework import serializers


class ImageUrlSerializer(serializers.Serializer):
    url = serializers.URLField(max_length=255, required=True)
