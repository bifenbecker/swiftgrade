from drf_yasg.inspectors import InlineSerializerInspector
from drf_yasg import openapi

from collections import OrderedDict
from rest_framework import serializers

from drf_yasg.errors import SwaggerGenerationError
from drf_yasg.utils import filter_none, get_serializer_class
from drf_yasg.inspectors.base import NotHandled
from drf_yasg.inspectors.field import find_limits


class SerializerInspector(InlineSerializerInspector):
    """Provides serializer conversions using :meth:`.FieldInspector.field_to_swagger_object`."""

    def get_schema(self, serializer, **kwargs):
        return self.probe_field_inspectors(serializer, openapi.Schema, self.use_definitions, **kwargs)

    def field_to_swagger_object(self, field, swagger_object_type, use_references, **kwargs):
        SwaggerType, ChildSwaggerType = self._get_partial_types(field, swagger_object_type, use_references, **kwargs)

        if isinstance(field, (serializers.ListSerializer, serializers.ListField)):
            child_schema = self.probe_field_inspectors(field.child, ChildSwaggerType, use_references)
            limits = find_limits(field) or {}
            return SwaggerType(
                type=openapi.TYPE_ARRAY,
                items=child_schema,
                **limits
            )
        elif isinstance(field, serializers.Serializer):
            if swagger_object_type != openapi.Schema:
                raise SwaggerGenerationError("cannot instantiate nested serializer as " + swagger_object_type.__name__)

            ref_name = self.get_serializer_ref_name(field)

            def make_schema_definition(serializer=field):
                properties = OrderedDict()
                required = []
                for property_name, child in serializer.fields.items():
                    property_name = self.get_property_name(property_name)
                    prop_kwargs = {
                        'read_only': bool(child.read_only) or None,
                        'serializer_mode': kwargs.get('serializer_mode', None)
                    }
                    prop_kwargs = filter_none(prop_kwargs)

                    child_schema = self.probe_field_inspectors(
                        child, ChildSwaggerType, use_references, **prop_kwargs
                    )
                    properties[property_name] = child_schema

                    if child.required and not getattr(child_schema, 'read_only', False):
                        required.append(property_name)

                result = SwaggerType(
                    type=openapi.TYPE_OBJECT,
                    properties=properties,
                    required=required or None,
                )
                if not ref_name and 'title' in result:
                    # on an inline model, the title is derived from the field name
                    # but is visno coverually displayed like the model name, which is confusing
                    # it is better to just remove title from inline models
                    del result.title

                setattr(result, '_NP_serializer', get_serializer_class(serializer))
                return result

            if not ref_name or not use_references:
                return make_schema_definition()

            definitions = self.components.with_scope(openapi.SCHEMA_DEFINITIONS)
            actual_schema = definitions.setdefault(ref_name, make_schema_definition)
            actual_schema._remove_read_only()

            actual_serializer = getattr(actual_schema, '_NP_serializer', None)
            this_serializer = get_serializer_class(field)
            if actual_serializer and actual_serializer != this_serializer:  # pragma: no cover
                explicit_refs = self._has_ref_name(actual_serializer) and self._has_ref_name(this_serializer)
                if not explicit_refs:
                    raise SwaggerGenerationError(
                        "Schema for %s would override distinct serializer %s because they implicitly share the same "
                        "ref_name; explicitly set the ref_name atribute on both serializers' Meta classes"
                        % (actual_serializer, this_serializer))

            return openapi.SchemaRef(definitions, ref_name)

        return NotHandled
