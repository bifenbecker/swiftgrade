from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT

from users.models import VerificationCode
from users.serializers import RecoverPasswordSerializer
from users.services import UserService
from users.schemas import RecoverPasswordSchema
from users.helpers import UserHelper


class RecoverPasswordView(GenericAPIView):
    permission_classes = (AllowAny, )
    swagger_schema = RecoverPasswordSchema

    def post(self, request, *args, **kwargs):
        serializer = RecoverPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = UserService.get_user_by_email(serializer.validated_data["email"])
            UserHelper.send_verification_data(VerificationCode.PASSWORD_RESET, user)
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
