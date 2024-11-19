from drf_yasg.inspectors import SwaggerAutoSchema, ReferencingSerializerInspector
from rest_framework.pagination import CursorPagination, LimitOffsetPagination
from drf_yasg.utils import merge_params
from collections import OrderedDict
from drf_yasg import openapi
from drf_yasg.utils import guess_response_status, is_list_view

from api.core.pagination import PageNumberPagination
from .openapi_converter import OpenapiConverter


class BaseSwaggerSchema(SwaggerAutoSchema):
    DEFAULT_ERROR_RESPONSE_MAPPER = {
        '400': 'validation_errors_response',
        '401': 'unauthorized_errors_response',
        '403': 'forbidden_errors_response',
        '404': 'not_found_errors_response',
    }

    def _get_body_parameters(self, fields, manual_parameters):
        """Merge autogenerated and manual body params
        :param list[openapi.Parameter] fields: autogenereated parameters
        :param list[openapi.Parameter] manual_parameters: manual parameters
        :rtype: list[openapi.Parameter]
        """
        body_field = None
        for field in fields:
            if field.in_ == openapi.IN_BODY:
                body_field = field
                break

        manual_parameters_schema = OpenapiConverter.convert_fields_in_schema(manual_parameters)
        if not body_field:
            return [self.make_body_parameter(manual_parameters_schema)]

        body_field.schema.required = body_field.schema.get(
            'required', []) + manual_parameters_schema.get('required', []) or None
        body_field.schema.properties = body_field.schema.get('properties', OrderedDict()).update(
            manual_parameters_schema.get('properties', OrderedDict())) or None

        return [body_field]

    def _generate_default_error_schema_response(self, message, examples=None):
        schema = OpenapiConverter.convert_fields_in_schema((
            openapi.Parameter(
                name='detail', in_=openapi.IN_BODY,
                type=openapi.TYPE_STRING, description=message,
            ),))

        return openapi.Response(schema=schema, description=message, examples=examples)

    def get_default_responses(self):
        """Get the default responses determined for this view from the request serializer and request method.
        :type: dict[str, openapi.Schema]
        """
        method = self.method.lower()

        default_status = guess_response_status(method)
        default_schema = ''
        if method in ('get', 'post', 'put', 'patch'):
            default_schema = self.get_default_response_serializer()

        default_schema = default_schema or ''
        if default_schema and not isinstance(default_schema, openapi.Schema):
            default_schema = self.serializer_to_schema(default_schema, 'read') or ''

        if default_schema:
            if is_list_view(self.path, self.method, self.view) and self.method.lower() == 'get':
                default_schema = openapi.Schema(type=openapi.TYPE_ARRAY, items=default_schema)
            if self.should_page():
                default_schema = self.get_paginated_response(default_schema) or default_schema

        return OrderedDict({str(default_status): default_schema})

    def serializer_to_schema(self, serializer, serializer_mode=None, use_references=False):
        """Convert a serializer to an OpenAPI :class:`.Schema`. You can provide `serializer_mode` to filter fields.
        :param serializers.BaseSerializer serializer: the ``Serializer`` instance
        :param string serializer_mode: filtering parameter to take fields for reading or writing or all fields
        :param boolean use_references: parameter shows should the reference be created for the serializer
        :returns: the converted :class:`.Schema`, or ``None`` in case of an unknown serializer
        :rtype: openapi.Schema,openapi.SchemaRef
        """
        inspectors = self.field_inspectors.copy().append(ReferencingSerializerInspector,
                                                         ) if use_references else self.field_inspectors

        schema = self.probe_inspectors(inspectors, 'get_schema', serializer, {'field_inspectors': inspectors},
                                       serializer_mode=serializer_mode)

        if schema:
            exclude_fields = []

            if serializer_mode == 'write':
                exclude_fields = [k for k in serializer.fields if serializer.fields.get(k).read_only]
            elif serializer_mode == 'read':
                exclude_fields = [k for k in serializer.fields if serializer.fields.get(k).write_only]

            for field in exclude_fields:
                if field in schema.get('required', ()):
                    schema.required.remove(field)
                if schema.get('properties') and schema.get('properties').get(field):
                    del schema.properties[field]

        return schema

    def get_manual_fields(self):
        """Return list of parameters that will override automatically generated request parameters.
        :rtype: list[openapi.Parameter]
        """
        return []

    def add_manual_parameters(self, parameters):
        """Add/replace parameters from the given list of automatically generated request parameters.
        :param list[openapi.Parameter] parameters: genereated parameters
        :return: modified parameters
        :rtype: list[openapi.Parameter]
        """
        fields = super().add_manual_parameters(parameters)
        manual_fields = self.get_manual_fields()

        if manual_fields:
            body_parameters = []

            for field in manual_fields[:]:
                if isinstance(field, openapi.Parameter) and field.in_ == openapi.IN_BODY:
                    body_parameters.append(field)
                    manual_fields.remove(field)

            if body_parameters:
                manual_fields = manual_fields + self._get_body_parameters(fields, body_parameters)

            fields = merge_params(fields, manual_fields)

        return fields

    def validation_errors_schema(self):
        return openapi.Schema(title='errors', type=openapi.TYPE_OBJECT)

    def validation_errors_response(self, examples=None):
        return openapi.Response(
            schema=self.validation_errors_schema(),
            description='Validation errors',
            examples=examples,
        )

    def found_redirect_response(self, examples=None):
        return 'Found'

    def not_found_errors_response(self, examples=None):
        return self._generate_default_error_schema_response('Not found.', examples)

    def pagination_not_found_errors_response(self, examples=None):
        return self._generate_default_error_schema_response('Invalid page.', examples)

    def forbidden_errors_response(self, examples=None):
        return self._generate_default_error_schema_response('You do not have permission to perform this action.',
                                                            examples)

    def unauthorized_errors_response(self, examples=None):
        return self._generate_default_error_schema_response('Authentication credentials were not provided.',
                                                            examples)

    def generate_error_responses(self, error_codes):
        responses = {}

        for code in self.DEFAULT_ERROR_RESPONSE_MAPPER.keys():
            if code in error_codes:
                responses[code] = getattr(self, self.DEFAULT_ERROR_RESPONSE_MAPPER[code])()

        return responses

    def get_paginated_response(self, response_schema):
        assert response_schema.type == openapi.TYPE_ARRAY, "array return expected for paged response"

        if isinstance(getattr(self.view, 'paginator'), PageNumberPagination):
            return openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties=OrderedDict((
                    ('count', openapi.Schema(type=openapi.TYPE_INTEGER)),
                    ('page', openapi.Schema(type=openapi.TYPE_INTEGER)),
                    ('per_page', openapi.Schema(type=openapi.TYPE_INTEGER)),
                    ('results', response_schema),
                )),
                required=['results']
            )

        return super().get_paginated_response(response_schema)

    def get_response_serializers(self):
        responses = super().get_response_serializers()

        if self.method == 'GET' and self.view.pagination_class and issubclass(
                self.view.pagination_class,
                (LimitOffsetPagination, PageNumberPagination, CursorPagination)):
            responses.update({'404': self.pagination_not_found_errors_response()})

        return responses
