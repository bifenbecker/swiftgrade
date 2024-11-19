from rest_framework import serializers


class DeleteResultsSerializer(serializers.Serializer):
    results_ids = serializers.ListField(required=True)
