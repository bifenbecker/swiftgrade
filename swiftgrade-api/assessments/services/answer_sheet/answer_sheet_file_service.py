from django.core import files
from django.conf import settings

from tempfile import NamedTemporaryFile
from zipfile import ZipFile

import requests

from assessments.utils import get_storage

SIZE = 1024 * 8


class AnswerSheetFileService:
    @classmethod
    def generate_accuracy_tips_zip_file(cls, name, url, accuracy_tips_file_url=None):
        files = [{"name": name.replace('zip', 'pdf'), "file": cls._download_file(url)}]
        accuracy_tips_file = cls._download_file(accuracy_tips_file_url)
        if accuracy_tips_file:
            files.append({"name": 'SwiftGrade accuracy tips.pdf', "file": accuracy_tips_file})
        return cls._make_zip_file(files, name)

    @classmethod
    def generate_zip_file(cls, name, data):
        files = []

        for k, v in data.items():
            files.append({
                "name": v["name"],
                "file": cls._download_file(cls._get_file_url_from_s3(v["url"])),
            })

        return cls._make_zip_file(files, name)

    @classmethod
    def _make_zip_file(cls, data, zip_file_name):
        zip_file = NamedTemporaryFile()

        with ZipFile(zip_file, 'w') as zip:
            for item in data:
                zip.writestr(item["name"], item["file"])

        zip_file.flush()
        return files.File(zip_file, zip_file_name)

    @staticmethod
    def _get_content_file(path):
        with open(path, 'rb') as f:
            content = f.read()
        return content

    @staticmethod
    def _get_file_url_from_s3(file_name):
        """
        Getting file url based on AWS S3 path.
        """
        storage = get_storage()
        if storage.exists(file_name):
            return storage.url(file_name)
        return None

    @staticmethod
    def _download_file(url):
        if url:
            response = requests.get(url)
            if response.status_code == 200:
                return response.content
        return None
