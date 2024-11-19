from collections import OrderedDict

from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema


class AssessmentAveragesSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Returns statistics about how the students of the class passed an appropriate assessment. " \
                     "Includes mean, median, low, high and standard deviation marks. Available for users with " \
                     "the role of teacher."

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('count', openapi.Schema(type=openapi.TYPE_INTEGER)),
                    ('data', self._get_schema())
                ))
            )
        }

    def _get_schema(self):
        averages_data = openapi.Schema(type=openapi.TYPE_OBJECT, properties=OrderedDict((
            ('mean_mark', openapi.Schema(type=openapi.TYPE_STRING)),
            ('median_mark', openapi.Schema(type=openapi.TYPE_STRING)),
            ('low_mark', openapi.Schema(type=openapi.TYPE_STRING)),
            ('high_mark', openapi.Schema(type=openapi.TYPE_STRING)),
            ('deviation', openapi.Schema(type=openapi.TYPE_STRING)),
        )))
        return [averages_data]
