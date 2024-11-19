from rest_framework import serializers

from decimal import Decimal

from ...helpers import AssessmentHelper, AnswerHelper
from ...services.recognition.clean_answer_service import CleanAnswerService


MARK = Decimal('0.00')


class BaseAssessmentResultSerializer(serializers.Serializer):
    @staticmethod
    def _get_answers(assessment_item):
        answers_set = assessment_item.answer.order_by('number').all()
        max_mark = AssessmentHelper.get_max_marks(answers_set).get('total', MARK)
        return [AnswerHelper.get_answer(answer, assessment_item.kind, max_mark) for answer in answers_set]

    @staticmethod
    def _get_correct_answer(answers, correct_answer, assessment_item):
        if correct_answer:
            max_mark = AssessmentHelper.get_max_marks(assessment_item.answer.order_by('number').all()).get('total', MARK)
            return AnswerHelper.get_answer(correct_answer, assessment_item.kind, max_mark)
        return answers[0] if len(answers) == 1 else None

    @staticmethod
    def _get_sf(answer):
        try:
            return AssessmentHelper.get_sig_fig(answer)
        except Exception as e:
            return None

    def _get_student_answer(self, result_item, is_sf, is_real_answer=False):
        answer_key = 'real_answer' if is_real_answer else 'answer'
        answer = result_item.body.get(answer_key) if isinstance(result_item.body, dict) else result_item.body
        kind = result_item.assessment_item.kind
        unit = result_item.body.get('unit') if isinstance(result_item.body, dict) else None
        data = {'answer': answer, 'significant_figure': None, 'unit': unit}

        if is_sf:
            answer = CleanAnswerService.call(answer, kind, with_sn=True)
            data.update({'significant_figure': self._get_sf(answer)})

        return data

    @staticmethod
    def _get_student_image(result_item):
        return {
            'answer_url': result_item.image.url if result_item.image else None,
            'unit_url': result_item.unit_image.url if result_item.unit_image else None,
        }

    @staticmethod
    def _get_mark(result_item, total):
        return { 'student_mark': result_item.mark, 'total': total}

    @staticmethod
    def _get_marks(kinds, max_marks, result_item):
        real_marks = {item.kind: {'id': item.id, 'value': item.value} for item in result_item.result_item_mark.all()}
        return {
            kind: {
                'id': real_marks.get(kind, {}).get("id", None),
                'value': real_marks.get(kind, {}).get("value", None),
                'total': max_marks[kind] if kind in max_marks else MARK,
            } for kind in kinds
        }
