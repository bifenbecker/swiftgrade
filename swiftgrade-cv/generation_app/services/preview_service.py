import asyncio
import glob
import os

from api.core.utils.s3_service import S3Service

from .base_generation_service import BaseGenerationService
from .latex_document_builder import LatexDocumentBuilder
from .pdf_cloner import PDFCloner


class PreviewService(BaseGenerationService):
    @classmethod
    def _clear_existing(cls, answer_sheet_id):
        for filename in glob.glob(cls._get_preview_sheet_path(answer_sheet_id, all_types=True)):
            os.remove(filename)

    @classmethod
    def _generate_sheet(
        cls, data, fullness, students, answer_sheet_id, assessment_name,
        class_name, pdf_template, sheet_path, questions_hash,
    ):
        template_path, coordinates = LatexDocumentBuilder.preview_document(data, fullness)
        cls._save_coordinates(questions_hash, coordinates)

        cls._xelatex_generate_pdf(template_path)
        cls._xelatex_generate_pdf(template_path)

        pdf_path = cls._get_pdf_path(template_path)
        cls._copy_file(pdf_path, pdf_template)

        temp_sheet_path, _ = PDFCloner.create_custom_clone(
            pdf_path, fullness, students, answer_sheet_id, assessment_name, class_name
        )

        cls._copy_file(temp_sheet_path, sheet_path)
        return sheet_path, questions_hash

    @classmethod
    def _generate_pdf(cls, data, fullness, answer_sheet_id):
        students = cls._get_preview_students_list(data, fullness)
        assessment_name = data['assessment']['name']
        class_name = data['class_name']
        sheet_path = cls._get_preview_sheet_path(answer_sheet_id)

        questions_hash, pdf_template, template_exists = cls._get_existing_pdf_template_path(
            data['questions'], fullness
        )

        if template_exists:
            temp_sheet_path, _ = PDFCloner.create_custom_clone(
                pdf_template, fullness, students, answer_sheet_id, assessment_name, class_name
            )
            cls._copy_file(temp_sheet_path, sheet_path)
            return sheet_path, questions_hash

        return cls._generate_sheet(
            data, fullness, students, answer_sheet_id, assessment_name,
            class_name, pdf_template, sheet_path, questions_hash,
        )

    @classmethod
    def preview(cls, data):
        try:
            answer_sheet_id = data['assessment']['answer_sheet_id']
            cls._clear_existing(answer_sheet_id)
            fullness = 0 if data['student'] else 2
            sheet_path, questions_hash = cls._generate_pdf(data, fullness, answer_sheet_id)

            sheet_key = cls._get_aws_sheet_key(answer_sheet_id, is_preview=True)
            S3Service.upload_file(sheet_path, sheet_key)

            return sheet_key, questions_hash, True
        except Exception as ex:
            cls._print_exception(cls.CUSTOM, cls.PREVIEW, ex)
            return None, '', False
