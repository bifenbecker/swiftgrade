from assessments.models import AnswerSheetScan, AssessmentResult
from rest_framework import serializers
from django.utils.translation import ugettext as _


class ScanAnswerSheetSerializer(serializers.Serializer):
    session_id = serializers.CharField(required=True)

    @staticmethod
    def _is_valid_answer_sheet(scan):
        return scan.answer_sheet is not None

    @staticmethod
    def _is_valid_scan_pages(scan):
        pages = scan.answer_sheet.named_page_count if scan.named else scan.answer_sheet.unnamed_page_count
        return scan.scan_items.count() == pages

    def validate(self, values):
        session_id = values.get('session_id', None)
        scans = AnswerSheetScan.manager.filter(session_id=session_id).all()

        if not scans.exists():
            raise serializers.ValidationError(_('Invalid session id'))

        data, results_for_update = [], []
        for scan in scans:
            result = scan.assessment_result

            if scan.assessment_result:
                status = AssessmentResult.RECOGNITION_ERROR
                if self._is_valid_answer_sheet(scan) and self._is_valid_scan_pages(scan):
                    status = AssessmentResult.PROCESSING
                    data.append(scan)
                result.status = status
                results_for_update.append(result)

        # update status scans
        AssessmentResult.manager.bulk_update(results_for_update, ['status'])
        return data
