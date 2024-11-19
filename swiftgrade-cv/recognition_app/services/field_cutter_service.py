import os

from django.conf import settings
from more_itertools import pairwise

import cv2
import math

from api.core.logger.custom_logger import CustomLogger
from api.core.utils.s3_service import S3Service
from generation_app.serializers.custom import QuestionSerializer


logger = CustomLogger.get_logger(__name__, 'recognition.log')


class FieldCutterService:
    '''Service for cutting fields from images'''

    INITIAL_X = 0
    INITIAL_Y = 12
    HEIGTH_MISS = 0.5
    HEIGHT_ADD = 2
    RESERVE = 1
    CUT_PAGE_WIDTH = 188
    CUT_PAGE_HEIGHT = 263
    SCALE = CUT_PAGE_HEIGHT / CUT_PAGE_WIDTH

    @classmethod
    def _remove_hor_lines(cls, image, iterations_number, kernel_size):
        repair_kernel_hor = cv2.getStructuringElement(cv2.MORPH_RECT, (1, kernel_size))
        result = cv2.morphologyEx(image, cv2.MORPH_CLOSE, repair_kernel_hor, iterations=iterations_number)
        return result

    @classmethod
    def _remove_vert_lines(cls, image, iterations_number, kernel_size):
        repair_kernel_vert = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, 1))
        result = cv2.morphologyEx(image, cv2.MORPH_CLOSE, repair_kernel_vert, iterations=iterations_number)
        return result

    @classmethod
    def _crop_field(cls, img, coord, x_coef, y_coef):
        '''
        Crops field from image by coordinates

        :param img: original image
        :param coord: coordinates of cropping field
        :param x_coef: coef by x axis
        :param y_coef: coef by y axis
        :returns: cropped field
        '''
        real_x = math.ceil(coord['x']) * x_coef
        real_y = (math.ceil(coord['y']) + cls.INITIAL_Y) * y_coef

        if 'type' in coord and coord['type'] == QuestionSerializer.MC:
            real_y = (math.ceil(coord['y']) + cls.INITIAL_Y - int(cls.HEIGHT_ADD / 2)) * y_coef

        real_width = math.ceil(coord['width']) * x_coef
        real_height = math.ceil(coord['height']) * y_coef

        if 'type' in coord and coord['type'] == QuestionSerializer.MC:
            real_height = math.ceil(coord['height'] + cls.HEIGHT_ADD) * y_coef

        return img[int(real_y):int(real_y + real_height), int(real_x):int(real_x + real_width)]

    @classmethod
    def _images_iterator(cls, paths):
        '''
        Iterator of images

        :param paths: List of paths to images
        :returns: iterator of tuples (image, x_coef, y_coef)
        '''
        for path in paths:
            if path:
                img = cv2.imread(path)
                if (img.shape[0] < 3648):
                    img = cv2.resize(img, (3648, 2542))

                height_o = img.shape[0]
                width_o = int(height_o / cls.SCALE)

                dim = (width_o, height_o)

                img = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)

                x_coef = img.shape[1] / cls.CUT_PAGE_WIDTH
                y_coef = img.shape[0] / cls.CUT_PAGE_HEIGHT
                yield img, x_coef, y_coef
            else:
                yield None

    @classmethod
    def _crop_and_upload(cls, images, curr, index, tmp_dir_name, aws_dir_name, prefix):
        image = images[curr['page'] - 1]

        if not image:
            curr.update(path=None, error=True, error_message='It''s unable to fetch image')
            return

        img, x_coef, y_coef = image

        try:
            crop_img = cls._crop_field(img, curr, x_coef, y_coef)
        except:
            logger.exception('Error occurs during cropping')
            curr.update(path=None, error=True, error_message='Cannot crop image')
            return

        file_name = f'{prefix}_{index}.jpg'
        tmp_path = os.path.join(tmp_dir_name, file_name)
        aws_path = os.path.join(settings.AWS_IMAGES_FOLDER_PATH, aws_dir_name, file_name)
        cv2.imwrite(tmp_path, crop_img)

        is_error, error_message = S3Service.upload_file(tmp_path, aws_path)

        curr.update(path=tmp_path, aws_path=aws_path, error=is_error, error_message=error_message)

    @classmethod
    def crop_fields(cls, paths, coords, tmp_dir_name, aws_dir_name, prefix):
        '''
        Crops field from images that represent one document
        by coordinates and save fields to tmp_dir_name in
        format tmp_dir_name/$i.png (i is ordinal number)
        :param paths: List of paths to images
        :param coords: List of fields coordinates
        :param tmp_dir_name: dir with croped fields
        :param aws_dir_name: s3 directory path
        :param prefix:
        '''
        images = list(cls._images_iterator(paths))

        for index, (curr, _) in enumerate(pairwise([*coords, None])):
            cls._crop_and_upload(images, curr, index,
                                 tmp_dir_name, aws_dir_name, prefix)

