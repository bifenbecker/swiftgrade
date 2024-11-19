from rest_framework.serializers import CharField, Serializer, JSONField


class CoordinatesSerializer(Serializer):
    data = JSONField(allow_null=False, required=True)
