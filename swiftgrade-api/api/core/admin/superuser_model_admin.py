from django.contrib import admin

class SuperuserModelAdmin(admin.ModelAdmin):
    def has_module_permission(self, request):
        return request.user.is_superuser
 