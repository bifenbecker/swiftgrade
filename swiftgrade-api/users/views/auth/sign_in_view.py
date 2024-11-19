from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from users.schemas import SignInSchema
from users.services import UserService
from users.serializers import SignInSerializer, UserSerializer


class SignInView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SignInSerializer
    swagger_schema = SignInSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            login_device = serializer.validated_data.get('login_device')
            is_keep_logged_in = serializer.validated_data.get('is_keep_logged_in')
            user = serializer.validated_data.get('user')
            user.last_login_device = login_device
            if user and user.is_keep_logged_in != is_keep_logged_in:
                user.is_keep_logged_in = is_keep_logged_in
            user.save()
            response_data = {'user':  UserSerializer(user).data}
            response_data.update(**UserService.login_user(user))
            return Response(response_data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
