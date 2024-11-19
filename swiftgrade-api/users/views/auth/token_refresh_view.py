from rest_framework_simplejwt import views as jwt_views
from users.serializers import TokenRefreshSerializer
from users.schemas import TokenRefreshSchema


class TokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = TokenRefreshSerializer
    swagger_schema = TokenRefreshSchema
