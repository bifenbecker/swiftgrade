from api.core.doc_utils import BaseSwaggerSchema
from collections import OrderedDict
from drf_yasg import openapi


class ViewFullImagesSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns urls of images for selected result item."

    def get_response_serializers(self):
        return {'200': self._get_schema()}

    def _get_schema(self):
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Items(
            type=openapi.TYPE_OBJECT,
            properties=OrderedDict((
                ("original", openapi.Schema(type=openapi.TYPE_STRING)),
            )),
        ))
