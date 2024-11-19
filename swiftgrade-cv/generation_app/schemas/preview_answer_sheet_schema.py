from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema

from collections import OrderedDict


class PreviewAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary(self):
        if self.method in ["POST"]:
            return (
                "Creates Custom Empty Preview (if \"amount_of_empty\"=1) "
                + "and Custom Prefilled Preview (if \"student\" is vaild object) Answer Sheets"
            )
        return ""

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('url', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('coordinates_id', openapi.Schema(type=openapi.TYPE_STRING)),
                ))
            ),
            '400': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description=(
                    "Returns either validation errors in case request body is invalid "
                    + "or \"{'url': ''}\" object if error happens during preview generation"
                ),
            )
        }

