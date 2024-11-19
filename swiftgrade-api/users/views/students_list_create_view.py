from rest_framework.generics import ListAPIView

from groups.models import Group

from users.services import StudentService
from users.serializers import StudentsListSerializer
from users.schemas import StudentsListSchema
from users.permissions import IsTeacherPermissionForGroupStudents


class StudentsListCreateView(ListAPIView):
    permission_classes = (IsTeacherPermissionForGroupStudents, )
    serializer_class = StudentsListSerializer
    swagger_schema = StudentsListSchema

    @staticmethod
    def get_context(data):
        code = data.get("code", None)
        group = Group.manager.filter(code=code).first()
        return {"group": group}

    @staticmethod
    def get_ordering(ordering):
        if ordering[0] == '-':
            return f'{ordering[:1]}user__{ordering[1:]}'
        return f'user__{ordering}'

    def get_queryset(self):
        group_id = self.request.query_params.get('group_id', None)
        queryset = StudentService.get_students(group_id) if group_id else []
        return self.order_queryset(queryset)

    def order_queryset(self, queryset):
        ordering = self.request.query_params.get('ordering', None)
        if ordering:
            return queryset.order_by(self.get_ordering(ordering))
        return queryset

