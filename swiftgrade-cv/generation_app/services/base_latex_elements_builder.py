from api.core.utils.common_utils import bulid_template
from decimal import Decimal, ROUND_UP

from .service_constants import (
    BOX_VERTICAL_MARGIN,
    GRID_COL_HEIGHT,
    GRID_COL_WIDTH,
    LATEX_VERTICAL_MARGIN,
    TEXT_BOX_MIN_HEIGHT,
    WITH_UNITS_BLOCK_UNITS_LENGTH,
)

USER_DATA_TOP_MARGIN = 7
MARGIN_HEIGHT = LATEX_VERTICAL_MARGIN+BOX_VERTICAL_MARGIN

VERTICAL_SPACE = f'\\vspace{{{MARGIN_HEIGHT}mm}}'
USER_DATA_TOP_VERTICAL_SPACE = f'\\vspace{{{USER_DATA_TOP_MARGIN}mm}}'
USER_DATA_BOTTOM_VERTICAL_SPACE = f'\\vspace{{{MARGIN_HEIGHT-USER_DATA_TOP_MARGIN}mm}}'

class BaseLatexElementsBuilder:
    """
    Build base latex element and returns strings with its' code.
    """
    _user_data_textbox_template = "<user_data_top_vertical_margin>\\toptextbox{<height>mm}{<label>}<user_data_bottom_vertical_margin>&"
    _answer_units_textbox_template = "\\vspace{-0.4mm}\\questiontitle{<question>.}<vertical_margin>&\\mytextbox{<height>cm}{<question>_a_0}{Answer}<vertical_margin>&\\mytextbox{<height>cm}{<question>_u_0}{Units}<vertical_margin>&"
    _fill_in_the_blank_textbox_template = "\\vspace{-0.4mm}\\questiontitle{<question>.}<vertical_margin>&\\mytextbox{<height>cm}{<question>}{}<vertical_margin>&"
    _numeric_textbox_template = "\\vspace{-0.4mm}\\questiontitle{<question>.}<vertical_margin>&\\mytextbox{<height>cm}{<question>}{}<vertical_margin>&"
    _multichoice_template = "\\vspace{-0.4mm}\\questiontitle{<question>.}<vertical_margin>&\\countboxes{<question>}{5}<vertical_margin>&"

    _table_b_header_templete = "b{<width>\\textwidth}"
    _table_p_header_templete = "p{<width>\\textwidth}"
    _owner_templete = "\\tl_if_in:NnT { \\g__sdaps_questionnaire_id_tl} {<id>} {<name>}\n"

    @classmethod
    def __calc_height(cls, height):
        height = (Decimal(height)*GRID_COL_HEIGHT).quantize(Decimal('.01'), rounding=ROUND_UP)
        return str(height)

    @classmethod
    def user_data_textbox(cls, label, cells):
        header_values = {'<width>': str(GRID_COL_WIDTH*cells)}
        table_header = bulid_template(cls._table_b_header_templete, header_values)
        cell_values = {
            '<height>': cls.__calc_height(TEXT_BOX_MIN_HEIGHT),
            '<label>': str(label),
            '<user_data_top_vertical_margin>': USER_DATA_TOP_VERTICAL_SPACE,
            '<user_data_bottom_vertical_margin>': USER_DATA_BOTTOM_VERTICAL_SPACE,
        }
        cell = bulid_template(cls._user_data_textbox_template, cell_values)
        return table_header, cell

    @classmethod
    def answer_units_textbox(cls, question, height, cells):
        answer_width = GRID_COL_WIDTH*Decimal(cells-WITH_UNITS_BLOCK_UNITS_LENGTH)
        units_width = GRID_COL_WIDTH*Decimal(WITH_UNITS_BLOCK_UNITS_LENGTH)
        question_header = bulid_template(cls._table_p_header_templete, {'<width>': str(GRID_COL_WIDTH)})
        answer_header = bulid_template(cls._table_p_header_templete, {'<width>': str(answer_width)})
        units_header = bulid_template(cls._table_p_header_templete, {'<width>': str(units_width)})
        cell_values = {
            '<height>': cls.__calc_height(height),
            '<question>': str(question),
            '<vertical_margin>': VERTICAL_SPACE,
        }
        cell = bulid_template(cls._answer_units_textbox_template, cell_values)
        return f'{question_header}{answer_header}{units_header}', cell

    @classmethod
    def fill_in_the_blank_textbox(cls, question, height, cells):
        question_header = bulid_template(cls._table_p_header_templete, {'<width>': str(GRID_COL_WIDTH)})
        box_header = bulid_template(cls._table_p_header_templete, {'<width>': str(GRID_COL_WIDTH*cells)})
        cell_values = {
            '<question>': str(question),
            '<vertical_margin>': VERTICAL_SPACE,
            '<height>': cls.__calc_height(height),
        }
        cell = bulid_template(cls._fill_in_the_blank_textbox_template, cell_values)
        return f'{question_header}{box_header}', cell

    @classmethod
    def numeric_textbox(cls, question, height, cells):
        question_header = bulid_template(cls._table_p_header_templete, {'<width>': str(GRID_COL_WIDTH)})
        box_header = bulid_template(cls._table_p_header_templete, {'<width>': str(GRID_COL_WIDTH*cells)})
        cell_values = {
            '<question>': str(question),
            '<height>': cls.__calc_height(height),
            '<vertical_margin>': VERTICAL_SPACE,
        }
        cell = bulid_template(cls._numeric_textbox_template, cell_values)
        return f'{question_header}{box_header}', cell

    @classmethod
    def multichoice(cls, question):
        question_header = bulid_template(cls._table_p_header_templete, {'<width>': str(GRID_COL_WIDTH)})
        box_header = bulid_template(cls._table_p_header_templete, {'<width>': str(GRID_COL_WIDTH*8)})
        cell_values = {'<question>': str(question), '<vertical_margin>': VERTICAL_SPACE}
        cell = bulid_template(cls._multichoice_template, cell_values)
        return f'{question_header}{box_header}', cell

    @classmethod
    def empty_cell(cls):
        cell_header = bulid_template(cls._table_b_header_templete, {'<width>': str(GRID_COL_WIDTH*Decimal(0.5))})
        return cell_header, '&'

    @classmethod
    def owner(cls, id, name):
        if len(name) > 30:
            name = name[:27] + '...'
        values = {'<id>': id, '<name>': name}
        return bulid_template(cls._owner_templete, values)
