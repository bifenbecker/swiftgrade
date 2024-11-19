from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny

from ..models import Coordinates
from ..schemas import CoordinatesSchema
from ..serializers import CoordinatesSerializer


class CoordinatesView(RetrieveAPIView):
    serializer_class = CoordinatesSerializer
    permission_classes = (AllowAny,)
    swagger_schema = CoordinatesSchema
    lookup_field = 'coordinates_id'

    def get_queryset(self):
        return Coordinates.objects.all()
