from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from recognition_app.schemas import FastParseSchema
from recognition_app.serializers import ImageUrlSerializer
from recognition_app.services import ParseBarcodeService


class FastParseView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ImageUrlSerializer
    swagger_schema = FastParseSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        success, result = ParseBarcodeService.parse_generic(serializer.data['url'])
        if success:
            return Response(result, status=status.HTTP_200_OK)
        return Response({"error": "Photo can not be parsed!"}, status=status.HTTP_400_BAD_REQUEST)
