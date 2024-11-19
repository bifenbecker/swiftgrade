import os
import glob

from django.conf import settings
from PyPDF2 import PdfFileMerger

import requests

from api.core.utils.common_utils import bulid_template
from api.core.utils.s3_service import S3Service
from swiftgrade_cv import celery_app

from .base_generation_service import BaseGenerationService
from .latex_document_builder import LatexDocumentBuilder
from .pdf_cloner import PDFCloner


@celery_app.task
def generate_process(data):
    GenerationService.generate(data)


class GenerationService(BaseGenerationService):
    """
        This service provide function for generation SDAPS projects:
        one for pre-filled answer sheets
        another one for blank answer sheets where student should enter their FN LN Email
    """

    @classmethod
    def _clear_existing(cls, answer_sheet_id):
        for filename in glob.glob(cls._get_sheet_path(answer_sheet_id, all_types=True)):
            os.remove(filename)

    @classmethod
    def _generate_sheet(
        cls, data, fullness, students, answer_sheet_id,
        assessment_name, class_name, pdf_template, questions_hash,
    ):
        """Generates pdf template for custom answer sheet
        :param data: params with questions of answer sheet
        :param fullness: 0 - if want to generate answer sheet for existing students, 2 - with FN, LN, Email fields
        :return: path to generated answer sheet PDF and amount of pages per student
        """

        answer_sheet_id = data["assessment"]["answer_sheet_id"]
        data["assessment"]["answer_sheet_id"] = f'{fullness}{answer_sheet_id}'
        template_path, coordinates = LatexDocumentBuilder.generate_document(data, fullness)
        cls._save_coordinates(questions_hash, coordinates)

        cls._xelatex_generate_pdf(template_path)
        cls._xelatex_generate_pdf(template_path)

        pdf_path = cls._get_pdf_path(template_path)
        cls._copy_file(pdf_path, pdf_template)

        data["assessment"]["answer_sheet_id"] = answer_sheet_id

        return PDFCloner.create_custom_clone(
            pdf_path, fullness, students, answer_sheet_id, assessment_name, class_name
        ), questions_hash

    @classmethod
    def _generate_pdf(cls, data, fullness, answer_sheet_id):
        """Looks for an existing template based on the fullness and questions,
        if template exists - it passed to the cloning service, otherwise
        template generation is launched
        :param data:
        :param fullness:
        :return: path to pdf and amount of pages per student
        """

        students = cls._get_students_list(data, fullness, data['amount_of_empty'])
        assessment_name = data['assessment']['name']
        class_name = data['class_name']

        questions_hash, pdf_template, template_exists = cls._get_existing_pdf_template_path(
            data['questions'], fullness
        )

        if template_exists:
            return PDFCloner.create_custom_clone(
                pdf_template, fullness, students,
                answer_sheet_id, assessment_name, class_name
            ), questions_hash

        return cls._generate_sheet(
            data, fullness, students, answer_sheet_id, assessment_name,
            class_name, pdf_template, questions_hash,
        )

    @classmethod
    def _get_generation_hook_url(cls, data):
        url = f'{settings.WEBHOOK_HOST_URL}{settings.GENERATION_HOOK}'
        return bulid_template(
            url,
            {
                "<answer_sheet_id>": str(data["assessment"]["answer_sheet_id"]),
                "<assessment_id>": str(data["assessment"]["id"])
            },
        )

    @classmethod
    def _handle_error(cls, data):
        hook_url = cls._get_generation_hook_url(data)
        body = {
            'url': '',
            'success': False,
            'named_coordinates_id': '',
            'unnamed_coordinates_id': '',
            'named_page_count': 0,
            'unnamed_page_count': 0,
        }

        requests.post(hook_url, body)

    @classmethod
    def generate(cls, data):
        """Generate to SDAPS projects, concatenate its' PDFs to one,
        build webhook body and send it to backend
        :param data:
        :return: webhook to backend server generation results with format bellow
        """

        answer_sheet_id = data["assessment"]["answer_sheet_id"]
        hook_url = cls._get_generation_hook_url(data)
        klass_name = data["class_name"]
        assessment_name = data["assessment"].get("name")

        try:
            cls._clear_existing(answer_sheet_id)
            sheet_path = cls._get_sheet_path(answer_sheet_id)
            merger = PdfFileMerger()

            if not data['students'] and not data['amount_of_empty']:
                cls._handle_error(data)

            named_page_count = 0
            unnamed_page_count = 0
            named_questions_hash = ''
            unnamed_questions_hash = ''

            if data["students"]:
                (pdf_path, pages), named_questions_hash = cls._generate_pdf(data, 0, answer_sheet_id)
                merger.append(pdf_path)
                named_page_count = pages
            if data["amount_of_empty"]:
                (pdf_path, pages), unnamed_questions_hash = cls._generate_pdf(data, 2, answer_sheet_id)
                merger.append(pdf_path)
                unnamed_page_count = pages
            merger.write(sheet_path)
            merger.close()

            sheet_key = cls._get_assessment_aws_sheet_key(klass_name, assessment_name)
            S3Service.upload_file(sheet_path, sheet_key)

            body = {
                'url': sheet_key,
                'named_coordinates_id': named_questions_hash,
                'unnamed_coordinates_id': unnamed_questions_hash,
                'named_page_count': named_page_count,
                'unnamed_page_count': unnamed_page_count,
                'success': True,
            }

            requests.post(hook_url, body)
        except Exception as ex:
            cls._print_exception(cls.CUSTOM, cls.GENERATION, ex)
            cls._handle_error(data)
