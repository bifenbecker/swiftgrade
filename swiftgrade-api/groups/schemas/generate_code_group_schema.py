from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema
from groups.serializers import GenerateCodeGroupSerializer


class GenerateCodeGroupSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Gets or generates the unique class code of a group. The class code is required to add students " \
                     "to the group."

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(GenerateCodeGroupSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((('code', openapi.Schema(type=openapi.TYPE_STRING)), ))
            ),
            '400': self.validation_errors_response(),
        }
