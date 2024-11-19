from rest_framework import serializers


class ClassNameGenericSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True, allow_null=False)
    name = serializers.CharField(max_length=255, required=True)
    answer_sheet_id = serializers.IntegerField(required=False, allow_null=True)
