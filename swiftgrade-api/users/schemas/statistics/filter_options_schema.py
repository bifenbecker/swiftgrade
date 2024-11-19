from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema


class FilterOptionsSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns the dictionary with 'options' key which contains the list of possible periods for " \
                     "the statistics charts."

    def get_request_body_parameters(self, consumes):
        return super().get_request_body_parameters(consumes)

    def get_response_serializers(self):
        return {
            "200": openapi.Schema(type=openapi.TYPE_OBJECT, properties=OrderedDict((
                ("options", openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(
                        type=openapi.TYPE_INTEGER,
                    )
                )),
            )),),
        }
