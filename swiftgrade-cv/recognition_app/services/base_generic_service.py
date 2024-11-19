import requests
import time

from api.core.utils.common_utils import bulid_template
from coordinates_app.models import Coordinates
from django.conf import settings
from pathlib import Path

CUTTED_DIR = Path(settings.PUBLIC_FOLDER) / 'cutted'
POSTFIX = {
    'cropping': '/assessments/recognition_batch/<batch_id>/cropping_results/',
    'recognition': '/assessments/recognition_batch/<batch_id>/recognition_results/',
}


class BaseGenericService:
    """
    Base service which provide flow of generic answer sheet scan parsing
    """

    @classmethod
    def _webhook_results(cls, data, batch_id, kind='recognition'):
        """
        Send data via web hook with batch_id
        :param data:
        :param batch_id:
        :param kind: feature kind (cropping/recognition)
        """
        url = f'{settings.WEBHOOK_HOST_URL}{POSTFIX[kind]}'
        hook_url = bulid_template(url, {"<batch_id>": str(batch_id)})
        requests.post(hook_url, json=data)

    @staticmethod
    def _get_coordinates(coordinates_id):
        coordinates = Coordinates.objects.filter(coordinates_id=coordinates_id).first()
        return coordinates.data if coordinates else None

    @staticmethod
    def _get_absolute_cutted_dir():
        cutted_dir = str(int(time.time() * 1000))  # timestamp for uniqueness
        absolute_cutted_dir = CUTTED_DIR / cutted_dir
        absolute_cutted_dir.mkdir(parents=True, exist_ok=True)

        return absolute_cutted_dir

    @staticmethod
    def _path_to_url(path):
        '''
        Convert local path to static url
        :param path: local file in public folder
        :return: static url to this file
        '''
        if path:
            return f'{settings.HOST_URL}public{str(path).partition("public")[-1]}'

