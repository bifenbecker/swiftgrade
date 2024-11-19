import urllib.request
from tempfile import mktemp
from contextlib import suppress

import cv2
import numpy as np
import imutils
from skimage.filters import threshold_local


SCALE_RESOLUTION = 4096


class ScannerService:
    @classmethod
    def _path_to_image(cls, path, url=False):
        if url:
            resp = urllib.request.urlopen(path)
            image = np.asarray(bytearray(resp.read()), dtype="uint8")
            image = cv2.imdecode(image, cv2.IMREAD_COLOR)
            return image
        return cv2.imread(path)

    @classmethod
    def _order_points(cls, pts):
        rect = np.zeros((4, 2), dtype="float32")
        s = pts.sum(axis=1)
        rect[0] = pts[np.argmin(s)]
        rect[2] = pts[np.argmax(s)]
        diff = np.diff(pts, axis=1)
        rect[1] = pts[np.argmin(diff)]
        rect[3] = pts[np.argmax(diff)]
        return rect

    @classmethod
    def _four_point_transform(cls, image, pts):
        """
        Sort corner points of contour and make OpenCV perspective transformation
        :param image: image data
        :param pts: points of corners
        :return: processed image
        """
        rect = cls._order_points(pts)
        (tl, tr, br, bl) = rect
        width_a = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
        width_b = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
        max_width = max(int(width_a), int(width_b))
        height_a = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
        height_b = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
        max_height = max(int(height_a), int(height_b))
        dst = np.array([
            [0, 0],
            [max_width - 1, 0],
            [max_width - 1, max_height - 1],
            [0, max_height - 1]], dtype="float32")
        matrix = cv2.getPerspectiveTransform(rect, dst)
        warped = cv2.warpPerspective(image, matrix, (max_width, max_height))
        return warped

    @classmethod
    def _thresholded_image(cls, image):
        warped = imutils.resize(image, height=SCALE_RESOLUTION)
        warped = cv2.cvtColor(warped, cv2.COLOR_BGR2GRAY)
        thresh = threshold_local(warped, 75, offset=12, method="gaussian")
        warped = (warped > thresh).astype("uint8") * 255
        return warped

    @classmethod
    def scan_image(cls, image):
        """
        1) grade scale image
        2) find contours
        3) cropp image by contour
        4) make black and white image
        :param image:
        :return: path to scanned image
        """
        ratio = image.shape[0] / 500.0
        orig = image.copy()
        image = imutils.resize(image, height=500)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, (5, 5), 0)
        edged = cv2.Canny(gray, 100, 100, 3)
        contours = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        contours = imutils.grab_contours(contours)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:5]
        for contour in contours:
            peri = cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, 0.02 * peri, True)
            if len(approx) == 4:
                screen_contour = approx
                break
        wrapped = cls._four_point_transform(orig, screen_contour.reshape(4, 2) * ratio)
        if wrapped.shape[1] / wrapped.shape[0] < 1.0:
            return cls._thresholded_image(wrapped)
        else:
            return None

    @classmethod
    def process_image(cls, image_path, url=False):
        """
        Make from plain photo document scan
        :param image_path: string with path (url) to image
        :param url: True - image_path is URL, False - image_path is file path
        :return: scan image file path
        """
        with suppress():
            out = cls._path_to_image(image_path, url)
            tmp_path = mktemp(suffix='.png', prefix='scanned-')
            cv2.imwrite(tmp_path, out)
            return tmp_path
