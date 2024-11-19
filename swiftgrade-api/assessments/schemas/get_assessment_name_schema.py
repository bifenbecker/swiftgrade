from api.core.doc_utils import BaseSwaggerSchema
from collections import OrderedDict
from drf_yasg import openapi


class GetAssessmentNameSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Calculates and returns a name of a new assessment based on existing assessments of a specific " \
                     "group."

    def get_query_parameters(self):
        if self.method == "GET":
            return [
                openapi.Parameter(name='group_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
            ]
        return []

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=OrderedDict((
                        ("name", openapi.Schema(type=openapi.TYPE_STRING)),
                    )),
                ),
        }
