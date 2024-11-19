from assessments.models import Assessment
from groups.models import Group
from users.models import User

DATA = {
    'group': Group,
    'assessment': Assessment,
}


class PermissionHelper:
    @classmethod
    def is_admin(cls, user):
        return cls._is_user(user, User.ADMIN)

    @classmethod
    def is_teacher(cls, user):
        return cls._is_user(user, User.TEACHER)

    @classmethod
    def is_student(cls, user):
        return cls._is_user(user, User.STUDENT)

    @staticmethod
    def is_user_has_group(group, user):
        return group and user and user.classes.filter(id=group.id).exists()

    @staticmethod
    def is_student_has_group(group, user):
        if group and user and user.student:
            students_ids = group.students.values_list('id', flat=True)
            return user.student.id in students_ids
        return False

    @classmethod
    def is_teacher_for_group(cls, group, user):
        return cls.is_teacher(user) and cls.is_user_has_group(group, user)

    @classmethod
    def is_student_for_group(cls, group, user):
        return cls.is_student(user) and cls.is_student_has_group(group, user)

    @classmethod
    def get_object(cls, key, view):
        object_id = f'{key}_id'
        if view.request.method == 'GET':
            object_id = view.kwargs.get(object_id, None) or view.request.query_params.get(object_id, None)
        else:
            object_id = view.kwargs.get(object_id, None) or view.request.data.get(object_id, None)
        return cls.get_object_by_id(key, object_id)

    @classmethod
    def get_group_for_assessment(cls, view):
        assessment = cls.get_object('assessment', view)
        return assessment.group if assessment and assessment.group else None

    @staticmethod
    def get_object_by_id(key, object_id):
        return DATA[key].manager.filter(id=object_id).first()

    @staticmethod
    def _is_user(user, role):
        return user and user.role == role and user.status == User.ACTIVE
