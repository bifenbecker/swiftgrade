from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema

from collections import OrderedDict


class FastParseSchema(BaseSwaggerSchema):
    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('answer_sheet_id', openapi.Schema(type=openapi.TYPE_INTEGER)),
                    ('class_id', openapi.Schema(type=openapi.TYPE_INTEGER)),
                    ('user_id', openapi.Schema(type=openapi.TYPE_INTEGER)),
                    ('global_code', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('survey_code', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('first_name_url', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('last_name_url', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('email_url', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('results', openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties=OrderedDict((
                            ('<result_id>', openapi.Schema(
                                type=openapi.TYPE_ARRAY,
                                items=openapi.Items(type=openapi.TYPE_INTEGER),
                            )),
                        )),
                    )),
                    ('number_of_answers', openapi.Schema(type=openapi.TYPE_STRING)),
                )),
            ),
            '400': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description=(
                    "Returns validation errors in case request body is invalid "
                    + "or \"{'error': 'Photo can not be parsed!'}\" if something "
                    + "went wrong while parsing barcode"
                ),
            )
        }

