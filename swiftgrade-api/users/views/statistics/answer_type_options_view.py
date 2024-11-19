from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from users.schemas import AnswerTypeOptionsSchema


class AnswerTypeOptionsView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = AnswerTypeOptionsSchema

    def get(self, request):
        return Response({
            "options": [
                {"param": "total", "title": _("All answers")},
                {"param": "paper_vs_online", "title": _("Paper vs. Online")},
                {"param": "mc_vs_handwritten", "title": _("MC vs. Handwritten")},
                {"param": "answer_type", "title": _("Answer type")},
            ]
        })
