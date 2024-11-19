from datetime import datetime, timezone

from assessments.schemas import GenerateAnswerSheetSchema
from assessments.services import CustomAnswerSheetService
from assessments.serializers import GenerateAnswerSheetSerializer

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from users.permissions import IsTeacherPermissionForAssessments
from users.services import UserService

from assessments.views.mixins.answer_sheet_mixin_view import AnswerSheetMixinView


class GenerateAnswerSheetView(AnswerSheetMixinView, GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments,)
    serializer_class = GenerateAnswerSheetSerializer
    swagger_schema = GenerateAnswerSheetSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            assessment = self.get_object("assessment", {"id": serializer.validated_data['assessment_id']})
            CustomAnswerSheetService.generate_answer_sheet(assessment, serializer.data)
            UserService.update_user(request.user, {'last_printed_as': datetime.now(tz=timezone.utc)})
            return Response(HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
