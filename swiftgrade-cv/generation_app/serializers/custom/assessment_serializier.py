from rest_framework import serializers


class AssessmentSerializer(serializers.Serializer):
    CUSTOM = "custom"
    GENERIC = "generic"

    ASSESSMENT_TYPE_CHOICES = [CUSTOM, GENERIC]

    kind = serializers.ChoiceField(required=True, choices=ASSESSMENT_TYPE_CHOICES)
    name = serializers.CharField(required=True, max_length=255)
    id = serializers.IntegerField(required=True)
    answer_sheet_id = serializers.IntegerField(required=True)
