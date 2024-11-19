from datetime import datetime, timezone

from assessments.schemas import GenerateGenericAnswerSheetSchema
from assessments.serializers import GenerateGenericAnswerSheetSerializer
from assessments.services import GenericAnswerSheetService

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from users.permissions import IsTeacherPermission
from users.services import UserService


class GenerateGenericAnswerSheetView(GenericAPIView):
    permission_classes = (IsTeacherPermission,)
    serializer_class = GenerateGenericAnswerSheetSerializer
    swagger_schema = GenerateGenericAnswerSheetSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            data = GenericAnswerSheetService.generate_answer_sheet(
                serializer.validated_data["class_names"],
                serializer.validated_data["file_format"],
                serializer.validated_data["number_of_answers"],
                serializer.validated_data["number_of_letters"],
                serializer.validated_data["sheets_per_page"],
                request.user
            )
            UserService.update_user(request.user, {'last_printed_as': datetime.now(tz=timezone.utc)})
            return Response(data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
