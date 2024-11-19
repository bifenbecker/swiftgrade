from tempfile import TemporaryDirectory
from pathlib import Path
from contextlib import suppress

from assessments.models import AssessmentFile
from django.conf import settings
from swiftgrade_api import celery_app

import os



ALLOWED_FORMATS_FOR_CONVERTING_TO_PDF = (
    '.doc', '.docx', '.ppt', '.pptx',                   # docs & presentations
    '.png', 'jpg', '.jpeg', '.gif', '.tiff', '.bmp',    # images
)
COMMAND_FOR_CONVERTING_TO_PDF =\
    '{libre_office_path} --headless --convert-to pdf:writer_pdf_Export --outdir {directory} {file_path}'


def get_files_ids_for_converting_to_pdf(assessment_files):
    files_ids = []
    for file in assessment_files:
        if file.file.name.endswith(ALLOWED_FORMATS_FOR_CONVERTING_TO_PDF):
            files_ids.append(file.id)
    return files_ids


def convert_file(file, tmp_dir):
    source_name = Path(file.file.name).name

    with open(tmp_dir / source_name, 'wb') as source_file:
        source = file.file.read()
        source_file.write(source)
        command = COMMAND_FOR_CONVERTING_TO_PDF.format(
            libre_office_path=settings.LIBBRE_OFFICE_PATH,
            file_path=source_file.name,
            directory=tmp_dir
        )

    os.system(command)

    target_name = source_name[:source_name.rfind('.')] + '.pdf'

    with open(tmp_dir / target_name, 'rb') as target_file:
        file.pdf_file.save(target_name, target_file)


@celery_app.task
def convert_files_to_pdf(files_ids):
    assessment_files = AssessmentFile.objects.filter(id__in=files_ids)
    files_ids_for_converting_to_pdf = get_files_ids_for_converting_to_pdf(assessment_files)

    if files_ids_for_converting_to_pdf:
        assessment_files_for_convert_to_pdf = assessment_files.filter(id__in=files_ids_for_converting_to_pdf)
        with TemporaryDirectory('wb') as tmp_dir:
            tmp_dir = Path(tmp_dir)
            for file in assessment_files_for_convert_to_pdf:
                with suppress():
                    convert_file(file, tmp_dir)
