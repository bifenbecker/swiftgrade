from rest_framework import serializers


class GenerateCodeGroupSerializer(serializers.Serializer):
    group_id = serializers.IntegerField(required=True)
