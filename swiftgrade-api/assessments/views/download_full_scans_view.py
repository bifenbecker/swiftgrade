from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from assessments.schemas import DownloadFullScansSchema
from assessments.models import AssessmentResult
from assessments.services import AssessmentResultsService


class DownloadFullScansView(GenericAPIView):
    swagger_schema = DownloadFullScansSchema

    def get_object(self):
        result_id = self.kwargs.get("result_id", None)
        return get_object_or_404(AssessmentResult, id=result_id)

    def get(self, request, *args, **kwargs):
        assessment_result = self.get_object()
        page = self.request.query_params.get("page", None)
        response = (AssessmentResultsService.get_assessment_result_item_scan_for_download(assessment_result, page))
        return Response(response, status=HTTP_200_OK)
