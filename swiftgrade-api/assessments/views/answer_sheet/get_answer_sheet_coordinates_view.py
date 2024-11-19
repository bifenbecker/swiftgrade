from assessments.models import AnswerSheet
from assessments.services import AnswerSheetService
from assessments.schemas import GetAnswerSheetCoordinatesSchema

from django.shortcuts import get_object_or_404

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK


class GetAnswerSheetCoordinatesView(GenericAPIView):
    permission_classes = (AllowAny, )
    swagger_schema = GetAnswerSheetCoordinatesSchema

    def get_object(self):
        return get_object_or_404(AnswerSheet, id=self.kwargs.get('answer_sheet_id', None))

    def get(self, request, *args, **kwargs):
        sheet = self.get_object()
        return Response(AnswerSheetService.get_answer_sheet_coordinates(sheet), status=HTTP_200_OK)
