from assessments.models import Assessment, AnswerSheet, AssessmentResult, AssessmentResultItem, AnswerSheetZip
from assessments.services import AssessmentResultsService
from assessments.helpers import AssessmentHelper

from django.db.models import Sum, Count, Q, When, Case, BooleanField
from django.conf import settings
from decimal import Decimal, ROUND_HALF_UP

from rest_framework import serializers

from .base_assessment_serializer import BaseAssessmentSerializer


STATUS_FOR_COMPLETED_ASSESSMENT = [
    Assessment.CROPPING,
    Assessment.ASSIGNED,
    Assessment.READY_FOR_ASSIGNMENT,
    Assessment.SCANNED,
    Assessment.SCANNING,
]


class AssessmentsListSerializer(BaseAssessmentSerializer, serializers.ModelSerializer):
    answers_sheets_ids = serializers.SerializerMethodField()
    average = serializers.SerializerMethodField()
    need_grading = serializers.SerializerMethodField()
    results_exist = serializers.SerializerMethodField()
    answer_sheet = serializers.SerializerMethodField()

    class Meta:
        model = Assessment
        fields = ('id', 'answers_sheets_ids', 'average', 'created_at', 'kind', 'name', 'need_grading', 'results_exist',
                  'status', 'type', 'answer_sheet')

    @staticmethod
    def get_answers_sheets_ids(instance):
        return AnswerSheet.objects.filter(assessments__id=instance.id).values_list('id', flat=True)

    def get_average(self, instance):
        results = self._get_results(instance, self._get_statuses(instance))
        incorrect_results = self._get_results(instance)
        if (results or incorrect_results) and instance.status in STATUS_FOR_COMPLETED_ASSESSMENT:
            mark = (results.aggregate(Sum('mark'))['mark__sum'] / results.count()) if results else Decimal('0.00')
            mark = mark.quantize(Decimal('.1'), rounding=ROUND_HALF_UP)
            total = AssessmentResultsService.get_assessment_total_mark(instance)
            total = total.quantize(Decimal('.00'), rounding=ROUND_HALF_UP)
            return {
                'count': results.count(),
                'count_incorrect_results': incorrect_results.count(),
                'incorrect_scans': self._get_incorrect_scans(incorrect_results),
                'result': AssessmentHelper.get_result(mark, total)
            }
        return {'count': 0, 'count_incorrect_results': 0, 'incorrect_scans': None, 'result': 'N/A'}

    def get_need_grading(self, instance):
        results = self._get_results(instance, self._get_statuses(instance))
        results_ids = results.values_list('id', flat=True)
        no_results = 0 in results.annotate(items_count=Count('result_items', distinct=True)).values_list('items_count', flat=True)
        return no_results or any(AssessmentResultItem.manager
                                 .filter(assessment_result_id__in=results_ids)
                                 .exclude(assessment_item__kind='mc')
                                 .annotate(need_grading_value=Case(When(Q(need_grading=True) |
                                                                        Q(need_grading_for_units=True), then=True),
                                                                   default=False, output_field=BooleanField()))
                                 .values_list('need_grading_value', flat=True))

    def get_results_exist(self, instance):
        return self._get_results(instance, self._get_statuses(instance)).exists()

    def get_answer_sheet(self, instance):
        answer_sheet_zip = self._get_answer_sheet_zip(instance)
        if answer_sheet_zip:
            answer_sheet_zip.is_download = True
            answer_sheet_zip.save()
            return {'id': answer_sheet_zip.id, 'url': f'{answer_sheet_zip.document.url}'}
        sheet = (AnswerSheet.objects
                 .filter(assessments__id=instance.id).exclude(document_file__isnull=True)
                 .order_by('-created_at').first())
        if sheet:
            return {'id': sheet.id, 'url': sheet.document_url}
        return None

    @staticmethod
    def _get_answer_sheet_zip(instance):
        return AnswerSheetZip.objects.filter(
            is_download=False, kind=AnswerSheetZip.CUSTOM, user=instance.group.user
        ).first()

    @staticmethod
    def _get_incorrect_scans(results):
        data = []
        for result in results:
            scan = result.answer_sheet_scan
            scan_item = {'id': None, 'student': None, 'result_id': result.id}
            if scan:
                student = {
                    'first_name': scan.student.first_name,
                    'last_name': scan.student.last_name,
                    'email': scan.student.email,
                } if scan.student and scan.named else None
                scan_item.update({'id': scan.id, 'student': student})
            data.append(scan_item)
        return data

    @staticmethod
    def _get_statuses(assessment):
        if assessment.status == Assessment.CROPPING:
            return [AssessmentResult.PROCESSING, AssessmentResult.RECOGNIZED]
        return [AssessmentResult.RECOGNIZED]

    @staticmethod
    def _get_results(assessment, statuses=[AssessmentResult.RECOGNITION_ERROR]):
        return AssessmentResult.manager.filter(assessment_id=assessment.id, status__in=statuses)
