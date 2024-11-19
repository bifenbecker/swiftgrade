from assessments.services import GenericAnswerSheetService
from assessments.serializers import ResultGenericAnswerSheetSerializer
from assessments.schemas import ResultGenericAnswerSheetSchema

from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST


class ResultGenericAnswerSheetView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ResultGenericAnswerSheetSerializer
    swagger_schema = ResultGenericAnswerSheetSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            GenericAnswerSheetService.get_result_answer_sheet(serializer.validated_data)
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
