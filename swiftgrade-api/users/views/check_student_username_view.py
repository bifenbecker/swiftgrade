from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from users.validators import StudentValidator


class CheckStudentUsernameView(GenericAPIView):

    def get(self, request, *args, **kwargs):
        username = self.request.query_params.get("username", None)
        StudentValidator.validate_username(username)
        return Response(status=HTTP_200_OK)    
