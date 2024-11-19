from api.core.doc_utils import BaseSwaggerSchema
from collections import OrderedDict
from drf_yasg import openapi


COORDINATES = openapi.Items(
    type=openapi.TYPE_OBJECT,
    properties=OrderedDict((
        ("x", openapi.Schema(type=openapi.TYPE_NUMBER)),
        ("y", openapi.Schema(type=openapi.TYPE_NUMBER)),
        ("width", openapi.Schema(type=openapi.TYPE_NUMBER)),
        ("height", openapi.Schema(type=openapi.TYPE_NUMBER)),
    )),
)


class GetAnswerSheetCoordinatesSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns the coordinates of a specific custom or generic answer sheet calculated in the CV module."

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=OrderedDict((
                        ("generic", openapi.Schema(type=openapi.TYPE_ARRAY, items=COORDINATES)),
                        ("custom", openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=OrderedDict((
                                ("named", openapi.Schema(type=openapi.TYPE_ARRAY, items=COORDINATES)),
                                ("unnamed", openapi.Schema(type=openapi.TYPE_ARRAY, items=COORDINATES)),
                            )),
                        )),
                    )),
                ),
            '400': self.validation_errors_response()
        }
