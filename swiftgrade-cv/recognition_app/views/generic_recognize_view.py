from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from recognition_app.schemas import GenericRecognizeSchema
from recognition_app.serializers import GenericBatchSerializer
from recognition_app.services.generic_recognition_service import generic_recognize_process



class GenericRecognizeView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GenericBatchSerializer
    swagger_schema = GenericRecognizeSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        generic_recognize_process.apply_async((serializer.data, self.kwargs['batch_id']),)
        return Response(status=status.HTTP_204_NO_CONTENT)
