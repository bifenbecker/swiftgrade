from django.contrib.postgres.fields import JSONField
from django.db.models import CharField, IntegerField, Model


class Coordinates(Model):
    coordinates_id = CharField(max_length=100, unique=True, blank=False, null=False)
    data = JSONField()

    def __str__(self):
        return f'{self.id}. {self.coordinates_id}'
