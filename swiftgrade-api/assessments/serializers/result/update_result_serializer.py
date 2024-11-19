from rest_framework import serializers

from assessments.services import AssessmentResultsService


class UpdateResultSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=False, max_length=30, allow_blank=True, allow_null=True)
    last_name = serializers.CharField(required=False, max_length=30, allow_blank=True, allow_null=True)
    username = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def update(self, instance, validated_data):
        if not instance.answer_sheet_scan.named and instance.recognized_person:
            instance.recognized_person.email = validated_data.get("username")
            return AssessmentResultsService.update_recognized_person(
                instance.recognized_person, validated_data
            )
        return instance
