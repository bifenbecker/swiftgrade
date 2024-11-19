from django.utils.functional import SimpleLazyObject
from api.core.utils.client_recognition_utils import get_x_client


class SwaggerAgentMiddleware(object):
    def __init__(self, get_response=None):
        if get_response is not None:
            self.get_response = get_response

    def __call__(self, request):
        self.process_request(request)
        return self.get_response(request)

    def process_request(self, request):
        request.x_client = SimpleLazyObject(lambda: get_x_client(request))
