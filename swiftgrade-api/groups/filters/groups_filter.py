from rest_framework import filters
from users.helpers import PermissionHelper

class GroupsFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if request.method == "GET" and PermissionHelper.is_teacher(request.user):
            return queryset.filter(**request.GET.dict())
        return queryset
