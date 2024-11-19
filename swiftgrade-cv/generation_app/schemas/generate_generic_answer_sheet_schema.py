from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema

from collections import OrderedDict


class GenerateGenericAnswerSheetSchema(BaseSwaggerSchema):
    def get_summary(self):
        if self.method in ["POST"]:
            return (
                "Creates Generic Empty (if \"answer_sheet_id_for_blank\">0) "
                + "and Generic Prefilled (if \"students\" is not empty) Answer Sheets"
            )
        return ""

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="Returned when Generic Empty Answer Sheet is generated",
                properties=OrderedDict((
                    ('uuid', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('results', openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties=OrderedDict((
                            ('answer_sheet_id', openapi.Schema(type=openapi.TYPE_INTEGER)),
                            ('url', openapi.Schema(type=openapi.TYPE_STRING)),
                            ('coordinates_id', openapi.Schema(type=openapi.TYPE_STRING)),
                            ('success', openapi.Schema(type=openapi.TYPE_BOOLEAN)),
                        )),
                    ))
                ))
            ),
            '204': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="Returned when Generic Prefilled Answer Sheet is generated",
            ),
            '400': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="Returns validation errors in case request body is invalid",
            )
        }
