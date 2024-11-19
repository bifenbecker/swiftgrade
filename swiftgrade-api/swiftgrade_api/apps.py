from django.contrib.admin.apps import AdminConfig


class CustomAdminConfig(AdminConfig):
    default_site = 'swiftgrade_api.admin.CustomAdminSite'
