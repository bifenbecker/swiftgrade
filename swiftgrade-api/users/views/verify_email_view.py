from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from users.models import User
from users.schemas import VerifyEmailSchema
from users.serializers import VerifyEmailSerializer


class VerifyEmailView(GenericAPIView):
    swagger_schema = VerifyEmailSchema
    serializer_class = VerifyEmailSerializer

    def get_object(self):
        return get_object_or_404(User, id=self.kwargs.get('user_id', None))

    def post(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
