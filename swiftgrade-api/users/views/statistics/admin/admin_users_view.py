from django.views.generic.base import TemplateView

from users.views.mixins import AdminPermissionMixinView


class AdminUsersView(AdminPermissionMixinView, TemplateView):
    template_name = 'admin/statistics_users.html'
