from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from users.schemas import AssessmentTypeOptionsSchema


class AssessmentTypeOptionsView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = AssessmentTypeOptionsSchema

    def get(self, request):
        return Response({
            "options": [
                {"param": "total", "title": _("All tests")},
                {"param": "paper_vs_online", "title": _("Paper vs. Online")},
                {"param": "test_type", "title": _("Test type")},
            ]
        })
