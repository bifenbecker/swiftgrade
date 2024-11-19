# WARNING: DO NOT USE THIS SERVICE IN PRODUCTION


from .service_constants import *

from fpdf import FPDF
from PyPDF2 import PdfFileReader, PdfFileWriter
from PyPDF2.pdf import PageObject
from time import time

import json


COLOR_RED = 'red'
COLOR_GREEN = 'green'
COLOR_BLUE = 'blue'
COLOR_BLACK = 'black'

COLORS = {
    COLOR_RED: {
        'r': 255,
        'g': 0,
        'b': 0,
    },
    COLOR_GREEN: {
        'r': 0,
        'g': 255,
        'b': 0,
    },
    COLOR_BLUE: {
        'r': 0,
        'g': 0,
        'b': 255,
    },
    COLOR_BLACK: {
        'r': 0,
        'g': 0,
        'b': 0,
    },
}


def _get_pdf():
    pdf = FPDF()
    pdf.add_page(orientation='P')

    red = COLORS[COLOR_RED]
    pdf.set_fill_color(**red)
    pdf.set_draw_color(**red)
    pdf.set_line_width(1)

    return pdf

def draw(coordinates, template_name, kind):
    """This function is designed to check if coordinates were
    calculated correctly. Basically it takes the list of coordinates
    and draws a rectangle on a pdf from template_name
    !!!This method should not be used other than for testing purposes
    :param coordinates: a list of { x: *, y: *, width: *, height: * }-like dicts
    :param template_name: a path to pdf template to draw rectangles on
    :param kind: type of an answer sheet. Could be either 'custom' or 'generic'
    """
    pdf = _get_pdf()
    prev_page = 1

    for coordinate in coordinates:
        x = coordinate['x'] + INITIAL_X
        y = coordinate['y'] + INITIAL_Y
        page = coordinate['page']
        width = coordinate['width']
        height = coordinate['height']

        if kind == 'custom' and prev_page != page:
            pdf.add_page()

        prev_page = page

        pdf.rect(x, y, width, height)

    pdf.output(name='temp.pdf')

    def merge_pages(writer, page1, page2):
        new_page = PageObject.createBlankPage(None, page1.mediaBox.getWidth(), page1.mediaBox.getHeight())
        new_page.mergeScaledTranslatedPage(page1, 1, 0, 0)

        new_page.mergePage(page2)

        writer.addPage(new_page)

    writer = PdfFileWriter()

    with open(f'{ANSWER_SHEET_DIR}/coordinates.json', 'w') as file:
        file.write(json.dumps(coordinates))

    base_reader = PdfFileReader(open(template_name, 'rb'))
    overlay_reader = PdfFileReader(open('temp.pdf', 'rb'))

    for page in range(overlay_reader.getNumPages()):
        base_page = base_reader.getPage(page if kind == 'custom' else 0)
        overlay_page = overlay_reader.getPage(page)
        merge_pages(writer, base_page, overlay_page)

    with open('out.pdf', 'wb') as f:
        writer.write(f)
