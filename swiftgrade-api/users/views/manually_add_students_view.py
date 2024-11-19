from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK

from groups.models import Group
from users.schemas import ManuallyAddStudentsSchema
from users.serializers import CreateStudentSerializer, StudentsListSerializer


MAX_STUDENTS_ERROR = "A class can't have more than 200 students"
MAX_NUMBER_OF_STUDENTS = 200


class ManuallyAddStudentsView(ListCreateAPIView):
    serializer_class = CreateStudentSerializer
    swagger_schema = ManuallyAddStudentsSchema

    def get_group(self):
        return get_object_or_404(Group, id=self.kwargs.get('group_id', None))

    def post(self, request, *args, **kwargs):
        group = self.get_group()
        serializer = self.get_serializer(data=request.data, many=True, allow_empty=False)
        if serializer.is_valid():
            if (len(serializer.data) + group.students.count()) > MAX_NUMBER_OF_STUDENTS:
                return Response({"errors": MAX_STUDENTS_ERROR}, status=HTTP_400_BAD_REQUEST)
            students = serializer.save()
            group.students.add(*students)
            response_data = {"students": StudentsListSerializer(students, many=True).data}
            return Response(response_data, status=HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=HTTP_400_BAD_REQUEST)
