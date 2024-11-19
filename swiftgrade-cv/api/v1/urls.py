from django.conf.urls import include, url

urlpatterns = [
    url(r'^', include('coordinates_app.urls_v1')),
    url(r'^', include('generation_app.urls_v1')),
    url(r'^', include('recognition_app.urls_v1')),
]
