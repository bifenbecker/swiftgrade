from collections import OrderedDict
from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema


class CheckAccessSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns the information of access to the server. Mainly used by mobile applications. If " \
                     "response status code is 200 - server is available and it can be used for another endpoints."

    def get_request_body_parameters(self, consumes):
        return super().get_request_body_parameters(consumes)

    def get_response_serializers(self):
        return {
            "200": openapi.Schema(type=openapi.TYPE_OBJECT, properties=OrderedDict((
                ("success", openapi.Schema(type=openapi.TYPE_BOOLEAN)),
            )), ),
        }
