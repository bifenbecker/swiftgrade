from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi


class DownloadFullScansSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns full scan(s) in base64."

    def get_response_serializers(self):
        return {
            "200": openapi.Schema(type=openapi.TYPE_OBJECT),
        }
