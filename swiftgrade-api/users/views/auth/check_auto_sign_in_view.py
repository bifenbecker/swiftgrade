from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from users.schemas import CheckAutoSignInSchema
from users.services import UserService
from users.serializers import CheckAutoSignInSerializer
from users.models import User


class CheckAutoSignInView(GenericAPIView):
    """
    Update user last login and save user login history.
    """
    permission_classes = (AllowAny,)
    serializer_class = CheckAutoSignInSerializer
    swagger_schema = CheckAutoSignInSchema

    def post(self, request, *args, **kwargs):
        serializer = CheckAutoSignInSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data.get('user_id', None)
            if user_id:
                user = User.objects.get(id=user_id)
                UserService.update_user_last_login(user)
                return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
