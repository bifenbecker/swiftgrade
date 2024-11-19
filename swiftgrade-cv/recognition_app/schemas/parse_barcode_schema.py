from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema

from collections import OrderedDict


class ParseBarcodeSchema(BaseSwaggerSchema):
    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('first_name_url', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('last_name_url', openapi.Schema(type=openapi.TYPE_STRING)),
                    ('email_url', openapi.Schema(type=openapi.TYPE_STRING)),
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
