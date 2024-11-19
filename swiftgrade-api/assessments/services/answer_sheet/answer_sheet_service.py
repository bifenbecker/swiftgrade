from assessments.models import AnswerSheet, AnswerSheetZip
from assessments.services import AssessmentCVService


class AnswerSheetService:
    @classmethod
    def get_answer_sheet_coordinates(cls, answer_sheet):
        if answer_sheet.kind == AnswerSheet.CUSTOM:
            return {
                'named': cls._get_coordinates(answer_sheet.coordinate_id),
                'unnamed': cls._get_coordinates(answer_sheet.unnamed_coordinate_id),
            }
        coordinate_id = cls._get_generic_coordinate_id(answer_sheet)
        return cls._get_coordinates(coordinate_id)

    @classmethod
    def get_generic_answer_sheet_archive(cls, user):
        answer_sheet = cls._get_generic_archive(user)
        if answer_sheet:
            return {
                'document_url': answer_sheet.document.url if answer_sheet.document else None,
                'is_download': answer_sheet.is_download,
                'uuid': answer_sheet.uuid,
            }
        return None

    @staticmethod
    def _get_coordinates(coordinate_id):
        response_data, status_code = AssessmentCVService.get_coordinates(coordinate_id)
        return response_data.get('data', [])

    @staticmethod
    def _get_generic_coordinate_id(answer_sheet):
        if answer_sheet.kind == AnswerSheet.GENERIC:
            return answer_sheet.unnamed_coordinate_id
        return answer_sheet.coordinate_id

    @staticmethod
    def _get_generic_archive(user):
        try:
            last_record = AnswerSheetZip.objects.filter(
                is_download=False, kind=AnswerSheetZip.GENERIC, user_id=user.id,
            ).latest('created_at')
            if last_record:
                AnswerSheetZip.objects.filter(
                    is_download=False, kind=AnswerSheetZip.GENERIC, user_id=user.id,
                ).exclude(id=last_record.id).update(is_download=True)
            return last_record
        except AnswerSheetZip.DoesNotExist:
            return None
