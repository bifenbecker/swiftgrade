from collections import OrderedDict
from drf_yasg import openapi


class OpenapiConverter:
    @classmethod
    def convert_field_in_schema(cls, field):
        """Convert openapi parameter to openapi schema
        :param openapi.Parameter field: openapi parameters
        :rtype: openapi.Schema
        """
        if isinstance(field.get('schema', None), openapi.Schema.OR_REF):
            return field.schema

        schema = openapi.Schema(
            title=field.get('name', None),
            type=field.get('type', None),
            items=field.get('items', None),
        )

        common_attrs = ['description', 'format', 'enum', 'pattern', 'items', 'default']
        for attr in common_attrs:
            if field.get(attr, None):
                schema[attr] = field.get(attr, None)

        return schema

    @classmethod
    def convert_fields_in_schema(cls, fields):
        """Convert openapi parameters to openapi schema
        :param list[openapi.Parameter] fields: openapi parameters
        :rtype: openapi.Schema
        """
        properties = OrderedDict()
        required = []

        for field in fields:
            properties[field.name] = cls.convert_field_in_schema(field)
            if field.get('required', False):
                required.append(field.name)

        return openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=properties,
            required=required
        )

    @classmethod
    def wrap_schema_fields_in_schema(cls, fields):
        """Wrap list of openapi schemas to common openapi schema
        :param list[openapi.Schema] fields: openapi schemas
        :rtype: openapi.Schema
        """
        properties = OrderedDict()
        required = []

        for field in fields:
            if field.get('title', False):
                properties[field.title] = field.get('schema', field)
                if field.get('required', False):
                    required.append(field.title)
            else:
                raise ValueError('Title of the filed does not provided')

        return openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=properties,
            required=required
        )
