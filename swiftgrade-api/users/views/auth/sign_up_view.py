from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT

from users.schemas import SignUpSchema
from users.serializers import SignUpSerializer


class SignUpView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer
    swagger_schema = SignUpSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
