from decimal import Decimal
from PyPDF2 import PdfFileReader, PdfFileWriter
from PyPDF2.pdf import PageObject

from latex_constants import ANCHOR_BOTTOM_MARGIN_PT, ANCHOR_LEFT_MARGIN_PT, ANCHOR_RIGHT_MARGIN_PT, ANCHOR_TOP_MARGIN_PT


class PagesMerger:
    """
    This service merge several sheets to single pdf page. Options are 2, 4, 6 sheets per page.
    """
    A4_HEIGHT = 841.89
    A4_WIDTH = 595.28
    ANCHORS_HEIGHT = A4_HEIGHT - ANCHOR_BOTTOM_MARGIN_PT - ANCHOR_TOP_MARGIN_PT
    ANCHORS_HEIGHT_TOP_ON_A4_SHEET = A4_HEIGHT - ANCHOR_TOP_MARGIN_PT
    ANCHORS_HEIGHT_HALF_ON_A4_SHEET = A4_HEIGHT - ANCHOR_TOP_MARGIN_PT - ANCHORS_HEIGHT / 2
    ANCHORS_WIDTH = A4_WIDTH - ANCHOR_LEFT_MARGIN_PT - ANCHOR_RIGHT_MARGIN_PT
    ANCHORS_WIDTH_HALF_ON_A4_SHEET = A4_WIDTH - ANCHOR_LEFT_MARGIN_PT - ANCHORS_WIDTH / 2
    ASPECT_RATIO_A4 = ANCHORS_WIDTH / A4_HEIGHT
    PORTRAIT_SCALE = ANCHORS_HEIGHT / 2 / A4_HEIGHT
    BOTTOM_OFFSET = ANCHOR_BOTTOM_MARGIN_PT * PORTRAIT_SCALE
    LEFT_OFFSET = ANCHOR_LEFT_MARGIN_PT * PORTRAIT_SCALE
    LEFT_ROTATED_OFFSET = ANCHOR_BOTTOM_MARGIN_PT * ASPECT_RATIO_A4
    LEFT_ROTATED_OFFSET_HALF = LEFT_ROTATED_OFFSET / 2
    TOP_ROTATED_OFFSET = ANCHOR_LEFT_MARGIN_PT * ASPECT_RATIO_A4
    SCALE = 1.09

    EXTRA_SCALE = {
        2: 1.08,
        4: 1.1,
        6: 1.11,
    }

    ROTATE = {
        2: 270,
        4: 0,
        6: 270,
    }

    @classmethod
    def merge_pages(cls, sheets_on_page, path, merged_path, class_name):
        """
        Returns a path to the new merged pdf. Parameters that define a merging are:
        1. rotation - The angle of the rotation, in degrees
        2. scale - The scaling factor
        3. translation - The translation on X/Y axis
        """
        try:
            pdf_reader = PdfFileReader(open(path, 'rb'))
            pdf_writer = PdfFileWriter()
            number_of_pages = pdf_reader.getNumPages() if class_name else sheets_on_page

            for page_number in range(number_of_pages):
                is_first_number_on_page = page_number % sheets_on_page == 0

                if is_first_number_on_page or class_name:
                    page = pdf_reader.getPage(page_number)

                if is_first_number_on_page:
                    merged_page_number = 0
                    new_merged_page = PageObject.createBlankPage(None, cls.A4_WIDTH, cls.A4_HEIGHT)

                new_merged_page.mergeRotatedScaledTranslatedPage(
                    page,
                    cls.ROTATE[sheets_on_page],
                    cls._get_scale(sheets_on_page),
                    **cls._get_translation(merged_page_number, sheets_on_page)
                )

                merged_page_number += 1
                if merged_page_number % sheets_on_page == 0 and page_number != 0 or \
                page_number == number_of_pages - 1:
                    pdf_writer.addPage(new_merged_page) 
            
            with open(merged_path, 'wb') as file:
                pdf_writer.write(file)
            
            return merged_path
        except Exception:
            return None

    @classmethod
    def _get_translation(cls, merged_page_number, sheets_on_page):
        TRANSLATION = {
            2: {
                0: {
                    'tx': ANCHOR_LEFT_MARGIN_PT - cls.LEFT_ROTATED_OFFSET,
                    'ty': cls.ANCHORS_HEIGHT_TOP_ON_A4_SHEET + cls.TOP_ROTATED_OFFSET + 2,
                },
                1: {
                    'tx': ANCHOR_LEFT_MARGIN_PT - cls.LEFT_ROTATED_OFFSET,
                    'ty': cls.ANCHORS_HEIGHT_HALF_ON_A4_SHEET + cls.TOP_ROTATED_OFFSET - 3,
                },
            },
            4: {
                0: {
                    'tx': ANCHOR_LEFT_MARGIN_PT - cls.LEFT_OFFSET,
                    'ty': cls.ANCHORS_HEIGHT_HALF_ON_A4_SHEET - cls.BOTTOM_OFFSET + 4,
                },
                1: {
                    'tx': cls.ANCHORS_WIDTH_HALF_ON_A4_SHEET - cls.LEFT_OFFSET,
                    'ty': cls.ANCHORS_HEIGHT_HALF_ON_A4_SHEET - cls.BOTTOM_OFFSET + 4,
                },
                2: {
                    'tx': ANCHOR_LEFT_MARGIN_PT - cls.LEFT_OFFSET,
                    'ty': ANCHOR_BOTTOM_MARGIN_PT - cls.BOTTOM_OFFSET,
                },
                3: {
                    'tx': cls.ANCHORS_WIDTH_HALF_ON_A4_SHEET - cls.LEFT_OFFSET,
                    'ty': ANCHOR_BOTTOM_MARGIN_PT - cls.BOTTOM_OFFSET,
                },
            },
            6: {
                0: {
                    'tx': ANCHOR_LEFT_MARGIN_PT - cls.LEFT_ROTATED_OFFSET_HALF - 3,
                    'ty': cls.ANCHORS_HEIGHT_TOP_ON_A4_SHEET + 10,
                },
                1: {
                    'tx': cls.ANCHORS_WIDTH_HALF_ON_A4_SHEET - cls.LEFT_ROTATED_OFFSET_HALF,
                    'ty': cls.ANCHORS_HEIGHT_TOP_ON_A4_SHEET + 10,
                },
                2: {
                    'tx': ANCHOR_LEFT_MARGIN_PT - cls.LEFT_ROTATED_OFFSET_HALF - 3,
                    'ty': cls.ANCHORS_HEIGHT_TOP_ON_A4_SHEET - cls.ANCHORS_HEIGHT / 3,
                },
                3: {
                    'tx': cls.ANCHORS_WIDTH_HALF_ON_A4_SHEET - cls.LEFT_ROTATED_OFFSET_HALF,
                    'ty': cls.ANCHORS_HEIGHT_TOP_ON_A4_SHEET - cls.ANCHORS_HEIGHT / 3,
                },
                4: {
                    'tx': ANCHOR_LEFT_MARGIN_PT - cls.LEFT_ROTATED_OFFSET_HALF - 3,
                    'ty': cls.ANCHORS_HEIGHT_TOP_ON_A4_SHEET - cls.ANCHORS_HEIGHT * 2 / 3 - 10,
                },
                5: {
                    'tx': cls.ANCHORS_WIDTH_HALF_ON_A4_SHEET - cls.LEFT_ROTATED_OFFSET_HALF,
                    'ty': cls.ANCHORS_HEIGHT_TOP_ON_A4_SHEET - cls.ANCHORS_HEIGHT * 2 / 3 - 10,
                },
            },
        }

        return TRANSLATION[sheets_on_page][merged_page_number]

    @classmethod
    def _get_scale(cls, sheets_on_page):
        SCALE = {
            2: cls.ANCHORS_WIDTH / cls.A4_HEIGHT * cls.EXTRA_SCALE[sheets_on_page],
            4: cls.PORTRAIT_SCALE * cls.EXTRA_SCALE[sheets_on_page],
            6: cls.ANCHORS_WIDTH / (2 * cls.A4_HEIGHT) * cls.EXTRA_SCALE[sheets_on_page],
        }

        return SCALE[sheets_on_page]
