import re
import string
import random

from django.db.models import Case, Count, Field, Q, Max, When, IntegerField

from assessments.models import Assessment
from assessments.services import CopyAssessmentService

from groups.constants.group import CATEGORIES, DIFFERENT
from groups.models import Group

from users.helpers import PermissionHelper
from users.models import Student

SPLIT_REGEX = '_|\{|\}|\||\\\|\\/|\[|\]|\-|\+|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\"|\№|\:|\,|\;|\=|\<|\>|\?| |\`|\~|\'|\"|\n|\.'


class GroupService:
    @classmethod
    def copy_group(cls, color, group_id, name):
        group = Group.manager.get(id=group_id)
        copied_group_data = {'color': color, 'name': name}
        copied_group = cls.copy_object(group, copied_group_data)

        assessments = Assessment.manager.filter(group_id=group_id).order_by('created_at')
        for assessment in assessments:
            data = {
                'group_id': copied_group.id,
                'kind': assessment.kind,
                'name': assessment.name,
                'type': assessment.type,
            }
            CopyAssessmentService().call(data, assessment)
        return group

    @classmethod
    def copy_object(cls, obj, data):
        obj.code = cls.get_unique_code_group()
        obj.id = None
        obj.category_img_number = cls._get_img_number_on_copy(obj)
        for attr, value in data.items():
            setattr(obj, attr, value)
        obj.save()
        Group.manager.filter(user_id=obj.user_id, category=obj.category) \
            .update(category_last_img_number=obj.category_last_img_number)
        return obj

    @classmethod
    def add_students_to_groups(cls, group_ids: list, students_ids: list) -> tuple:
        """
        Add students in groups

        Args:
            group_ids (List of ids - Group):
            students_ids (List of ids - Student):

        Returns:
            (students, groups)
        """
        students = Student.objects.filter(id__in=students_ids)
        groups = Group.objects.filter(id__in=group_ids).annotate(
                assessments_count=Count(
                    'assessments',
                    distinct=True,
                    filter=Q(assessments__is_deleted=False)
                ),
                generic_assessments_count=Count(
                    'assessments',
                    distinct=True,
                    filter=Q(assessments__kind=Assessment.GENERIC, assessments__is_deleted=False),
                ),
                students_count=Count(
                    'students',
                    distinct=True,
                    filter=~Q(students__user__first_name=None) | ~Q(students__user__last_name=None),
                ),
            )
        # Validation on empty lists in serializer
        for group in groups:
            group.students.add(*students)

        return students, groups

    @staticmethod
    def get_group_by_id(group_id):
        if group_id:
            return Group.manager.filter(id=group_id).annotate(
                assessments_count=Count(
                    'assessments',
                    distinct=True,
                    filter=Q(assessments__is_deleted=False)
                ),
                generic_assessments_count=Count(
                    'assessments',
                    distinct=True,
                    filter=Q(assessments__kind=Assessment.GENERIC, assessments__is_deleted=False),
                ),
                students_count=Count(
                    'students',
                    distinct=True,
                    filter=~Q(students__user__first_name=None) | ~Q(students__user__last_name=None),
                ),
            ).first()
        else:
            return None

    @staticmethod
    def get_groups(user):
        if PermissionHelper.is_teacher(user):
            groups = Group.manager.filter(user_id=user.id).annotate(
                assessments_count=Count(
                    'assessments',
                    distinct=True,
                    filter=Q(assessments__is_deleted=False)
                ),
                generic_assessments_count=Count(
                    'assessments',
                    distinct=True,
                    filter=Q(assessments__kind=Assessment.GENERIC, assessments__is_deleted=False),
                ),
                students_count=Count(
                    'students',
                    distinct=True,
                    filter=~Q(students__user__first_name=None) | ~Q(students__user__last_name=None),
                ),
            )
        else:
            groups = Group.manager.filter(students__id=user.student.id)
        return groups.order_by('-created_at')

    @classmethod
    def get_or_generate_code_group(cls, group_id):
        group = Group.manager.get(id=group_id)
        if not group.code:
            group.code = cls.get_unique_code_group()
            group.save()
        return {'code': group.code}

    @classmethod
    def get_unique_code_group(cls):
        groups_codes = Group.manager.values_list('code', flat=True)
        code = cls._generate_code()
        while code in groups_codes:
            code = cls._generate_code()
        return code

    @classmethod
    def set_categories_by_names(cls, groups, user_id):
        last_img_each_category = cls._get_last_img_each_category(user_id)

        for group in groups:
            last_img_each_category, category = cls._get_category_by_keyword(
                last_img_each_category,
                group['name']
            )
            group.update({
                'category': category,
                'category_img_number': last_img_each_category[category],
                'user_id': user_id
            })
        return groups

    @classmethod
    def update_group(cls, group, data):
        for attr, value in data.items():
            setattr(group, attr, value)
        group.save()
        return group

    @staticmethod
    def update_last_img_numbers(user_id, groups):
        if isinstance(groups, dict):
            Group.manager.filter(user_id=user_id, category=groups['category']) \
                .update(category_last_img_number=groups['category_img_number'])
        else:
            categories = {group['category'] for group in groups}
            for category in categories:
                category_groups = [group for group in groups if category == group['category']]
                last_img_number = category_groups[-1]['category_img_number']

                Group.manager.filter(user_id=user_id, category=category) \
                    .update(category_last_img_number=last_img_number)

        return groups

    @classmethod
    def _get_category_by_keyword(cls, data, name):
        name = re.sub(r'\d+', ' ', name)
        words = re.split(SPLIT_REGEX, name)
        words = list(map(lambda x: x.lower(), words))
        find_keywords, indexes, img_number = {}, [], None

        for category, item in CATEGORIES.items():
            for keyword in item['data']:
                if keyword in words:
                    find_keywords[keyword] = category

        for keyword, category in find_keywords.items():
            indexes.append(words.index(keyword))

        category = find_keywords[words[min(indexes)]] if indexes else None
        if category:
            data[category] = cls._get_img_number(category, CATEGORIES[category]['count'], data)

        if not category and not img_number:
            category, data[category] = DIFFERENT, cls._get_img_number(DIFFERENT, CATEGORIES[DIFFERENT]['count'], data)

        return data, category

    @staticmethod
    def _get_coincidences_by_keyword(item, name):
        coincidences = []

        for i in item['data']:
            coincidence = re.search(i, name.lower())

            if coincidence and coincidence.group() == i:
                coincidences.append(coincidence)
            else:
                coincidences.append(None)

        return not all(i is None for i in coincidences)

    @classmethod
    def _get_last_img_each_category(cls, user_id):
        groups = Group.manager.filter(user_id=user_id).values('category') \
            .annotate(amount=Count('category')) \
            .annotate(category_last_img_number=Max('category_last_img_number'))
        groups = cls._validate_last_img_numbers(groups)
        data = {}

        for group in list(groups):
            data[group['category']] = group['category_last_img_number']

        return data

    @staticmethod
    def _get_img_number(category, count, data):
        return (data[category] + 1) % count if count != 0 and category in data else 0

    @staticmethod
    def _get_img_number_on_copy(obj):
        count = CATEGORIES[obj.category]['count']

        if obj.category_last_img_number is None:
            obj.category_last_img_number = obj.category_img_number + 1
        else:
            obj.category_last_img_number += 1

        if obj.category_last_img_number >= count:
            obj.category_last_img_number %= count

        return obj.category_last_img_number

    @staticmethod
    def _generate_code():
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

    @staticmethod
    def _validate_last_img_numbers(groups):
        for group in list(groups):
            count = CATEGORIES[group['category']]['count']

            if group['category_last_img_number'] is None:
                group['category_last_img_number'] = group['amount'] - 1
            if group['category_last_img_number'] >= count:
                group['category_last_img_number'] %= count

        return groups

    @staticmethod
    def _update_amount_each_category(category, data):
        count = data.get(category, 0)
        data[category] = count + 1
        return data
