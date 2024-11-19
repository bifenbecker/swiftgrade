from decimal import Decimal

from api.core.utils.common_utils import bulid_template
import latex_constants as defs

from .base_latex_elements_builder import BaseLatexElementsBuilder
from .service_constants import NAME_BLOCK_LENGTH


ESCAPING_MAP = {
    '\\': '\\textbackslash ',
    '#': '\\#',
    '%': '\\%',
    '&': '\\&',
    '~': '\\textasciitilde ',
    '^': '\\textasciicircum ',
    '{': '\\{',
    '}': '\\}',
    '$': '\\$',
    '>': '$>$',
    '<': '$<$',
    ' ': '~'
}


class BaseLatexGridBuilder:
    """
    Build base parts of LaTeX document
    """
    _user_data_template = """\\begin{tabular}{<headers>}
      <row>
    \\end{tabular}
    \\par
    """

    @staticmethod
    def _space(mm=5):
      return f"\n\\vspace*{{{mm}mm}}\n"

    _row_template = """\\begin{tabular*}{\\textwidth}[t]{<headers>}
      <row>
    \\end{tabular*}
    \\par
    """

    _unnamed_header_template = """\\ifnum\\thepage=1
      \\hspace{8mm}{\\normalfont Date:} \\rule{4cm}{0.15mm}\\hspace*{\\fill}
    \\else
      \\hspace{8mm}{\\normalfont Name:} \\rule{4cm}{0.15mm}\\hspace*{\\fill}
    \\fi
    \\vspace*{-3mm}"""
    _named_header_template = """
      \\hspace{8mm}{\\normalfont Date:} \\rule{4cm}{0.15mm}\\hspace*{\\fill}
    \\vspace{-2mm}"""
    _unnamed_footer_template = """
          \\begin{scope}[shift={($(\paperwidth, <anchor_bottom_margin>) + (-<anchor_right_margin>-<anchor_width>+9.5mm, 0mm)$)}]
            \\node(page)[anchor=south~east,outer~sep=0,inner~sep=0]{
              Pg. \\thepage/\\pageref*{LastPage}
            };
          \\end{scope}
          \\begin{scope}[shift={($(\paperwidth/2, <anchor_bottom_margin>) + (19mm, 0mm)$)}]
            \\node(logo)[anchor=south~east,outer~sep=0,inner~sep=0]{
              \\textsf{Sheet~type:~Regular}
            };
          \end{scope}
          """
    _named_footer_template = """
          \\begin{scope}[shift={($(\paperwidth, <anchor_bottom_margin>) + (-<anchor_right_margin>-<anchor_width>+9.5mm, 0mm)$)}]
            \\node(page)[anchor=south~east,outer~sep=0,inner~sep=0]{
              Pg. \\thepage/\\pageref*{LastPage}
            };
          \\end{scope}
          \\begin{scope}[shift={($(<anchor_left_margin>, <anchor_bottom_margin>) + (<anchor_width>+4cm, 0mm)$)}]
            \\node(sheet)[anchor=south~west,outer~sep=0,inner~sep=0]{
              \\textsf{Sheet~type:~Regular}
            };
          \end{scope}
          """
    _dashed_line = """\\begin{tikzpicture}[remember~picture,overlay]\n
      \\begin{scope}[shift={(0mm, -2.5mm)}]
        \\draw [dashed,color=black,line~width=0.5mm] (0, 0) -- (\\textwidth, 0);
      \\end{scope}
    \\end{tikzpicture}
    \\vspace{-3.1mm}"""

    @classmethod
    def _accumulate_templates(cls, templates):
        headers, rows = "", ""
        for template in templates:
            headers += template[0]
            rows += template[1]
        return headers, rows

    @classmethod
    def _normalize_row(cls, row):
        if row[-1] == '&':
            row = row[:-1]
        return row

    @classmethod
    def strip(cls, value):
        return bulid_template(value, ESCAPING_MAP)

    @classmethod
    def build_row(cls, questions):
        """
        Build string with LaTeX code of one row of document
        :param questions: question that should be fitted to row
        :return: string with code of doc's row
        """
        headers, row = cls._accumulate_templates(questions)
        values = {'<headers>': headers, '<row>': cls._normalize_row(row)}
        return bulid_template(cls._row_template, values)

    @classmethod
    def build_user_data(cls, fullness=0):
        """
        Build string with LaTeX code of element with FN LN Email
        :param fullness: 0 - if want to generate answer sheet for existing students, 2 - with FN, LN, Email fields
        :return: string with code of FN, LN, Email LaTeX elements
        """
        if fullness == 0:
            return ''
        headers, row = cls._accumulate_templates([
            BaseLatexElementsBuilder.user_data_textbox("Email", 36)
        ])
        values = {'<headers>': headers, '<row>': cls._normalize_row(row)}
        email_line = bulid_template(cls._user_data_template, values)
        headers, row = cls._accumulate_templates([
            BaseLatexElementsBuilder.user_data_textbox("First name", Decimal(NAME_BLOCK_LENGTH)),
            BaseLatexElementsBuilder.empty_cell(),
            BaseLatexElementsBuilder.empty_cell(),
            BaseLatexElementsBuilder.user_data_textbox("Last name", Decimal(NAME_BLOCK_LENGTH)),
        ])
        values = {'<headers>': headers, '<row>': cls._normalize_row(row)}
        names_line = bulid_template(cls._user_data_template, values)
        return ''.join([cls._space(-12.5), names_line,
                        cls._space(-3.5), email_line,
                        cls._space(6)])

    @classmethod
    def build_header(cls, fullness=0):
        """
        Build string with LaTeX code of documents header
        :param fullness: 0 - if want to generate answer sheet for existing students, 2 - with FN, LN, Email fields
        :return: string with code of header elements
        """

        if fullness == 2:
            return cls._unnamed_header_template

        return cls._named_header_template

    @classmethod
    def build_footer(cls, fullness=0):
        """
        Build string with LaTeX code of documents footer
        :param fullness:0 - if want to generate answer sheet for existing students, 2 - with FN, LN, Email fields
        :return: string with code of footer elements
        """
        values = {
            '<anchor_width>': f'{defs.ANCHOR_WIDTH}mm',
            '<anchor_height>': f'{defs.ANCHOR_HEIGHT}mm',
            '<anchor_left_margin>': f'{defs.ANCHOR_LEFT_MARGIN}mm',
            '<anchor_right_margin>': f'{defs.ANCHOR_RIGHT_MARGIN}mm',
            '<anchor_top_margin>': f'{defs.ANCHOR_TOP_MARGIN}mm',
            '<anchor_bottom_margin>': f'{defs.ANCHOR_BOTTOM_MARGIN}mm',
            '<footskip>': f'{defs.FOOTSKIP}mm',
        }
        template = cls._unnamed_footer_template
        if fullness == 0:
            template = cls._named_footer_template
        return bulid_template(template, values)

    @classmethod
    def build_owners(cls, assessment_id, students):
        """
        Build string with LaTeX code of documents owners names that SDAPS print in left coner of answer sheet
        :param assessment_id:
        :param students: students which names should be printed
        :return: string with code of LaTeX MACROS which returns student name by its' global_id
        """
        owners = ""
        for student in students:
            name = student["name"]
            if len(name) > 30:
                name = name[:27] + '...'
            owners += BaseLatexElementsBuilder.owner(f'{assessment_id}.{student["id"]}', cls.strip(name))
        return owners
