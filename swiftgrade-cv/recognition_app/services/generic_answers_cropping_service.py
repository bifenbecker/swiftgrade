import time

from api.core.logger.custom_logger import CustomLogger
from swiftgrade_cv import celery_app

from .base_generic_service import BaseGenericService
from .field_cutter_service import FieldCutterService as FCS
from .scanner_service import ScannerService

logger = CustomLogger.get_logger(__name__, 'recognition.log')


@celery_app.task
def generic_answer_cropping_process(data, batch_id):
    try:
        GenericAnswersCroppingService.cropping(data, batch_id)
    except Exception as exc:
        logger.exception(f"Error in generic answers cropping service: {exc}")
        response = [{'error': True, "error_message": f'{exc.__class__.__name__}: {exc}'} for _ in data]
        GenericAnswersCroppingService._webhook_results(response, batch_id, 'cropping')


class GenericAnswersCroppingService(BaseGenericService):
    """
    Service which provide flow of answer sheet scan parsing
    """
    @classmethod
    def cropping(cls, data, batch_id):
        """
        For all docs in batch
        1) get coordinates from global_id
        2) cut fields via coordinates
        4) send webhook with cropping answers
        :param results: batches of scans
        :param batch_id: id of batch
        :return: send web hook to backend
        """
        cutted_dir = str(int(time.time() * 1000))  # timestamp for uniqueness
        aws_dir_name = f'cv-cutted-{cutted_dir}'
        answers_count, scans, results = data['answers_count'], data['scans'], []
        absolute_cutted_dir = cls._get_absolute_cutted_dir()
        for prefix, batch in enumerate(scans, 1):
            image = ScannerService.process_image(batch['url'], url=True)
            coordinates = cls._get_coordinates(batch['global_id'])
            if coordinates:
                coordinates = coordinates[:answers_count] if batch['named'] else coordinates[3:answers_count+3]
                FCS.crop_fields([image], coordinates, absolute_cutted_dir, aws_dir_name, prefix)
                results.append({
                    'answer_sheet_scan_id': batch['answer_sheet_scan_id'],
                    'results': {index: {
                        'path': coord['aws_path'],
                        'error': coord['error'],
                        'error_message': coord['error_message'],
                        } for index, coord in enumerate(coordinates, 1)},
                    'error': False,
                    'error_message': '',
                })
            else:
                results.append({
                    'answer_sheet_scan_id': batch['answer_sheet_scan_id'],
                    'results': None,
                    'error': True,
                    'error_message': 'Related coordinates don''t exist',
                })
        cls._webhook_results(results, batch_id, 'cropping')
