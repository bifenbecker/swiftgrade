from django.conf import settings
from django.db import models

class RecognizedPerson(models.Model):
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    first_name_img = models.ImageField(upload_to=settings.IMAGES_FOLDER_PATH, blank=True, null=True)
    last_name_img = models.ImageField(upload_to=settings.IMAGES_FOLDER_PATH, blank=True, null=True)
    email_img = models.ImageField(upload_to=settings.IMAGES_FOLDER_PATH, blank=True, null=True)

    @property
    def first_name_url(self):
        return self.first_name_img.url if self.first_name_img else None

    @property
    def last_name_url(self):
        return self.last_name_img.url if self.last_name_img else None

    @property
    def email_url(self):
        return self.email_img.url if self.email_img else None
