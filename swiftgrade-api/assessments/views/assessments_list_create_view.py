from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from assessments.serializers import (
    AssessmentCreateSerializer,
    AssessmentsListSerializer,
    AssessmentSerializer,
)
from assessments.schemas import AssessmentsCreateListSchema
from assessments.services import AssessmentService

from users.permissions import IsUserPermissionForGroups


REQUEST_SERIALIZER_MAP = {
    'GET': AssessmentsListSerializer,
    'POST': AssessmentCreateSerializer
}


class AssessmentsListCreateView(ListCreateAPIView):
    permission_classes = (IsUserPermissionForGroups, )
    swagger_schema = AssessmentsCreateListSchema
    filter_backends = (OrderingFilter, )
    ordering_fields = ['created_at', 'name']

    def get_serializer_class(self):
        return REQUEST_SERIALIZER_MAP[self.request.method]

    def get_serializer_context(self):
        return {
            'group_id': self.request.data.get('group_id', None),
            'name_validation_type': 'create_assessment'
        }

    def get_queryset(self):
        group_id = self.request.query_params.get('group_id', None)
        return AssessmentService.get_assessments(group_id)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context=self.get_serializer_context())
        if serializer.is_valid():
            assessment = serializer.save()
            assessment_serializer = AssessmentSerializer(instance=assessment)
            return Response(assessment_serializer.data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
