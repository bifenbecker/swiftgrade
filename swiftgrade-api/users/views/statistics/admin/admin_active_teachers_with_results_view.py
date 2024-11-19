from django.views.generic.base import TemplateView

from users.views.mixins import AdminPermissionMixinView


class AdminActiveTeachersWithResultsView(AdminPermissionMixinView, TemplateView):
    template_name = 'admin/statistics_active_teachers_with_results.html'
