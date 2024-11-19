
from collections import OrderedDict
from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema


class ChecklistSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        if self.method == "GET":
            return None, "Returns checklist data for a specific user. Contains information about date \
            of last created group, assessment, result and etc."
        return None, None

    def get_response_serializers(self):
        return {'200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('last_printed_as', openapi.Schema(type=openapi.TYPE_STRING)), 
                    ('last_released_as', openapi.Schema(type=openapi.TYPE_STRING)), 
                    ('last_created_class', openapi.Schema(type=openapi.TYPE_STRING)), 
                    ('last_created_assessment', openapi.Schema(type=openapi.TYPE_STRING)), 
                    ('last_created_result', openapi.Schema(type=openapi.TYPE_STRING)), 
                ))
            ),}
