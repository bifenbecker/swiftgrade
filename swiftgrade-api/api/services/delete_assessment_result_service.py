from assessments.models import AssessmentResult
from .base_delete_service import BaseDeleteService
from .delete_answer_sheet_scan_service import DeleteAnswerSheetScanService
from .delete_assessment_result_item_service import DeleteAssessmentResultItemService
from .delete_completed_assessment_service import DeleteCompletedAssessmentService


class DeleteAssessmentResultService(BaseDeleteService):
    MODEL = AssessmentResult

    RELATED_MODELS = [
        {'service': DeleteAnswerSheetScanService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_answer_sheet_scans'},
        {'service': DeleteAssessmentResultItemService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_assessment_result_items_from_results'},
        {'service': DeleteCompletedAssessmentService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_completed_assessments_from_results'},
    ]

    def get_assessment_results(self, assessments):
        return self.get_related_data(assessments, 'assessment')
