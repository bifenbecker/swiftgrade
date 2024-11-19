from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from generation_app.schemas import PreviewAnswerSheetSchema
from generation_app.serializers import PreviewRequestParamsSerializer
from generation_app.services import PreviewService


class PreviewAnswerSheetView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PreviewRequestParamsSerializer
    swagger_schema = PreviewAnswerSheetSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        url, questions_hash, success = PreviewService.preview(serializer.data)
        if success:
            return Response({"url": url, 'coordinates_id': questions_hash}, status=status.HTTP_200_OK)
        return Response({"url": "", 'coordinates_id': ''}, status=status.HTTP_400_BAD_REQUEST)
