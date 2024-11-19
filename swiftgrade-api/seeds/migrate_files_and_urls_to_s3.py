import os
import requests
from tempfile import mktemp
from urllib.parse import urljoin, urlparse

from botocore.exceptions import ClientError
from django.conf import settings
from django.db.models import Q

import boto3

from assessments.models import AnswerSheet, RecognizedPerson


BATCH_SIZE = 1000
s3_client = boto3.client('s3')

class MigrateFilesAndURLSToS3:

    def call(self):
        self._copy_url_to_img_field()
        self._copy_url_to_file_field()

    @staticmethod
    def _upload_to_s3(file_path, object_key, bucket_name=settings.AWS_STORAGE_BUCKET_NAME):
        try:
            s3_client.upload_file(file_path, bucket_name, object_key)
            return True
        except (ClientError, FileNotFoundError, ValueError) as e:
            return False

    @staticmethod
    def _delete_from_s3(object_key, bucket_name=settings.AWS_STORAGE_BUCKET_NAME):
        try:
            s3_client.delete_object(Bucket=bucket_name, Key=object_key)
        except:
            pass

    @classmethod
    def _copy_url_to_img_field(cls, *args):
        """
        Copying CV App url path of the fields:
        - first_name_url
        - last_name_url
        - email_url
         to the new AWS S3 image fields:
        - first_name_img
        - last_name_img
        - email_name_img  
        """
        index = 0

        while True:
            personas = RecognizedPerson.objects.exclude(
                first_name_url='', last_name_url='', email_url='',
            )[index:index+BATCH_SIZE]

            for person in personas:
                for key in ['first_name', 'last_name', 'email']:
                    url = getattr(person, f'{key}_url')
                    if url and len(url.split("public")) > 1:
                        aws_dir_name = f'images{url.split("public")[1]}'
                        tmp_img_name = mktemp(prefix='cv-cutted-')
                        data = requests.get(url)
                        with open(tmp_img_name, 'wb') as f:
                            f.write(data.content)
                        if cls._upload_to_s3(tmp_img_name, aws_dir_name):
                            setattr(person, f'{key}_img', aws_dir_name)

            RecognizedPerson.objects.bulk_update(personas, ('first_name_img', 'last_name_img', 'email_img'))

            if len(personas) < BATCH_SIZE:
                break

            index += BATCH_SIZE

    @classmethod
    def _copy_img_to_url_field(cls, *args):
        index = 0

        while True:
            personas = RecognizedPerson.objects.filter(
                Q(first_name_img__isnull=False) | Q(last_name_img__isnull=False) | Q(email_img__isnull=False)
            )[index:index+BATCH_SIZE]

            for person in personas:
                for key in ['first_name', 'last_name', 'email']:
                    img = getattr(person, f'{key}_img')
                    if img:
                        object_key = urlparse(img.url).path
                        cls._delete_from_s3(object_key)
                        setattr(person, f'{key}_url', urljoin(settings.SWIFTGRADE_CV_URL, object_key))

            RecognizedPerson.objects.bulk_update(personas, ('first_name_url', 'last_name_url', 'email_url'))

            if len(personas) < BATCH_SIZE:
                break

            index += BATCH_SIZE

    @classmethod
    def _copy_url_to_file_field(cls, *args):
        """
        Copying CV App url path of the fields:
        - document_url
        - preview_document_url
         to the new AWS S3 file fields:
        - document_file
        - preview_document_file
        """
        index = 0

        while True:
            answer_sheets = AnswerSheet.objects.exclude(document_url='', preview_document_url='')[index:index+BATCH_SIZE]

            for answer_sheet in answer_sheets:
                for key in ['document', 'preview_document']:
                    url = getattr(answer_sheet, f'{key}_url')
                    if url and len(url.split('public/')) > 1:
                        url = settings.SWIFTGRADE_CV_URL + url
                        aws_dir_name = url.split('public/')[1]
                        tmp_img_name = mktemp(prefix='answer_sheet-')
                        data = requests.get(url)
                        with open(tmp_img_name, 'wb') as f:
                            f.write(data.content)
                        if cls._upload_to_s3(tmp_img_name, aws_dir_name):
                            setattr(answer_sheet, f'{key}_file', aws_dir_name)

            AnswerSheet.objects.bulk_update(answer_sheets, ('document_file', 'preview_document_file'))

            if len(answer_sheets) < BATCH_SIZE:
                break

            index += BATCH_SIZE

    @classmethod
    def _copy_file_to_url_field(cls, *args):
        index = 0

        while True:
            answer_sheets = AnswerSheet.objects.filter(
                Q(document_file__isnull=False) | Q(preview_document_file__isnull=False)
            )[index:index+BATCH_SIZE]

            for sheet in answer_sheets:
                for key in ['document', 'preview_document']:
                    file = getattr(sheet, f'{key}_file')
                    if file:
                        object_key = urlparse(file.url).path
                        cls._delete_from_s3(object_key)
                        setattr(sheet, f'{key}_url', urljoin(settings.SWIFTGRADE_CV_URL, object_key))

            AnswerSheet.objects.bulk_update(answer_sheets, ('document_url', 'preview_document_url'))

            if len(answer_sheets) < BATCH_SIZE:
                break

            index += BATCH_SIZE

def perform():
    MigrateFilesAndURLSToS3().call()
