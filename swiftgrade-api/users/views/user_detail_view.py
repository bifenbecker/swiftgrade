from django.shortcuts import get_object_or_404

from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from assessments.services import CustomAnswerSheetService

from users.models import User
from users.permissions import IsUserPermissionForUserDetail
from users.schemas import UserDetailSchema
from users.serializers import UserSerializer, UserUpdateSerializer
# from users.services import SendWelcomeNotificationEmailProcessService
from users.services import BigMailerService


class UserDetailView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsUserPermissionForUserDetail,)
    swagger_schema = UserDetailSchema

    def get_object(self):
        return get_object_or_404(User, id=self.kwargs.get('user_id', None))

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        gender = user.gender
        serializer = UserUpdateSerializer(user, data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            BigMailerService.update_contact(user)
            if not user.is_info_page_passed:
                user.is_info_page_passed = True
                user.save()
            # if not gender and user.role == User.TEACHER:
            #     SendWelcomeNotificationEmailProcessService.call(user)
            if user.role == User.STUDENT and 'group_id' in request.data:
                CustomAnswerSheetService.prepare_to_regeneration_after_changing_students(request.data['group_id'],
                                                                                         user.student.id)
            return Response(self.get_serializer(user).data, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
