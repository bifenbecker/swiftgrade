from bisect import bisect

from django.conf import settings

from barcode import Code128
from barcode.writer import ImageWriter
from PyPDF2 import PdfFileReader, PdfFileWriter

import fitz
import fpdf

from .service_constants import (
    CUSTOM_SHEET,
    GENERIC_SHEET,
    PAGE_HEIGHT, PAGE_WIDTH,
    PDF_FORMAT,
    PNG_FORMAT,
    QUESTIONAIRE_RIGHT
)

import latex_constants as defs

from .pages_merger import PagesMerger
from .png_converter import PNGConverter


BARCODE_HEIGHT = 8
PIXEL = 2.8333333333333335

FONT_SIZE = 10
FONT_FAMILY = 'Gordita-Regular'

HEADER_LINE_Y = defs.ANCHOR_TOP_MARGIN + defs.ANCHOR_HEIGHT + 7

BARCODE_WIDTH = 185
BARCODE_WRITER = 'code39'

IMAGE_FORMAT = 'jpeg'


class PDFCloner:
    """This service completes 2 operations:
    1. Cloning. This includes copying the initial pdf
        template for every student
    2. Stamping. For every copied instance the service:
        a) generates and stamps barcode for every page
        b) stamps the student names for prefilled sheets
        c) conditionally stamps assessment name and class name
    """

    @classmethod
    def _get_blank_pdf(cls):
        pdf = fpdf.FPDF()
        pdf.add_font(
            f'{FONT_FAMILY.lower()}',
            style='',
            fname=f'{settings.TEX_FOLDER}/{FONT_FAMILY}.ttf',
            uni=True,
        )
        pdf.set_font(f'{FONT_FAMILY.lower()}', style='', size=FONT_SIZE+0.1)
        return pdf

    @classmethod
    def _get_text_width(cls, text):
        pdf = cls._get_blank_pdf()
        width = pdf.get_string_width(text)
        return width

    @classmethod
    def _get_pdf_writer(cls):
        return PdfFileWriter()

    @classmethod
    def _get_pdf_reader(cls, path):
        return PdfFileReader(open(path, 'rb'))

    @classmethod
    def _generate_barcode_image(cls, path, fullness, *params):
        """Generates .png image with barcode on it
        and saves the image at specified path
        :param path: path that will be used to save image
        :param params: data that will be encoded in barcode
        """

        options = {
            'module_height': BARCODE_HEIGHT,
            'font_size': 0,
            'format': IMAGE_FORMAT.upper(),
            'quiet_zone': 0,
            'dpi': 500,
        }
        code128 = Code128(f'{fullness}{".".join(params)}', writer=ImageWriter())
        binary_codes = code128.build()
        options['module_width'] = BARCODE_WIDTH / len(binary_codes[0])
        code128.save(path, options)

    class _reducer:
        _left_remain = 3

        def __init__(self, text):
            self._text = text

        def __len__(self):
            return len(self._text)

        def _truncate(self, index):
            left_remain = -min(self._left_remain, len(self._text))
            return f'{self._text[:index]}...{self._text[left_remain:]}'

        def __getitem__(self, index=None):
            '''Overriding for bisect, calculate length of text[:index]...'''
            return PDFCloner._get_text_width(self._truncate(index))

        @classmethod
        def reduce(cls, text, width):
            '''Truncates and elipsis `pads` text if it wider than `width`'''
            item = cls(text)
            if PDFCloner._get_text_width(item._text) <= width:
                return text
            return item._truncate(bisect(item, width))

    @classmethod
    def _normalize_coordinates(cls, *coordinates):
        """Converts mm values to the fitz library measurements"""
        return tuple(coord * PIXEL for coord in coordinates)

    @classmethod
    def _stamp_image_on_page(cls, page, x0, y0, x1, y1, image_path):
        x0, y0, x1, y1 = cls._normalize_coordinates(x0, y0, x1, y1)
        page.insertImage(
            fitz.Rect(x0, y0, x1, y1),
            filename=f'{image_path}.{IMAGE_FORMAT}',
        )

    @classmethod
    def _stamp_text_on_page(cls, page, x0, y0, text):
        text_width = cls._get_text_width(text)
        y0 -= 3.5

        x0, y0, x1, y1 = cls._normalize_coordinates(x0, y0, x0+text_width, y0+10)
        page.insertTextbox(
            fitz.Rect(x0, y0, x1, y1),
            text,
            fontsize=FONT_SIZE,
            fontname=FONT_FAMILY,
            fontfile=f'{settings.TEX_FOLDER}/{FONT_FAMILY}.ttf',
        )

    @classmethod
    def _stamp_barcode_on_page(cls, page, fullness, *params):
        params = tuple(map(str, params))
        barcode_path = f'{settings.TEMP_DIR}/barcode-{"-".join(params)}'

        cls._generate_barcode_image(barcode_path, fullness,  *params)

        x0 = PAGE_WIDTH/2 - BARCODE_WIDTH/2
        y0 = PAGE_HEIGHT - defs.ANCHOR_HEIGHT - defs.ANCHOR_BOTTOM_MARGIN - 3
        x1 = x0 + BARCODE_WIDTH
        y1 = y0 + BARCODE_HEIGHT

        cls._stamp_image_on_page(page, x0, y0, x1, y1, barcode_path)

    @classmethod
    def _stamp_student_name_on_page(cls, page, fullness, kind, name):
        if kind == GENERIC_SHEET and fullness == 0:
            name = cls._reducer.reduce(name, 150)
            text_width = cls._get_text_width(name)
            x, y = (PAGE_WIDTH - text_width) / 2, 27
        elif kind == CUSTOM_SHEET and fullness == 0:
            name = cls._reducer.reduce(name, 55)
            text_width = cls._get_text_width(name)
            x, y = QUESTIONAIRE_RIGHT - text_width - 3, HEADER_LINE_Y
        else:
            return

        cls._stamp_text_on_page(page, x, y, name)

    @classmethod
    def _stamp_assessment_on_page(cls, page, fullness, kind, assessment_name):
        if kind == GENERIC_SHEET:
            return

        max_text_width = 62 if kind == CUSTOM_SHEET and fullness == 2 else 65
        assessment_name = cls._reducer.reduce(assessment_name, max_text_width)
        text_width = cls._get_text_width(assessment_name)

        x = PAGE_WIDTH / 2 - text_width / 2
        y = HEADER_LINE_Y

        cls._stamp_text_on_page(page, x, y, assessment_name)

    @classmethod
    def _stamp_class_name_on_page(cls, page, fullness, kind, class_name):
        if fullness == 0:
            if kind == GENERIC_SHEET:
                shift, max_text_width = 65, 55
            else:
                shift, max_text_width = 52, 60

            class_name = cls._reducer.reduce(class_name, max_text_width)
            text_width = cls._get_text_width(class_name)
            x = (PAGE_WIDTH - text_width + shift) / 2
            y = PAGE_HEIGHT - defs.ANCHOR_BOTTOM_MARGIN - 1/2
        elif kind == CUSTOM_SHEET:
            class_name = cls._reducer.reduce(class_name, 55)
            text_width = cls._get_text_width(class_name)
            x = QUESTIONAIRE_RIGHT - text_width - 3
            y = HEADER_LINE_Y
        else:
            return

        cls._stamp_text_on_page(page, x, y, class_name)

    @classmethod
    def _clone_pages(cls, path, output_path, students):
        """Takes a file, clones it for every student
        and then merges them all in one file
        :param path: path to the origin file
        :param output_path: path to the resulting file
        :param students: list of the students
        :return: amount of pages per student
        """

        pdf_reader = cls._get_pdf_reader(path)
        pdf_writer = cls._get_pdf_writer()
        pages_num = pdf_reader.getNumPages()

        for _ in students:
            for page in range(pages_num):
                pdf_writer.addPage(pdf_reader.getPage(page))

        with open(output_path, 'wb') as file:
            pdf_writer.write(file)

        return pages_num

    @classmethod
    def _stamp_pages(
        cls, kind, output_path, fullness, pages_num,
        students, assessment_name, class_name, *params
    ):
        """This method adds class name, student name,
        assessment and barcode for every page in a file
        :param kind: pdf type (custom or generic)
        :param output_path: path to the resulting file
        :param fullness: 0 for prefilled, 2 for empty
        :param pages_num: amount of pdf pages per student
        :param students: list of the students
        :param assessment_name: name of the assessment
        :param class_name: name of the class
        :param params: params for barcode - answer_sheet_id, number_of_answers, number_of_letters, class_id
        """

        doc = fitz.open(output_path)

        for index, page in enumerate(doc):
            page_num = index % pages_num
            student = students[index // pages_num]
            cls._stamp_barcode_on_page(page, fullness, *params, student['id'], page_num, pages_num)
            cls._stamp_assessment_on_page(page, fullness, kind, assessment_name)
            cls._stamp_student_name_on_page(page, fullness, kind, student.get('name'))
            cls._stamp_class_name_on_page(page, fullness, kind, class_name)

        doc.saveIncr()

    @classmethod
    def _create_clone(
        cls, kind, path, fullness, students,
        assessment_name, class_name, *params
    ):
        output_path = f'{settings.TEMP_DIR}/{fullness}{params[0]}-combined.pdf'
        pages_num = cls._clone_pages(path, output_path, students)
        cls._stamp_pages(
            kind, output_path, fullness, pages_num,
            students, assessment_name, class_name, *params
        )
        return output_path, pages_num

    @classmethod
    def create_custom_clone(
        cls, path, fullness, students, answer_sheet_id,
        assessment_name, class_name
    ):
        return cls._create_clone(
            CUSTOM_SHEET, path, fullness, students,
            assessment_name, class_name, answer_sheet_id
        )

    @classmethod
    def create_generic_clone(
        cls, path, fullness, students, answer_sheet_id, number_of_answers, number_of_letters,
        sheets_per_page, class_id, class_name, file_format=PDF_FORMAT
    ):
        output_path, pages_num = cls._create_clone(
            GENERIC_SHEET, path, fullness, students,
            '', class_name, answer_sheet_id, number_of_answers, number_of_letters, class_id
        )

        if sheets_per_page > 1:
            merged_path = f'{settings.TEMP_DIR}/{fullness}{answer_sheet_id}-merged.pdf'
            output_path = PagesMerger.merge_pages(sheets_per_page, output_path, merged_path, class_name)

        if sheets_per_page == 1 and file_format == PNG_FORMAT:
            cropped_path = f'{settings.TEMP_DIR}/{fullness}{answer_sheet_id}-cropped.pdf'
            output_path = PNGConverter.convert(output_path, cropped_path)

        return output_path, pages_num
