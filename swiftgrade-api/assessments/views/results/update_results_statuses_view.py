from assessments.schemas import UpdateResultsStatusesSchema
from assessments.serializers import UpdateResultsStatusesSerializer

from users.permissions import IsTeacherPermissionForAssessments

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST


class UpdateResultsStatusesView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments, )
    swagger_schema = UpdateResultsStatusesSchema
    serializer_class = UpdateResultsStatusesSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
