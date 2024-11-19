from assessments.models import Assessment, AssessmentResult, RecognitionBatch

from django.utils import timezone
from datetime import timedelta

STATUSES = [RecognitionBatch.PROCESSING, RecognitionBatch.CROPPING_COMPLETED, RecognitionBatch.RECOGNITION_COMPLETED]


class CheckAssessmentsRecognitionService:
    @classmethod
    def call(cls):
        assessments_for_update, recognition_batches_for_updates, results_for_update = [], [], []
        recognition_batches = cls._get_recognition_batches()

        for recognition_batch in recognition_batches:
            recognition_batch.status = RecognitionBatch.RECOGNITION_ERROR
            recognition_batches_for_updates.append(recognition_batch)

            if recognition_batch.assessment:
                recognition_batch.assessment.status = Assessment.SCANNED
                assessments_for_update.append(recognition_batch.assessment)

            results_for_update += cls._get_updated_results(recognition_batch)

        cls._bulk_update(assessments_for_update)
        cls._bulk_update(recognition_batches_for_updates, RecognitionBatch)
        cls._bulk_update(results_for_update, AssessmentResult)

    @classmethod
    def update_batch(cls, batch):
        assessments_for_update, results_for_update = [], []

        if batch.assessment:
            batch.assessment.status = Assessment.SCANNED
            batch.assessment.save()
        results_for_update += cls._get_updated_results(batch)

        cls._bulk_update(assessments_for_update)
        cls._bulk_update(results_for_update, AssessmentResult)

    @staticmethod
    def _get_recognition_batches():
        date = timezone.now() - timedelta(minutes=10)
        return RecognitionBatch.manager.filter(created_at__lt=date, status__in=STATUSES)

    @staticmethod
    def _get_updated_results(batch):
        results_for_update = []
        for scan in batch.scans.all():
            if scan.assessment_result:
                scan.assessment_result.status = AssessmentResult.RECOGNITION_ERROR
                results_for_update.append(scan.assessment_result)
        return results_for_update

    @staticmethod
    def _bulk_update(data, model=Assessment):
        if hasattr(model, 'manager'):
            model.manager.bulk_update(data, ['status'])
        else:
            model.objects.bulk_update(data, ['status'])
