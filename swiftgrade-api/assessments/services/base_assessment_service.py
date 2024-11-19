from datetime import datetime, timezone

from assessments.models import (
    Answer,
    AnswerMark,
    AnswerSheet,
    AnswerSheetScan,
    AnswerSheetScanItem,
    AnswerSheetZip,
    Assessment,
    AssessmentItem,
    AssessmentResult,
    AssessmentResultItem,
    AssessmentSettings
)
from assessments.utils import log_timeit


MODELS = {
    'answer_sheet': AnswerSheet,
    'answer': Answer,
    'assessment': Assessment,
    'item': AssessmentItem,
    'mark': AnswerMark,
    'scan_item': AnswerSheetScanItem,
    'result': AssessmentResult,
    'result_item': AssessmentResultItem,
    'settings': AssessmentSettings,
    'scan': AnswerSheetScan,
    'zip': AnswerSheetZip,
}


class BaseAssessmentService:
    
    @staticmethod
    @log_timeit
    def _create(key, data):
        if hasattr(MODELS[key], 'manager'):
            return MODELS[key].manager.create(**data)
        return MODELS[key].objects.create(**data)

    @staticmethod
    def _filter(key, data):
        if hasattr(MODELS[key], 'manager'):
            return MODELS[key].manager.filter(**data)
        return MODELS[key].objects.filter(**data)

    @staticmethod
    def _bulk_create(key, data):
        if hasattr(MODELS[key], 'manager'):
            return MODELS[key].manager.bulk_create(data)
        return MODELS[key].objects.bulk_create(data)

    @staticmethod
    def _bulk_update(key, data, fields):
        if hasattr(MODELS[key], 'manager'):
            return MODELS[key].manager.bulk_update(data, fields=fields)
        return MODELS[key].objects.bulk_update(data, fields=fields)

    @staticmethod
    def _get_ids(data):
        return [item['id'] for item in data]

    @staticmethod
    def _filter_data_by_id(key, id, data):
        return list(filter(lambda item: item[key] == id, data))

    @staticmethod
    def _update(obj, params):
        for attr, value in params.items():
            setattr(obj, attr, value)
        obj.save()

        return obj
