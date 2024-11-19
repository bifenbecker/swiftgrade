from assessments.serializers import CheckAssessmentNameSerializer
from assessments.schemas import CheckAssessmentNameSchema

from users.permissions import IsUserPermissionForGroups

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST


class CheckAssessmentNameView(GenericAPIView):
    permission_classes = (IsUserPermissionForGroups, )
    serializer_class = CheckAssessmentNameSerializer
    swagger_schema = CheckAssessmentNameSchema

    def get_serializer_context(self):
        return {"group_id": self.request.data.get("group_id", None)}

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context=self.get_serializer_context())

        if serializer.is_valid():
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
