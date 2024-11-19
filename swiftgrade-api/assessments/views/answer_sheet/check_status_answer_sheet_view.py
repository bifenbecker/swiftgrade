from assessments.models import AnswerSheetZip
from assessments.schemas import CheckStatusAnswerSheetSchema
from assessments.serializers import CheckStatusAnswerSheetSerializer

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from users.permissions import IsTeacherPermission


class CheckStatusAnswerSheetView(GenericAPIView):
    permission_classes = (IsTeacherPermission,)
    serializer_class = CheckStatusAnswerSheetSerializer
    swagger_schema = CheckStatusAnswerSheetSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            filter_data = serializer.validated_data
            filter_data.update({'user_id': request.user.id})

            answer_sheet = AnswerSheetZip.objects.filter(**filter_data).first()
            if answer_sheet and answer_sheet.document:
                data = {"document_url": answer_sheet.document.url}
                AnswerSheetZip.objects.filter(**filter_data).update(is_download=True)
            else:
                data = serializer.validated_data
            return Response(data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
