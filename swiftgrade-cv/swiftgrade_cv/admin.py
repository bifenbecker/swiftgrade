from django.contrib import admin

from django.contrib.auth.models import Group
from dynamic_preferences.admin import GlobalPreferenceAdmin
from dynamic_preferences.models import GlobalPreferenceModel

admin.site.unregister(Group)
admin.site.unregister(GlobalPreferenceModel)


class CustomGlobalPreferenceAdmin(GlobalPreferenceAdmin):
    list_display = ('verbose_name', 'raw_value',)

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(GlobalPreferenceModel, CustomGlobalPreferenceAdmin)
