from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api.services import EmailService
from users.schemas import UserMailerSchema
from users.serializers import UserMailerSerializer


class UserMailerView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserMailerSerializer
    swagger_schema = UserMailerSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            status_code, response = EmailService.send_customer_notification(
                serializer.validated_data['email'],
                self.kwargs.get('version_id', None)
            )
            if status_code:
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"errors": "AWS no result"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
