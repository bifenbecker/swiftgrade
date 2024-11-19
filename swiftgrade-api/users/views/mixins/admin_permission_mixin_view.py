from django.shortcuts import redirect
from django.conf import settings
from rest_framework.permissions import IsAdminUser
from django.urls import reverse


class AdminPermissionMixinView:
    def dispatch(self, request, *args, **kwargs):
        if IsAdminUser().has_permission(request, self):
            return super().dispatch(request, *args, **kwargs)
        return redirect(reverse('admin:login'))
    