from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema

from collections import OrderedDict


class PreviewGenericAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary(self):
        if self.method in ["POST"]:
            return (
                "Creates Generic Empty Preview (if \"answer_sheet_for_blank\" is true) "
                + "and Generic Prefilled Preview (if \"answer_sheet_for_blank\" is false) Answer Sheets"
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
