SWAGGER_HEADER_KEY = 'HTTP_X_CLIENT'


class XClient(object):
    def __init__(self, x_client_string):
        self.x_client_string = x_client_string

    def __str__(self):
        return self.x_client_string

    @property
    def is_swagger(self):
        return self.x_client_string == 'swagger'


def get_x_client(request):
    x_client_string = ''
    if hasattr(request, 'META'):
        x_client_string = request.META.get(SWAGGER_HEADER_KEY, '')

    return XClient(x_client_string)
