from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from users.schemas import CheckAccessSchema


class CheckAccessView(APIView):
    """
    View to checking access to the server

    * No authentication tokens
    * No permissions
    """
    permission_classes = (AllowAny,)
    swagger_schema = CheckAccessSchema

    def get(self, request):
        """
        Return status 200 if the server is available

        Returns: Dict({
            'success': True
        })
        status 200
        """

        return Response({"success": True}, status=HTTP_200_OK)
