from django.views.generic.base import TemplateView

from users.views.mixins import AdminPermissionMixinView


class AdminTotalAssessmentResultsView(AdminPermissionMixinView, TemplateView):
    template_name = 'admin/statistics_total_assessment_results.html'
