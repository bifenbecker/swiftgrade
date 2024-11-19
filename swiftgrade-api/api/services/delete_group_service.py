from assessments.models import Assessment
from groups.models import Group
from users.models import VerificationCode
from .delete_assessment_service import DeleteAssessmentService
from .delete_verification_code_service import DeleteVerificationCodeService
from .base_delete_service import BaseDeleteService


class DeleteGroupService(BaseDeleteService):
    MODEL = Group

    RELATED_MODELS = [
        {'service': DeleteAssessmentService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_assessments'},
        {'service': DeleteVerificationCodeService(), 'perform_service_method': 'perform', 'getting_data_method': 'get_verification_codes'}
    ]
