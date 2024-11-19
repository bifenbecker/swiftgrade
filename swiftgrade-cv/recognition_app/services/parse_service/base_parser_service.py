import abc
import logging
from itertools import count
from contextlib import suppress

from generation_app.serializers.custom import QuestionSerializer
from .bubble_detection import getResults

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


class BaseParserService(abc.ABC):

    @abc.abstractclassmethod
    def parse(cls, fields, kind):
        pass

    @classmethod
    def build_result(cls, fields):
        '''Convert fields to webhook ready format'''
        question_counter = count(1)
        base = {
            'answer': '',
            'unit': '',
            'answer_url': None,
            'unit_url': None,
            'need_grading': True,
            'need_grading_for_units': False,
        }
        it = iter(fields)
        for field in it:
            field_type = field.get('type', None)
            result = base.copy()
            result.update(error=field.get('error', False),
                         error_message=field.get('error_message', ''))
            url = field['aws_path']
            if field_type not in QuestionSerializer.QUESTION_TYPE_CHOICES:
                yield field_type, dict(
                    url=url,
                    value=field['recognized'],
                    need_grading=field['need_grading'],
                )
                continue

            key = str(next(question_counter))
            if 'recognized' not in field:
                yield key, dict(result, answer_url=url)
                continue

            result.update(answer_url=url,
                          answer=field['recognized'],
                          need_grading=field['need_grading'])

            if field_type == QuestionSerializer.DECIMAL:
                with suppress(ValueError):
                    result.update(answer=float(result['answer']))
            elif field_type in [QuestionSerializer.WITH_UNITS, QuestionSerializer.MATH_WITH_UNITS]:
                ufield = next(it)
                result.update(unit_url=ufield['aws_path'], unit=ufield['recognized'],
                              need_grading_for_units=ufield['need_grading'],
                              need_grading=field['need_grading'])

            yield key, result

    @classmethod
    def _separate_batches(cls, fields):
        '''Split fields to multichoice and others'''
        ocr_fields, omr_fields = [], []
        for field in fields:
            if field['path']:
                if field['type'] == QuestionSerializer.MC:
                    omr_fields.append(field)
                else:
                    ocr_fields.append(field)
        return ocr_fields, omr_fields

    @classmethod
    def _parse_omr(cls, batch):
        '''Parse OMR by Infocom solution'''
        for field in batch:
            try:
                recognized = list(map(int, getResults(field['path'])))
                field.update(need_grading=False, recognized=recognized)
            except:
                logger.exception('Error occurs during omr recognition')
                field.update(need_grading=True,
                             recognized=None,
                             error=True,
                             error_message='Failed at omr recognition')
