from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from users.schemas import GenerateUsernameSchema
from users.services import UserService


class GenerateUsernameView(GenericAPIView):
    swagger_schema = GenerateUsernameSchema

    def get(self, request, *args, **kwargs):
        quantity = int(self.kwargs.get('quantity', None))
        usernames = [UserService.generate_random_username() for _ in range(0, quantity)]
        return Response({"usernames": usernames}, status=HTTP_200_OK)    
