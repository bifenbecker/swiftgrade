import json
import base64
import requests
from django.conf import settings
from .normalize_imgae_service import NormalizeImageService


class MathpixService:
    """
    Make all requests to MathPix
    """
    @classmethod
    def _make_request(cls, file_path):
        """
        Send request with combined image (batch)
        :param file_path: path of file with image of batch
        :return: dict with results
        """
        headers = {
            'content-type': 'application/json',
            'app_id': settings.MATHPIX_APP_ID,
            'app_key': settings.MATHPIX_APP_KEY,
        }
        image_uri = "data:image/jpg;base64," + base64.b64encode(open(file_path, "rb").read()).decode()
        url = f'{settings.MATHPIX_URL}latex'
        r = requests.post(url, data=json.dumps({'src': image_uri,
                                                'ocr': ['math', 'text'],
                                                'skip_recrop': True,
                                                'formats': ['latex_list']}), headers=headers)
        return json.loads(r.text)

    @classmethod
    def _make_check_request(cls, file_path):
        """
        enable_spell_check option enables a predictive mode for English handwriting
        Here you can find more info: https://docs.mathpix.com/#request-parameters
        """
        headers = {
            'content-type': 'application/json',
            'app_id': settings.MATHPIX_APP_ID,
            'app_key': settings.MATHPIX_APP_KEY,
        }
        image_uri = "data:image/jpg;base64," + base64.b64encode(open(file_path, "rb").read()).decode()
        url = f'{settings.MATHPIX_URL}text'
        r = requests.post(url, data=json.dumps({'src': image_uri,
                                                'enable_spell_check': True,
                                                'formats': ['text', 'data']}), headers=headers)
        return json.loads(r.text)

    @classmethod
    def parse_image(cls, file_path):
        """
        Send image from file by path
        :param file_path: path of image file
        :return: MathPix results
        """
        data = cls._make_request(file_path)
        if not data.get('latex_list'):
            return True, []
        result = []
        for i in data['latex_list']:
            if "begin{tabular" in i or "hline" in i:
                return True, []
            result.append(i.replace('\\text {', '').replace('\\operatorname { ', '\\'))
        return float(data['latex_confidence_rate']) < float(settings.LATEX_CONFIDENCE_RATE), result

    @classmethod
    def check_content(cls, file_path):
        data = cls._make_check_request(NormalizeImageService.crop_borders(file_path))
        if not data.get('text'):
            return True
        return False
