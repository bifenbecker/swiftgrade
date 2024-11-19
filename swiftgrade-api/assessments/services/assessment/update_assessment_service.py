from assessments.helpers import AssessmentHelper, ResultHelper
from assessments.models import Assessment, AssessmentItem, Answer

from datetime import datetime

from .assessment_service import AssessmentService
from ..recalculation_assessment_results_service import RecalculationAssessmentItemsService

FIELDS_FOR_UPDATE_ASSESSMENT = {
    'item': ['kind', 'setting', 'max_mark'],
    'answer': ['body', 'scientific_notation', 'significant_figure', 'tolerance', 'tolerance_data', 'unit'],
}


class UpdateAssessmentService(AssessmentService):
    def __init__(self, assessment):
        self.assessment = assessment

    def call(self, data):
        remark_type = data.pop('remark_type', None)
        if 'assessment_items' in data:
            kind = AssessmentHelper.get_assessment_kind(data['assessment_items'])
            assessment_items = self._prepare_assessment_items_for_updating(data['assessment_items'], kind)

            self.assessment.status = AssessmentHelper.get_updated_assessment_status(
                self.assessment.kind, kind, self.assessment.status)
            self.assessment.kind = kind

            actions_for_items = AssessmentHelper.get_actions_for_updating_assessment_items(
                self.assessment.assessment_items, assessment_items)

            item_answers, updating_assessment_items_ids = \
                self._create_or_update_assessment_items(actions_for_items, data)
            updating_assessment_items_ids, deleting_sub_answers_ids = \
                self._create_or_update_assessment_answers_and_marks(item_answers, updating_assessment_items_ids)

            self.assessment.answers_updated_at = datetime.utcnow()

            self._recalculate_results(updating_assessment_items_ids, actions_for_items,
                                      deleting_sub_answers_ids, remark_type)

            data.pop('assessment_items', [])

        return self._update(self.assessment, data)

    def _create_or_update_assessment_items(self, actions_for_items, data):
        items_for_actions = AssessmentHelper.get_items_for_actions(actions_for_items, data['assessment_items'])
        
        self._create_items(items_for_actions)
        self._delete_items(actions_for_items)

        # updating
        existed_assessment_items = \
            self.assessment.assessment_items.filter(number__in=actions_for_items['updating']).order_by('number')
        assessment_items, answers = [], {}

        updating_assessment_items_ids = set()
        for item_data, item in zip(items_for_actions['updating'], existed_assessment_items):
            if self._is_settings_changed(item, item_data):
                updating_assessment_items_ids.add(item.id)

            answers_data = item_data.pop('answers', [])
            for attr, value in item_data.items():
                setattr(item, attr, value)

            item.max_mark = AssessmentHelper.get_max_mark(answers_data)
            assessment_items.append(item)
            answers[item.number] = {'answers': answers_data, 'item': item}

        self._bulk_update('item', assessment_items, FIELDS_FOR_UPDATE_ASSESSMENT['item'])
        return answers, updating_assessment_items_ids

    def _create_or_update_assessment_answers_and_marks(self, data, updating_assessment_items_ids):
        items_for_actions = {
            'creating': {'answers': [], 'marks': []},
            'updating': {'answers': [], 'marks': []}
        }
        deleting_sub_answer_ids = dict()

        for value in data.values():
            assessment_item, answers = value['item'], value['answers']
            actions_for_answers = \
                AssessmentHelper.get_actions_for_updating_assessment_items(assessment_item.answer, answers)

            # deleting
            if len(actions_for_answers['deleting']) > 0:
                updating_assessment_items_ids.add(assessment_item.id)
                deleting_sub_answer_ids[assessment_item.id] = actions_for_answers['deleting']

            for answer in answers:
                marks_data = answer.pop('marks', [])
                if answer['number'] in actions_for_answers['deleting']:
                    updating_assessment_items_ids.add(assessment_item.id)

                if answer['number'] in actions_for_answers['creating']:
                    new_answer = Answer(assessment_item=assessment_item, **answer)
                    items_for_actions['creating']['answers'].append(new_answer)
                    items_for_actions['creating']['marks'].append(marks_data)
                    updating_assessment_items_ids.add(assessment_item.id)

                if answer['number'] in actions_for_answers['updating']:
                    item = assessment_item.answer.filter(number=answer['number']).first()

                    if self._is_answer_changed(assessment_item, item, answer, marks_data):
                        updating_assessment_items_ids.add(assessment_item.id)

                    for attr, v in answer.items():
                        setattr(item, attr, v)
                    item.mark.all().delete()

                    items_for_actions['updating']['answers'].append(item)
                    items_for_actions['updating']['marks'].append(marks_data)

        answers_for_creating = self._bulk_create('answer', items_for_actions['creating']['answers'])
        self._create_answer_marks(answers_for_creating, items_for_actions['creating']['marks'])

        self._bulk_update('answer', items_for_actions['updating']['answers'], FIELDS_FOR_UPDATE_ASSESSMENT['answer'])
        self._create_answer_marks(items_for_actions['updating']['answers'], items_for_actions['updating']['marks'])
        return updating_assessment_items_ids, deleting_sub_answer_ids

    def _create_items(self, items_for_actions):
        created_assessment_items, answers = self._create_assessment_items(
            self.assessment, items_for_actions['creating'])
        answers, marks = self._create_answers(created_assessment_items, answers)
        self._create_answer_marks(answers, marks)

        if created_assessment_items:
            ResultHelper.generate_generic_assessment_result_items(self.assessment.id, created_assessment_items)

    def _delete_items(self, actions_for_items):
        deleting_assessment_items = self.assessment.assessment_items.filter(
            number__in=actions_for_items['deleting'])
        deleting_assessment_items.delete()

    def _is_answer_changed(self, assessment_item, answer, answer_data, marks_data):
        if self.assessment.status not in [Assessment.READY_FOR_ASSIGNMENT, Assessment.SCANNED]:
            return False

        body = answer_data.get('body', {})
        sn = answer_data.get('scientific_notation')
        tolerance = answer_data.get('tolerance')
        unit = answer_data.get('unit')
        kind = assessment_item.kind

        is_marks_changed = AssessmentHelper.is_marks_changed(answer, marks_data)
        is_numeric_answer_changed = kind == AssessmentItem.NUMERIC and (
            sn != answer.scientific_notation \
            or tolerance != answer.tolerance \
            or unit != answer.unit
        )
        is_mf_answer_changed = kind == AssessmentItem.MF and unit != answer.unit
        return (answer.body != body 
                or (is_numeric_answer_changed if kind == AssessmentItem.NUMERIC else is_mf_answer_changed)
                or is_marks_changed)

    def _is_settings_changed(self, assessment_item, data):
        status = self.assessment.status
        setting = set(data.get('setting', []))
        assessment_item_setting = set(assessment_item.setting)
        return (status in [Assessment.READY_FOR_ASSIGNMENT, Assessment.SCANNED]
                and (assessment_item_setting.difference(setting) or setting.difference(assessment_item_setting)))

    def _recalculate_results(self, assessment_items_ids, actions_for_items, deleting_sa_answers_ids, remark_type):
        if self.assessment.status in [Assessment.READY_FOR_ASSIGNMENT, Assessment.SCANNED] and assessment_items_ids:
            RecalculationAssessmentItemsService.call(list(assessment_items_ids), self.assessment.type,
                                                     deleting_sa_answers_ids, remark_type, self.assessment.id)
        elif actions_for_items['deleting']:
            RecalculationAssessmentItemsService.recalculate_marks(self.assessment.id)

    def _prepare_assessment_items_for_updating(self, assessment_items, kind):
        new_assessment_items = []
        if kind == Assessment.GENERIC:
            empty_assessment_items = []
            for item in assessment_items:
                answers_data = item.get('answers', [])

                if not answers_data[0].get('body').get('value'):
                    empty_assessment_items.append(item)
                else:
                    new_assessment_items.extend(empty_assessment_items)  # add previous items with blank values
                    new_assessment_items.append(item)  # add current item
                    empty_assessment_items = []
        return new_assessment_items if new_assessment_items else assessment_items
