from django.views.generic.base import TemplateView

from users.views.mixins import AdminPermissionMixinView


class AdminTotalNumberGradedAnswersView(AdminPermissionMixinView, TemplateView):
    template_name = 'admin/statistics_total_number_graded_answers.html'
