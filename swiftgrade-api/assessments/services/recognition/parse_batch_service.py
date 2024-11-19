from api.core.logger.custom_logger import CustomLogger
from assessments.models import AssessmentResult, RecognitionBatch

from .base_parse_batch_service import BaseParseBatchService
from .calculate_result_service import CalculateResultService

logger = CustomLogger.get_logger(__name__, 'recognition_process.log')

class ParseBatchService(BaseParseBatchService):
    @classmethod
    def _update_results(cls, marks, recognized_persons, results):
        for result in results:
            if result.status != AssessmentResult.RECOGNITION_ERROR:
                result.mark = marks.get(result.id)
                result.recognized_person_id = recognized_persons.get(result.id)
                result.status = AssessmentResult.RECOGNIZED
        return cls._bulk_update(results, AssessmentResult, ['mark', 'recognized_person_id', 'status'])

    @classmethod
    def _preprocess_data(cls, batch, data):
        map_data, recognized_persons, results = [], [], []

        assessment, scans = batch.assessment, batch.scans.all()
        assessment_items = cls.map_assessment_items(
            assessment.assessment_items.prefetch_related('answer', 'answer__mark').all())
        for scan_results in data:
            scan = scans.filter(id=scan_results['answer_sheet_scan_id']).first()
            result = scan.assessment_result if scan and scan.assessment_result else None

            if result:
                try:
                    if not scan_results['error']:
                        map_data.append({
                            "assessment_items": assessment_items,
                            "assessment_result_id": result.id,
                            "results": scan_results["results"],
                        })
                        if not scan.named:
                            recognized_person = cls._build_recognized_person(scan_results["results"])
                            recognized_person.assessment_result_id = scan.assessment_result.id

                            recognized_persons.append(recognized_person)
                    else:
                        result.status = AssessmentResult.RECOGNITION_ERROR
                except Exception as e:
                    map_data = list(filter(lambda item: item['assessment_result_id'] != result.id, map_data))
                    result.status = AssessmentResult.RECOGNITION_ERROR
                    logger.info(f'Exception: {e}')
                    logger.info(f'Scan: {scan}')
                results.append(result)
        return map_data, recognized_persons, results

    @classmethod
    def parse(cls, batch, data):
        map_data, recognized_persons, results = cls._preprocess_data(batch, data)
        marks, results = CalculateResultService.calculate_scan_results(map_data, results)

        recognized_persons = cls._bulk_create(recognized_persons)
        map_recognized_persons = {p.assessment_result_id: p.id for p in recognized_persons}

        cls._update_results(marks, map_recognized_persons, results)

        cls._update_status(batch.assessment)
        cls._update_status(batch, RecognitionBatch.COMPLETED)
