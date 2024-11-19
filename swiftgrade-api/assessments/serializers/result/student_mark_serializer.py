from assessments.models import AssessmentResultItemMark
from rest_framework import serializers


class StudentMarkSerializer(serializers.ModelSerializer):
    value = serializers.SerializerMethodField()

    class Meta:
        model = AssessmentResultItemMark
        fields = ('id', 'kind', 'value', )

    def get_value(self, instance):
        return instance.value.normalize() if instance.value % 1 == 0 else instance.value
