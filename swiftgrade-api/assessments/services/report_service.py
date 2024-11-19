import io
import os
import subprocess
import tempfile

from contextlib import suppress
from decimal import Decimal
from itertools import compress

import jinja2
import requests

from PIL import Image

from .assessment_results_service import AssessmentResultsService
from ..helpers import ResultHelper
from ..models import Assessment
from ..serializers import AssessmentResultsListSerializer


FILTERS = ['correct', 'partially_correct', 'incorrect', 'low_accuracy', 'high_accuracy', 'last_name']


class ReportService:

    jinja_env = jinja2.Environment(
        block_start_string='\\block{',
        block_end_string='}',
        variable_start_string='\\var{',
        variable_end_string='}',
        comment_start_string='\\#{',
        comment_end_string='}',
        line_statement_prefix='%%',
        line_comment_prefix='%#',
        trim_blocks=True,
        autoescape=False,
        loader=jinja2.FileSystemLoader(os.path.abspath('.'))
    )

    @staticmethod
    def _build_student_name(item):
        if item.get("first_name") and item.get("last_name"):
            return f'{item["first_name"]} {item["last_name"]}'
        elif item.get('first_name'):
            return item.get('first_name')
        else:
            return 'No Name'

    @staticmethod
    def _normalize_number(number):
        if number is None:
            number = Decimal('0.00')
        normalized = number.normalize()
        sign, digit, exponent = normalized.as_tuple()
        return normalized if exponent <= 0 else normalized.quantize(1)

    @classmethod
    def _normalize_marks(cls, data):
        with suppress():
            for row in data:
                mark = row['mark']
                mark['student_mark'] = cls._normalize_number(mark['student_mark'])
                mark['total'] = cls._normalize_number(mark['total'])
                for value in row['marks'].values():
                    value['value'] = cls._normalize_number(value['value'])
                    value['total'] = cls._normalize_number(value['total'])
                for answer in row['answers']:
                    for key, value in answer['marks'].items():
                        answer['marks'][key] = cls._normalize_number(value)
        return data

    @classmethod
    def _get_options(cls, assessment_id, results_ids):
        assessment = Assessment.manager.get(id=assessment_id)
        options = [{
            'student_name': cls._build_student_name(item),
            'first_name': item.get('first_name'),
            'last_name': item.get('last_name'),
            'email': item['email'],
            'mark': item['total'],
            'assessment_name': assessment.name,
            'group_name': assessment.group.name,
            'type': assessment.type,
            'total_mark': item['total'].replace('%', '\\%'),
            'rows': cls._normalize_marks(item['data']),
            'compress': compress,
        } for item in cls._get_results(assessment, results_ids)]
        return options

    @classmethod
    def _get_results(cls, assessment, results_ids):
        results = AssessmentResultsService.get_assessment_results(assessment, FILTERS)
        results = results.filter(id__in=results_ids)
        context = {
            "assessment_data": ResultHelper.get_assessment_data_for_results(assessment),
            "total": AssessmentResultsService.get_assessment_total_mark(assessment),
        }
        return AssessmentResultsListSerializer(results, context=context, many=True).data

    @classmethod
    def _download_images(cls, option, temp_dir):
        for row in option['rows']:
            images = row['student_image']
            for label in ('answer', 'unit'):
                if images.get(f'{label}_url', None):
                    image_path = cls._download_image(
                        images[f'{label}_url'],
                        f'{temp_dir}/{row["id"]}_{label}.png'
                    )
                    if image_path:
                        images[label] = image_path
                    else:
                        images.pop(label, None)

    @staticmethod
    def _download_image(url, temp_path):
        response = requests.get(url)
        if response.status_code == 200:
            with open(temp_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            try:
                Image.open(temp_path)
                return temp_path
            except Exception:
                return None
        return None

    @classmethod
    def _render_report(cls, option, kind):
        if kind == 'mark':
            return None
        with tempfile.TemporaryDirectory() as temp_dir:
            rendered_path = f'{temp_dir}/rendered.tex'
            cls._download_images(option, temp_dir)
            template = cls.jinja_env.get_template('tex/template.tex')
            output = template.render(kind=kind, **option)
            with open(rendered_path, 'w') as file:
                file.write(output)
            subprocess.run([
                    'xelatex',
                    '-no-file-line-error',
                    '-interaction', 'nonstopmode',
                    '--output-directory', temp_dir,
                    rendered_path,
                ],
                cwd='.',
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False,
            )
            pdf_path = rendered_path.replace('.tex', '.pdf')
            with open(pdf_path, 'rb') as file:
                return io.BytesIO(file.read())

    @classmethod
    def build_report_data(cls, assessment_id, results_ids, kind):
        options = cls._get_options(assessment_id, results_ids)
        for option in options:
            option['file'] = cls._render_report(option, kind)
        return options
