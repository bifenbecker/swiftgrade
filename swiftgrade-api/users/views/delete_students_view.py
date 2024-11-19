from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT

from users.services import StudentService
from users.serializers import DeleteStudentsSerializer
from users.schemas import DeleteStudentsSchema
from users.permissions import IsTeacherPermissionForGroupStudents


class DeleteStudentsView(GenericAPIView):
    permission_classes = (IsTeacherPermissionForGroupStudents, )
    serializer_class = DeleteStudentsSerializer
    swagger_schema = DeleteStudentsSchema

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            group_id = serializer.validated_data["group_id"]
            students_ids = serializer.validated_data["students_ids"]

            StudentService.delete_students(group_id, students_ids)
            return Response(status=HTTP_204_NO_CONTENT)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
