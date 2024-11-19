from api.core.doc_utils import BaseSwaggerSchema
from collections import OrderedDict
from drf_yasg import openapi

from assessments.serializers import DeleteResultsSerializer


class DeleteResultsSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Removes the results of one or more students for a specific assessment. In case all results " \
                     "of the assessment are deleted, updates assessment status to:\n" \
                     "- 'assigned' - if the type of the assessment is 'online'," \
                     "- 'ready_for_scan' - if the type of the assessment is 'paper'\n" \
                     "and removes all recognition batches of this assessments if they exist.\n Available for users " \
                     "with teacher role."

    def get_response_serializers(self):
        return {
            '200': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ("is_results_exists", openapi.Schema(type=openapi.TYPE_BOOLEAN)),
                )),
            ),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(DeleteResultsSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]
