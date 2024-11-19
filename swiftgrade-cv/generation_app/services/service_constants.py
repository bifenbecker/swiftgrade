from django.conf import settings

from decimal import Decimal

import latex_constants as defs


GRID_COUNT = 36
GRID_COL_WIDTH = Decimal(1) / GRID_COUNT  # blocks
GRID_COL_HEIGHT = Decimal('1')  # blocks

ANSWER_SHEET_DIR = f'{settings.PUBLIC_FOLDER}/answer_sheets'
ANSWER_SHEET_PDF_TEMPLATES_DIR = f'{ANSWER_SHEET_DIR}/pdf_templates'
ANSWER_SHEETS_KEY_PREFIX = 'answer_sheets'

PAGE_HEIGHT = 297 # mm
PAGE_WIDTH = 210 # mm

BORDER_WIDTH = 0.6 # mm

MC_X_SHIFT = 2 # mm
MC_Y_SHIFT = 3.3 # mm

PRECISION = 4 # used in round() operations

QUESTIONAIRE_MARGIN = 1.95 # mm
QUESTIONAIRE_LEFT = defs.CORNER_MARK_LEFT + QUESTIONAIRE_MARGIN # mm
QUESTIONAIRE_RIGHT = PAGE_WIDTH - defs.CORNER_MARK_RIGHT - QUESTIONAIRE_MARGIN # mm
QUESTIONAIRE_WIDTH = QUESTIONAIRE_RIGHT - QUESTIONAIRE_LEFT # mm
BLOCK_WIDTH = round(float(GRID_COL_WIDTH) * QUESTIONAIRE_WIDTH, PRECISION) # mm

TOP_MARGIN = 33.7 # mm
BOTTOM_MARGIN = PAGE_HEIGHT - defs.ANCHOR_BOTTOM_MARGIN - defs.ANCHOR_HEIGHT - 3 # mm


BUFFER = 0.4 # mm
CUSTOM_FN_LN_TITLE_INDENT = 1.3 # mm
GENERIC_FN_LN_TITLE_INDENT = 0.25 # mm
CUSTOM_EMAIL_TOP_INDENT = 3.75 # mm
CUSTOM_EMAIL_BOTTOM_INDENT = 5.9 # mm
GENERIC_EMAIL_TOP_INDENT = 4.25 # mm
GENERIC_EMAIL_BOTTOM_INDENT = 5.2 # mm
WITH_UNITS_BLOCK_BOTTOM_INDENT = 2.54 # mm
WITH_UNITS_BLOCK_UNITS_LENGTH = 6 # blocks
NAME_BLOCK_LENGTH = 17.5 # blocks
TEXT_BOX_MIN_HEIGHT = 17.5 # mm

BOX_VERTICAL_MARGIN = 6.2 # mm
LATEX_VERTICAL_MARGIN = -5.4 # mm

INITIAL_X = defs.ANCHOR_LEFT_MARGIN
INITIAL_Y = defs.ANCHOR_TOP_MARGIN + defs.ANCHOR_HEIGHT

PDF_FORMAT = 'PDF'
PNG_FORMAT = 'PNG'

FIRST_PAGE_KEY = 'first'
OTHER_PAGE_KEY = 'other'

HEADHEIGHTS = {
    0: defs.PF_HEADHEIGHT,
    2: defs.E_HEADHEIGHT,
}

INSTRUCTION_TOP_MARGINS = {
    FIRST_PAGE_KEY: {
        0: defs.PF_INSTRUCTIONS_TOP_MARGIN1,
        2: defs.E_INSTRUCTIONS_TOP_MARGIN1,
    },
    OTHER_PAGE_KEY: {
        0: defs.PF_INSTRUCTIONS_TOP_MARGIN,
        2: defs.E_INSTRUCTIONS_TOP_MARGIN,
    }
}

INSTRUCTION_BOTTOM_MARGINS = {
    FIRST_PAGE_KEY: {
        0: defs.PF_INSTRUCTIONS_BOTTOM_MARGIN1,
        2: defs.E_INSTRUCTIONS_BOTTOM_MARGIN1,
    },
    OTHER_PAGE_KEY: {
        0: defs.PF_INSTRUCTIONS_BOTTOM_MARGIN,
        2: defs.E_INSTRUCTIONS_BOTTOM_MARGIN,
    }
}

CUSTOM_SHEET = 'custom'
GENERIC_SHEET = 'generic'

__all__ = (
    'GRID_COUNT',
    'GRID_COL_WIDTH',
    'GRID_COL_HEIGHT',
    'ANSWER_SHEET_DIR',
    'ANSWER_SHEET_PDF_TEMPLATES_DIR',
    'ANSWER_SHEETS_KEY_PREFIX',
    'PAGE_HEIGHT',
    'PAGE_WIDTH',
    'BORDER_WIDTH',
    'MC_X_SHIFT',
    'MC_Y_SHIFT',
    'TOP_MARGIN',
    'BOTTOM_MARGIN',
    'PRECISION',
    'QUESTIONAIRE_MARGIN',
    'QUESTIONAIRE_LEFT',
    'QUESTIONAIRE_RIGHT',
    'QUESTIONAIRE_WIDTH',
    'BLOCK_WIDTH',
    'BUFFER',
    'CUSTOM_FN_LN_TITLE_INDENT',
    'GENERIC_FN_LN_TITLE_INDENT',
    'CUSTOM_EMAIL_TOP_INDENT',
    'CUSTOM_EMAIL_BOTTOM_INDENT',
    'GENERIC_EMAIL_TOP_INDENT',
    'GENERIC_EMAIL_BOTTOM_INDENT',
    'WITH_UNITS_BLOCK_BOTTOM_INDENT',
    'WITH_UNITS_BLOCK_UNITS_LENGTH',
    'NAME_BLOCK_LENGTH',
    'TEXT_BOX_MIN_HEIGHT',
    'BOX_VERTICAL_MARGIN',
    'LATEX_VERTICAL_MARGIN',
    'INITIAL_X',
    'INITIAL_Y',
    'FIRST_PAGE_KEY',
    'OTHER_PAGE_KEY',
    'HEADHEIGHTS',
    'INSTRUCTION_TOP_MARGINS',
    'INSTRUCTION_BOTTOM_MARGINS',
    'CUSTOM_SHEET',
    'GENERIC_SHEET',
)
