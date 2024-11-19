from decimal import Decimal

from django.db.models.functions import Coalesce
from django.db.models import F, Q, Count, Sum

from assessments.models import Assessment, AssessmentResult, AssessmentResultItem, AssessmentResultItemMark
from users.models import Student

from .assessment_helper import AssessmentHelper
from .answer_helper import AnswerHelper

class ResultHelper:
    @staticmethod
    def get_assessment_data_for_results(assessment):
        data = {}
        assessment_items = assessment.assessment_items.prefetch_related('answer').order_by('number')
        for assessment_item in assessment_items:
            answers_set = assessment_item.answer.order_by('number')
            max_marks = AssessmentHelper.get_max_marks(answers_set)
            kind = assessment_item.kind

            mark_kinds = [s for s in assessment_item.setting if s in ['significant_figure', 'unit']]
            mark_kinds.append('answer')

            data[assessment_item.id] = {
                'id': assessment_item.id,
                'kind': kind,
                'max_marks': max_marks,
                'mark_kinds': mark_kinds,
                'multiple_answer': answers_set.count() > 1,
                'answers': {ans.id: AnswerHelper.get_answer(ans, kind, max_marks['total']) for ans in answers_set.all()},
            }
        return data

    @staticmethod
    def get_result_filters(filters, assessment):
        filter = Q()

        if 'correct' in filters:
            filter |= Q(**{'mark': F('assessment_item__max_mark')})

        if 'partially_correct' in filters:
            filter |= (Q(**{'mark__lt': F('assessment_item__max_mark')}) & Q(**{'mark__gt': Decimal('0.00')}))

        if 'incorrect' in filters:
            filter |= Q(**{'mark': Decimal('0.00')})

        if ('low_accuracy' not in filters
                and assessment.type == Assessment.PAPER
                and assessment.kind == Assessment.CUSTOM):
            filter &= Q(**{'need_grading': False, 'need_grading_for_units': False})

        if ('high_accuracy' not in filters
                and assessment.type == Assessment.PAPER
                and assessment.kind == Assessment.CUSTOM):
            filter &= (Q(**{'need_grading': True}) | Q(**{'need_grading_for_units': True}))

        filter &= Q(**{'assessment_result__assessment_id': assessment.id})
        return filter

    @classmethod
    def generate_generic_assessment_result_items(cls, assessment_id, assessment_items):
        result_items = cls._create_generic_result_items(assessment_id, assessment_items)
        cls._create_result_items_marks(result_items)

    @staticmethod
    def _create_generic_result_items(assessment_id, assessment_items):
        results = AssessmentResult.manager.filter(assessment_id=assessment_id).all()

        data = []
        for result in results:
            for item in assessment_items:
                result_item = AssessmentResultItem(
                    assessment_item_id=item.id,
                    assessment_result_id=result.id,
                    body={'answer': [0, 0, 0, 0, 0]},
                    correct_answer=item.answer.first(),
                )
                data.append(result_item)
        return AssessmentResultItem.manager.bulk_create(data)

    @staticmethod
    def _create_result_items_marks(result_items):
        marks = []
        for result_item in result_items:
            mark = AssessmentResultItemMark(assessment_result_item_id=result_item.id, value=Decimal('0.00'))
            marks.append(mark)
        return AssessmentResultItemMark.manager.bulk_create(marks)

    @staticmethod
    def _delete_students():
        Student.objects.annotate(assessments=Count('completedassessment'),
                                 groups=Count('group'),
                                 scans=Count('answersheetscan'))
