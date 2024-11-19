from assessments.models import AssessmentResultItem, AssessmentItem
from assessments.services import AssessmentResultsService
from assessments.services.base_assessment_service import BaseAssessmentService


class NeedGradingService(BaseAssessmentService):
    """
        Changes a need grading value of the specific result items
    """

    @classmethod
    def update_need_grading_for_answer(cls, assessment, data):
        result_items, numbers = AssessmentResultsService.get_assessment_answers(assessment.id, data)
        cls._update_result_items(result_items)
        return result_items, numbers

    @classmethod
    def update_need_grading_for_assessment(cls, assessment):
        result_items = AssessmentResultItem.manager.filter(assessment_result__assessment_id=assessment.id)
        cls._update_result_items(result_items)
        return result_items

    @classmethod
    def update_need_grading_for_result(cls, result):
        result_items = AssessmentResultItem.manager.filter(assessment_result_id=result.id)
        cls._update_result_items(result_items)
        return result_items

    @classmethod
    def _update_result_items(cls, result_items):
        updated_result_items = []
        for result_item in result_items:
            result_item.need_grading = False
            if result_item.assessment_item.kind in [AssessmentItem.MF, AssessmentItem.NUMERIC]:
                result_item.need_grading_for_units = False
            updated_result_items.append(result_item)
        return cls._bulk_update('result_item', updated_result_items, fields=['need_grading', 'need_grading_for_units'])
