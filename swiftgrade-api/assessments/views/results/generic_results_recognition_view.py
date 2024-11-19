from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from assessments.models import Assessment
from assessments.schemas import GenericRecognitionSchema
from assessments.services import ParseGenericBatchService
from assessments.serializers import GenericRecognitionSerializer
from assessments.utils import log_view


class GenericResultsRecognitionView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GenericRecognitionSerializer
    swagger_schema = GenericRecognitionSchema

    def get_object(self):
        assessment_id = self.kwargs.get("assessment_id", None)
        return get_object_or_404(Assessment, id=assessment_id)

    @log_view
    def post(self, request, *args, **kwargs):
        """
            Getting recognition data, comparing generic results
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            assessment = self.get_object()
            ParseGenericBatchService.compare_results(assessment, serializer.validated_data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
