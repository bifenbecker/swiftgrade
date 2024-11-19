from collections import OrderedDict
from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema


class GetAccuracyTipsSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, 'Gets a download link to an accuracy tips PDF file'

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                description='Retrieved PDF link successfully',
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('file_url', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('from_local_storage', openapi.Schema(type=openapi.TYPE_BOOLEAN)),
                )),
            ),
            '404': openapi.Schema(
                description='PDF with accuracy tips does not exist',
                type=openapi.TYPE_OBJECT,
            )
        }
