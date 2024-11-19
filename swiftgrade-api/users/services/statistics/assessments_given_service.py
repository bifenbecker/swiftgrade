from more_itertools import pairwise

from django.db.models import Min

from assessments.models import Assessment
from .statistics_service import StatisticsService


class AssessmentsGivenService:
    @classmethod
    def get_paper_vs_online_assessments_given(cls, datelist):
        """
        Takes the paper vs online number of assessments that teachers gave that had their first result added in selected period.
        """
        total_assessments = {
            'online': [],
            'paper': []
        }

        for curr_day, foll_day in pairwise(datelist):
            total_assessments_count = {
                'online': 0,
                'paper': 0
            }
            assessments_in_period = cls._get_base_query(curr_day, foll_day).values('type')

            for assessment in assessments_in_period:
                total_assessments_count[f'{assessment["type"]}'] += 1
            StatisticsService._add_count_to_list(total_assessments_count, total_assessments)

        return total_assessments

    @classmethod
    def get_total_assessments_given(cls, datelist):
        """
        Takes the total number of assessments that teachers gave that had their first result added in selected period.
        """
        total_assessments = []

        for curr_day, foll_day in pairwise(datelist):
            assessments_in_period = cls._get_base_query(curr_day, foll_day).count()
            total_assessments.append(assessments_in_period)

        return {'total': total_assessments}

    @classmethod
    def get_type_assessments_given(cls, datelist):
        """
        Takes the number of assessments by assessment type that teachers gave that had their first result added in selected period.
        """
        total_assessments = {
            'online_generic': [],
            'online_custom': [],
            'paper_generic': [],
            'paper_custom': [],
        }

        for curr_day, foll_day in pairwise(datelist):
            total_assessments_count = {
                'online_generic': 0,
                'online_custom': 0,
                'paper_generic': 0,
                'paper_custom': 0,
            }
            assessments_in_period = cls._get_base_query(curr_day, foll_day).values('kind', 'type')

            for assessment in assessments_in_period:
                total_assessments_count[f'{assessment["type"]}_{assessment["kind"]}'] += 1

            StatisticsService._add_count_to_list(total_assessments_count, total_assessments)

        return total_assessments

    @staticmethod
    def _get_base_query(curr_day, foll_day):
        return Assessment.objects \
                         .values('id') \
                         .annotate(min_result=Min('assessment_results__created_at')) \
                         .filter(min_result__range=(curr_day, foll_day)) \
