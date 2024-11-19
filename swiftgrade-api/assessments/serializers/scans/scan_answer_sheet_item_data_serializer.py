from django.db.models import Count
from rest_framework import serializers

from assessments.models import AnswerSheetScan, AnswerSheetScanItem
from users.models import Student
from users.serializers import StudentsListSerializer


class ScanAnswerSheetItemDataSerializer(serializers.ModelSerializer):
    email_url = serializers.SerializerMethodField()
    first_name_url = serializers.SerializerMethodField()
    last_name_url = serializers.SerializerMethodField()
    named = serializers.BooleanField(source='answer_sheet_scan.named')
    pages = serializers.IntegerField(source='answer_sheet_scan.pages')
    scanned_pages = serializers.SerializerMethodField()
    scans = serializers.SerializerMethodField()
    student = serializers.SerializerMethodField()
    result = serializers.SerializerMethodField()

    class Meta:
        model = AnswerSheetScanItem
        fields = (
            'id', 'answer_sheet_scan_id', 'email_url', 'first_name_url', 'last_name_url',
            'named', 'page', 'pages', 'scanned_pages', 'scans', 'student', 'result', )

    def get_scanned_pages(self, instance):
        return AnswerSheetScanItem.manager \
            .filter(answer_sheet_scan_id=instance.answer_sheet_scan_id).values_list('page', flat=True)

    def get_scans(self, instance):
        session_id = self.context['session_id']
        answer_sheet_scans = AnswerSheetScan.manager \
            .annotate(items_count=Count('scan_items', distinct=True)) \
            .filter(items_count=instance.answer_sheet_scan.pages, session_id=session_id).all()
        return len(answer_sheet_scans)

    def get_student(self, instance):
        student = Student.objects.filter(answersheetscan__id=instance.answer_sheet_scan_id).first()
        if student:
            return StudentsListSerializer(student, many=False).data
        return None

    def get_result(self, instance):
        return self.context['result']

    def get_first_name_url(self, instance):
        return instance.answer_sheet_scan.first_name_url

    def get_last_name_url(self, instance):
        return instance.answer_sheet_scan.last_name_url

    def get_email_url(self, instance):
        return instance.answer_sheet_scan.email_url
