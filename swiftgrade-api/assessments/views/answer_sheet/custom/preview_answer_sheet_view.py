from assessments.models import AnswerSheet
from assessments.schemas import PreviewAnswerSheetSchema
from assessments.services import CustomAnswerSheetService
from assessments.serializers import PreviewAnswerSheetSerializer, PreviewAnswerSheetResponseSerializer

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from users.permissions import IsTeacherPermissionForAssessments

from assessments.views.mixins.answer_sheet_mixin_view import AnswerSheetMixinView


class PreviewAnswerSheetView(AnswerSheetMixinView, GenericAPIView):
    permission_classes = (IsTeacherPermissionForAssessments,)
    serializer_class = PreviewAnswerSheetSerializer
    swagger_schema = PreviewAnswerSheetSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            assessment = self.get_object("assessment", {"id": serializer.validated_data["assessment_id"]})
            answer_sheet = AnswerSheet.objects.filter(
                assessments__id=serializer.data["assessment_id"],
                document_file__isnull=True,
                kind=AnswerSheet.CUSTOM,
            ).exclude(preview_document_file__isnull=True).last()

            if not answer_sheet or answer_sheet.changed:
                answer_sheet = CustomAnswerSheetService.preview_answer_sheet(assessment)

            return Response(
                PreviewAnswerSheetResponseSerializer(answer_sheet, context=self.get_context(assessment)).data,
                status=HTTP_200_OK
            )
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
