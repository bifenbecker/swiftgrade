from users.models import VerificationCode
from .base_delete_service import BaseDeleteService


class DeleteVerificationCodeService(BaseDeleteService):
    MODEL = VerificationCode

    def get_verification_codes(self, groups):
        return self.get_related_data(groups, 'group')
