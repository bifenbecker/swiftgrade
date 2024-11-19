from django.views.generic.base import TemplateView

from users.views.mixins import AdminPermissionMixinView


class AdminTeachersFunnelView(AdminPermissionMixinView, TemplateView):
    template_name = 'admin/statistics_teachers_funnel.html'
