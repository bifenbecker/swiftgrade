import cv2
from tempfile import mktemp


class NormalizeImageService:
    """
    Cropp borders of images which are concatenated for batch
    """
    @classmethod
    def crop_borders(cls, image_path):
        image = cv2.imread(image_path)
        croped_image = image[int(image.shape[0]*0.125):int(image.shape[0]*0.875), 17:image.shape[1]-22]
        tmp = mktemp(suffix='.jpg', prefix='norma-')
        cv2.imwrite(tmp, croped_image)
        return tmp
