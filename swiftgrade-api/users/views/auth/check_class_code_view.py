from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from users.serializers import CheckClassCodeSerializer
from users.schemas import CheckClassCodeSchema


class CheckClassCodeView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CheckClassCodeSerializer
    swagger_schema = CheckClassCodeSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
