from .delete_assessment_service import DeleteAssessmentService
from .delete_assessment_result_service import DeleteAssessmentResultService
from .delete_group_service import DeleteGroupService

SERVICES = {
    'group': DeleteGroupService(),
    'assessment': DeleteAssessmentService(),
    'result': DeleteAssessmentResultService(),
}


class SoftDeleteService:
    @staticmethod
    def perform(key, data):
        if key in SERVICES:
            return SERVICES[key].perform(data)
        return None
