from api.core.doc_utils import BaseSwaggerSchema
from drf_yasg import openapi
from assessments.serializers import AssessmentResultsListSerializer


class UpdateResultNeedGradingSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        description = ""
        if self.method in ["POST"]:
            description = "Changes need grading values of a specific assessment result to False. Returns the " \
                          "assessment recognized result with updated result items. Available only for users with the " \
                          "teacher role."
        return None, description

    def get_response_serializers(self):
        return {'200': self._get_schema()}

    def _get_schema(self):
        results = self.serializer_to_schema(AssessmentResultsListSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=results)

