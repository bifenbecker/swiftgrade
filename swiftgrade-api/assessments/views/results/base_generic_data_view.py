from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny

from assessments.models import RecognitionBatch
from assessments.services import ParseGenericBatchService
from assessments.tasks import save_generic_data_cropping_task, save_generic_data_recognition_task


TASKS = {
    'cropping': save_generic_data_cropping_task,
    'recognition': save_generic_data_recognition_task,
}
SERVICES = {
    'cropping': ParseGenericBatchService.match_results,
    'recognition': ParseGenericBatchService.match_students,
}


class BaseGenericDataCroppingView(GenericAPIView):
    permission_classes = (AllowAny,)

    def get_response(self, validated_data, key='cropping'):
        batch_id = self.kwargs.get("batch_id", None)
        batch = get_object_or_404(RecognitionBatch, id=batch_id)

        if batch and batch.status != RecognitionBatch.COMPLETED:
            TASKS[key].apply_async(args=(batch_id, validated_data), serializer='pickle')
            # SERVICES[key](batch_id, validated_data)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @staticmethod
    def get_error_response(errors):
        return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
