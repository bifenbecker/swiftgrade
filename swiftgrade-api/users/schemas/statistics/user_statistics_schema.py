from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema


class UserStatisticsSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns the information for the statistics chart which displays the numbers of users " \
                     "according to the provided user type and date period in days."

    def get_request_body_parameters(self, consumes):
        return super().get_request_body_parameters(consumes)

    def get_response_serializers(self):
        return {
            "200": openapi.Schema(type=openapi.TYPE_OBJECT, properties=OrderedDict((
                ("title", openapi.Schema(type=openapi.TYPE_STRING)),
                ("data", openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=OrderedDict((
                        ("labels", openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Items(type=openapi.TYPE_STRING)
                        )),
                        ("datasets", openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Items(
                                type=openapi.TYPE_OBJECT,
                                properties=OrderedDict((
                                    ("label", openapi.Schema(type=openapi.TYPE_STRING)),
                                    ("backgroundColor", openapi.Schema(type=openapi.TYPE_STRING)),
                                    ("borderColor", openapi.Schema(type=openapi.TYPE_STRING)),
                                    ("data", openapi.Schema(type=openapi.TYPE_ARRAY,
                                                            items=openapi.Items(type=openapi.TYPE_INTEGER)),
                                    ),
                                ))
                            )
                        )),
                    )),
                )),
            )),),
            "400": openapi.Schema(type=openapi.TYPE_OBJECT, properties=OrderedDict((
                ("errors", openapi.Schema(type=openapi.TYPE_STRING, default="Incorrect user type.")),
            )),)
        }
