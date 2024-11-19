from operator import itemgetter
from decimal import Decimal

from django.db.models import Sum, Count, Q, F, Prefetch, Max

from assessments.models import AssessmentItem, AssessmentResult, AssessmentResultItem

EMPTY_VALUES = [None, " ", ""]

PREFETCH_FOR_ITEMS = Prefetch(
    'result_items',
    queryset=AssessmentResultItem.manager.annotate(student_mark=Sum('result_item_mark__value')))
PREFETCH_FOR_MARKS = Prefetch('result_items__result_item_mark')


class CalculateAnalysisService:
    """
    Collects statistics about how the students of the class passed an appropriate assessment by answers.
    Statistics includes amount of correct, incorrect, partially correct, unanswered students answers for each answer.
    Also it calculates most common student answers for each answer.
    """

    @classmethod
    def get_assessment_analysis_results(cls, assessment_id, ordering):
        assessment_items = cls._get_assessment_items(assessment_id)
        analysis_data = cls._calculate_analysis_counts(assessment_items, ordering)
        results = AssessmentResult.manager.filter(assessment_id=assessment_id, status=AssessmentResult.RECOGNIZED)
        return analysis_data, results.count()

    @classmethod
    def _calculate_analysis_counts(cls, assessment_items, ordering):
        data = []
        for assessment_item in assessment_items:
            result_items = assessment_item.result_items.filter(assessment_result__status=AssessmentResult.RECOGNIZED).all()

            most_common_answers = cls._get_most_common_answers(result_items)
            marks = assessment_item.answer.first().mark.all()

            filtered_result_items = cls._get_filtered_result_items(assessment_item, result_items)
            filtered_result_items.update({
                'id': assessment_item.id,
                'number': assessment_item.number,
                'kind': assessment_item.kind,
                'marks': marks,
                'most_common_answers': most_common_answers,
                'result_items_for_most_common_answers': cls._get_result_items_for_most_common_answers(most_common_answers, result_items),
                'setting': assessment_item.setting,
            })
            data.append(filtered_result_items)

        return cls._sort_analysis_data(ordering, data)

    @classmethod
    def _compare_units_for_grouping(cls, group_unit, result_group_unit):
        if result_group_unit and group_unit:
            result_group_unit = cls._clean_unit_for_grouping(result_group_unit)
            group_unit = cls._clean_unit_for_grouping(group_unit)
        return result_group_unit == group_unit

    @staticmethod
    def _clean_unit_for_grouping(unit):
        if type(unit) is not str:
            return unit
        for i in [' ', '{', '}', '\\mathrm', '\\operatorname', '\\text', '\\']:
            unit = unit.replace(i, '')
        return unit

    @staticmethod
    def _get_assessment_items(assessment_id):
        return AssessmentItem.manager.filter(assessment_id=assessment_id).exclude(answer__body__value=[]) \
            .prefetch_related(PREFETCH_FOR_ITEMS, PREFETCH_FOR_MARKS)

    @classmethod
    def _get_filtered_result_items(cls, assessment_item, result_items):
        correct_filter, partial_filter, unanswered_filter = Q(), Q(), Q()

        correct_filter |= Q(student_mark=assessment_item.max_mark)
        partial_filter |= Q(student_mark__gt=0, student_mark__lt=assessment_item.max_mark)

        unanswered_filter, incorrect_filter = cls._get_filter_answers(assessment_item)

        return result_items.aggregate(
            correct=Count('id', filter=correct_filter),
            partial=Count('id', filter=partial_filter),
            incorrect=Count('id', filter=incorrect_filter),
            unanswered=Count('id', filter=unanswered_filter),
        )

    @classmethod
    def _get_most_common_answers(cls, result_items):
        groups = result_items.annotate(kind=F('result_item_mark__kind'), mark=F('result_item_mark__value')).filter(kind='answer') \
                        .annotate(correct_body=F('correct_answer__body')).values('body', 'correct_body', 'mark') \
                        .annotate(count=Count('body'), id=Max('id'))
        result_groups = []

        for group in groups:
            if group.get('body').get('is_ac_applied') and group.get('mark') != Decimal('0.00'):
                group['body']['answer'] = group['correct_body']['value']
            
            late_adding = False
            answer = group['body']['answer']

            if isinstance(answer, str):
                answer = group['body']['answer'] = group['body']['answer'].lower()

            if not any(result_group['body']['answer'] == answer for result_group in result_groups):
                result_groups.append({
                    'body': group['body'], 
                    'count': group['count'], 
                    'id': group['id']
                    })
            else:
                for result_group in result_groups:
                    if result_group.get('body').get('answer') == answer:
                        if cls._compare_units_for_grouping(result_group.get('body').get('unit'), 
                                                           group.get('body').get('unit')):
                                result_group['count'] = result_group['count'] + group['count']
                                if group.get('id') > result_group.get('id'):
                                    result_group['id'] = group['id']
                                late_adding = False
                                break
                    late_adding = True
                
                if late_adding:
                    result_groups.append({
                        'body': group['body'], 
                        'count': group['count'], 
                        'id': group['id']
                        })

        return sorted(result_groups, key=lambda group: group['count'], reverse=True)[:5]

    @staticmethod
    def _get_result_items_for_most_common_answers(most_common_answers, result_items):
        result_items_for_most_common_answers = {}
        for most_common_answer in most_common_answers:
            result_item = result_items.filter(id=most_common_answer['id']).first()
            result_items_for_most_common_answers[most_common_answer['id']] = result_item
        return result_items_for_most_common_answers

    @staticmethod
    def _get_filter_answers(assessment_item):
        kind, setting = assessment_item.kind, assessment_item.setting
        unanswered_filter, incorrect_filter = \
            Q(assessment_item__kind=kind, student_mark=0), Q(assessment_item__kind=kind, student_mark=0)

        if kind in ['numeric', 'mf']:
            if 'unit' in setting:
                filter_for_answers = Q(
                    body__has_keys=['answer', 'unit'],
                    body__answer__contained_by=EMPTY_VALUES,
                    body__unit__contained_by=EMPTY_VALUES
                )
                unanswered_filter &= filter_for_answers
            else:
                filter_for_answers = Q(body__has_keys=['answer'], body__answer__contained_by=EMPTY_VALUES)
                unanswered_filter &= filter_for_answers

        elif kind == 'mc':
            filter_for_answers = (Q(body__answer=[0, 0, 0, 0, 0]) | Q(body__answer=' ') | Q(body__answer=None))
            unanswered_filter &= filter_for_answers
        elif kind == 'fib':
            filter_for_answers = Q(body__answer__contained_by=EMPTY_VALUES)
            unanswered_filter &= filter_for_answers
        return unanswered_filter, incorrect_filter

    @staticmethod
    def _sort_analysis_data(ordering, result_items):
        reverse = '-' in ordering
        return sorted(result_items, key=itemgetter(ordering.replace('-', '')), reverse=reverse)
