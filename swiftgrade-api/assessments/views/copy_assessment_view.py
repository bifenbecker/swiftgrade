from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from assessments.serializers import CopyAssessmentSerializer
from assessments.schemas import CopyAssessmentSchema

from users.permissions import IsTeacherPermissionForAssessments


class CopyAssessmentView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = CopyAssessmentSchema

    def post(self, request, *args, **kwargs):
        data = {'group_id': request.data.get('group_id', None)}
        serializer = CopyAssessmentSerializer(data=request.data, context=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data, status=HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
