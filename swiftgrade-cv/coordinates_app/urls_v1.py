from django.conf.urls import url
from django.urls import path

from .views import CoordinatesView


urlpatterns = [
    path(r'coordinates/<slug:coordinates_id>/', CoordinatesView.as_view()),
]
