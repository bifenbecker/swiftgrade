import glob
import os
import shutil

from django.conf import settings
from PyPDF2 import PdfFileMerger

import requests

from api.core.utils.s3_service import S3Service
from swiftgrade_cv import celery_app

from .base_generation_service import BaseGenerationService
from .generic_document_builder import GenericDocumentBuilder
from .pdf_cloner import PDFCloner
from .service_constants import PDF_FORMAT, PNG_FORMAT


@celery_app.task
def generate_process(data):
    GenericGenerationService.generate(data)


class GenericGenerationService(BaseGenerationService):
    MC_COMPATIABLE_NAME = 'Multiple choice - Compatible with any class'

    @classmethod
    def _clear_existing(cls, answer_sheet_id):
        for filename in glob.glob(cls._get_sheet_path(answer_sheet_id, all_types=True)):
            os.remove(filename)

    @classmethod
    def _generate_sheet(
        cls, data, fullness, answer_sheet_id, klass, students,
        class_id, class_name, pdf_template, questions_hash,
    ):
        """Generates pdf template for generic answer sheet
        :param data: params with questions of answer sheet
        :param fullness: 0 - if want to generate answer sheet for existing students, 2 - with FN, LN, Email fields
        :return: path to generated answer sheet PDF and amount of pages per student
        """
        template_path, coordinates = GenericDocumentBuilder.generate_document(data, fullness, klass)
        cls._save_coordinates(questions_hash, coordinates)

        cls._xelatex_generate_pdf(template_path)
        cls._xelatex_generate_pdf(template_path)

        pdf_path = cls._get_pdf_path(template_path)
        cls._copy_file(pdf_path, pdf_template)

        return PDFCloner.create_generic_clone(
            pdf_path, fullness, students, answer_sheet_id, data['number_of_answers'],
            data['number_of_letters'], data['sheets_per_page'], class_id, class_name, data['file_format'],
        ), questions_hash

    @classmethod
    def _generate_pdf(cls, data, fullness, answer_sheet_id, klass={}):
        """Looks for an existing template based on the fullness and questions,
        if template exists - it passed to the cloning service, otherwise
        template generation is launched
        :param data:
        :param fullness:
        :return: path to pdf and amount of pages per student
        """

        students = cls._get_students_list(data, fullness)
        class_id = klass.get('id', 0)
        class_name = klass.get('name', '')
        number_of_answers = data.get('number_of_answers', 100)
        number_of_letters = data.get('number_of_letters', 5)

        questions_hash, pdf_template, template_exists = cls._get_existing_pdf_template_path(
            number_of_answers, fullness, number_of_letters
        )

        if isinstance(students, list) and fullness != 2:
            students = list(filter(lambda s: class_id in s['class_ids'], students))

        if template_exists:
            return PDFCloner.create_generic_clone(
                pdf_template, fullness, students, answer_sheet_id, number_of_answers, number_of_letters,
                data['sheets_per_page'], class_id, class_name, data['file_format']
            ), questions_hash

        return cls._generate_sheet(
            data, fullness, answer_sheet_id, klass, students,
            class_id, class_name, pdf_template, questions_hash,
        )

    @classmethod
    def _write_result(cls, pdf, fullness, answer_sheet_id, klass_name, number_of_answers, file_format=PDF_FORMAT):
        as_id = answer_sheet_id if fullness == 0 else cls.MC_COMPATIABLE_NAME
        sheet_path = cls._get_sheet_path(as_id)
        answer_sheet_kind = 'generic'
        if file_format == PDF_FORMAT:
            merger = PdfFileMerger()
            merger.append(pdf)
            merger.write(sheet_path)
            merger.close()
        elif file_format == PNG_FORMAT:
            sheet_path = pdf
        if fullness == 2:
            sheet_key = cls._get_aws_generic_compatible(number_of_answers, file_format)
        else:
            sheet_key = cls._get_aws_sheet_key(answer_sheet_id, klass_name, answer_sheet_kind, number_of_answers)
        S3Service.upload_file(sheet_path, sheet_key)
        return sheet_key

    @classmethod
    def generate(cls, data):
        hook_url = f'{settings.WEBHOOK_HOST_URL}{settings.GENERIC_GENERATION_HOOK}'
        number_of_answers = data.get('number_of_answers', 100)
        results = []

        if data["class_names"]:
            for klass in data["class_names"]:
                answer_sheet_id = klass.get('answer_sheet_id', 0)
                klass_name = klass.get('name', '')
                try:
                    cls._clear_existing(answer_sheet_id)

                    if not data['students']:
                        raise Exception

                    pdf_data, questions_hash = cls._generate_pdf(data, 0, answer_sheet_id, klass)
                    pdf_path = pdf_data[0]

                    results.append({
                        'answer_sheet_id': answer_sheet_id,
                        'url': cls._write_result(pdf_path, 0, answer_sheet_id, klass_name, number_of_answers),
                        'coordinates_id': questions_hash,
                        'success': True,
                        'class_id': klass['id'],
                        'number_of_answers': number_of_answers,
                    })
                except Exception as ex:
                    cls._print_exception(cls.GENERIC, cls.GENERATION, ex)
                    results.append({
                        'answer_sheet_id': answer_sheet_id,
                        'url': None,
                        'coordinates_id': '',
                        'success': False,
                        'class_id': klass['id'],
                        'number_of_answers': number_of_answers,
                    })
                json_results = {'uuid': data['uuid'], 'results': results}
        else:
            json_results = cls.fast_generation(data)
        
        requests.post(hook_url, json=json_results)


    @classmethod
    def fast_generation(cls, data):
        answer_sheet_id = data.get('answer_sheet_id_for_blank', 0)
        klass_name = None
        try:
            cls._clear_existing(answer_sheet_id)

            pdf_data, questions_hash = cls._generate_pdf(data, 2, answer_sheet_id)
            pdf_path = pdf_data[0]

            res = {
                'uuid': data['uuid'],
                'results': [
                    {
                        'answer_sheet_id': answer_sheet_id,
                        'url': cls._write_result(pdf_path, 2, answer_sheet_id, klass_name, data['number_of_answers'], data['file_format']),
                        'coordinates_id': questions_hash,
                        'success': True,
                    }]
            }
            return res
        except Exception as ex:
            cls._print_exception(cls.GENERIC, cls.GENERATION, ex)
            res = {
                'uuid': data['uuid'],
                'results': [
                    {
                        'answer_sheet_id': answer_sheet_id,
                        'url': None,
                        'coordinates_id': '',
                        'success': False,
                    }]
            }
            return res
