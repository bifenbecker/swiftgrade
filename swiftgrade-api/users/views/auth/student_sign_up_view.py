from users.schemas import StudentSignUpSchema
from users.serializers import StudentSignUpSerializer
from .sign_up_view import SignUpView


class StudentSignUpView(SignUpView):
    serializer_class = StudentSignUpSerializer
    swagger_schema = StudentSignUpSchema
