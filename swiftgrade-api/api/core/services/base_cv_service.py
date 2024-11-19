import requests
from django.conf import settings
from requests.exceptions import HTTPError, ConnectionError, MissingSchema
from simplejson.errors import JSONDecodeError


class BaseCVService:
    @staticmethod
    def get_absolute_url(endpoint):
        return settings.SWIFTGRADE_CV_URL + 'api/v1' + endpoint

    @staticmethod
    def _parse_response(response):
        response_data = {}
        status_code = getattr(response, 'status_code', 404)

        try:
            if response.content:
                response_data = response.json()
        except JSONDecodeError:
            pass
        return response_data, status_code

    @classmethod
    def call(cls, request_type='get', url='', params={}, json={}, headers={}):
        method_to_call = getattr(requests, request_type)
        try:
            response = method_to_call(url=url, params=params, json=json, headers=headers)
        except(HTTPError, ConnectionError, MissingSchema):
            response = {}

        return cls._parse_response(response)
