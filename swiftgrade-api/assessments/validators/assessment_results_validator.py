from django.db.models.functions import Coalesce
from django.db.models import Sum


class AssessmentResultsValidator:
    @classmethod
    def validate_mark(cls, instance, mark, kind):
        result_item = instance.assessment_result_item
        answers = cls._get_answers(instance.assessment_result_item)
        answer = answers.first()

        if answers.count() > 1:
            return {'value': cls._get_mark(answer, kind, mark, result_item)}

        marks = {mark.kind: mark.value for mark in answer.mark.all()}
        return {'value': marks[kind] if kind in marks and mark > marks[kind] else mark}

    @staticmethod
    def _get_mark(answer, kind, mark, result_item):
        sub_mark = sum(m.value for m in result_item.result_item_mark.all() if m.kind != kind)
        answer_mark_for_kind = answer.mark.filter(kind=kind).first()
        if mark > answer.total_mark - sub_mark:
            return answer.total_mark - sub_mark
        return answer_mark_for_kind.value if mark > answer_mark_for_kind.value else mark

    @staticmethod
    def _get_answers(result_item):
        return result_item.assessment_item.answer \
            .annotate(total_mark=Coalesce(Sum('mark__value'), 0)).order_by('-total_mark')
