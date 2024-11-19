from assessments.models import AnswerSheet
from users.models import Student

from django.db.models import Q, Value as V
from django.db.models.functions import Concat
from django.contrib.postgres.aggregates import ArrayAgg
from django.conf import settings


class AnswerSheetHelper:
    @staticmethod
    def get_answer_kind(item):
        kind = item.get("kind", "numeric")
        setting = item.get("setting", [])

        if kind not in ["numeric", "mf"]:
            return kind

        if "unit" in setting:
            return "non-decimal-with-unit" if kind == "numeric" else "mf-with-unit"
        return "non-decimal" if kind == "numeric" else "mf"

    @staticmethod
    def get_generic_answer_sheet_kind(class_name):
        return AnswerSheet.GENERIC if not class_name else AnswerSheet.GENERIC_GROUP

    @staticmethod
    def _get_width_answer(body, scientific_notation, setting):
        width = body.get('width', 0)

        if scientific_notation and 'scientific_notation' in setting:
            width = width + 3 + len(str(scientific_notation))

        if 'unit' in setting:
            width += 6

        return width

    @classmethod
    def get_answer_params(cls, answers, kind, setting):
        widths, heights = [], []

        for answer in answers:
            body = answer.get('body', {})
            height = body.get('height', 1)

            if kind == 'fib':
                value = body.get('value', '')
                widths.append(len(value))
            else:
                scientific_notation = answer.get('scientific_notation', 0)
                widths.append(cls._get_width_answer(body, scientific_notation, setting))

            heights.append(height)
        return widths, heights

    @classmethod
    def get_students_for_generic(cls, group_ids, is_preview, sheets_per_page):
        if not group_ids:
            return None if is_preview else []

        students = cls._get_students_for_groups(group_ids)
        if is_preview:
            return list(students.annotate(name=Concat("user__first_name", V(" "), "user__last_name")) \
                                .values("id", "name")[:sheets_per_page])

        students = students \
            .annotate(
                class_ids=ArrayAgg('group'), name=Concat("user__first_name", V(" "), "user__last_name")
        ).values("id", "name", "class_ids")

        return list(students)

    @classmethod
    def get_students(cls, group_id, is_preview):
        students = cls._get_students_for_groups([group_id])
        students = students \
            .annotate(name=Concat("user__first_name", V(" "), "user__last_name")) \
            .values("id", "name")
        return students.first() if is_preview else list(students)

    @staticmethod
    def _get_students_for_groups(group_ids):
        return Student.objects.filter(group__id__in=group_ids) \
            .exclude(Q(user__first_name=None) & Q(user__last_name=None)) \
            .order_by("user__last_name")

    @staticmethod
    def format_url(url):
        return settings.SWIFTGRADE_CV_URL + url if url else url
