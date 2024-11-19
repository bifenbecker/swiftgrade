from datetime import timedelta
from more_itertools import pairwise

from django.db.models import F

from users.models import LoginHistory, User
from assessments.models import AssessmentResult


class StatisticsService:
    """
    Collects admin page statistics about how teachers and students use the app.
    Active teachers are those who have logged in in the last 30 days.
    """
    @classmethod
    def get_active_teachers(cls, datelist):
        """
        Takes a number of teachers that logged in in selected period.
        """
        active_teachers = []
        for curr_day, foll_day in pairwise(datelist):
            active_teachers_in_period = LoginHistory.objects \
                                                    .filter(logged_in_at__range=(curr_day, foll_day)) \
                                                    .distinct('user_id') \
                                                    .count()
            active_teachers.append(active_teachers_in_period)
        return {'total': active_teachers}
    
    @classmethod
    def get_new_teachers(cls, datelist):
        """
        Takes a number of teachers that were added in selected period.
        """
        new_teachers = []
        for curr_day, foll_day in pairwise(datelist):
            new_teachers_in_period = User.objects.filter(role=User.TEACHER, created_at__range=(curr_day, foll_day)).count()
            new_teachers.append(new_teachers_in_period)
        return {'total': new_teachers}
    
    @classmethod
    def get_new_students(cls, datelist):
        """
        Takes a number of students that were added in selected period.
        """
        new_students = []
        for curr_day, foll_day in pairwise(datelist):
            new_students_in_period = User.objects.filter(role=User.STUDENT, created_at__range=(curr_day, foll_day)).count()
            new_students.append(new_students_in_period)
        return {'total': new_students}

    @classmethod
    def get_returning_teachers(cls, datelist):
        """
        Takes a number of teachers that returned at least 24 hours after sign up in selected period. 
        """
        returning_teachers = []
        for curr_day, foll_day in pairwise(datelist):
            returning_teachers_in_period = LoginHistory.objects.filter(
                                                                    user__role=User.TEACHER,
                                                                    logged_in_at__range=(curr_day, foll_day),
                                                                    user__created_at__lt=F('logged_in_at') - timedelta(days=1)
                                                                ) \
                                                                .distinct('user') \
                                                                .count()
            returning_teachers.append(returning_teachers_in_period)
        return {'total': returning_teachers}

    @classmethod
    def get_total_teachers(cls, datelist):
        """
        Takes a number of all teachers in selected period.
        """
        teachers = []
        for curr_day, foll_day in pairwise(datelist):
            teachers_in_period = User.objects.filter(created_at__lte=foll_day, role=User.TEACHER).count()
            teachers.append(teachers_in_period)
        return {'total': teachers}

    @classmethod
    def get_total_students(cls, datelist):
        """
        Takes a number of all students in selected period.
        """
        students = []
        for curr_day, foll_day in pairwise(datelist):
            students_in_period = User.objects.filter(created_at__lte=foll_day, role=User.STUDENT).count()
            students.append(students_in_period)
        return {'total': students}

    @classmethod
    def get_active_teachers_with_results(cls, datelist):
        """
        Takes a number of teachers that got at least one new result in selected period.
        """
        active_teachers = []
        for curr_day, foll_day in pairwise(datelist):
            users_with_results = User.objects \
                                     .filter(classes__assessments__assessment_results__created_at__range=(curr_day, foll_day)) \
                                     .distinct() \
                                     .count()
            active_teachers.append(users_with_results)
        return {'total': active_teachers}

    @classmethod
    def get_total_assessment_results_number(cls, datelist):
        """
        Takes a number of total assessment results in selected period.
        """
        total_assessment_resutls = []
        for curr_day, foll_day in pairwise(datelist):
            total_assessment_resutls_in_period = AssessmentResult.objects \
                                                                 .filter(created_at__range=(curr_day, foll_day)) \
                                                                 .count()
            total_assessment_resutls.append(total_assessment_resutls_in_period)
        return {'total': total_assessment_resutls}

    @staticmethod
    def _add_count_to_list(answer_type_count, answer_type_in_period):
        return {list_value.append(answer_type_count[answer_type]) for answer_type, list_value in answer_type_in_period.items()}
