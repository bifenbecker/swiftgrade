from datetime import datetime

from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from users.schemas import AppleSignInSchema
from users.serializers import AppleSignInSerializer, UserSerializer
from users.services import UserService
from pytz import utc


class AppleSignInView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = AppleSignInSerializer
    swagger_schema = AppleSignInSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            current_time = datetime.now().replace(tzinfo=utc)
            user, prefilled_user_data = serializer.save()
            response_data = {'prefilled_user_data': prefilled_user_data, 'user': UserSerializer(user).data}
            response_data.update(**UserService.login_user(user))
            return Response(response_data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
