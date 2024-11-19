from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from users.permissions import IsUserPermissionForUserDetail
from users.schemas import ChecklistSchema
from users.services import UserChecklistService


class UserChecklistView(RetrieveAPIView):
    permission_classes = (IsUserPermissionForUserDetail,)
    swagger_schema = ChecklistSchema

    def get(self, request, *args, **kwargs):
        checklist = UserChecklistService(self.kwargs.get('user_id', None)).call()
        return Response(checklist, status=HTTP_200_OK)
