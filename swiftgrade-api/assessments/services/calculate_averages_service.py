import math
from decimal import Decimal, ROUND_HALF_UP

from django.db.models import Sum, Min, Max

from assessments.helpers import AssessmentHelper
from assessments.models import Assessment, AssessmentResult

from .assessment_results_service import AssessmentResultsService


class CalculateAveragesService:
    """
    Collects statistics about how the students of the class passed an appropriate assessment.
    Statistics includes:
    - mean mark
    - median mark
    - high mark
    - low mark
    - standard deviation
    of the students results.
    """

    @classmethod
    def get_averages_results(cls, assessment_id):
        assessment = Assessment.manager.get(id=assessment_id)
        assessment_results = AssessmentResult.manager.filter(assessment_id=assessment_id, status=AssessmentResult.RECOGNIZED)
        total_assessment_mark = AssessmentResultsService.get_assessment_total_mark(assessment)

        average_results = {
            "mean_mark": cls._get_mean_mark(assessment_results, total_assessment_mark),
            "median_mark": cls._get_median_mark(assessment_results, total_assessment_mark),
            "high_mark": cls._get_high_mark(assessment_results, total_assessment_mark),
            "low_mark": cls._get_low_mark(assessment_results, total_assessment_mark),
            "deviation": cls._get_standard_deviation_mark(assessment_results, total_assessment_mark),
        }

        return [average_results]

    @classmethod
    def _get_mean_mark(cls, assessment_results, total_assessment_mark):
        """
        Mean mark = Sum of all students marks / amount of students (for current assessment)
        Method takes in assessment results, gets the sum of all students marks and students amount
        Returns calculated mean_mark, total assessment mark and its ratio in the appropriate format.
        Example: 3 / 5 (60%), where 3 - mean mark, 5 - total assessment mark, 60% - ratio
        """
        mean_mark = assessment_results.aggregate(Sum("mark"))["mark__sum"] / assessment_results.count()
        mean_mark = cls._format_result(mean_mark.quantize(Decimal("1.00")), total_assessment_mark)
        return mean_mark

    @classmethod
    def _get_median_mark(cls, assessment_results, total_assessment_mark):
        """
        The median of a set of data values is the middle value of the data set when it has been arranged in
        ascending order.
        Method takes in assessment results, gets students amount and students marks. If students marks amount is odd,
        it gets the middle of the students marks. If amount is even, then it gets 2 middle values and calculates the
        mean value of them. Returns the calculated median mark, total assessment mark and the ratio in the format like above.
        """
        students_count = assessment_results.count()
        students_marks = assessment_results.order_by("mark").values_list("mark", flat=True)
        if students_count % 2 != 0:
            median_index = students_count // 2
            return cls._format_result(students_marks[median_index], total_assessment_mark)
        else:
            median_index = students_count // 2
            middle_marks = students_marks[median_index - 1:median_index + 1]
            median_mark = Decimal(sum(middle_marks) / 2).quantize(Decimal("1.00"), rounding=ROUND_HALF_UP)
            return cls._format_result(median_mark, total_assessment_mark)

    @classmethod
    def _get_high_mark(cls, assessment_results, total_assessment_mark):
        """
        High mark - the highest student’s mark for this assessment
        Returns high mark, total assessment mark and its ratio in the format like above.
        """
        high_mark = assessment_results.aggregate(Max("mark"))["mark__max"]
        return cls._format_result(high_mark, total_assessment_mark)

    @classmethod
    def _get_low_mark(cls, assessment_results, total_assessment_mark):
        """
        Low mark - the lowest student’s mark for this assessment
        Returns low mark, total assessment mark and its ratio in the format like above.
        """
        low_mark = assessment_results.aggregate(Min('mark'))["mark__min"]
        return cls._format_result(low_mark, total_assessment_mark)

    @classmethod
    def _get_standard_deviation_mark(cls, assessment_results, total_assessment_mark):
        """
        https://sciencenotes.org/how-to-calculate-standard-deviation/
        Standard deviation is a measurement of how spread out the numbers are of a set of data values.
        Method takes assessment results, gets students marks, students amount (n) and the mean mark. For each student
        mark it calculates the square of difference between student and mean marks and takes the sum of it.
        Then it divides the sum by students amount and gets sqrt of the calculated value.
        Returns standard deviation value and the ratio of it.
        """
        mean_mark = assessment_results.aggregate(Sum("mark"))["mark__sum"] / assessment_results.count()
        n = assessment_results.count()
        students_marks = assessment_results.values_list("mark", flat=True)

        sum_value = 0
        for student_mark in students_marks:
            sum_value += (student_mark - mean_mark) ** 2
        sd = math.sqrt(sum_value / n)  # population formula (if 'sample' needs, then change n to n - 1)
        sd = round(sd, 2)

        ratio = Decimal(str(Decimal(sd) / total_assessment_mark * 100)).quantize(Decimal("1.0"), rounding=ROUND_HALF_UP)
        ratio = AssessmentHelper.normalize_number(ratio)
        return f"{sd} marks ({ratio}%)"

    @classmethod
    def _format_result(cls, value, total):
        ratio = Decimal(str(value / total * 100)).quantize(Decimal("1.0"), rounding=ROUND_HALF_UP)

        value = AssessmentHelper.normalize_number(value)
        total = AssessmentHelper.normalize_number(total)
        ratio = AssessmentHelper.normalize_number(ratio)

        return f"{value}/{total}({ratio}%)"
