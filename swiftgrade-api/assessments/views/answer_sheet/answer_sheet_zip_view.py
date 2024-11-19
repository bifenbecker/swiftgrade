from assessments.models import AnswerSheetZip
from assessments.serializers import AnswerSheetZipSerializer
from assessments.services import AnswerSheetService
from assessments.schemas import AnswerSheetZipSchema

from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from users.permissions import IsTeacherPermission


class AnswerSheetZipView(ListCreateAPIView):
    permission_classes = (IsTeacherPermission,)
    serializer_class = AnswerSheetZipSerializer
    swagger_schema = AnswerSheetZipSchema

    def get(self, request, *args, **kwargs):
        data = AnswerSheetService.get_generic_answer_sheet_archive(request.user)
        return Response(data, status=HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            filter_data = serializer.validated_data
            filter_data.update({'user_id': request.user.id})

            is_download = filter_data.pop('is_download', False)
            AnswerSheetZip.objects.filter(**filter_data).update(is_download=is_download)
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
