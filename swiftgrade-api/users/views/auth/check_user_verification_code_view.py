from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from users.models import User
from users.schemas import CheckUserVerificationCodeSchema
from users.serializers import CheckVerificationCodeSerializer, UserSerializer
from users.services import VerificationCodeService, StudentService, UserService


class CheckUserVerificationCodeView(GenericAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CheckVerificationCodeSerializer
    swagger_schema = CheckUserVerificationCodeSchema

    @staticmethod
    def _add_student_to_group(instance):
        if instance.group:
            StudentService.add_student_to_group(instance)

    def post(self, request):
        serializer = CheckVerificationCodeSerializer(data=request.data)

        if serializer.is_valid():
            instance = serializer.data.get('verification_code_instance', None)
            if instance and instance.user:
                user = VerificationCodeService.check_verification_code_by_kind(instance)
                if instance.user.role == User.STUDENT:
                    user.enabled_popups['verify_email'] = False
                    if user.email:
                        user.username = user.email
                    user.save()
                    self._add_student_to_group(instance)
                else:
                    instance.delete()
                response_data = {'user': UserSerializer(user).data}
                response_data.update(**UserService.login_user(user))
                return Response(response_data, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
