from django.contrib import admin
from django.urls import path

from users.views.statistics.admin import (
    AdminUsersView,
    AdminActiveTeachersWithResultsView,
    AdminTotalAssessmentsGivenView,
    AdminTotalNumberGradedAnswersView,
    AdminTotalAssessmentResultsView,
    AdminTeachersFunnelView,
)


class CustomAdminSite(admin.AdminSite):
    def get_urls(self):
        urls = super().get_urls()
        urls += [
            path('statistics/users/', AdminUsersView.as_view(),
                 name='statistics_users'),
            path('statistics/active_teachers_with_results/', AdminActiveTeachersWithResultsView.as_view(),
                 name='statistics_active_teachers_with_results'),
            path('statistics/total_assessments_given/', AdminTotalAssessmentsGivenView.as_view(),
                 name='statistics_total_assessments_given'),
            path('statistics/total_assessment_resutls/', AdminTotalAssessmentResultsView.as_view(),
                 name='statistics_total_assessment_resutls'),
            path('statistics/total_number_graded_answers/', AdminTotalNumberGradedAnswersView.as_view(),
                 name='statistics_total_number_graded_answers'),
            path('statistics/teachers_funnel/', AdminTeachersFunnelView.as_view(), name='statistics_teachers_funnel'),
        ]
        return urls
