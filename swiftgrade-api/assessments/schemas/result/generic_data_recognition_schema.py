from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import GenericDataRecognitionSerializer
from drf_yasg import openapi


class GenericDataRecognitionSchema(BaseSwaggerSchema):
    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(GenericDataRecognitionSerializer(many=True))
        return [self.make_body_parameter(serializer_schema)]
