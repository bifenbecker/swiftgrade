from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from groups.schemas import GroupsBulkCreateSchema
from groups.serializers import GroupsCreateSerializer, GroupsListSerializer
from groups.services import GroupService


class GroupsBulkCreateView(CreateAPIView):
    serializer_class = GroupsListSerializer
    swagger_schema = GroupsBulkCreateSchema

    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_queryset(self):
        return GroupService.get_groups(self.request.user)

    def create(self, request, *args, **kwargs):
        context = self.get_serializer_context()
        serializer = GroupsCreateSerializer(data=request.data, context=context)

        if serializer.is_valid():
            serializer.save()

            groups = self.get_queryset()
            response_serializer = self.serializer_class(groups, many=True)
            return Response(response_serializer.data, status=HTTP_200_OK)

        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
