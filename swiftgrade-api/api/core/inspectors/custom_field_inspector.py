from drf_yasg.inspectors import SimpleFieldInspector


class CustomFieldInspector(SimpleFieldInspector):
    """Provides conversions for fields which can be described using just ``type``, ``format``, ``pattern``
    and min/max validators.
    """

    def field_to_swagger_object(self, field, swagger_object_type, use_references, **kwargs):
        return super().field_to_swagger_object(field, swagger_object_type, use_references, **kwargs)
