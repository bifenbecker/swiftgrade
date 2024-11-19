from assessments.models import Assessment, AnswerSheet
from rest_framework.generics import GenericAPIView
from users.permissions import IsTeacherPermissionForAssessments

MODELS = {
    "assessment": Assessment,
    "answer_sheet": AnswerSheet,
}


class AnswerSheetMixinView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )

    @staticmethod
    def get_context(assessment):
        return {"assessment": assessment}

    @staticmethod
    def get_object(key, query):
        if hasattr(MODELS[key], 'manager'):
            return MODELS[key].manager.filter(**query).first()
        return MODELS[key].objects.filter(**query).first()
