from generation_app.serializers import QuestionSerializer
from .service_constants import *


AMOUNT_OF_GENERIC_MC = 100
MC_IN_GROUP = 5
AMOUNT_OF_GROUPS = int(AMOUNT_OF_GENERIC_MC / MC_IN_GROUP)
GROUPS_IN_COLUMN = 5

MC_HEIGHT = 5
MC_WIDTH = 30.9
MC_V_PADDING = 1.425

MC_IN_GROUP_H_PADDING = 18.05
MC_IN_GROUP_V_PADDING = 2.5


class CoordinatesService:
    """Has functional to calculate coordinates for:
    1) custom AS: calculates coordinates for fn, ln and email
    boxes content and for each row of questions
    2) generic AS: calculates coordinates for all fields in AS at once
    """

    @classmethod
    def _with_units_box_in_row(cls, row_params):
        return any(filter(lambda params:
                          params[4] in [QuestionSerializer.WITH_UNITS, QuestionSerializer.MATH_WITH_UNITS], row_params))

    @classmethod
    def get_initial_point(cls, sheet_type):
        """
        :param sheet_type:
        :return: top-left point of questions field
        """
        y = TOP_MARGIN

        if sheet_type == GENERIC_SHEET:
            y += 2.1

        return QUESTIONAIRE_LEFT + BLOCK_WIDTH, y

    @classmethod
    def get_box_content_coordinates(cls, x, y, width, height, kind):
        """Calculates and returns inner part
        of the question box (without border)
        :param x:
        :param y:
        :param width:
        :param height:
        :param kind:
        :return: topmost and leftmost coordinate with width and height
        """

        x_shift = 0
        y_shift = 0
        coef = 2

        if kind == QuestionSerializer.MC:
            # needed to cut off empty space and mc letters (above circles now)
            x_shift = MC_X_SHIFT
            y_shift = MC_Y_SHIFT
            coef = 0

        height = height - BORDER_WIDTH * coef

        return (
            round(x + BORDER_WIDTH + BUFFER - INITIAL_X, PRECISION),
            round(y + BORDER_WIDTH + BUFFER - INITIAL_Y + y_shift, PRECISION),
            round(width - BORDER_WIDTH*2 - BUFFER*2 - x_shift, PRECISION),
            round(height - BUFFER*2 - y_shift, PRECISION),
        )

    @classmethod
    def get_row_coordinates(cls, fullness, y, max_row_height, row_params, current_page):
        if y + max_row_height >= BOTTOM_MARGIN:
            current_page += 1
            y = TOP_MARGIN + 2.5

            if fullness == 2:
                y -= 1

            for box_params in row_params:
                box_params[1] = y

        x = cls.get_initial_point(CUSTOM_SHEET)[0]

        vertical_indent = BOX_VERTICAL_MARGIN - 0.045

        y += max_row_height + vertical_indent

        coordinates = []

        for box_params in row_params:
            q_x, q_y, q_width, q_height = cls.get_box_content_coordinates(*box_params)
            coordinates.append({
                'x': q_x,
                'y': q_y,
                'width': q_width,
                'height': q_height,
                'type': box_params[-1],
                'page': current_page,
            })

        return x, y, coordinates, current_page

    @classmethod
    def get_names_and_email_coordinates(cls, sheet_type, x, y):
        """Calculates coordinates for fn, ln and email boxes content
        :param sheet_type:
        :param x:
        :param y:
        :return: names and email boxes coordinates and y coordinate for the next question
        """

        if sheet_type == CUSTOM_SHEET:
            EMAIL_TOP_INDENT = CUSTOM_EMAIL_TOP_INDENT
            EMAIL_BOTTOM_INDENT = CUSTOM_EMAIL_BOTTOM_INDENT
            FN_LN_TITLE_INDENT = CUSTOM_FN_LN_TITLE_INDENT
        elif sheet_type == GENERIC_SHEET:
            EMAIL_TOP_INDENT = GENERIC_EMAIL_TOP_INDENT
            EMAIL_BOTTOM_INDENT = GENERIC_EMAIL_BOTTOM_INDENT
            FN_LN_TITLE_INDENT = GENERIC_FN_LN_TITLE_INDENT

        x -= BLOCK_WIDTH
        y += FN_LN_TITLE_INDENT

        coordinates = [
            {'x': x, 'y': y, 'width': BLOCK_WIDTH*NAME_BLOCK_LENGTH, 'height': TEXT_BOX_MIN_HEIGHT, 'type': 'first_name', 'page': 1},
            {'x': x+BLOCK_WIDTH*(NAME_BLOCK_LENGTH+1), 'y': y, 'width': BLOCK_WIDTH*NAME_BLOCK_LENGTH, 'height': TEXT_BOX_MIN_HEIGHT, 'type': 'last_name', 'page': 1},
            {'x': x, 'y': y+TEXT_BOX_MIN_HEIGHT+EMAIL_TOP_INDENT, 'width': BLOCK_WIDTH*36, 'height': TEXT_BOX_MIN_HEIGHT, 'type': 'email', 'page': 1},
        ]

        for coordinate in coordinates:
            x, y, width, height = cls.get_box_content_coordinates(
                coordinate['x'],
                coordinate['y'],
                coordinate['width'],
                coordinate['height'],
                QuestionSerializer.NONDECIMAL,
            )
            coordinate['x'] = x
            coordinate['y'] = y
            coordinate['width'] = width
            coordinate['height'] = height

        y += TEXT_BOX_MIN_HEIGHT*2 + EMAIL_TOP_INDENT + EMAIL_BOTTOM_INDENT
        return y, coordinates

    @classmethod
    def _get_mc_group_coordinates(cls, x, y):
        coordinates = []

        for _ in range(MC_IN_GROUP):
            coordinates.append({
                'x': x - INITIAL_X,
                'y': y - INITIAL_Y,
                'width': MC_WIDTH,
                'height': MC_HEIGHT,
                'type': QuestionSerializer.MC,
                'page': 1
            })
            y += MC_HEIGHT + MC_V_PADDING

        return coordinates

    @classmethod
    def get_generic_coordinates(cls, fullness):
        """Calculates coordinates for all mc groups in generic sheet
        :param fullness:
        :return: coordinates for all mc groups
        """

        x, y = cls.get_initial_point(GENERIC_SHEET)
        y, coordinates = cls.get_names_and_email_coordinates(GENERIC_SHEET, x, y)

        if fullness == 0:
            coordinates = []

        initial_x = x - BLOCK_WIDTH + 4.9
        x = initial_x
        initial_y = y

        for group_num in range(AMOUNT_OF_GROUPS):
            coordinates.extend(cls._get_mc_group_coordinates(x, y))
            y += (MC_HEIGHT + MC_V_PADDING) * MC_IN_GROUP + MC_IN_GROUP_V_PADDING

            if (group_num+1) % GROUPS_IN_COLUMN == 0:
                y = initial_y
                x += MC_WIDTH + MC_IN_GROUP_H_PADDING

        return coordinates
