from django.conf.urls import include, url

urlpatterns = [
    url(r'^', include('users.urls_v1')),
    url(r'^', include('groups.urls_v1')),
    url(r'^', include('assessments.urls_v1')),
]
