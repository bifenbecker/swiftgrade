from api.core.doc_utils import BaseSwaggerSchema
from assessments.serializers import StudentMarkSerializer, UpdateStudentMarkSerializer


class UpdateStudentMarkSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
        return None, "Updates a student mark of the assessment result item. Recalculates total mark of the " \
                     "assessment result item. Checks need grading values of a specific item. If assessment kind is " \
                     "one of Fill in the blank or Numeric, need_grading/need_grading_for_units value is True and " \
                     "the mark of answer or units is updated then the appropriate need grading value changes to " \
                     "False. Available for users with the teacher role."

    def get_response_serializers(self):
        return {
            '200': self._get_schema(),
            '400': self.validation_errors_response()
        }

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(UpdateStudentMarkSerializer())
        return [self.make_body_parameter(serializer_schema)]

    def _get_schema(self):
        return self.serializer_to_schema(StudentMarkSerializer())
