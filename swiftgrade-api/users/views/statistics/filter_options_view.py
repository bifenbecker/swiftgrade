from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from users.schemas import FilterOptionsSchema


class FilterOptionsView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = FilterOptionsSchema

    def get(self, request):
        return Response({
            "options": [
                {"param": 7, "title": 7},
                {"param": 14, "title": 14},
                {"param": 30, "title": 30},
                {"param": 60, "title": 60},
                {"param": 90, "title": 90},
                {"param": 180, "title": 180},
                {"param": 365, "title": 365},
            ]
        })
