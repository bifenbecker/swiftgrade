from decimal import Decimal, ROUND_HALF_EVEN, ROUND_HALF_UP
from rest_framework import serializers

from assessments.helpers import AssessmentHelper
from assessments.models import AssessmentItem

from .base_assessment_result_serializer import BaseAssessmentResultSerializer


class AssessmentAnalysisResponseSerializer(serializers.ModelSerializer, BaseAssessmentResultSerializer):
    incorrect = serializers.SerializerMethodField()
    correct = serializers.SerializerMethodField()
    partial = serializers.SerializerMethodField()
    unanswered = serializers.SerializerMethodField()
    most_common = serializers.SerializerMethodField()
    is_flag_visible = serializers.SerializerMethodField()

    class Meta:
        model = AssessmentItem
        fields = ("id", "number", "kind", "incorrect", "correct", "partial", "unanswered", "most_common", "is_flag_visible")

    @staticmethod
    def _get_student_answer(body, is_sf):
        answer = body.get('answer', None) if isinstance(body, dict) else body
        unit = body.get('unit', None) if isinstance(body, dict) else None

        try:
            sf = AssessmentHelper.get_sig_fig(answer) if is_sf else None
            return {'answer': answer, 'significant_figure': sf, 'unit': unit}
        except Exception:
            return {'answer': answer, 'significant_figure': None, 'unit': unit}

    def _format_result(self, count):
        total_count = self.context.get("total_count", 0)
        if total_count == 0:
            return {"count": count, "ratio": 0}
        ratio = int(Decimal(str(count / total_count * 100)).quantize(0, ROUND_HALF_EVEN))
        return {"count": count, "ratio": ratio}

    def get_is_flag_visible(self, analysis_item):
        correct_answer_ratio = self._format_result(analysis_item["correct"]).get("ratio", None)
        return correct_answer_ratio < 50

    def get_incorrect(self, analysis_item):
        return self._format_result(analysis_item["incorrect"])

    def get_correct(self, analysis_item):
        return self._format_result(analysis_item["correct"])

    def get_partial(self, analysis_item):
        return self._format_result(analysis_item["partial"])

    def get_unanswered(self, analysis_item):
        return self._format_result(analysis_item["unanswered"])

    def get_most_common(self, analysis_item):
        data = []

        total_count = self.context.get("total_count", 0)
        most_common_answers, setting = analysis_item.get("most_common_answers", []), analysis_item.get("setting", [])
        marks, result_items = analysis_item.get("marks", []), analysis_item.get("result_items_for_most_common_answers",
                                                                                None)

        for answer in most_common_answers:
            result_item = result_items[answer['id']] if answer['id'] in result_items else None
            body, count = answer.get("body", {}), answer.get("count", 0)
            max_marks = AssessmentHelper.get_max_marks(result_item.assessment_item.answer.all()) if result_item else {}

            most_common_item = {
                "count": count,
                "marks": self.get_marks(marks, max_marks, result_item),
                "ratio": int(Decimal(str(count / total_count * 100)).quantize(0, ROUND_HALF_UP)),
                "student_answer": self._get_student_answer(body, "significant_figure" in setting),
            }
            data.append(most_common_item)

        return data

    def get_marks(self, marks, max_marks, result_item):
        if not result_item:
            return {}
        if result_item.correct_answer:
            marks = result_item.correct_answer.mark.all()
        return self._get_marks(marks.values_list('kind', flat=True), max_marks, result_item)
