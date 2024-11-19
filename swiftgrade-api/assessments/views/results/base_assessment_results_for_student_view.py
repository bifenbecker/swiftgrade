from assessments.helpers import AssessmentHelper, ResultHelper
from assessments.serializers import (
    AssessmentResultForStudentSerializer,
    AssessmentResultForStudentWithAnswersSerializer
)
from assessments.services import AssessmentResultsService
from rest_framework.generics import GenericAPIView
from decimal import Decimal

SERIALIZERS = {
    'mark_plus_student_answers': AssessmentResultForStudentSerializer,
    'mark_plus_student_answers_plus_correct_answers': AssessmentResultForStudentWithAnswersSerializer,
}


class BaseAssessmentResultForStudentView(GenericAPIView):
    @staticmethod
    def _get_context(completed_assessment):
        if completed_assessment.assessment:
            assessment_data = ResultHelper.get_assessment_data_for_results(completed_assessment.assessment)
            total = AssessmentResultsService.get_assessment_total_mark(completed_assessment.assessment)
            return {
                "assessment_data": assessment_data,
                "total": total,
            }
        return None

    @staticmethod
    def _get_mark(instance):
        total = AssessmentResultsService.get_assessment_total_mark(instance.assessment).quantize(Decimal('.1'))
        return AssessmentHelper.get_result(instance.result.mark, total)

    @staticmethod
    def _get_serializer(*args, **kwargs):
        release_type = kwargs.pop('release_type', 'mark_plus_student_answers')
        return SERIALIZERS[release_type](*args, **kwargs).data if release_type in SERIALIZERS else []

    def get_response(self, instance, release_type):
        results_items = \
            AssessmentResultsService.get_assessment_results_items(instance.result.id) if instance.result else []
        return {
            'data': self._get_serializer(results_items, release_type=release_type, many=True, context=self._get_context(instance)),
            'mark': self._get_mark(instance),
            'type': release_type,
        }