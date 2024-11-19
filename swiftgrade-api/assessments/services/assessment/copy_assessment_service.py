from assessments.helpers import AssessmentHelper
from assessments.models import Assessment, AssessmentItem, Answer, AnswerMark

from .assessment_service import AssessmentService


class CopyAssessmentService(AssessmentService):
    def call(self, data, assessment=None):
        if not assessment:
            assessment = Assessment.manager.get(id=data['assessment_id'])

        status = AssessmentHelper.get_assessment_status(assessment.kind, data['type'])
        copied_assessment_data = {
            'group_id': data['group_id'],
            'kind': assessment.kind,
            'name': data['name'],
            'status': status,
            'type': data['type']
        }

        copied_assessment = self._create('assessment', copied_assessment_data)
        copied_assessment_items, answers = self._copy_assessment_items(assessment.id, copied_assessment)
        copied_answers, marks = self._copy_answers(copied_assessment_items, answers)
        self._copy_answer_marks(copied_answers, marks)

        return copied_assessment

    def _copy_assessment_items(self, prev_assessment_id, target_assessment):
        prev_assessment_items = self._filter('item', {'assessment_id': prev_assessment_id}) \
            .order_by('created_at').values()

        answers, target_assessment_items = [], []
        for item in prev_assessment_items:
            item_answers = self._filter('answer', {'assessment_item__id': item.get('id')}).values()
            item.pop('id')
            item.pop('assessment_id')
            answers.append(item_answers)

            assessment_item = AssessmentItem(assessment=target_assessment, **item)
            target_assessment_items.append(assessment_item)

        target_assessment_items = self._bulk_create('item', target_assessment_items)
        return target_assessment_items, answers

    def _copy_answers(self, copied_assessment_items, prev_answers):
        target_answers, marks = [], []

        for item, prev_answers in zip(copied_assessment_items, prev_answers):
            for answer in prev_answers:
                answer_marks = self._filter('mark', {'answer__id': answer.get('id')}).values()
                marks.append(answer_marks)

                answer.pop('id')
                answer.pop('assessment_item_id')

                copied_answer = Answer(assessment_item=item, **answer)
                target_answers.append(copied_answer)

        target_answers = self._bulk_create('answer', target_answers)
        return target_answers, marks

    def _copy_answer_marks(self, copied_answers, marks):
        target_marks = []
        for answer, prev_marks in zip(copied_answers, marks):
            for mark in prev_marks:
                mark.pop('id')
                mark.pop('answer_id')

                target_mark = AnswerMark(answer=answer, **mark)
                target_marks.append(target_mark)

        copied_marks = self._bulk_create('mark', target_marks)
        return copied_marks
