from assessments.models import Assessment
from .base_delete_service import BaseDeleteService
from .delete_assessment_item_service import DeleteAssessmentItemService
from .delete_assessment_result_service import DeleteAssessmentResultService
from .delete_assessment_settings_service import DeleteAssessmentSettingsService
from .delete_completed_assessment_service import DeleteCompletedAssessmentService
from .delete_recognition_batch_service import DeleteRecognitionBatchService


class DeleteAssessmentService(BaseDeleteService):
    MODEL = Assessment

    RELATED_MODELS = [
        {'service': DeleteAssessmentResultService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_assessment_results'},
        {'service': DeleteAssessmentItemService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_assessment_items'},
        {'service': DeleteAssessmentSettingsService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_assessment_settings'},
        {'service': DeleteCompletedAssessmentService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_completed_assessments'},
        {'service': DeleteRecognitionBatchService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_recognition_batch'}
    ]

    def get_assessments(self, groups):
        return self.get_related_data(groups, 'group')
