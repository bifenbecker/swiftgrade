from rest_framework import serializers


class StudentGenericSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    name = serializers.CharField(max_length=255, required=True)
    class_ids = serializers.ListField(child=serializers.IntegerField(),
                                      required=False,
                                      allow_empty=True,
                                      allow_null=True)
