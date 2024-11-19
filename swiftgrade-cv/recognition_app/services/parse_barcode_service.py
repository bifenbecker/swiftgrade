from django.conf import settings

from .recognition_service import RecognitionService
from .scanner_service import ScannerService

from pyzbar import pyzbar

import cv2
import numpy as np
import urllib.request
import uuid


class ParseBarcodeService:
    @classmethod
    def _url_to_image(cls, url):
        resp = urllib.request.urlopen(url)
        image = np.asarray(bytearray(resp.read()), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        return image

    @classmethod
    def _get_answer_sheet_id(cls, code):
        parts = code.split('.')
        if parts[0]:
            return parts[0][1:]
        return None

    @classmethod
    def _get_user_id(cls, code):
        parts = code.split('.')
        if parts[0] and parts[0][0] in ['0', '1']:
            return parts[-1]
        return None

    @classmethod
    def _get_class_id(cls, code):
        parts = code.split('.')
        if len(parts) > 2 and parts[0] and parts[0][0] in ['0', '1']:
            return parts[1]
        return None

    @classmethod
    def _get_page_number(cls, code):
        try:
            return int(code[-4:])
        except Exception:
            return None

    @classmethod
    def _get_survey(cls, code):
        try:
            parts = code.split('.')
            # TODO: return survey
            return None
        except Exception:
            return None

    @classmethod
    def _cut_image(cls, image, survey, template_order):
        ratio_h = image.shape[0] / (survey.defs.paper_height)
        ratio_w = image.shape[1] / (survey.defs.paper_width)
        x = int(survey.questionnaire.qobjects[template_order].boxes[0].x * ratio_w)
        y = int(survey.questionnaire.qobjects[template_order].boxes[0].y * ratio_h)
        h = int(survey.questionnaire.qobjects[template_order].boxes[0].height * ratio_h)
        w = int(survey.questionnaire.qobjects[template_order].boxes[0].width * ratio_w)
        cut = image[y:y + h, x:x + w]
        return cut

    @classmethod
    def _get_names(cls, image, data):
        if data['global_code'][0] != '2' or data['page'] != 1:
            return None, None
        survey = cls._get_survey(data['global_code'])
        if not survey:
            return None, None
        first = uuid.uuid4().hex
        last = uuid.uuid4().hex
        cv2.imwrite(f'{settings.PUBLIC_FOLDER}/user_data/{first}.png',
                    cls._cut_image(image, survey, 0))
        cv2.imwrite(f'{settings.PUBLIC_FOLDER}/user_data/{last}.png',
                    cls._cut_image(image, survey, 1))
        first = f'public/user_data/{first}.png'
        last = f'public/user_data/{last}.png'
        return first, last

    @classmethod
    def _get_email(cls, image, data):
        if data['global_code'][0] == '0' or data['page'] != 1:
            return None
        survey = cls._get_survey(data['global_code'])
        if not survey:
            return None
        email = uuid.uuid4().hex
        cv2.imwrite(f'{settings.PUBLIC_FOLDER}/user_data/{email}.png',
                    cls._cut_image(image, survey, 2))
        return f'public/user_data/{email}.png'

    @classmethod
    def _set_data(cls, data, names, email):
        data['first_name_url'] = names[0]
        data['last_name_url'] = names[1]
        data['email_url'] = email
        return data

    @classmethod
    def _process_barcode(cls, barcode):
        first = barcode[0].data.decode()
        last = barcode[1].data.decode()
        global_code = first if '.' in first else last
        survey_code = first if '.' not in first else last
        return {
            'answer_sheet_id': cls._get_answer_sheet_id(global_code),
            'class_id': cls._get_class_id(global_code),
            'user_id': cls._get_user_id(global_code),
            'page': cls._get_page_number(survey_code),
            'global_code': global_code,
            'survey_code': survey_code,
            'first_name_url': None,
            'last_name_url': None,
            'email_url': None,
        }

    @classmethod
    def parse(cls, image_url):
        try:
            img = cls._url_to_image(image_url)
            barcode = pyzbar.decode(img)
            data = cls._process_barcode(barcode)
            image = ScannerService.scan_image(img)
            return True, cls._set_data(data, cls._get_names(image, data), cls._get_email(image, data))
        except Exception:
            return False, None

    @classmethod
    def _process_generic_barcode(cls, barcode, image):
        first = barcode[0].data.decode()
        last = barcode[1].data.decode()
        global_code = first if '.' in first else last
        survey_code = first if '.' not in first else last
        results, names, number = RecognitionService.get_results(global_code, image)
        return {
            'answer_sheet_id': cls._get_answer_sheet_id(global_code),
            'class_id': cls._get_class_id(global_code),
            'user_id': cls._get_user_id(global_code),
            'global_code': global_code,
            'survey_code': survey_code,
            'first_name_url': names.get('first_name_url', None),
            'last_name_url': names.get('last_name_url', None),
            'email_url': names.get('email_url', None),
            'results': results,
            'number_of_answers': number
        }

    @classmethod
    def parse_generic(cls, image_url):
        try:
            img = cls._url_to_image(image_url)
            barcode = pyzbar.decode(img)
            response = cls._process_generic_barcode(barcode, image_url)
            if response['results'] is None:
                return False, None
            return True, response
        except Exception:
            return False, None
