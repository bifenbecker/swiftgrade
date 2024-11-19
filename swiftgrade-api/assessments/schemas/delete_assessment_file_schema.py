from drf_yasg import openapi

from api.core.doc_utils import BaseSwaggerSchema


class DeleteAssessmentFileSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Removes the assessment file. Available for users with the teacher role."

    def get_response_serializers(self):
        return {'204': openapi.Schema(type=openapi.TYPE_OBJECT)}
