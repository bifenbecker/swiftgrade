from datetime import datetime, timezone

from users.models import Checklist, User


class UserChecklistService:
    def __init__(self, user_id):
        self.user_id = user_id

    def call(self):
        """
        Based on specific user returns checklist information about dates when last class/assessment/etc. were created
        """
        user_data = self._get_user_data()
        checklist_data = self._get_checklist_data()
        return {
            **checklist_data,
            **user_data,
        }

    @classmethod
    def create_or_update(cls, user, kind):
        """
        Creates or updates checklist for a specific user
        """
        Checklist.objects.update_or_create(user=user, kind=kind, last_created_at=datetime.now(tz=timezone.utc))
        return user

    def _get_user_data(self):
        user = User.objects.get(id=self.user_id)
        return {
            'last_printed_as': user.last_printed_as,
            'last_released_as': user.last_released_as
        }

    def _get_checklist_data(self):
        checklists = Checklist.objects.filter(user__id=self.user_id)
        last_created_class = self._get_last_checklist_value(checklists, Checklist.CLASS_CREATED)
        last_created_assessment = self._get_last_checklist_value(checklists, Checklist.ASSESSMENT_CREATED)
        last_created_result = self._get_last_checklist_value(checklists, Checklist.RESULT_CREATED)

        return {
            'last_created_class': last_created_class.last_created_at if last_created_class else None,
            'last_created_assessment': last_created_assessment.last_created_at if last_created_assessment else None,
            'last_created_result': last_created_result.last_created_at if last_created_result else None,
        }

    @staticmethod
    def _get_last_checklist_value(checklists, kind):
        """
        Returns last created checklist instance for a specific kind
        """
        return checklists.filter(kind=kind).order_by('-last_created_at').first()
