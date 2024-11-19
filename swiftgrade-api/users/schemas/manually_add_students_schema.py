from api.core.doc_utils import BaseSwaggerSchema

from users.serializers import CreateStudentSerializer, StudentsListSerializer


class ManuallyAddStudentsSchema(BaseSwaggerSchema):
    def get_summary_and_description(self):
            return None, "Create student(s) with first_name, last_name, username or email and password. " \
                         "All fields should not be blank; username or email should be unique; password " \
                         "should contains at least one symbol. " \
                         "Can not create more than 200 students per class "

    def get_request_body_parameters(self, consumes):
        serializer_schema = self.serializer_to_schema(CreateStudentSerializer(), "write")
        return [self.make_body_parameter(serializer_schema)]

    def get_response_serializers(self):
        return {
          '200': self._get_schema(),
          '400': self.validation_errors_response()
        }

    def _get_schema(self):
        return self.serializer_to_schema(StudentsListSerializer())
