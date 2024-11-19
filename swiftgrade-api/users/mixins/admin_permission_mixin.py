class AdminPermissionMixin:
    def _allow_edit(self, obj=None, user=None):
        if not obj:
            return True
        if not user:
            return not obj.is_superuser and not obj.is_staff
        if user == obj:
            return True
        if not user.is_superuser and obj.is_staff:
            return False
        return not obj.is_superuser

    def has_change_permission(self, request, obj=None):
        return self._allow_edit(obj, request.user)

    def has_delete_permission(self, request, obj=None):
        return self._allow_edit(obj, request.user)

    def has_add_permission(self, request):
        return True

    def has_view_permission(self, request, obj=None):
        return True

    def has_module_permission(self, request):
        return True
