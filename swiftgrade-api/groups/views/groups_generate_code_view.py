from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from groups.schemas import GenerateCodeGroupSchema
from groups.services import GroupService
from groups.serializers import GenerateCodeGroupSerializer

from users.permissions import IsUserPermissionForGroups


class GenerateCodeGroupView(GenericAPIView):
    permission_classes = (IsUserPermissionForGroups, )
    swagger_schema = GenerateCodeGroupSchema

    def post(self, request, *args, **kwargs):
        serializer = GenerateCodeGroupSerializer(data=request.data)
        if serializer.is_valid():
            response_data = GroupService.get_or_generate_code_group(serializer.validated_data['group_id'])
            return Response(response_data, status=HTTP_200_OK)
        return Response({'errors': serializer.errors}, status=HTTP_400_BAD_REQUEST)
