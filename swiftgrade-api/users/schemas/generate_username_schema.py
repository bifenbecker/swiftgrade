from collections import OrderedDict
from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi


class GenerateUsernameSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
            return None, "Returns unique username(s) with lowercase letters and digits. " \
                         "quantity is a number of usernames you want to generate "

    def get_request_body_parameters(self, consumes):
        return super().get_request_body_parameters(consumes)

    def get_response_serializers(self):
        return {'200': self._get_schema()}

    def _get_schema(self):
        return openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Items(type=openapi.TYPE_STRING)
        )
