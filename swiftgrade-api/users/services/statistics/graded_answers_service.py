from more_itertools import pairwise

from django.db.models import Count, F, Q

from assessments.models import Assessment, AssessmentItem
from assessments.models import AssessmentResultItem
from .statistics_service import StatisticsService


ONLINE_FIB = 'online_fib'
ONLINE_MC = 'online_mc'
ONLINE_MF = 'online_mf'
ONLINE_NUMERIC = 'online_numeric'
PAPER_FIB = 'paper_fib'
PAPER_MC = 'paper_mc'
PAPER_MF = 'paper_mf'
PAPER_NUMERIC = 'paper_numeric'


class GradedAnswersService:
    @classmethod
    def get_answer_type_number_of_graded_answers(cls, datelist):
        """
        Takes a number of graded answers depends on answer type on selected data range.
        """
        answer_type_in_period = {
            ONLINE_FIB: [],
            ONLINE_MC: [],
            ONLINE_MF: [],
            ONLINE_NUMERIC: [],
            PAPER_FIB: [],
            PAPER_MC: [],
            PAPER_MF: [],
            PAPER_NUMERIC: [],
        }

        for curr_day, foll_day in pairwise(datelist):
            answer_type_count = {
                ONLINE_FIB: 0,
                ONLINE_MC: 0,
                ONLINE_MF: 0,
                ONLINE_NUMERIC: 0,
                PAPER_FIB: 0,
                PAPER_MC: 0,
                PAPER_MF: 0,
                PAPER_NUMERIC: 0,
            }

            total_assessment_results_in_period = cls._get_answer_type_query(cls._get_base_query(curr_day, foll_day))

            for result in total_assessment_results_in_period:
                answer_type = result.get('type')
                for key, value in result.items():
                    if value == answer_type:
                        continue
                    answer_type_count[f'{answer_type}_{key}'] = value
            StatisticsService._add_count_to_list(answer_type_count, answer_type_in_period)

        return answer_type_in_period

    @classmethod
    def get_mc_vs_hand_number_of_graded_answers(cls, datelist):
        """
        Takes a MC vs handwritten number of graded answers on selected data range.
        """
        mc_assessment_results = []
        hand_assessment_results = []

        for curr_day, foll_day in pairwise(datelist):
            mc_count = 0
            hand_count = 0
            total_assessment_results_in_period = cls._get_mc_vs_hand_query(cls._get_base_query(curr_day, foll_day))

            for result in total_assessment_results_in_period:
                mc_count += result.get('mc_count', 0)
                hand_count += result.get('hand_count', 0)
            mc_assessment_results.append(mc_count)
            hand_assessment_results.append(hand_count)

        return {
            'mc': mc_assessment_results,
            'handwritten': hand_assessment_results
        }

    @classmethod
    def get_paper_vs_online_number_of_graded_answers(cls, datelist):
        """
        Takes a paper vs online number of graded answers on selected data range.
        """
        online_assessment_results = []
        paper_assessment_results = []

        for curr_day, foll_day in pairwise(datelist):
            online_count = 0
            paper_count = 0
            total_assessment_results_in_period = cls._get_paper_vs_online_query(cls._get_base_query(curr_day, foll_day))

            for result in total_assessment_results_in_period:
                online_count += result.get('online_count', 0)
                paper_count += result.get('paper_count', 0)
            online_assessment_results.append(online_count)
            paper_assessment_results.append(paper_count)

        return {
            'online': online_assessment_results,
            'paper': paper_assessment_results
        }

    @classmethod
    def get_total_number_of_graded_answers(cls, datelist):
        """
        Takes a total number of graded answers on selected data range.
        """
        total_assessment_results = []

        for curr_day, foll_day in pairwise(datelist):
            total_assessment_results_in_period = cls._get_base_query(curr_day, foll_day).count()
            total_assessment_results.append(total_assessment_results_in_period)

        return {'total': total_assessment_results}

    @staticmethod
    def _get_answer_type_query(query):
        return query.values('assessment_item__assessment__type') \
                    .annotate(
                        type=F('assessment_item__assessment__type'),
                        fib=Count('id', filter=Q(assessment_item__kind=AssessmentItem.FIB)),
                        mc=Count('id', filter=Q(assessment_item__kind=AssessmentItem.MC)),
                        mf=Count('id', filter=Q(assessment_item__kind=AssessmentItem.MF)),
                        numeric=Count('id', filter=Q(assessment_item__kind=AssessmentItem.NUMERIC))
                    ) \
                    .values('type', 'fib', 'mc', 'mf', 'numeric')

    @staticmethod
    def _get_base_query(curr_day, foll_day):
        return AssessmentResultItem.objects.filter(created_at__range=(curr_day, foll_day), need_grading=False)

    @staticmethod
    def _get_mc_vs_hand_query(query):
        return query.values('assessment_item__kind') \
                    .annotate(
                        mc_count=Count('id', filter=Q(assessment_item__kind=AssessmentItem.MC)),
                        hand_count=Count('id', filter=~Q(assessment_item__kind=AssessmentItem.MC))
                    ) \
                    .values('mc_count', 'hand_count')
    
    @staticmethod
    def _get_paper_vs_online_query(query):
        return query.values('assessment_item__assessment__type') \
                    .annotate(
                        online_count=Count('id', filter=Q(assessment_item__assessment__type=Assessment.ONLINE)),
                        paper_count=Count('id', filter=Q(assessment_item__assessment__type=Assessment.PAPER))
                    ) \
                    .values('online_count', 'paper_count')
