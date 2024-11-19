from django.db.models import Q

from groups.models import Group
from users.models import Student, User
from assessments.models import CompletedAssessment, AssessmentResult

from assessments.services import AnswerSheetScanService, AssessmentService, CustomAnswerSheetService
from .user_service import UserService


class StudentService:
    @classmethod
    def get_students(cls, group_id):
        return Student.objects.filter(group__id=group_id) \
                .exclude(Q(user__first_name=None) & Q(user__last_name=None))

    @classmethod
    def add_student_to_group(cls, instance):
        group_id, name = instance.group.id, instance.group.name

        instance.group.students.add(instance.user.student)
        instance.delete()
        CustomAnswerSheetService.prepare_to_regeneration_after_changing_students(group_id, instance.user.student.id)

    @classmethod
    def delete_students(cls, group_id, users_ids):
        group = Group.manager.get(id=group_id)
        students = Student.objects.filter(user_id__in=users_ids)

        students_ids = students.values_list('id', flat=True)

        completed = CompletedAssessment.manager.filter(student__in=students, assessment__group__id=group_id)
        AssessmentResult.manager.filter(completed_assessment__in=completed).delete()
        completed.delete()

        AnswerSheetScanService.delete_answer_sheet_scans_for_student(group_id, students_ids)
        CustomAnswerSheetService.prepare_to_regeneration_after_changing_students(group_id, students_ids[0])

        for student in students:
            group.students.remove(student)

        AssessmentService.check_assessments_statuses(group_id)

    @classmethod
    def create_student(cls, data):
        data.update({
            'role': User.STUDENT, 
            'password': UserService._encrypt_password(data['password']), 
            'status': User.ACTIVE
        })
        username = data.get('username')
        if username.find('@') > 0:
            data.update({'email': username})
        user = User.objects.create(**data)
        if not user.email:
            user.enabled_popups['verify_email'] = True
        user.save()
        student = Student.objects.create(user=user)
        return student
