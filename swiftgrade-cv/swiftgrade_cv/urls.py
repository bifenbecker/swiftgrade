"""swiftgrade_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from api.core.doc_utils import ApiSchemaRenderer

from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.decorators import login_required

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from rest_framework.permissions import AllowAny

swagger_patterns = [
    url(r'^api/v1/', include('api.v1.urls')),
]

schema_view = get_schema_view(
    openapi.Info(
        title="Swiftgrade CV",
        default_version='v1',
    ),
    public=True,
    patterns=swagger_patterns,
    permission_classes=(AllowAny,),
)

renderer_classes = schema_view.renderer_classes + (ApiSchemaRenderer,)

urlpatterns = swagger_patterns + [
  url(r'^admin/', admin.site.urls),
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),  # For Swagger auth
  url(r'^api-docs/$', login_required(schema_view.as_view(renderer_classes=renderer_classes))),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + staticfiles_urlpatterns()
