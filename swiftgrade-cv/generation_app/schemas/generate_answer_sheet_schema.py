from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema

from collections import OrderedDict


class GenerateAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary(self):
        if self.method in ["POST"]:
            return (
                "Creates Custom Empty (if \"amount_of_empty\">0) "
                + "and Custom Prefilled (if \"students\" is not empty) Answer Sheets"
            )
        return ""

    def get_response_serializers(self):
        return {
            '204': openapi.Schema(type=openapi.TYPE_OBJECT),
            '400': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="Returns validation errors in case request body is invalid",
            )
        }
