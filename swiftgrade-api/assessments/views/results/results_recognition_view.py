from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from assessments.schemas import ResultRecognitionSchema
from assessments.models import RecognitionBatch
from assessments.serializers import RecognitionSerializer

from assessments.tasks import parse_batch
# from assessments.services import ParseBatchService
from assessments.utils import log_view


class ResultsRecognitionView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecognitionSerializer
    swagger_schema = ResultRecognitionSchema

    def get_object(self):
        batch_id = self.kwargs.get("batch_id", None)
        return get_object_or_404(RecognitionBatch, id=batch_id)

    @log_view
    def post(self, request, *args, **kwargs):
        """
            Getting recognition data for custom assessment, building recognized persons
        """
        batch = self.get_object()
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            # ParseBatchService.parse(batch, serializer.validated_data)
            parse_batch.apply_async(args=(batch, serializer.validated_data), serializer='pickle')
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
