from decimal import Decimal
from pdf2image import convert_from_path
from PyPDF2 import PdfFileReader, PdfFileWriter

from latex_constants import ANCHOR_TOP_MARGIN_PT, ANCHOR_BOTTOM_MARGIN_PT, ANCHOR_LEFT_MARGIN_PT, ANCHOR_RIGHT_MARGIN_PT


class PNGConverter:
    """
    This service crops a single pdf page on anchors and converts it to the png format image.
    """
    @classmethod
    def convert(cls, pdf_path, cropped_path):
        png_path = f'{cropped_path.split(".")[0]}.png'
        cls._crop_page(pdf_path, cropped_path)
        png_images = convert_from_path(cropped_path, 400)

        for png_image in png_images:
            png_image.save(png_path)
            
        return png_path
    
    @classmethod
    def _crop_page(cls, pdf_path, cropped_path):
        """
        Crops pdf page based on page anchors.
        """
        pdf_reader = PdfFileReader(open(pdf_path, 'rb'))
        pdf_writer = PdfFileWriter()
        page = pdf_reader.getPage(0)
        margin_top, margin_right = cls._get_crop_margins(page)

        page.mediaBox.upperLeft = (ANCHOR_LEFT_MARGIN_PT, margin_top)
        page.mediaBox.lowerRight = (margin_right, ANCHOR_BOTTOM_MARGIN_PT)
        pdf_writer.addPage(page)

        with open(cropped_path, 'wb') as file:
            pdf_writer.write(file)

    @staticmethod
    def _get_crop_margins(page):
        page_height = page.mediaBox.getHeight()
        page_width = page.mediaBox.getWidth()

        return page_height - Decimal(ANCHOR_TOP_MARGIN_PT), page_width - Decimal(ANCHOR_RIGHT_MARGIN_PT)
