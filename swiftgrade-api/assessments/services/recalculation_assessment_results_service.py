from django.db.models import Sum, Q
from django.forms import model_to_dict

from decimal import Decimal

from .recognition.clean_answer_service import CleanAnswerService
from .recognition.compare_results_service import CompareResultsService
from ..helpers import AssessmentHelper
from ..models import AssessmentItem, AssessmentResult, AssessmentResultItem, AssessmentResultItemMark, Answer


KINDS = {'a': 'answer', 'sf': 'significant_figure', 'u': 'unit'}
MARK = Decimal('0.00')

REMARK_TYPE_WITHOUT_MANUALLY_GRADED = 'without_manually_graded'
REMARK_TYPE_WITH_MANUALLY_GRADED = 'with_manually_graded'

class RecalculationAssessmentItemsService:
    @classmethod
    def call(cls, assessment_items_ids, assessment_type, deleting_sub_answers_ids, remark_type, assessment_id):
        result_items_filter = Q(
            assessment_item_id__in=assessment_items_ids, 
        )
        if remark_type == REMARK_TYPE_WITH_MANUALLY_GRADED:
            result_items_filter |= Q(is_manually_graded=True)
        else:
            result_items_filter &= Q(is_manually_graded=False)
        results_items = AssessmentResultItem.manager.filter(
            result_items_filter,
            assessment_item__assessment_id=assessment_id,
        )
        assessment_items = AssessmentItem.manager.filter(id__in=results_items.values_list('assessment_item', flat=True))
        answers = cls._get_answers(assessment_items, deleting_sub_answers_ids)

        results_items_ids = results_items.values_list('id', flat=True)

        marks, results_ids = list(), set()

        for result_item in results_items:
            
            if result_item.correct_answer:
                new_correct_answer = cls.recalculate_correct_answer(answers, assessment_type, result_item)

                # TODO: remove ???
                if not new_correct_answer:
                    continue
                for mark_item in new_correct_answer['marks']:
                    marks.append(cls.__build_result_item_mark(result_item.id, mark_item['kind'], mark_item['value']))

                results_ids.add(result_item.assessment_result.id)

        # deleting sub-answers
        for assessment_item_id in assessment_items_ids:
            sub_answers_to_delete = Answer.manager.filter(
                assessment_item_id=assessment_item_id,
                number__in=deleting_sub_answers_ids.get(assessment_item_id, [])
            )
            if sub_answers_to_delete.exists():
                sub_answers_to_delete.delete()

        cls._deleting_old_marks(results_items_ids)
        cls._creating_new_marks(marks)
        cls._updating_mark(results_ids)
        cls._updating_result_items(results_items)

    @classmethod
    def _updating_result_items(cls, results_items):
        update_result_items = []
        for result_item in results_items:
            result_item.is_manually_graded = False
            update_result_items.append(result_item)
        AssessmentResultItem.manager.bulk_update(update_result_items, fields=['is_manually_graded'])

    @classmethod
    def recalculate_correct_answer(cls, answers, assessment_type, result_item):
        assessment_item = model_to_dict(result_item.assessment_item)
        assessment_item['answers'] = [answer for answer in answers.values()
                                      if answer['assessment_item_id'] == assessment_item['id']]
        assessment_item_kind = assessment_item['kind']
        raw_answer = result_item.body['answer']

        if assessment_item_kind != AssessmentItem.MC:
            result_item.body['answer'] = CleanAnswerService.call(
                raw_answer, assessment_item_kind, with_sn='scientific_notation' in assessment_item['setting'],
            )
        new_correct_answer = CompareResultsService().compare(result_item.body, assessment_item, assessment_type)
        result_item.body['answer'] = raw_answer
        new_correct_answer_id = new_correct_answer.get('answer_id', None) if new_correct_answer else None

        if new_correct_answer_id:
            if new_correct_answer_id != result_item.correct_answer.id:
                result_item.correct_answer = Answer.manager.get(id=new_correct_answer_id)
            result_item.body['is_ac_applied'] = new_correct_answer.get('is_ac_applied', False)
            result_item.save()
        return new_correct_answer

    @classmethod
    def recalculate_marks(cls, assessment_id):
        results_ids = AssessmentResult.manager.filter(assessment_id=assessment_id).values_list('id', flat=True)
        cls._updating_mark(results_ids)

    @classmethod
    def _get_answers(cls, assessment_items, deleting_sa_answers_ids):
        answers = {}
        for assessment_item in assessment_items:
            assessment_item_answers = assessment_item.answer \
                .exclude(number__in=deleting_sa_answers_ids.get(assessment_item.id, []))
            for answer in assessment_item_answers:
                answer_data = cls._get_answer_data(assessment_item, answer)
                answers[answer.id] = answer_data
        return answers

    @staticmethod
    def _get_answer_data(assessment_item, answer):
        return {
            'id': answer.id,
            'answer': AssessmentHelper.get_value_body(answer.body, 'answer', assessment_item.kind),
            'assessment_item_id': assessment_item.id,
            'kind': assessment_item.kind,
            'marks': {item.kind: item.value for item in answer.mark.all()},
            'scientific_notation': answer.scientific_notation,
            'setting': assessment_item.setting,
            'significant_figure': answer.significant_figure,
            'tolerance': answer.tolerance,
            'tolerance_data': answer.tolerance_data,
            'unit': answer.unit,
            'valid': answer.body.get('valid', True),
            'value': AssessmentHelper.get_value_body(answer.body, 'value', assessment_item.kind),
        }

    @staticmethod
    def _creating_new_marks(marks):
        AssessmentResultItemMark.manager.bulk_create(marks)

    @staticmethod
    def _deleting_old_marks(results_items_ids):
        AssessmentResultItemMark.manager \
            .filter(assessment_result_item_id__in=results_items_ids) \
            .exclude(assessment_result_item__correct_answer=None).all().delete()

    @staticmethod
    def _updating_mark(results_ids):
        results, results_for_updating = AssessmentResult.manager.filter(id__in=results_ids).all(), []
        for result in results:
            mark = AssessmentResultItemMark.manager.filter(
                assessment_result_item__assessment_result_id=result.id).aggregate(Sum('value'))['value__sum']
            result.mark = mark
            results_for_updating.append(result)
        AssessmentResult.manager.bulk_update(results_for_updating, fields=['mark'])

    @staticmethod
    def __build_result_item_mark(result_item_id, kind, mark):
        return AssessmentResultItemMark(
            **{'assessment_result_item_id': result_item_id, 'kind': kind, 'value': mark}
        )
