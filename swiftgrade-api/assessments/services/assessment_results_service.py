from assessments.services.base_assessment_service import BaseAssessmentService

from assessments.helpers import ResultHelper
from assessments.models import Assessment, AssessmentResult, AssessmentResultItem, AssessmentItem, AnswerSheetScan, AnswerSheetScanItem

from django.db.models import Case, F, Q, Prefetch, Sum, Value, When, Prefetch
from django.db.models.functions import NullIf, Trim

import base64, requests

def change_username_with_email(key):
    return 'email' if key == 'username' else key

RESULT_FIELD = lambda key : Case(
    When(answer_sheet_scan__named=True, then=F(f'answer_sheet_scan__student__user__{key}')),
    When(answer_sheet_scan__named=False, then=F(f'recognized_person__{change_username_with_email(key)}'))
)

RESULT_ITEM_FIELD = lambda key : Case(
    When(
        assessment_result__answer_sheet_scan__named=True,
        then=F(f'assessment_result__answer_sheet_scan__student__user__{key}')),
    When(
        assessment_result__answer_sheet_scan__named=False,
        then=F(f'assessment_result__recognized_person__{key}'))
)

STUDENT_FIELDS = {
    'online_assessment_result': {
        'email': F('completed_assessment__student__user__email'),
        'username': F('completed_assessment__student__user__username'),
        'first_name': F('completed_assessment__student__user__first_name'),
        'last_name': NullIf(Trim(F('completed_assessment__student__user__last_name')), Value('')),
    },
    'result': {
        'email': RESULT_FIELD('email'),
        'username': RESULT_FIELD('username'),
        'first_name': RESULT_FIELD('first_name'),
        'last_name': NullIf(Trim(RESULT_FIELD('last_name')), Value('')),
    },
    'online_assessment_result_item': {
        'first_name': F('assessment_result__completed_assessment__student__user__first_name'),
        'last_name': NullIf(Trim(F('assessment_result__completed_assessment__student__user__last_name')), Value('')),
        'mark': Sum('result_item_mark__value'),
    },
    'result_item': {
        'first_name': RESULT_ITEM_FIELD('first_name'),
        'last_name': NullIf(Trim(RESULT_ITEM_FIELD('last_name')), Value('')),
        'mark': Sum('result_item_mark__value'),
    }
}

