from rest_framework.generics import ListAPIView

from assessments.schemas import CompletedAssessmentsListSchema
from assessments.serializers import CompletedAssessmentsListSerializer
from assessments.services import AssessmentService

from users.permissions import IsUserPermissionForGroups


class CompletedAssessmentsListView(ListAPIView):
    permission_classes = (IsUserPermissionForGroups, )
    swagger_schema = CompletedAssessmentsListSchema
    serializer_class = CompletedAssessmentsListSerializer

    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_queryset(self):
        group_id = self.request.query_params.get('group_id', None)
        return AssessmentService.get_completed_assessments(group_id, self.request.user)
