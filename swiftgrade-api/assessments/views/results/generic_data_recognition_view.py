from assessments.serializers import GenericDataRecognitionSerializer
from assessments.schemas import GenericDataRecognitionSchema
from assessments.utils import log_view

from .base_generic_data_view import BaseGenericDataCroppingView


class GenericDataRecognitionView(BaseGenericDataCroppingView):
    serializer_class = GenericDataRecognitionSerializer
    swagger_schema = GenericDataRecognitionSchema

    @log_view
    def post(self, request, *args, **kwargs):
        """
            Getting recognition results connected to the students personal data
            for generic assessment, saving recognized persons
        """
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            return self.get_response(serializer.validated_data, 'recognition')
        return self.get_error_response(serializer.errors)
