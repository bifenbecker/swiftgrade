from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema


class RecognizeSchema(BaseSwaggerSchema):
    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="Returns validation errors in case request body is invalid",
            )
        }
