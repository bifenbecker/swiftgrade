from django.conf import settings
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND

from users.permissions.teacher_persmission import IsTeacherPermission

from ..schemas import GetAccuracyTipsSchema
from ..utils import get_storage


class GetAccuracyTipsView(GenericAPIView):
    permission_classes = (IsAuthenticated, IsTeacherPermission)
    swagger_schema = GetAccuracyTipsSchema

    def _form_file_url(self, url=None):
        return {
            'file_url': url,
            'from_local_storage': isinstance(url, str) and url.startswith(settings.HOST_URL),
        }

    def get(self, request, *args, **kwargs):
        storage = get_storage()
        file_name = settings.ACCURACY_TIPS_FILE_NAME

        if storage.exists(file_name):
            url = storage.url(file_name)
            return Response(self._form_file_url(url))

        return Response(self._form_file_url(), status=HTTP_404_NOT_FOUND)
