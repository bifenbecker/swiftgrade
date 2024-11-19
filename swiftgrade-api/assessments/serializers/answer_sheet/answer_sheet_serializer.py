from rest_framework import serializers
from assessments.helpers import AnswerSheetHelper
from assessments.models import AnswerSheet, AnswerSheetZip


class AnswerSheetSerializer(serializers.ModelSerializer):
    assessment_id = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = AnswerSheet
        fields = ('id', 'assessment_id', 'status', 'url', )

    def get_assessment_id(self, instance):
        return self.context['assessment'].id

    def get_status(self, instance):
        return self.context['assessment'].status

    @staticmethod
    def get_url(instance):
        accuracy_tips = AnswerSheetZip.objects.filter(is_download=False, kind=AnswerSheetZip.CUSTOM).first()
        is_accuracy = accuracy_tips and accuracy_tips.document

        return {
            'format': 'zip' if accuracy_tips else 'pdf',
            'path': accuracy_tips.document.url if is_accuracy else instance.document_url,
        }
