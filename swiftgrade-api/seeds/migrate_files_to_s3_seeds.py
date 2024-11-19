import requests

from assessments.models import AnswerSheetZip, AnswerSheetScanItem, AssessmentResultItem

from django.conf import settings
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

DATA = (
    {'fields': ['document'], 'model': AnswerSheetZip},
    {'fields': ['image'], 'model': AnswerSheetScanItem},
    {'fields': ['image', 'unit_image'], 'model': AssessmentResultItem},
)


class MigrateFilesToS3:
    def call(self):
        for item in DATA:
            self._migrate_instance_files(item['fields'], item['model'])

    def _migrate_instance_files(self, fields=['image'], model = AnswerSheetZip):
        items, items_for_update = self._get_generator(model), []
        for item in items:
            for field in fields:
                name = self._get_name(item, field)
                file = self._download_file(self._get_path(name))
                if file:
                    item = self._set_file(field, file, item, name)
            items_for_update.append(item)
        self._bulk_update(items_for_update, fields, model)

    @staticmethod
    def _bulk_update(data, fields = ['image', 'unit_image'], model = AssessmentResultItem):
        model.objects.bulk_update(data, fields)

    @staticmethod
    def _download_file(url):
        r = requests.get(url)
        if r.status_code == 200:
            image = NamedTemporaryFile(delete=True)
            image.write(r.content)
            image.flush()
            return image
        return None

    @staticmethod
    def _get_generator(model = AssessmentResultItem):
        return (item for item in model.objects.iterator())

    @staticmethod
    def _get_name(item, field):
        if field == 'image':
            return item.image.name
        if field == 'document':
            return item.document.name
        if field == 'unit_image':
            return item.unit_image.name
        return ''

    @staticmethod
    def __get_name_file(name):
        return name.split('/')[-1]

    def _set_file(self, field, file, item, name):
        filename = self.__get_name_file(name)
        if field == 'image':
            item.image.save(filename, File(file), save=False)
        if field == 'document':
            item.document.save(filename, File(file), save=False)
        if field == 'unit_image':
            item.unit_image.save(filename, File(file), save=False)
        return item

    @staticmethod
    def _get_path(name):
        return f'{settings.HOST_URL}public/{name}'

def perform():
    MigrateFilesToS3().call()
