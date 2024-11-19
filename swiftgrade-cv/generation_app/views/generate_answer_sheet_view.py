from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from generation_app.schemas import GenerateAnswerSheetSchema
from generation_app.serializers import GenerateRequestParamsSerializer
from generation_app.services.generation_service import generate_process


class GenerateAnswerSheetView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GenerateRequestParamsSerializer
    swagger_schema = GenerateAnswerSheetSchema

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        generate_process.apply_async(args=(serializer.data,))
        return Response(status=status.HTTP_204_NO_CONTENT)
