import cv2
import uuid
from django.conf import settings


class ImageConcatenationService:
    """
    Build images to one file with separation
    """
    @classmethod
    def _concatenate_images(cls, im_list):
        """
        Concatenate images with use of OpenCV
        :param im_list: list on images with separators
        :return: path to file with concatenated image
        """
        w_min = max(im.shape[1] for im in im_list)
        im_list_resize = [cv2.copyMakeBorder(im, 7, 7, 7, w_min-im.shape[1]+7,
                                             cv2.BORDER_CONSTANT, value=[255, 255, 255])
                          for im in im_list]
        file_path = f'{settings.PUBLIC_FOLDER}/tmp/{uuid.uuid4().hex}.jpg'
        cv2.imwrite(file_path, cv2.vconcat(im_list_resize))
        return file_path

    @classmethod
    def _get_separator(cls):
        return cv2.imread('separator.png')

    @classmethod
    def build_concatenated_images(cls, images_list):
        """
        Run though images in images list and concatenate them
        :param images_list: list of images
        :return: path to concatenated image file
        """
        separator = cls._get_separator()
        set_for_concatenation = []
        for index in range(0, len(images_list)):
            set_for_concatenation.append(images_list[index])
            if index < len(images_list) - 1:
                set_for_concatenation.append(separator)
        return cls._concatenate_images(set_for_concatenation)
