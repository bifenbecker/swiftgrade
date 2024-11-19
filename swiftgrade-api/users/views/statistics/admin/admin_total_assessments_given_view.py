from django.views.generic.base import TemplateView

from users.views.mixins import AdminPermissionMixinView


class AdminTotalAssessmentsGivenView(AdminPermissionMixinView, TemplateView):
    template_name = 'admin/statistics_total_assessments_given.html'
