from rest_framework import serializers


class UpdateNeedGradingSerializer(serializers.Serializer):
    result_item_id = serializers.IntegerField(required=True)

