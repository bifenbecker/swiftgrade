from assessments.models import AnswerSheetScan
from django.utils.translation import ugettext as _
from rest_framework import serializers


class GenericRecognitionItemSerializer(serializers.Serializer):
    barcode = serializers.CharField(required=True, allow_blank=False)
    scan_id = serializers.IntegerField(required=True)
    answers = serializers.JSONField()


class GenericRecognitionSerializer(serializers.Serializer):
    session_id = serializers.CharField(required=True, allow_blank=False)
    results = serializers.ListField(
        child=GenericRecognitionItemSerializer(), required=True, allow_empty=False)

    def validate_session_id(self, session_id):
        scans = AnswerSheetScan.manager.filter(session_id=session_id).all()

        if not scans.exists():
            raise serializers.ValidationError(_('Invalid session id'))
        return session_id