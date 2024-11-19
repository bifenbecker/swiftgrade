from assessments.helpers import AssessmentHelper
from assessments.models.assessment import Assessment
from .assessment_service import AssessmentService

from users.constants import *
from users.models import Checklist
from users.services.user_checklist_service import UserChecklistService


class CreateAssessmentService(AssessmentService):
    def __init__(self, group_id):
        self.group_id = group_id

    def call(self, data):
        assessment_data = self._build_assessment_data(data)
        assessment = self._create('assessment', assessment_data)
        self._update_tutorial_progress(assessment)

        assessment_items, answers = self._create_assessment_items(assessment, data['assessment_items'])
        answers, marks = self._create_answers(assessment_items, answers)
        self._create_answer_marks(answers, marks)

        UserChecklistService.create_or_update(assessment.group.user, Checklist.ASSESSMENT_CREATED)

        return assessment

    def _build_assessment_data(self, data):
        assessment_type = data['type']
        kind = self._get_kind(data)

        assessment_data = {
            'compare_by_characters': data.get('compare_by_characters', False),
            'group_id': self.group_id,
            'kind': kind,
            'name': data['name'],
            'status': AssessmentHelper.get_assessment_status(kind, assessment_type),
            'type': assessment_type,
        }
        return assessment_data

    @staticmethod
    def _get_kind(data):
        return AssessmentHelper.get_assessment_kind(data['assessment_items'])

    @staticmethod
    def _update_tutorial_progress(assessment):
        user = assessment.group.user
        popup_key = None
        progress_key = None

        if assessment.type == Assessment.PAPER:
            if (
                assessment.kind == Assessment.GENERIC
                and not user.enabled_popups.get(POPUP_PRINT_MC_SHEETS)
                and not user.popups_progress.get(POPUP_PROGRESS_MC_SHEET_CREATED)
            ):
                if not user.enabled_tutorials.get(TUTORIAL_MC_SHEETS):
                    user.enabled_tutorials[TUTORIAL_MC_SHEETS] = True

                popup_key = POPUP_PRINT_MC_SHEETS
                progress_key = POPUP_PROGRESS_MC_SHEET_CREATED
            elif (
                assessment.kind == Assessment.CUSTOM
                and not user.enabled_popups.get(POPUP_PRINT_REGULAR_SHEETS)
                and not user.popups_progress.get(POPUP_PROGRESS_REGULAR_SHEET_CREATED)
            ):
                popup_key = POPUP_PRINT_REGULAR_SHEETS
                progress_key = POPUP_PROGRESS_REGULAR_SHEET_CREATED
        elif (
            assessment.type == Assessment.ONLINE
            and not user.enabled_popups.get(POPUP_RELEASE_ONLINE_SHEETS)
            and not user.popups_progress.get(POPUP_PROGRESS_ONLINE_SHEET_CREATED)
        ):
            popup_key = POPUP_RELEASE_ONLINE_SHEETS
            progress_key = POPUP_PROGRESS_ONLINE_SHEET_CREATED

        if popup_key:
            user.enabled_popups[popup_key] = True
            user.popups_progress[progress_key] = True
            user.save()
