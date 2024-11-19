from rest_framework.generics import ListAPIView

from assessments.filters import AssessmentLookupFilter
from assessments.schemas import AssignedAssessmentsListSchema
from assessments.serializers import AssignedAssessmentsListSerializer
from assessments.services import AssessmentService

from users.permissions import IsUserPermissionForGroups


class AssignedAssessmentsListView(ListAPIView):
    filter_backends = (AssessmentLookupFilter, )
    permission_classes = (IsUserPermissionForGroups, )
    swagger_schema = AssignedAssessmentsListSchema
    serializer_class = AssignedAssessmentsListSerializer

    def get_queryset(self):
        group_id = self.request.query_params.get('group_id', None)
        return AssessmentService.get_assigned_assessments(group_id, self.request.user)
