from datetime import datetime, timezone

from django.db.models import QuerySet


class BaseDeleteService:
    """
    Updates the following fields:
    - is_deleted
    - deleted_at
    for marking objects as deleted for including them into the statistics.
    """
    def perform(self, data):
        """
        Searches related models of the current objects.
        Mark them as deleted started from the deepest to the current.
        """
        data_type = type(data)
        if hasattr(self, 'RELATED_MODELS'):
            for model in self.RELATED_MODELS:
                service = model['service']
                related_data_method = getattr(service, model['getting_data_method'])
                related_data = related_data_method(data)
                if related_data:
                    method_for_delete = getattr(service, model['perform_service_method'])
                    method_for_delete(related_data)
        if data_type is QuerySet:
            return self._update_many(data)
        return self._update(data)

    def get_related_data(self, data, field):
        data_type = type(data)

        condition = {f'{field}__in': data} if data_type is QuerySet else {f'{field}_id': data.id}
        return self.MODEL.manager.filter(**condition)

    @staticmethod
    def _update(obj):
        obj.is_deleted = True
        obj.deleted_at = datetime.now(tz=timezone.utc)
        obj.save()
        return obj

    @staticmethod
    def _update_many(objs):
        objs.update(**{
            'is_deleted': True,
            'deleted_at': datetime.now(tz=timezone.utc)
        })
        return objs
