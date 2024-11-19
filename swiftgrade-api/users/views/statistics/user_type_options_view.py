from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from users.schemas import UserTypeOptionsSchema


class UserTypeOptionsView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = UserTypeOptionsSchema

    def get(self, request):
        return Response({
            "options": [
                {"param": "total", "title": _("Total teachers")},
                {"param": "new", "title": _("New teachers")},
                {"param": "returning", "title": _("Returning teachers")},
                {"param": "active", "title": _("New + Returning teachers")},
                {"param": "students", "title": _("Total students")},
                {"param": "new_students", "title": _("New students")},
            ]
        })
