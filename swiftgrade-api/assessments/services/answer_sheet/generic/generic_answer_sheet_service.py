from uuid import uuid4

from groups.models import Group

from assessments.constants import DEFAULT_NUMBER_OF_ANSWERS, DEFAULT_NUMBER_OF_LETTERS
from assessments.models import AnswerSheet, AnswerSheetZip
from assessments.helpers import AnswerSheetHelper

from assessments.services.assessment_cv_service import AssessmentCVService
from assessments.services.base_assessment_service import BaseAssessmentService

from ..answer_sheet_file_service import AnswerSheetFileService


class GenericAnswerSheetService(BaseAssessmentService):
    @classmethod
    def get_result_answer_sheet(cls, data):
        results, uuid = data.get("results", []), data.get("uuid", "")
        data_by_ids, groups_names = {}, cls._get_groups_names(results)
        for item in results:
            if item["success"]:
                class_id, url = item.get("class_id", None), item.get("url", None)
                number_of_answers = item.get("number_of_answers", DEFAULT_NUMBER_OF_ANSWERS)
                data_by_ids[item["answer_sheet_id"]] = {
                    "coordinate_id": item.get('coordinates_id', None),
                    "name": f"{groups_names.get(class_id, None)} - Multiple choice {number_of_answers} " \
                        f"{'question' if number_of_answers == 1 else 'questions'}.pdf",
                    "url": url,
                }

        if len(data_by_ids) == 1:
            item = list(data_by_ids.values())[0]
            document = item["url"]
        else:
            document = AnswerSheetFileService.generate_zip_file("Generic.zip", data_by_ids)

        cls._update_answer_sheet_zip(document, uuid)
        cls._update_answer_sheets(data_by_ids)

    @classmethod
    def generate_answer_sheet(cls, class_names, file_format, number_of_answers, number_of_letters, sheets_per_page ,user):
        uuid = uuid4().__str__()

        kind = AnswerSheetHelper.get_generic_answer_sheet_kind(class_names)
        answer_sheet_data, answer_sheets = cls._get_data_for_generate_generic_answer_sheet(
            class_names, file_format, number_of_answers, number_of_letters, sheets_per_page)
        answer_sheet_data.update({"uuid": uuid})

        cls._create("zip", {"kind": AnswerSheetZip.GENERIC, "uuid": uuid, "user": user})

        response_data, status_code = AssessmentCVService.generate_generic_answer_sheet(answer_sheet_data)
        results = response_data.get('results', [])

        if kind == AnswerSheet.GENERIC and results and results[0]['success']:
            coordinate_id, url = results[0].get('coordinates_id', None), results[0].get("url", None)
            cls._update(
                answer_sheets[0],
                {"document_file": url, "unnamed_coordinate_id": coordinate_id}
            )
            cls._update_answer_sheet_zip(url, uuid)
        return {"uuid": uuid}

    @classmethod
    def preview_answer_sheet(cls, class_name, number_of_answers, number_of_letters, sheets_per_page):
        data = {
            "answer_sheet_for_blank": True,
            "class_name": None,
            "number_of_answers": number_of_answers,
            "number_of_letters": number_of_letters,
            "sheets_per_page": sheets_per_page,
            "student": None
        }
        if class_name:
            data.update({
                "answer_sheet_for_blank": False,
                "class_name": class_name,
                "student": AnswerSheetHelper.get_students_for_generic([class_name["id"]], True, sheets_per_page)
            })
        response_data, status_code = AssessmentCVService.preview_generic_answer_sheet(data)
        url = response_data.get("url", None)

        return {"document_preview_url": AnswerSheetFileService._get_file_url_from_s3(url)}

    @classmethod
    def _get_data_for_generate_generic_answer_sheet(cls, class_names, file_format, number_of_answers, number_of_letters, sheets_per_page):
        data = {
            "answer_sheet_id_for_blank": None,
            "class_names": [],
            "file_format": file_format,
            "number_of_answers": number_of_answers,
            "number_of_letters": number_of_letters,
            "sheets_per_page": sheets_per_page,
            "students": [],
        }
        if class_names:
            answer_sheets_data = [AnswerSheet(**{"kind": AnswerSheet.GENERIC_GROUP}) for _ in range(len(class_names))]
            answer_sheets = cls._bulk_create("answer_sheet", answer_sheets_data)

            class_names_ids = []
            for class_name, answer_sheet in zip(class_names, answer_sheets):
                class_name.update({"answer_sheet_id": answer_sheet.id})
                class_names_ids.append(class_name["id"])

            data.update({
                "class_names": class_names,
                "students": AnswerSheetHelper.get_students_for_generic(class_names_ids, False, sheets_per_page)
            })
            return data, answer_sheets
        else:
            answer_sheet = AnswerSheet.objects.create(kind=AnswerSheet.GENERIC)
            data.update({"answer_sheet_id_for_blank": answer_sheet.id})
            return data, [answer_sheet]

    @classmethod
    def _update_answer_sheet_zip(cls, document, uuid):
        answer_sheet_zip = cls._filter(
            "zip", {"is_download": False, "kind": AnswerSheetZip.GENERIC, "uuid": uuid}
        ).first()
        if answer_sheet_zip:
            cls._update(answer_sheet_zip, {"document": document})

    @classmethod
    def _update_answer_sheets(cls, data_by_ids):
        answer_sheets = cls._filter("answer_sheet", {"id__in": data_by_ids.keys()}).all()
        for answer_sheet in answer_sheets:
            coordinate_id, url = \
                data_by_ids[answer_sheet.id]["coordinate_id"], data_by_ids[answer_sheet.id]["url"]
            answer_sheet.document_file = url
            if answer_sheet.kind == AnswerSheet.GENERIC:
                answer_sheet.unnamed_coordinate_id = coordinate_id
            elif answer_sheet.kind == AnswerSheet.GENERIC_GROUP:
                answer_sheet.coordinate_id = coordinate_id
        AnswerSheet.objects.bulk_update(
            answer_sheets, ["document_file", "coordinate_id", "unnamed_coordinate_id"])
        return answer_sheets

    @staticmethod
    def _get_groups_names(data):
        groups_ids = [i.get('class_id', None) for i in data if i.get('class_id', None) is not None]
        return {group.id: group.name for group in Group.manager.filter(id__in=groups_ids).all()}
