from os.path import exists
from uuid import uuid4

from api.core.utils.s3_service import S3Service

from .base_generation_service import BaseGenerationService
from .generic_document_builder import GenericDocumentBuilder
from .pdf_cloner import PDFCloner


class GenericPreviewService(BaseGenerationService):
    @classmethod
    def _generate_preview(
        cls, data, fullness, students, answer_sheet_id,
        class_id, class_name, pdf_template, sheet_path, questions_hash,
    ):
        template_path, coordinates = GenericDocumentBuilder.preview_document(data, answer_sheet_id, fullness)
        cls._save_coordinates(questions_hash, coordinates)

        cls._xelatex_generate_pdf(template_path)
        cls._xelatex_generate_pdf(template_path)

        pdf_path = cls._get_pdf_path(template_path)
        cls._copy_file(pdf_path, pdf_template)

        temp_sheet_path, _ = PDFCloner.create_generic_clone(
            pdf_path, fullness, students, 'pv', data['number_of_answers'], data['number_of_letters'],
            data['sheets_per_page'], class_id, class_name
        )

        cls._copy_file(temp_sheet_path, sheet_path)
        return sheet_path, questions_hash

    @classmethod
    def _generate_pdf(cls, data, fullness, answer_sheet_id, class_id, class_name):
        students = cls._get_preview_students_list(data, fullness)
        sheet_path = cls._get_preview_sheet_path(answer_sheet_id)

        questions_hash, pdf_template, template_exists = cls._get_existing_pdf_template_path(
            data['number_of_answers'], fullness, data['number_of_letters']
        )

        if template_exists:
            temp_sheet_path, _ = PDFCloner.create_generic_clone(
                pdf_template, fullness, students, 'pv', data['number_of_answers'], data['number_of_letters'],
                data['sheets_per_page'], class_id, class_name
            )
            cls._copy_file(temp_sheet_path, sheet_path)
            return sheet_path, questions_hash

        return cls._generate_preview(
            data, fullness, students, answer_sheet_id, class_id,
            class_name, pdf_template, sheet_path, questions_hash,
        )

    @classmethod
    def preview(cls, data):
        try:
            answer_sheet_id = uuid4().hex
            klass = data['class_name']

            if isinstance(klass, dict):
                class_id = klass['id']
                class_name = klass['name']
            else:
                class_id = 0
                class_name = ''

            fullness = 2 if data['answer_sheet_for_blank'] else 0
            sheet_path, questions_hash = cls._generate_pdf(
                data, fullness, answer_sheet_id, class_id, class_name
            )

            sheet_key = cls._get_aws_sheet_key(answer_sheet_id, number_of_answers=data['number_of_answers'], is_preview=True)
            if exists(sheet_path):
                S3Service.upload_file(sheet_path, sheet_key)
            return sheet_key, questions_hash, True
        except Exception as ex:
            cls._print_exception(cls.GENERIC, cls.PREVIEW, ex)
            return None, '', False
