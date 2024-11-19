from assessments.services import CustomAnswerSheetService
from assessments.serializers import AnswerSheetSerializer, ResultAnswerSheetSerializer
from assessments.schemas import ResultAnswerSheetSchema

from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from assessments.views.mixins.answer_sheet_mixin_view import AnswerSheetMixinView


class ResultAnswerSheetView(AnswerSheetMixinView, GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ResultAnswerSheetSerializer
    swagger_schema = ResultAnswerSheetSchema

    def get(self, request, *args, **kwargs):
        answer_sheet_id, assessment_id = self.kwargs["answer_sheet_id"], self.kwargs["assessment_id"]
        assessment, answer_sheet = \
            self.get_object("assessment", {"id": assessment_id, "answersheet__id": answer_sheet_id}), \
            self.get_object("answer_sheet", {"id": answer_sheet_id, "assessments__id": assessment_id})

        data = None
        if assessment and answer_sheet:
            data = AnswerSheetSerializer(answer_sheet, context=self.get_context(assessment)).data
        return Response(data, status=HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            assessment = self.get_object("assessment", {"id": self.kwargs["assessment_id"]})
            CustomAnswerSheetService.get_result_answer_sheet(
                assessment,
                self.kwargs["answer_sheet_id"],
                serializer.validated_data,
            )
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
