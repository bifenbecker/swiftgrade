import asyncio
import base64
import logging

from django.conf import settings

import aiohttp
from api.core.logger.custom_logger import CustomLogger

from generation_app.serializers.custom import QuestionSerializer
from recognition_app.serializers import RecognizeSerializer

from .base_parser_service import BaseParserService


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
mathpix_logger = CustomLogger.get_logger(__name__, 'mathpix_request_ids.log')


class SingleAnswerParseService(BaseParserService):
    """
    Make all requests to MathPix without clueing fields in batches
    """

    semaphore = None
    session = None
    conf_rate = float(settings.LATEX_CONFIDENCE_RATE)
    MAX_CONCURRENT_REQUESTS = settings.MAX_CONCURRENT_REQUESTS
    URL = f'{settings.MATHPIX_URL}text'
    headers = {'app_id': settings.MATHPIX_APP_ID,
               'app_key': settings.MATHPIX_APP_KEY}

    @classmethod
    def _img2base64(cls, image_path):
        '''
        Converts image located in `image_path` to base64
        :param image_path: image path
        :return: base64 prefixed with MIME
        '''
        with open(image_path, "rb") as file:
            decoded = base64.b64encode(file.read()).decode()
            return "data:image/jpg;base64," + decoded

    @classmethod
    async def _make_request(cls, field):
        """
        Sends request with image to mathpix
        and updates field with need_grading and recognized
        :param field: dict { path, type }

        enable_spell_check option enables a predictive mode for English handwriting
        Here you can find more info: https://docs.mathpix.com/#request-parameters
        """
        try:
            formating = 'text'

            if field['type'] in QuestionSerializer.LATEX_STYLED:
                formating = 'latex_styled'

            request_params = {
                'src': cls._img2base64(field['path']),
                'formats': [formating],
                'enable_spell_check': True,
            }

            async with cls.semaphore:
                async with cls.session.post(f'{settings.MATHPIX_URL}text',
                                            headers=cls.headers,
                                            json=request_params) as resp:
                    parsed = await resp.json()

            confidence, recognized = parsed.get('confidence', 0), parsed.get(formating, '')
            mathpix_logger.info(
                f'AWS Path to the cropped student answer: {field.get("aws_path")}, Mathpix request ID: {parsed.get("request_id")}')
            need_grading = cls._need_grading(confidence)
            field.update(need_grading=need_grading, recognized=recognized,
                         error=False, error_message='')
        except:
            logger.exception('Error occurs during ocr recognition')
            field.update(need_grading=True,
                         recognized=None,
                         error=True,
                         error_message='Failed at ocr recognition')

    @classmethod
    def _need_grading(cls, rate):
        '''
        check need of grading by threshold
        :param rate: rate value
        '''
        return rate < cls.conf_rate

    @classmethod
    async def _parse_images(cls, fields):
        '''
        Asynchronously makes `len(fields)` requests to mathpix
        :param fields: list of dicts { path, type }
        :return: list of responses from mathpix
        '''
        cls.semaphore = asyncio.Semaphore(cls.MAX_CONCURRENT_REQUESTS)
        async with aiohttp.ClientSession() as cls.session:
            await asyncio.gather(*(cls._make_request(field)
                                   for field in fields))

    @classmethod
    def parse(cls, fields, kind):
        """
        Asynchronously makes `len(data)` requests to mathpix
        and parse it
        :param data: list of dict { path, type }.
            type maybe 'latex' or 'text'
        :return: list of tuples (need_grading, recognized)
        """
        ocr_fields, omr_fields = cls._separate_batches(fields)
        if kind == RecognizeSerializer.CUSTOM:
            cls._parse_omr(omr_fields)
        asyncio.run(cls._parse_images(ocr_fields))
