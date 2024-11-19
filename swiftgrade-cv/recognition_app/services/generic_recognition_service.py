import time

from api.core.logger.custom_logger import CustomLogger
from swiftgrade_cv import celery_app

from .base_generic_service import BaseGenericService
from .field_cutter_service import FieldCutterService as FCS
from .parse_service import ParseService
from .scanner_service import ScannerService

logger = CustomLogger.get_logger(__name__, 'recognition.log')

@celery_app.task
def generic_recognize_process(data, batch_id):
    try:
        GenericRecognitionService.recognize(data, batch_id)
    except Exception as exc:
        logger.exception(f'Error in generic recognize service: {exc}')
        response = [{'error': True, "error_message": f'{exc.__class__.__name__}: {exc}'} for _ in data]
        GenericRecognitionService._webhook_results(response, batch_id)


class GenericRecognitionService(BaseGenericService):
    """
    Service which provide flow of answer sheet scan parsing
    """
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
        cutted_dir = str(int(time.time() * 1000))  # timestamp for uniqueness
        aws_dir_name = f'cv-cutted-{cutted_dir}'
        absolute_cutted_dir, fields = cls._get_absolute_cutted_dir(), []
        for prefix, batch in enumerate(data, 1):
            image = ScannerService.process_image(batch['url'], url=True)
            coordinates = cls._get_coordinates(batch['global_id'])
            if coordinates:
                coordinates = coordinates[:3]
                FCS.crop_fields([image], coordinates, absolute_cutted_dir, aws_dir_name, prefix)

                fields += coordinates
                batch.update(fields=coordinates, error=False, error_message='')
            else:
                batch.update(fields=None, error=True, error_message='Related coordinates don''t exist')

        # recognize FN/LN/Email
        ParseService.parse(fields, 'generic')
        results = []
        index = 0
        amount_of_item_fields = int(len(fields) / len(data)) if data else 1
        for item in data:
            item_fields = fields[index:index + amount_of_item_fields]
            result_item = {
                field['type']: {
                    'value': field['recognized'],
                    'url': field['aws_path'],
                    'error': field['error'],
                    'error_message': field['error_message'],
                } for field in item_fields
            }
            result_item.update(answer_sheet_scan_id=item['answer_sheet_scan_id'],
                               error=item['error'],
                               error_message=item['error_message'])
            results.append(result_item)
            index += amount_of_item_fields
        cls._webhook_results(results, batch_id)