class AssessmentResultsService(BaseAssessmentService):
    @classmethod
    def check_need_grading(cls, result_item):
        if result_item.assessment_item.kind in [AssessmentItem.MF, AssessmentItem.NUMERIC]:
            if result_item.need_grading and result_item.need_grading_for_units:
                result_item_marks = result_item.result_item_mark.filter(kind__in=['answer', 'unit'])
                marks_updated = {mark.kind: (mark.updated_at - mark.created_at).seconds > 0
                                 for mark in result_item_marks}
                if marks_updated.get('unit', False):
                    result_item.need_grading_for_units = False
                if marks_updated.get('answer', False):
                    result_item.need_grading = False
                result_item.save()
            elif result_item.need_grading:
                cls.update_need_grading(result_item, 'answer')
            elif result_item.need_grading_for_units:
                cls.update_need_grading(result_item, 'unit')
        cls.update_need_grading(result_item, 'answer')

    @staticmethod
    def update_need_grading(result_item, mark_kind):
        result_item_mark = result_item.result_item_mark.filter(kind=mark_kind).first()
        if (result_item_mark.updated_at - result_item_mark.created_at).seconds > 0:
            if mark_kind == 'answer':
                result_item.need_grading = False
            if mark_kind == 'unit':
                result_item.need_grading_for_units = False
            result_item.save()

    @classmethod
    def get_assessment_result(cls, result_id):
        result = AssessmentResult.manager.filter(id=result_id, status=AssessmentResult.RECOGNIZED)
        if result.first():
            result_items = AssessmentResultItem.manager.annotate(mark=Sum('result_item_mark__value'))
            result_items_ids = list(set(result_items.values_list('id', flat=True)))
            return result.annotate(**STUDENT_FIELDS['result']).first(), result_items_ids
        return result, []

    @classmethod
    def get_assessment_results(cls, assessment, filters, ordering=None):
        results_items = AssessmentResultItem.manager \
            .select_related('assessment_item', 'correct_answer') \
            .prefetch_related('result_item_mark') \
            .annotate(mark=Sum('result_item_mark__value')) \
            .filter(ResultHelper.get_result_filters(filters, assessment)) \
            .distinct().order_by('assessment_item__number')

        result_items_ids = list(set(results_items.values_list('id', flat=True)))
        result_ids = list(set(results_items.values_list('assessment_result_id', flat=True)))

        student_fields_key = 'online_assessment_result' if assessment.type == Assessment.ONLINE else 'result'
        results = AssessmentResult.manager \
            .prefetch_related(Prefetch('result_items', queryset=results_items)) \
            .select_related('answer_sheet_scan') \
            .filter(
                assessment_id=assessment.id,
                id__in=result_ids,
                result_items__id__in=result_items_ids,
                status=AssessmentResult.RECOGNIZED
            ).annotate(**STUDENT_FIELDS[student_fields_key]).distinct()
        if ordering:
            results = results.order_by(ordering, '-created_at')
        return results

    @classmethod
    def get_assessment_results_summary(cls, assessment, ordering):
        """
            Returns all assessment results ordered by created date.
        """
        student_fields_key = 'online_assessment_result' if assessment.type == Assessment.ONLINE else 'result'
        statuses = [AssessmentResult.PROCESSING, AssessmentResult.RECOGNIZED] \
            if assessment.status == Assessment.CROPPING else [AssessmentResult.RECOGNIZED]
        return AssessmentResult.manager \
            .select_related('answer_sheet_scan') \
            .filter(assessment_id=assessment.id, status__in=statuses) \
            .annotate(**STUDENT_FIELDS[student_fields_key]).order_by(ordering, '-created_at') \
            .distinct()

    @classmethod
    def get_assessment_answers(cls, assessment_id, data):
        if not data['filters']:
            return [], []

        assessment = Assessment.manager.get(pk=assessment_id)
        student_fields_key = 'online_assessment_result_item' if assessment.type == Assessment.ONLINE else 'result_item'
        result_items = AssessmentResultItem.manager \
            .filter(assessment_result__status=AssessmentResult.RECOGNIZED) \
            .annotate(**STUDENT_FIELDS[student_fields_key]) \
            .filter(Q(assessment_result__assessment_id=assessment_id),
                    ~Q(assessment_item__answer__body__value=[]),
                    ResultHelper.get_result_filters(data['filters'], assessment))

        answers = result_items.annotate(number=F('assessment_item__number')) \
            .values('assessment_item', 'number') \
            .distinct() \
            .order_by('number')

        current_or_next_answer = answers.filter(Q(number__gte=data['number']))
        answer = current_or_next_answer.first() \
            if current_or_next_answer.exists() \
            else answers.filter(Q(number__lt=data['number'])).first()
        if answer:
            return result_items.filter(assessment_item_id=answer['assessment_item'])\
                    .order_by(data['ordering'], '-created_at'), answers.values_list('number', flat=True)

        assessment = cls._filter('assessment', {'id': assessment_id}).first()
        return [], list(range(1, assessment.assessment_items.count()+1))

    @classmethod
    def get_assessment_total_mark(cls, assessment):
        items_ids = cls._filter('item', {'assessment_id': assessment.id}) \
            .exclude(answer__body__value=[]) \
            .values_list('id', flat=True)
        answer_ids = cls._filter('answer', {'assessment_item_id__in': items_ids}).values_list('id', flat=True)

        data = cls._filter('mark', {'answer_id__in': answer_ids}).values('answer') \
            .annotate(mark=Sum('value'), assessment_item_id=F('answer__assessment_item'))

        results = {}
        for item in data:
            if item['assessment_item_id'] in results:
                current_mark = results[item['assessment_item_id']]

                if current_mark < item['mark']:
                    results[item['assessment_item_id']] = item['mark']
            else:
                results[item['assessment_item_id']] = item['mark']
        return sum(results.values())

    @staticmethod
    def get_assessment_results_items(result_id):
        return AssessmentResultItem.manager.filter(assessment_result_id=result_id) \
            .select_related('assessment_item', 'correct_answer') \
            .prefetch_related('result_item_mark') \
            .annotate(mark=Sum('result_item_mark__value')) \
            .order_by('assessment_item__number')

    @staticmethod
    def get_assessment_result_item_scans(assessment_result):
        """
            Returns scans urls of result item ordered by page.
        """
        answer_sheet_scan = AnswerSheetScan.objects.get(assessment_result=assessment_result)
        answer_sheet_scan_items = AnswerSheetScanItem.objects.filter(answer_sheet_scan=answer_sheet_scan).order_by('page')

        data = []
        for scan in answer_sheet_scan_items:
            url = scan.image.url
            data.append({"original": url})

        return data

    @staticmethod
    def get_assessment_result_item_scan_for_download(assessment_result, page=None):
        """
            Returns full scan(s) of result item in base64.
        """
        answer_sheet_scan = AnswerSheetScan.objects.get(assessment_result=assessment_result)

        if not page:
            answer_sheet_scan_items = AnswerSheetScanItem.objects.filter(answer_sheet_scan=answer_sheet_scan).order_by('page')
            data = []
            for scan in answer_sheet_scan_items:
                url = scan.image.url
                data.append(base64.b64encode(requests.get(url).content))
            return {"data": data}  
        else:
            answer_sheet_scan_item = AnswerSheetScanItem.objects.get(answer_sheet_scan=answer_sheet_scan, page=page)
            return {"data": base64.b64encode(requests.get(answer_sheet_scan_item.image.url).content)}  

    @staticmethod
    def update_recognized_person(person, data):
        for attr, value in data.items():
            setattr(person, attr, value)
        person.save()
        return person
