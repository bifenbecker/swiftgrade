from assessments.schemas import GenericDataCroppingSchema
from assessments.serializers import GenericDataCroppingSerializer
from assessments.utils import log_view

from .base_generic_data_view import BaseGenericDataCroppingView


class GenericDataCroppingView(BaseGenericDataCroppingView):
    serializer_class = GenericDataCroppingSerializer
    swagger_schema = GenericDataCroppingSchema

    @log_view
    def post(self, request, *args, **kwargs):
        """
            Getting generic cropping results, saving and matching cropping results
        """
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            return self.get_response(serializer.validated_data)
        return self.get_error_response(serializer.errors)
