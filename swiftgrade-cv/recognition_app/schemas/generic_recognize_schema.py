from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from recognition_app.serializers import GenericBatchSerializer


class GenericRecognizeSchema(BaseSwaggerSchema):
    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="Returns validation errors in case request body is invalid",
            )
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(GenericBatchSerializer(many=True))
        return [self.make_body_parameter(serializer_schema)]
