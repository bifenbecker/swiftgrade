from tempfile import mktemp

from django.conf import settings

from api.core.utils.common_utils import bulid_template
from generation_app.serializers import QuestionSerializer

import latex_constants as defs

from .base_latex_grid_builder import BaseLatexGridBuilder
from .base_latex_elements_builder import BaseLatexElementsBuilder
from .coordinates_service import CoordinatesService
from .service_constants import *


MIN_BLOCK_HEIGHT_CM = TEXT_BOX_MIN_HEIGHT / 10


class LatexDocumentBuilder:
    """Build LaTeX document which is used by SDAPS as answer sheet's template
    """

    @classmethod
    def _normalized_height(cls, question):
        height = question.get('height') or 1
        if height == 1:
            return MIN_BLOCK_HEIGHT_CM
        return 1.25 * (height or 1) - 0.25

    @classmethod
    def _normalized_width(cls, question):
        width = question.get('width', 8)
        kind = question.get('kind', 'fib')
        full = 36

        if width >= 17:
            return full - 1
        if width >= 13:
            return 2 * full // 3 - 1
        if width >= 9:
            return full // 2 - 1
        if width <= 4 and kind != 'fib':
            return full // 4 - 1
        return full // 3 - 1

    @classmethod
    def _get_doc_template(cls):
        f = open('template.tex', 'r')
        template = f.read()
        f.close()
        return template

    @classmethod
    def _write_doc(cls, data, file_name):
        f = open(file_name, "w")
        f.write(data)
        f.close()

    @classmethod
    def _get_base_values(cls, data, fullness=0):
        values = {
            '<type>': data["assessment"]["kind"].capitalize(),
            '<logo>': settings.LOGO_IMAGE_PATH,
            '<font>': settings.FONTS_PATH,
            '<header>': BaseLatexGridBuilder.build_header(fullness),
            '<tex_folder>': settings.TEX_FOLDER,
            '<footer>': BaseLatexGridBuilder.build_footer(fullness),
            '<user_data>': BaseLatexGridBuilder.build_user_data(fullness),
            '<anchor_width>': f'{defs.ANCHOR_WIDTH}mm',
            '<anchor_height>': f'{defs.ANCHOR_HEIGHT}mm',
            '<anchor_left_margin>': f'{defs.ANCHOR_LEFT_MARGIN}mm',
            '<anchor_right_margin>': f'{defs.ANCHOR_RIGHT_MARGIN}mm',
            '<anchor_top_margin>': f'{defs.ANCHOR_TOP_MARGIN}mm',
            '<anchor_bottom_margin>': f'{defs.ANCHOR_BOTTOM_MARGIN}mm',
            '<footskip>': f'{defs.FOOTSKIP}mm',
            '<headheight>': f'{HEADHEIGHTS[fullness]}mm',
            '<instructions_top_margin>': f'{INSTRUCTION_TOP_MARGINS[OTHER_PAGE_KEY][fullness]}mm',
            '<instructions_top_margin1>': f'{INSTRUCTION_TOP_MARGINS[FIRST_PAGE_KEY][fullness]}mm',
            '<instructions_bottom_margin>': f'{INSTRUCTION_BOTTOM_MARGINS[OTHER_PAGE_KEY][fullness]}mm',
            '<instructions_bottom_margin1>': f'{INSTRUCTION_BOTTOM_MARGINS[FIRST_PAGE_KEY][fullness]}mm',
        }

        if data["students"]:
            values["<owners>"] = BaseLatexGridBuilder.build_owners(
                data["assessment"]["answer_sheet_id"], data["students"]
            )
        else:
            values["<owners>"] = "test"

        return values

    @classmethod
    def _map_element(cls, question_number, question):
        """Build one question element
        :param question_number: title of questioon
        :param question: question params
        :return: height, width and element
        """

        height, width = cls._normalized_height(question), cls._normalized_width(question)
        if question["kind"] in [QuestionSerializer.DECIMAL, QuestionSerializer.NONDECIMAL, QuestionSerializer.MATH]:
            return height, width, BaseLatexElementsBuilder.numeric_textbox(question_number, height, width)
        if question["kind"] == QuestionSerializer.MC:
            return 1, 8, BaseLatexElementsBuilder.multichoice(question_number)
        if question["kind"] == QuestionSerializer.FIB:
            return height, width, BaseLatexElementsBuilder.fill_in_the_blank_textbox(question_number, height, width)
        if question["kind"] in [QuestionSerializer.WITH_UNITS, QuestionSerializer.MATH_WITH_UNITS]:
            return height, width, BaseLatexElementsBuilder.answer_units_textbox(question_number, height, width)

    @classmethod
    def _build_questions(cls, questions, fullness=0):
        """Build part of tex with questions, counts question box coordinates
        :param questions: params questions
        :param fullness: defines the way coordinates will be counted
        :return: string that can be inserted to tex doc, questions coordinates
        """

        result = ""
        question_number, current_width = 1, 0
        row = []

        init_x, init_y = CoordinatesService.get_initial_point(CUSTOM_SHEET)
        if fullness == 0:
            init_y += 2.54
        x, y = init_x, init_y

        max_row_height = 0

        params = []
        coordinates = []

        if fullness == 2:
            y, coordinates = CoordinatesService.get_names_and_email_coordinates(
                CUSTOM_SHEET, x, y
            )

        current_page = 1

        for question in questions:
            height, width, element = cls._map_element(question_number, question)
            q_width = width * BLOCK_WIDTH
            q_height = height * 10
            q_kind = question['kind']

            if q_kind in [QuestionSerializer.WITH_UNITS, QuestionSerializer.MATH_WITH_UNITS]:
                params_added = 2
                units_width = BLOCK_WIDTH * WITH_UNITS_BLOCK_UNITS_LENGTH
                answer_width = q_width - units_width
                params.extend((
                    [x, y, answer_width, q_height, q_kind],
                    [x+answer_width, y, units_width, q_height, q_kind]
                ))
            else:
                params_added = 1
                params.extend([[x, y, q_width, q_height, q_kind]])

            new_width = current_width + 1 + width

            if new_width > GRID_COUNT:
                extra_params = params[-params_added:]
                params = params[:-params_added]

                x, y, row_coordinates, current_page = CoordinatesService.get_row_coordinates(
                    fullness, y, max_row_height, params, current_page
                )
                coordinates.extend(row_coordinates)
                current_width = 1 + width
                max_row_height = q_height

                mem = 0
                for extra_param in extra_params:
                    extra_param[0] = x + mem
                    extra_param[1] = y
                    mem = extra_param[2]

                result += BaseLatexGridBuilder.build_row(row)
                row = []
                params = extra_params
            else:
                current_width = new_width

            x = init_x - BLOCK_WIDTH + (current_width+1)*BLOCK_WIDTH
            max_row_height = max(q_height, max_row_height)

            row.append(element)
            is_last_question = question_number == len(questions)

            if current_width == GRID_COUNT or is_last_question:
                x, y, row_coordinates, current_page = CoordinatesService.get_row_coordinates(
                    fullness, y, max_row_height, params, current_page
                )
                coordinates.extend(row_coordinates)
                current_width = 0
                max_row_height = 0

                result += BaseLatexGridBuilder.build_row(row)
                row = []
                params = []

            question_number += 1

        return result, coordinates

    @classmethod
    def generate_document(cls, data, fullness=0):
        """Combine all parts (template, context, logo url, font setings etc.)  to one tex document
        :param data: questions data
        :param fullness: 0 - if want to generate answer sheet for existing students, 2 - with FN, LN, Email
        :return: tex document
        """

        template = cls._get_doc_template()
        values = cls._get_base_values(data, fullness)
        values["<content>"], coordinates = cls._build_questions(data["questions"], fullness)
        tmp = mktemp(prefix='sdaps-template-', suffix='.tex')
        cls._write_doc(bulid_template(template, values), tmp)
        return tmp, coordinates

    @classmethod
    def preview_document(cls, data, fullness=0):
        template = cls._get_doc_template()
        data["students"] = [data["student"]] if data["student"] else []
        values = cls._get_base_values(data, fullness)

        if fullness != 2:
            name = data["student"]["name"]

            if len(name) > 30:
                name = name[:27] + '...'

            name = BaseLatexGridBuilder.strip(name)
            values["<owners>"] = name

        values["<content>"], coordinates = cls._build_questions(data["questions"], fullness)
        tmp = mktemp(prefix='sdaps-template-', suffix='.tex')
        cls._write_doc(bulid_template(template, values), tmp)
        return tmp, coordinates
