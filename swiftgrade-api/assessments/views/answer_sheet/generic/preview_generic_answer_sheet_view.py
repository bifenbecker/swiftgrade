from assessments.services import GenericAnswerSheetService
from assessments.serializers import PreviewGenericAnswerSheetSerializer
from assessments.schemas import PreviewGenericAnswerSheetSchema

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from users.permissions import IsTeacherPermission


class PreviewGenericAnswerSheetView(GenericAPIView):
    permission_classes = (IsTeacherPermission, )
    serializer_class = PreviewGenericAnswerSheetSerializer
    swagger_schema = PreviewGenericAnswerSheetSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = GenericAnswerSheetService.preview_answer_sheet(**serializer.validated_data)
            return Response(data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
