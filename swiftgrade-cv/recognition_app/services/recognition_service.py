from tempfile import mkdtemp

import time

from django.conf import settings

import requests

from api.core.logger.custom_logger import CustomLogger
from api.core.utils.common_utils import bulid_template
from coordinates_app.models import Coordinates
from recognition_app.serializers import RecognizeSerializer
from swiftgrade_cv import celery_app

from .field_cutter_service import FieldCutterService as FCS
from .parse_service import ParseService
from .scanner_service import ScannerService


logger = CustomLogger.get_logger(__name__, 'recognition.log')


@celery_app.task
def recognize_process(data, batch_id):
    try:
        RecognitionService.recognize(data, batch_id)
    except Exception as exc:
        logger.exception(f'Error in recognition service: {exc}')
        response = [{'error': True, "error_message": f'{exc.__class__.__name__}: {exc}'} for _ in data]
        RecognitionService.webhook_results(response, batch_id, 'custom')


class RecognitionService:
    """
    Service which provide flow of answer sheet scan parsing
    """

    @classmethod
    def webhook_results(cls, data, batch_id, kind):
        """
        Send data via web hook with batch_id
        :param data:
        :param batch_id:
        :param kind: sheet kind (custom/generic)
        """
        if kind == RecognizeSerializer.GENERIC:
            postfix = settings.GENERIC_RECOGNITION_HOOK
        else:
            postfix = settings.RECOGNITION_HOOK
        url = f'{settings.WEBHOOK_HOST_URL}{postfix}'
        hook_url = bulid_template(url, {"<batch_id>": str(batch_id)})
        requests.post(hook_url, json=data)

    @classmethod
    def recognize(cls, data, batch_id):
        """
        For all docs in batch
        1) get coordinates from global_id
        2) cut fields via coordinates
        3) parse images in batch/single mode
        4) send webhook with results
        :param data: batches of scans
        :param batch_id: id of batch
        :return: send web hook to backend
        """
        kind = data['answer_sheet_kind']
        cutted_dir = str(int(time.time() * 1000))  # timestamp for uniqueness
        aws_dir_name = f'cv-cutted-{cutted_dir}'
        tmp_dir_name = mkdtemp(prefix=f'{aws_dir_name}-')

        fields = []
        scans = data['scans']
        for prefix, batch in enumerate(scans, 1):
            try:
                coords = Coordinates.objects.get(coordinates_id=batch['global_id']).data
            except Coordinates.DoesNotExist:
                logger.exception('Coordinates do not exist')
                batch.update(error=True,
                             error_message='Related coordinates don''t exist')
                continue
            images = [ScannerService.process_image(url, url=True)
                      for url in batch['urls']]
            try:
                FCS.crop_fields(images, coords, tmp_dir_name, aws_dir_name, prefix)
            except:
                logger.exception('Error occurs during cropping')
                batch.update(error=True,
                             error_message='Error occurs on cutting images')
                continue
            batch.update(fields=coords)
            fields += coords

        ParseService.parse(fields, kind)

        response = [cls._serialize_batch(batch) for batch in scans]
        cls.webhook_results(response, batch_id, kind)

    @classmethod
    def _serialize_batch(cls, batch):
        base = {"answer_sheet_scan_id": batch['answer_sheet_scan_id'],
                "global_id": batch['global_id']}

        if batch.get('error'):
            return dict(base, error=True, error_message=batch['error_message'])

        results = dict(ParseService.build_result(batch['fields']))
        return dict(base, results=results, error=False, error_message='')
