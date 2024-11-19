from storages.backends.s3boto3 import S3Boto3Storage


class MediaStorage(S3Boto3Storage):
    def get_object_parameters(self, name):
        return {'ContentDisposition': f'attachment; filename="{name}"'}

    def _get_write_parameters(self, name, content=None):
        params = super()._get_write_parameters(name, content)
        params['ContentType'] = self.default_content_type
        return params