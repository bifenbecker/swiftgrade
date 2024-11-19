from math import ceil
from django.conf import settings

from api.core.utils.common_utils import bulid_template

import latex_constants as defs

from .base_latex_elements_builder import BaseLatexElementsBuilder
from .base_latex_grid_builder import BaseLatexGridBuilder
from .coordinates_service import CoordinatesService

from tempfile import mktemp


FIRST_COLUMN_MAX_NUMBER = 25
SECOND_COLUMN_MAX_NUMBER = 50
THIRD_COLUMN_MAX_NUMBER = 75
MAX_NUMBER_OF_ANSWERS = 100

COLUMN_HEADER = f'&\\textcolor{{white}}{{.}}&\lettersheader'
LETTERS_HEADER = ['A', 'B', 'C', 'D', 'E']


class GenericDocumentBuilder:
    @classmethod
    def _get_doc_template(cls, data):
        f = open(f'tex/templates/100{0 if not data["answer_sheet_id_for_blank"] else 2}.tex',
                 'r')
        template = f.read()
        f.close()
        return template

    @classmethod
    def _get_preview_template(cls, data):
        f = open(f'tex/templates/100{0 if not data["answer_sheet_for_blank"] else 2}.tex',
                 'r')
        template = f.read()
        f.close()
        return template

    @classmethod
    def _write_doc(cls, data, file_name):
        f = open(file_name, "w")
        f.write(data)
        f.close()

    @classmethod
    def _strip(cls, value):
        return BaseLatexGridBuilder.strip(value)

    @classmethod
    def _name_normalized(cls, name):
        if len(name) > 30:
            return BaseLatexGridBuilder.strip(name[:27] + '...')
        return BaseLatexGridBuilder.strip(name)

    @classmethod
    def _build_owners(cls, data, fullness, class_name):
        owners = ""
        for student in data["students"]:
            if class_name["id"] in student["class_ids"]:
                name = cls._name_normalized(student["name"])
                id = f'{fullness}{class_name["answer_sheet_id"]}.{class_name["id"]}.{student["id"]}'
                owners += BaseLatexElementsBuilder.owner(id, name)
        return owners

    @classmethod
    def _get_base_values(cls, data, fullness, class_name):
        values = {
            '<logo>': settings.LOGO_IMAGE_PATH,
            '<font>': settings.FONTS_PATH,
            '<anchor_width>': f'{defs.ANCHOR_WIDTH}mm',
            '<anchor_height>': f'{defs.ANCHOR_HEIGHT}mm',
            '<anchor_left_margin>': f'{defs.ANCHOR_LEFT_MARGIN}mm',
            '<anchor_right_margin>': f'{defs.ANCHOR_RIGHT_MARGIN}mm',
            '<anchor_top_margin>': f'{defs.ANCHOR_TOP_MARGIN}mm',
            '<anchor_bottom_margin>': f'{defs.ANCHOR_BOTTOM_MARGIN}mm',
            '<footskip>': f'{defs.FOOTSKIP}mm',
            '<columns_header>': cls._get_columns_header(data['number_of_answers']),
            '<letters_header>': cls._get_letters_header(data['number_of_letters']),
            '<mc_boxes>': cls._get_mc_boxes(data['number_of_letters']),
        }

        if class_name:
            values["<owners>"] = cls._build_owners(data, fullness, class_name)
        else:
            values["<owners>"] = "test"

        return values

    @classmethod
    def generate_document(cls, data, fullness, class_name):
        template = cls._get_doc_template(data)
        template = cls._remove_extra_answers(data, template)
        values = cls._get_base_values(data, fullness, class_name)
        # TODO: move coordinates service to coordinates app ???
        coordinates = CoordinatesService.get_generic_coordinates(fullness)
        tmp = mktemp(suffix='.tex', prefix='sdaps-template-')
        cls._write_doc(bulid_template(template, values), tmp)
        return tmp, coordinates

    @classmethod
    def preview_document(cls, data, answer_sheet_id, fullness=0):
        template = cls._get_preview_template(data)
        template = cls._remove_extra_answers(data, template)
        if not data["answer_sheet_for_blank"]:
            for student in data["student"]:
                student["class_ids"] = [data["class_name"]["id"]]
            data["students"] = data["student"]
            data["class_name"]["answer_sheet_id"] = answer_sheet_id
        else:
            data["students"] = []
        values = cls._get_base_values(data, fullness, data["class_name"])
        coordinates = CoordinatesService.get_generic_coordinates(fullness)
        tmp = mktemp(prefix='sdaps-template-', suffix='.tex')
        cls._write_doc(bulid_template(template, values), tmp)
        return tmp, coordinates

    @staticmethod
    def _remove_extra_answers(data, template):
        for answer in range(data['number_of_answers'] + 1, MAX_NUMBER_OF_ANSWERS + 1):
            mctitle = '\mctitleleft' if answer <= FIRST_COLUMN_MAX_NUMBER else '&\mctitle'
            delete_answer_pattern = f'{mctitle}{{{answer}.}}&\\vspace{{-3.8mm}}\mcboxes{{{answer}}}{{5}}'
            template = template.replace(delete_answer_pattern, '')
        
        return template
    
    @staticmethod
    def _get_columns_header(number_of_answers):
        """
        Returns number of columns depends on number of answers in latex format.
        """
        return (ceil(number_of_answers / FIRST_COLUMN_MAX_NUMBER) * COLUMN_HEADER)[1:]

    @staticmethod
    def _get_letters_header(number_of_letters):
        """
        Returns number of letters in latex format.
        """
        return f'\hspace{{4.55mm}}'.join(LETTERS_HEADER[:number_of_letters])

    @staticmethod
    def _get_mc_boxes(number_of_letters):
        """
        Returns the number of circles to draw on the form.
        """
        mc_boxes = []
        for i, _ in enumerate(LETTERS_HEADER[:number_of_letters]):
            mc_boxes.append(f'\sdaps_context_set:n {{ * = {{ ellipse }} }}\n \sdaps_answer:n {{ #1_c_{i + 1} }} \sdaps_checkbox:nn {{#1_c_{i + 1}}} {{}}\n')

        return f'\hspace{{1.5mm}}\n'.join(mc_boxes)
