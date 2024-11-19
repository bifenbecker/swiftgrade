from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.generics import GenericAPIView

from django.shortcuts import get_object_or_404

from assessments.models import AssessmentResult
from assessments.schemas import ViewFullImagesSchema
from assessments.services import AssessmentResultsService


class ViewFullScansView(GenericAPIView):
    swagger_schema = ViewFullImagesSchema

    def get_object(self):
        result_id = self.kwargs.get("result_id", None)
        return get_object_or_404(AssessmentResult, id=result_id)

    def get(self, request, *args, **kwargs):
        assessment_result = self.get_object()
        response_data = {"data": AssessmentResultsService.get_assessment_result_item_scans(assessment_result)}
        return Response(response_data, status=HTTP_200_OK)
