from .batch_parse_service import BatchParseService
from .single_answer_parse_service import SingleAnswerParseService
from django.conf import settings

if settings.RECOGNITION_MODE == 'batch':
    ParseService = BatchParseService
else:
    ParseService = SingleAnswerParseService