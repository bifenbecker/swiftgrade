from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from recognition_app.schemas import RecognizeSchema
from recognition_app.serializers import RecognizeSerializer
from recognition_app.services.recognition_service import recognize_process


class RecognizeView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecognizeSerializer
    swagger_schema = RecognizeSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        recognize_process.apply_async((serializer.data, self.kwargs['batch_id']),)
        return Response(status=status.HTTP_204_NO_CONTENT)
