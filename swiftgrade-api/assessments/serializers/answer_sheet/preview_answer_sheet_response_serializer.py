from assessments.helpers import AnswerSheetHelper
from assessments.models import AnswerSheet

from rest_framework import serializers


class PreviewAnswerSheetResponseSerializer(serializers.ModelSerializer):
    assessment_id = serializers.SerializerMethodField()
    assessment_name = serializers.SerializerMethodField()
    document_url = serializers.SerializerMethodField()
    preview_document_url = serializers.SerializerMethodField()

    class Meta:
        model = AnswerSheet
        fields = ('id', 'document_url', 'preview_document_url', 'assessment_id', 'assessment_name', )

    def get_assessment_id(self, instance):
        return self.context['assessment'].id

    def get_assessment_name(self, instance):
        return self.context['assessment'].name

    def get_document_url(self, instance):
        return instance.document_url

    def get_preview_document_url(self, instance):
        return instance.preview_document_url
