from assessments.services.recognition.clean_answer_service import CleanAnswerService
from assessments.helpers import AssessmentHelper
from assessments.models import (
    Assessment,
    AssessmentResult,
    AssessmentResultItem,
    AssessmentResultItemMark,
)

from decimal import Decimal
from users.models import Checklist
from users.services.user_checklist_service import UserChecklistService

from .. import CompletedAssessmentService, AssessmentService
from ..assessment_results_service import AssessmentResultsService
from ..recognition.compare_results_service import CompareResultsService
from ..recognition.base_parse_batch_service import BaseParseBatchService


class StudentSubmitAssessmentService:
    def __init__(self, assessment, user):
        self.assessment = assessment
        self.user = user

    def call(self, data, completed_assessment_id=None):
        assessment_items_data = self._get_assessment_items_data()
        result = self._create_assessment_result(assessment_items_data, data)

        data = {'result_id': result.id}
        completed_assessment = \
            CompletedAssessmentService(self.assessment, self.user, completed_assessment_id).call(data)

        mark = self._get_mark(completed_assessment, result)
        return completed_assessment, mark

    @staticmethod
    def _build_assessment_result_item(answer_id, item_id, result_id, body, need_grading=False):
        params = {
            'assessment_item_id': item_id,
            'assessment_result_id': result_id,
            'body': body,
            'correct_answer_id': answer_id,
            'need_grading': need_grading,
        }
        return AssessmentResultItem(**params)

    @staticmethod
    def _build_result_item_marks(marks):
        item_marks, total = [], Decimal('0.00')
        for mark in marks:
            total += mark['value']
            item_marks.append(AssessmentResultItemMark(**mark))
        return total, item_marks

    def _get_assessment_items_data(self):
        items = self.assessment.assessment_items.order_by('number')
        return BaseParseBatchService.map_assessment_items(items.prefetch_related('answer', 'answer__mark').all())

    def _get_mark(self, completed_assessment, result):
        assessment = completed_assessment.assessment
        settings = AssessmentService.get_assessment_settings(assessment.id)
        release_results_type = settings.release_results_type if settings else None

        if release_results_type:
            total = AssessmentResultsService.get_assessment_total_mark(self.assessment)
            return AssessmentHelper.get_result(result.mark, total)
        return None

    def _create_assessment_result(self, assessment_items, data):
        assessment_result = AssessmentResult.manager.create(assessment_id=self.assessment.id)
        mark, results_items, results_items_marks = Decimal('0.00'), [], []

        for item, result in zip(assessment_items, data):
            raw_answer = result['body']['answer']
            result['body']['answer'] = CleanAnswerService.call(
                raw_answer, result['kind'], 'scientific_notation' in item['setting'],
            )
            data = CompareResultsService().compare(result['body'], item, Assessment.ONLINE)
            result['body']['real_answer'] = raw_answer
            result['body']['answer'] = raw_answer

            body = result['body']
            if item['kind'] == 'fib':
                body.update({'is_ac_applied': data.get('is_ac_applied', False)})

            result_item = self._build_assessment_result_item(
                data['answer_id'], item['id'], assessment_result.id, body, data.get('need_grading', False),
            )
            total, item_marks = self._build_result_item_marks(data.get('marks', []))
            mark += total

            results_items.append(result_item)
            results_items_marks.append(item_marks)

        assessment_results_items = AssessmentResultItem.manager.bulk_create(results_items)
        self._create_results_marks(assessment_results_items, results_items_marks)

        # add new checklist entry or update existing one to store last created result date
        UserChecklistService.create_or_update(self.assessment.group.user, Checklist.RESULT_CREATED)

        return self._update_mark(mark, assessment_result)

    @staticmethod
    def _create_results_marks(assessment_results, assessment_results_marks):
        batch_for_create = []

        for i in range(len(assessment_results_marks)):
            marks, result = assessment_results_marks[i], assessment_results[i]
            for mark in marks:
                mark.assessment_result_item_id = result.id
                batch_for_create.append(mark)
        AssessmentResultItemMark.manager.bulk_create(batch_for_create)

    @staticmethod
    def _update_mark(mark, result):
        result.mark = mark
        result.save()

        return result
