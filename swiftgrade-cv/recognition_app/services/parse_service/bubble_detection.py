import math
import cv2
import numpy as np


BUBBLE_SIZE = 5  # mm
FIELD_WIDTH = 38.0856 + 3  # mm
FIELD_HEIGHT = 5.9 + 3  # mm
SCORE_THRESHOLD = 0.8


# Get bubble size in pixels
def getBubbleRadiusPXL(frame: np.ndarray, bubble_size: int, field_width: float, field_height: float):
    h, w = frame.shape[:2]
    scale = (h / field_height + w / field_width) / 2
    return int(bubble_size * scale / 2)


def getBubblePosition(frame: np.ndarray, circ: tuple):
    h, w = frame.shape[:2]
    segment = int(w / 5)

    for i in range(0, 5):
        if i * segment < circ[0] <= (i + 1) * segment:
            return i
    return -1


def getMissingBubbleCoordinate(frame: np.ndarray, index: int, bubbles: list):
    y = r = 0
    count = 0
    height, width = frame.shape[:2]
    segment = width / 5
    bubble_radius_PXL = getBubbleRadiusPXL(frame, BUBBLE_SIZE, FIELD_WIDTH, FIELD_HEIGHT)
    rect_center_X = (index * segment + (index + 1) * segment) / 2
    x = int(rect_center_X - bubble_radius_PXL)

    initial_bubble = None
    for i, b in enumerate(bubbles):
        if b is None:
            continue
        if initial_bubble is None:
            initial_bubble = (i, b)
        else:
            delta = (b[0] - initial_bubble[1][0]) / (i - initial_bubble[0])
            x = int(b[0] - delta * (i - index))
            break

    for i, b in enumerate(bubbles):
        if b is None:
            continue
        count += 1
        y += b[1]
        r += b[2]

    if count > 0:
        y = int(y / count)
        r = int(r / count)
        return x, y, r

    rect_center_Y = (height * 0.92) / 2
    y = int(rect_center_Y - bubble_radius_PXL)
    r = bubble_radius_PXL
    return x, y, r


def getResults(image_path: str):
    img = cv2.imread(image_path)
    bubble_radius_PXL = getBubbleRadiusPXL(img, BUBBLE_SIZE, FIELD_WIDTH, FIELD_HEIGHT)
    height, width = img.shape[:2]
    greyROI = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    threshROI = cv2.adaptiveThreshold(greyROI, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 91, 3)
    dilate = cv2.dilate(threshROI, np.ones((4, 4), np.uint8))

    circles = cv2.HoughCircles(dilate, cv2.HOUGH_GRADIENT, 1, bubble_radius_PXL * 2, param1=50, param2=35,
                               minRadius=0, maxRadius=0)
    bubbles = [None] * 5
    if circles is not None:
        for i, c in enumerate(circles[0, :]):
            if bubble_radius_PXL * 0.8 < c[2] < bubble_radius_PXL * 1.3:
                index = getBubblePosition(img, c)
                if index >= 0:
                    bubbles[index] = c

    erode = cv2.erode(threshROI, np.ones((4, 4), np.uint8))
    threshROI = cv2.medianBlur(erode, 41)

    results = []
    for i, b in enumerate(bubbles, start=1):
        if b is None:
            b = getMissingBubbleCoordinate(img, i - 1, bubbles)
        y1 = int(b[1] - b[2]) if (b[1] - b[2]) > 0 else 0
        y2 = int(b[1] + b[2]) if (b[1] + b[2]) < height else height
        x1 = int(b[0] - b[2]) if (b[0] - b[2]) > 0 else 0
        x2 = int(b[0] + b[2]) if (b[0] + b[2]) < width else width
        bubble = threshROI[y1:y2, x1:x2]

        mask = np.zeros(bubble.shape[:2], dtype="uint8")
        cv2.circle(mask, (int(bubble.shape[0] / 2), int(bubble.shape[1] / 2)), int(bubble_radius_PXL * 0.8),
                   (255, 255, 255), cv2.FILLED)

        maskedImage = cv2.bitwise_and(bubble, bubble, mask=mask)

        score = cv2.countNonZero(maskedImage)
        totalPixels = math.pi * (bubble_radius_PXL * 0.8) ** 2
        result = score < (SCORE_THRESHOLD * totalPixels)
        results.append(result)
    return results  # example: [False, False, False, True, False]
