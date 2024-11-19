import cv2

from .base_parser_service import BaseParserService
from ..mathpix_service import MathpixService
from ..image_concatenation_service import ImageConcatenationService
from ..normalize_imgae_service import NormalizeImageService
from recognition_app.serializers import RecognizeSerializer

USER_DATA_FIELDS = ['first_name', 'last_name', 'email']
BATCH_SIZE = 8


class BatchParseService(BaseParserService):
    @classmethod
    def _build_images_list(cls, fields):
        result = []
        for field in fields:
            normalized = NormalizeImageService.crop_borders(field['path'])
            result.append(cv2.imread(normalized))
        return result

    @classmethod
    def _parse_ocr(cls, data_block):
        results = {}
        batches = [data_block[i:i + BATCH_SIZE] for i in range(0, len(data_block), BATCH_SIZE)]
        while len(batches) > 0:
            batch = batches.pop()
            images_list = cls._build_images_list(batch)
            concatenated_path = ImageConcatenationService.build_concatenated_images(images_list)
            need_grading, values = MathpixService.parse_image(concatenated_path)
            if len(values) == len(batch):
                for value, field in zip(values, batch):
                    field.update(recognized=value, need_grading=need_grading)
            else:
                batches.append(batch[:int(len(batch) / 2)])
                batches.append(batch[int(len(batch) / 2):])
        return results

    @classmethod
    def parse(cls, fields, kind):
        """
        Parse recognition results
        1) OMR recogintion for MC fields
        1) start dichotomous to get all textboxes OCR processed
        :param coordinates: coordinates data
        :param cuts_path: path to cuted field
        """
        ocr_fields, omr_fields = cls._separate_batches(fields)
        if kind == RecognizeSerializer.CUSTOM:
            cls._parse_omr(omr_fields)
        cls._parse_ocr(ocr_fields)
