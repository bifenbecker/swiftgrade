from more_itertools import pairwise

from assessments.models import Assessment, AssessmentResult
from groups.models import Group
from users.models import User


CREATED_CLASS = 'funnel_created_class'
CREATED_KEY = 'funnel_created_key'
GOT_RESULT = 'funnel_got_result'
PRINTED_AS = 'funnel_printed_as'
RELEASED_AS = 'funnel_released_as'
RETURNED = 'funnel_returned'
SIGN_UPS = 'funnel_sign_ups'


class TeachersFunnelService:
    """
    Collects admin page funnel statistics about how teachers use the app.
    """

    @classmethod
    def get_funnel_data(cls, datelist, since_start=False):
        total_teachers = cls._get_total_teachers(datelist) if not since_start else cls._get_total_teacher_since_start()

        return {
            SIGN_UPS: [teachers_in_period.count() for teachers_in_period in total_teachers],
            RETURNED: cls._get_returned_teachers(total_teachers),
            CREATED_CLASS: cls._get_teachers_with_class(total_teachers),
            CREATED_KEY: cls._get_teachers_with_assessments(total_teachers),
            PRINTED_AS: cls._get_teachers_with_printed_as(total_teachers),
            RELEASED_AS: cls._get_teachers_with_released_as(total_teachers),
            GOT_RESULT: cls._get_teachers_with_result(total_teachers),
        }

    @staticmethod
    def _get_total_teachers(datelist):
        """
        Returns teachers that signed up in selected period.
        """
        total_teachers = []

        for curr_day, foll_day in pairwise(datelist):
            teachers_in_period = User.objects \
                                     .filter(created_at__range=(curr_day, foll_day), role=User.TEACHER)
            total_teachers.append(teachers_in_period)

        return total_teachers
    
    @staticmethod
    def _get_total_teacher_since_start():
        return [User.objects.filter(role=User.TEACHER)]

    @staticmethod
    def _get_returned_teachers(total_teachers):
        """
        Returns teachers that logged in at least once 24 hours after sign up.
        """
        total_returned_teachers = []

        for teachers_in_period in total_teachers:
            returned_teachers_in_period = teachers_in_period.filter(last_login__isnull=False).count()

            total_returned_teachers.append(returned_teachers_in_period)
        
        return total_returned_teachers
    
    @staticmethod
    def _get_teachers_with_assessments(total_teachers):
        """
        Returns teachers that created at least one answer key at any time since sign up. 
        """
        total_teachers_with_assessment = []

        for teachers_in_period in total_teachers:
            teachers_with_assessment_in_period = Assessment.objects.filter(group__user__in=teachers_in_period) \
                                                                   .values('group__user') \
                                                                   .distinct() \
                                                                   .count()

            total_teachers_with_assessment.append(teachers_with_assessment_in_period)

        return total_teachers_with_assessment

    @staticmethod
    def _get_teachers_with_class(total_teachers):
        """
        Returns teachers that created at least one class at any time since sign up. 
        """
        total_teachers_with_class = []

        for teachers_in_period in total_teachers:
            teachers_with_class_in_period = Group.objects.filter(user__in=teachers_in_period) \
                                                         .values('user') \
                                                         .distinct() \
                                                         .count()

            total_teachers_with_class.append(teachers_with_class_in_period)
        
        return total_teachers_with_class
    
    @staticmethod
    def _get_teachers_with_printed_as(total_teachers):
        total_teachers_with_printed_as = []

        for teachers_in_period in total_teachers:
            teachers_with_printed_as_in_period = teachers_in_period.filter(last_printed_as__isnull=False).count()
        
            total_teachers_with_printed_as.append(teachers_with_printed_as_in_period)
        
        return total_teachers_with_printed_as

    @staticmethod
    def _get_teachers_with_released_as(total_teachers):
        total_teachers_with_released_as = []

        for teachers_in_period in total_teachers:
            teachers_with_released_as_in_period = teachers_in_period.filter(last_released_as__isnull=False).count()

            total_teachers_with_released_as.append(teachers_with_released_as_in_period)

        return total_teachers_with_released_as

    @staticmethod
    def _get_teachers_with_result(total_teachers):
        total_teachers_with_result = []

        for teachers_in_period in total_teachers:
            teachers_with_result_in_period = AssessmentResult.objects.filter(assessment__group__user__in=teachers_in_period) \
                                                                     .values('assessment__group__user') \
                                                                     .distinct() \
                                                                     .count()
                                                        
            total_teachers_with_result.append(teachers_with_result_in_period)

        return total_teachers_with_result
