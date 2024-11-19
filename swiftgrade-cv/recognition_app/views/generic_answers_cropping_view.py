from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from recognition_app.schemas import GenericAnswersCroppingSchema
from recognition_app.serializers import GenericAnswersCroppingSerializer
from recognition_app.services.generic_answers_cropping_service import generic_answer_cropping_process


class GenericAnswersCroppingView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GenericAnswersCroppingSerializer
    swagger_schema = GenericAnswersCroppingSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        generic_answer_cropping_process.apply_async((serializer.data, self.kwargs['batch_id']),)
        return Response(status=status.HTTP_204_NO_CONTENT)
