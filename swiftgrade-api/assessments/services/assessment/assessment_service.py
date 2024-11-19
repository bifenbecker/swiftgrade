import re

from assessments.helpers import AssessmentHelper
from assessments.models import Assessment, AssessmentFile, AssessmentItem, Answer, AnswerMark, CompletedAssessment, \
    AssessmentSettings, AnswerSheetScan
from assessments.services.base_assessment_service import BaseAssessmentService

from django.db.models import Count, F, Q
from operator import itemgetter

NAME_REGEX = r'^assessment \d+$'


class AssessmentService(BaseAssessmentService):
    @classmethod
    def get_assessments(cls, group_id):
        return Assessment.manager.filter(group__id=group_id).order_by('-created_at')

    @classmethod
    def get_assessment_files(cls, assessment_id, completed_assessment_id):
        assessment = Assessment.manager.filter(id=assessment_id).first()
        if assessment and hasattr(assessment, 'settings'):
            completed_assessment = CompletedAssessment.manager.get(id=completed_assessment_id) \
                if completed_assessment_id else None
            settings = completed_assessment.settings \
                if completed_assessment else cls.get_assessment_settings(assessment_id)
            return AssessmentFile.objects.filter(assessment_setting_id=settings.id).all() if settings else []
        return []

    @staticmethod
    def get_assessment_settings(assessment_id):
        return AssessmentSettings.manager.filter(assessment_id=assessment_id, is_released=True).last()

    @classmethod
    def get_assigned_assessments(cls, group_id, user):
        unnecessary_assessment_ids = CompletedAssessment.manager \
            .filter(assessment__group_id=group_id, student=user.student,
                    result__isnull=False, settings__is_released=True).values_list('assessment_id', flat=True)
        return Assessment.manager \
            .filter(group__id=group_id, status=Assessment.ASSIGNED, settings__is_released=True) \
            .exclude(id__in=unnecessary_assessment_ids)

    @classmethod
    def get_completed_assessments(cls, group_id, user, ids=False):
        assessments = Assessment.manager.filter(
            Q(group_id=group_id) &
            (Q(completedassessment__student=user.student) & Q(completedassessment__result__isnull=False))
        )

        if ids:
            return assessments.values_list('id', flat=True)

        return assessments.annotate(date_completed=F('completedassessment__updated_at'),
                                    completed_assessment_id=F('completedassessment')).order_by(
            '-date_completed')

    @classmethod
    def get_assessment_items(cls, assessment):
        assessment_items = cls._filter('item', {'assessment_id': assessment.id}).order_by('created_at').values()
        assessment_items_ids = cls._get_ids(assessment_items)

        answers = cls._filter('answer', {'assessment_item_id__in': assessment_items_ids}).values()
        answers_ids = cls._get_ids(answers)

        marks = cls._filter('mark', {'answer_id__in': answers_ids}).values()

        for item in assessment_items:
            answers_for_item = cls._filter_data_by_id('assessment_item_id', item['id'], answers)
            answers_for_item = sorted(answers_for_item, key=itemgetter('number'))

            for answer in answers_for_item:
                marks_for_answer = cls._filter_data_by_id('answer_id', answer['id'], marks)
                ordered_marks_for_answer = AssessmentHelper.change_marks_order(marks_for_answer)
                answer.update({'marks': ordered_marks_for_answer})

            item.update({'answers': answers_for_item, 'multiple_answer': len(answers_for_item) > 1})
        return assessment_items

    @classmethod
    def get_assessment_items_for_student(cls, assessment):
        assessment_items = cls._filter('item', {'assessment_id': assessment.id}).order_by('number')
        return assessment_items.values('id', 'assessment_id', 'kind', 'number', 'setting')

    @classmethod
    def get_assessment_name(cls, group_id):
        assessments = cls._filter('assessment', {'group_id': group_id}).values('name')
        assessments_names = list(filter(lambda i: re.match(NAME_REGEX, i['name'].lower()), assessments))

        numbers = []

        for item in assessments_names:
            num = [int(s) for s in item['name'].split() if s.isdigit()][0]
            numbers.append(num)

        return 'Assessment {}'.format(max(numbers) + 1 if numbers else 1)

    @classmethod
    def get_initial_student_answers(cls, assessment, user):
        completed_assessment = CompletedAssessment.manager.filter(assessment_id=assessment.id,
                                                                  result_id__isnull=True,
                                                                  settings__is_released=True,
                                                                  student_id=user.student.id,
                                                                  student_answers__isnull=False)
        if not completed_assessment.exists():
            assessment_items = cls.get_assessment_items_for_student(assessment)
            student_answers = []

            for item in assessment_items:
                kind = item.get('kind', None)
                student_answers.append({
                    'assessment_id': item.get('assessment_id', None),
                    'body': cls.set_assessment_item_for_student_body(kind),
                    'is_flag_checked': False,
                    'kind': kind
                })
            return student_answers
        return completed_assessment.last().student_answers

    @classmethod
    def check_assessments_statuses(cls, group_id):
        assessments = Assessment.manager.annotate(results=Count('assessment_results')) \
            .filter(group_id=group_id, results=0, status=Assessment.SCANNED)
        AssessmentHelper.check_batch_existence(assessments)

        assessments.filter(kind=Assessment.CUSTOM).update(status=Assessment.READY_FOR_GENERATION)
        assessments.filter(kind=Assessment.GENERIC).update(status=Assessment.READY_FOR_SCAN)

    @classmethod
    def set_assessment_item_for_student_body(cls, kind):
        if kind in ['mf', 'numeric']:
            return {'answer': '', 'unit': ''}
        return {'answer': []} if kind == 'mc' else {'answer': ''}

    @classmethod
    def update_release_results_type_for_students(cls, assessment, kind, result_ids):
        if assessment.type in [Assessment.ONLINE, Assessment.PAPER]:
            CompletedAssessment.manager \
                .filter(assessment=assessment, result_id__in=result_ids) \
                .update(release_results_type=kind)

    @classmethod
    def _create_assessment_items(cls, assessment, data):
        assessment_items, answers = [], []
        empty_assessment_items, empty_answers = [], []

        for item in data:
            answers_data = item.pop('answers', [])

            item.update({'max_mark': AssessmentHelper.get_max_mark(answers_data)})
            assessment_item = AssessmentItem(assessment=assessment, **item)
            if assessment.kind == Assessment.GENERIC:
                if not answers_data[0].get('body').get('value'):
                    empty_assessment_items.append(assessment_item)
                    empty_answers.append(answers_data)
                else:
                    assessment_items.extend(empty_assessment_items)  # add previous items with blank values
                    answers.extend(empty_answers)

                    assessment_items.append(assessment_item)  # add current item
                    answers.append(answers_data)

                    empty_assessment_items = []
                    empty_answers = []
            else:
                assessment_items.append(assessment_item)
                answers.append(answers_data)

        assessment_items = cls._bulk_create('item', assessment_items)
        return assessment_items, answers

    @classmethod
    def _create_answers(cls, assessment_items, data):
        answers, marks = [], []

        for assessment_item, item in zip(assessment_items, data):
            for answer in item:
                marks_data = answer.pop('marks', [])
                answer = Answer(assessment_item=assessment_item, **answer)

                answers.append(answer)
                marks.append(marks_data)

        answers = cls._bulk_create('answer', answers)
        return answers, marks

    @classmethod
    def _create_answer_marks(cls, answers, data):
        marks = []

        for answer, item in zip(answers, data):
            for mark in item:
                mark = AnswerMark(answer=answer, **mark)
                marks.append(mark)

        marks = cls._bulk_create('mark', marks)
        return marks
