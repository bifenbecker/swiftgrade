import pandas as pd
from io import BytesIO

from assessments.helpers import AssessmentHelper

CELL_FORMAT = {
    'col_cell_format_params': {
        'border': True,
        'border_color': 'black',
        'bold': True,
        'bg_color': '#ddebf7',
    },
    'row_cell_format_params': {
        'border': True, 
        'align': 'left',
    },
    'cell_format_for_blank_params': {
        'border': True, 
        'align': 'left',
        'color': '#488FD0',
    },
    'details_cell_format_params': {
        'bold': True,
    },
}

RESULTS_COLUMN_NAMES = {
    'first_name': 'First name',
    'last_name': 'Last name',
    'email': 'Email',
    'mark': 'Mark',
    'mark_percentage': 'Mark %',
}

STUDENTS_COLUMN_NAMES = {
    0: 'First name',
    1: 'Last name',
    2: 'Username',
    3: 'Password',
}


class CreateExcelFileService:
    """
        Create excel file with assessment details and students results. 
        Add format for excel cells.
    """

    @staticmethod
    def _get_assessment_data(assessment, total, results_count):
        return [
            f'Class:  {assessment.group.name}',
            f'Assessment: {assessment.name}',
            f'Total marks: {AssessmentHelper.normalize_number(total)}',
            f'{results_count} {"results" if results_count > 1 else "result"}',
        ]

    @staticmethod
    def _create_data_frame(data):
        return pd.DataFrame(data)

    @staticmethod
    def _calculate_column_width(column_values, column_name = None):
        if not column_name:
            return len(max(column_values, key=len))
        return max(len(max(column_values.astype(str), key=len)), len(column_name))

    @classmethod
    def _write_additional_data(cls, workbook, worksheet, additional_data):
        """
            Write an additional data in rows to worksheet with cell formatting.
        """
        data_frame = cls._create_data_frame({'': additional_data})
        details_cell_format = workbook.add_format(CELL_FORMAT['details_cell_format_params'])

        for col_num, col in enumerate(data_frame.columns.values):
            for row_num, value in enumerate(data_frame[col].values):
                worksheet.write(row_num, col_num, value, details_cell_format)

    @classmethod
    def _write_results_data(cls, workbook, worksheet, assessment_data, results_count, results_data):
        """
            Write students results to worksheet with cell formatting.
        """
        results_df = cls._create_data_frame(results_data)
        results_df.rename(columns=RESULTS_COLUMN_NAMES, inplace=True)
        col_cell_format_params = workbook.add_format(CELL_FORMAT['col_cell_format_params'])
        row_cell_format_params = workbook.add_format(CELL_FORMAT['row_cell_format_params'])
        cell_format_for_blank_params = workbook.add_format(CELL_FORMAT['cell_format_for_blank_params'])

        if results_count > 1:
            worksheet.autofilter(f'A6:E{len(assessment_data) + 2 + results_count}')

        for col_num, col in enumerate(results_df.columns.values):

            column_width = cls._calculate_column_width(results_df[col], col)
            worksheet.set_column(col_num, col_num, column_width + 5)
            worksheet.write(len(assessment_data) + 1, col_num, col, col_cell_format_params)

            for row_num, value in enumerate(results_df[col].values):
                if value == '':
                    worksheet.write(row_num + len(assessment_data) + 2, col_num, 'Blank', cell_format_for_blank_params)
                else:
                    worksheet.write(row_num + len(assessment_data) + 2, col_num, value, row_cell_format_params)

        first_col_width = cls._calculate_column_width(assessment_data)
        worksheet.set_column(0, 0, first_col_width + 5)


    @classmethod
    def _write_students_data(cls, workbook, worksheet, students_data, additional_data):
        """
            Write students results to worksheet with cell formatting.
        """
        students_df = cls._create_data_frame(students_data)
        students_df.rename(columns=STUDENTS_COLUMN_NAMES, inplace=True)
        col_cell_format_params = workbook.add_format(CELL_FORMAT['col_cell_format_params'])
        row_cell_format_params = workbook.add_format(CELL_FORMAT['row_cell_format_params'])

        for col_num, col in enumerate(students_df.columns.values):

            column_width = cls._calculate_column_width(students_df[col], col)
            worksheet.set_column(col_num, col_num, column_width + 5)
            worksheet.write(len(additional_data) + 1, col_num, col, col_cell_format_params)

            for row_num, value in enumerate(students_df[col].values):
                worksheet.write(row_num + len(additional_data) + 2, col_num, value, row_cell_format_params)

        first_col_width = cls._calculate_column_width(additional_data)
        worksheet.set_column(0, 0, first_col_width + 5)

    @classmethod
    def create_results_workbook(cls, assessment, total, results_count, results_data):
        """
            Create workbook with worksheet "Grades".
            Add assessments data and students results to it.
        """

        assessment_data = cls._get_assessment_data(assessment, total, results_count)

        buffer = BytesIO()
        xlwriter = pd.ExcelWriter(buffer, engine='xlsxwriter')

        workbook = xlwriter.book
        worksheet = workbook.add_worksheet('Grades')

        cls._write_additional_data(workbook, worksheet, assessment_data)
        cls._write_results_data(workbook, worksheet, assessment_data, results_count, results_data)

        xlwriter.save()
        buffer.seek(0)
        
        return buffer.read()


    @classmethod
    def create_login_info_workbook(cls, students, passwords):
        """
            Create workbook with worksheet "Student login info".
            Add students info to it.
        """

        students_data = []
        additional_data = ['Student login info:']
        for student, password in zip(students, passwords):
            students_data.append([student.first_name, student.last_name, student.username, password])

        buffer = BytesIO()
        xlwriter = pd.ExcelWriter(buffer, engine='xlsxwriter')

        workbook = xlwriter.book
        worksheet = workbook.add_worksheet('Student login info')

        cls._write_additional_data(workbook, worksheet, additional_data)
        cls._write_students_data(workbook, worksheet, students_data, additional_data)

        xlwriter.save()
        buffer.seek(0)
        
        return buffer.read()
