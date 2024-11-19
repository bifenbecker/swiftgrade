from django.conf import settings

from coordinates_app.models import Coordinates

from .hashing_service import HashingService
from .service_constants import ANSWER_SHEET_PDF_TEMPLATES_DIR, ANSWER_SHEETS_KEY_PREFIX, PNG_FORMAT

from os import path

import json
import subprocess


class BaseGenerationService:
    CUSTOM = 'Custom'
    GENERIC = 'Generic'

    GENERATION = 'generation'
    PREVIEW = 'preview'

    @classmethod
    def _get_public_path(cls, path):
        return path[path.find('public/'):]

    @classmethod
    def _xelatex_generate_pdf(cls, path):
        subprocess.run([
                'xelatex',
                '-no-file-line-error',
                '-interaction', 'nonstopmode', 
                '--output-directory', settings.TEMP_DIR,
                path
            ],
            cwd='tex/',
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )

    @classmethod
    def _get_existing_pdf_template_path(cls, questions, fullness, letters=None):
        questions_hash = HashingService.calculate_hash(f'{fullness}{json.dumps(questions)}{json.dumps(letters) if letters else ""}')
        pdf_template_path = f'{ANSWER_SHEET_PDF_TEMPLATES_DIR}/{questions_hash}.pdf'
        template_exists = path.exists(pdf_template_path)

        return questions_hash, pdf_template_path, template_exists

    @staticmethod
    def __get_sheet_path(sheet_name, all_types=False):
        extension = '*' if all_types else 'pdf'
        return f'{settings.TEMP_DIR}/{sheet_name}.{extension}'

    @staticmethod
    def __get_generic_sheet_path(sheet_name, all_types=False):
        extension = '*' if all_types else 'pdf'
        return f'{settings.TEMP_DIR}/{sheet_name} - Multiple Choice.{extension}'
   
    @classmethod
    def _get_sheet_path(cls, answer_sheet_id, all_types=False):
        return cls.__get_sheet_path(answer_sheet_id, all_types=all_types)
    
    @classmethod
    def _get_preview_sheet_path(cls, answer_sheet_id, all_types=False):
        return cls.__get_sheet_path(f'preview-{answer_sheet_id}', all_types=all_types)

    @classmethod
    def _get_aws_sheet_key(cls, answer_sheet_id, klass_name=None, answer_sheet_kind=None, number_of_answers=100, is_preview=False):
        name = f'{klass_name} - Multiple Choice {number_of_answers} {cls._get_questions_writing(number_of_answers)}' \
            if answer_sheet_kind == 'generic' else answer_sheet_id
        return f'{ANSWER_SHEETS_KEY_PREFIX}/{"preview-" if is_preview else ""}{name}.pdf'

    @staticmethod
    def _get_assessment_aws_sheet_key(klass_name=None, assessment_name=None, is_preview=False):
        name = f'{klass_name} - {assessment_name}'
        return f'{ANSWER_SHEETS_KEY_PREFIX}/{"preview-" if is_preview else ""}{name}.pdf'

    @classmethod
    def _get_aws_generic_compatible(cls, number_of_answers, file_format):
        extension = 'png' if file_format == PNG_FORMAT else 'pdf'
        return (
            f'{ANSWER_SHEETS_KEY_PREFIX}/Multiple choice {number_of_answers} ' \
                f'{cls._get_questions_writing(number_of_answers)} - Compatible with any class.{extension}'
        )

    @classmethod
    def _get_students_list(cls, data, fullness, empty_amount=1):
        if fullness == 0:
            return data['students']
        return list({"id": 0, 'class_ids': [0]} for _ in range(0, empty_amount))

    @classmethod
    def _get_preview_students_list(cls, data, fullness):
        if fullness == 0:
            return [data['student']] if data.get('assessment') else data['student']
        return [{ 'id': 0 }]

    @classmethod
    def _get_pdf_path(cls, file_path):
        """
        Takes the path to .tex template, takes the file name
        and returns the path for new .pdf file
        :param file_path: full path to .tex template
        :return: some_name.pdf
        """
        pdf_name = path.splitext(path.basename(file_path))[0]
        return f'{settings.TEMP_DIR}/{pdf_name}.pdf'

    @classmethod
    def _save_coordinates(cls, questions_hash, coordinates):
        Coordinates.objects.update_or_create(
            coordinates_id=questions_hash,
            defaults={'data': coordinates},
        )

    @classmethod
    def _copy_file(cls, origin, dest):
        subprocess.call(f'cp {origin} {dest}', cwd='/tmp', shell=True)

    @classmethod
    def _print_exception(cls, sheet_type, operation_type, ex):
        print(f'\n{sheet_type} sheet {operation_type} error:\n{ex}\n')
    
    @staticmethod
    def _get_questions_writing(number_of_answers):
        return 'question' if number_of_answers == 1 else 'questions'
