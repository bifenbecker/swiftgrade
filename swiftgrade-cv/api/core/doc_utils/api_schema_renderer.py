from drf_yasg.renderers import SwaggerUIRenderer


class ApiSchemaRenderer(SwaggerUIRenderer):
    template = 'api-schema-ui.html'
