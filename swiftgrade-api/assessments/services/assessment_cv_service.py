from api.core.services import BaseCVService
from api.core.logger.custom_logger import CustomLogger

ENDPOINTS = {
    # 'custom_barcode': '/parse_barcode/',
    # 'generic_barcode': '/fast_parse/',
    'generate_answer_sheet': '/answer_sheet/generate/',
    'preview_answer_sheet': '/answer_sheet/preview/',
    'scan': '/answer_sheet/batch/{session_id}/recognize/',
    'generate_generic_answer_sheet': '/answer_sheet/generate/generic/',
    'preview_generic_answer_sheet': '/answer_sheet/preview/generic/',
    'coordinates': '/coordinates/{coordinate_id}/',
    'cropping_answer_images': '/generic_answer_sheet/batch/{session_id}/cropping/',
    'generic_scan': '/generic_answer_sheet/batch/{session_id}/recognize/',
}

logger = CustomLogger.get_logger(__name__, 'cv_requests.log')

def log(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)

        logger.info(f'Doc: {func.__doc__}')
        logger.info(f'Parameters: {args[1:]}')
        logger.info(f'Returns: {result}')

        return result
    return wrapper


class AssessmentCVService(BaseCVService):
    @classmethod
    @log
    def get_coordinates(cls, coordinate_id):
        """
        Getting coordinates

        Parameters:
            coordinate_id (str): identifier of coordinate

        Returns:
            tuple: (response_data, status_code, )
        """
        url = cls.get_absolute_url(ENDPOINTS['coordinates'].format(coordinate_id=coordinate_id))
        response_data, status_code = cls.call(request_type='get', url=url)
        return response_data, status_code

    @classmethod
    @log
    def generate_answer_sheet(cls, data):
        """
        Generation of answer sheet

        Parameters:
            data (dict): Data for the generation of answer sheet

        Returns:
            tuple: (response_data, status_code, )
        """
        url = cls.get_absolute_url(ENDPOINTS['generate_answer_sheet'])
        response_data, status_code = cls.call(request_type='post', url=url, json=data)
        return response_data, status_code

    @classmethod
    @log
    def preview_answer_sheet(cls, data):
        """
        Generation of preview

        Parameters:
            data (dict): Data for the generation of preview

        Returns:
            tuple: (response_data, status_code, )
        """
        url = cls.get_absolute_url(ENDPOINTS['preview_answer_sheet'])
        response_data, status_code = cls.call(request_type='post', url=url, json=data)
        return response_data, status_code

    # @classmethod
    # @log
    # def parse_barcode(cls, key, data):
    #     """
    #     Parse barcode
    #
    #     Parameters:
    #         key (str): generic/custom
    #         data (dict): Photo for parsing
    #
    #     Returns:
    #         tuple: (response_data, status_code, )
    #     """
    #     url = cls.get_absolute_url(ENDPOINTS[f'{key}_barcode'])
    #     response_data, status_code = cls.call(request_type='post', url=url, json=data)
    #     return response_data, status_code

    @classmethod
    @log
    def scan(cls, data, session_id):
        """
        Create batch for recognition

        Parameters:
            data (dict): Data for recognition
            session_id (str): identifier of session

        Returns:
            tuple: (response_data, status_code, )
        """
        url = cls.get_absolute_url(ENDPOINTS['scan'].format(session_id=session_id))
        response_data, status_code = cls.call(request_type='post', url=url, json=data)
        return response_data, status_code

    @classmethod
    @log
    def generate_generic_answer_sheet(cls, data):
        """
        Generation of generic answer sheet

        Parameters:
            data (dict): Data for the generation of answer sheet

        Returns:
            tuple: (response_data, status_code, )
        """
        url = cls.get_absolute_url(ENDPOINTS['generate_generic_answer_sheet'])
        response_data, status_code = cls.call(request_type='post', url=url, json=data)
        return response_data, status_code

    @classmethod
    @log
    def preview_generic_answer_sheet(cls, data):
        """
        Generation of generic preview

        Parameters:
            data (dict): Data for the generation of preview

        Returns:
            tuple: (response_data, status_code, )
        """
        url = cls.get_absolute_url(ENDPOINTS['preview_generic_answer_sheet'])
        response_data, status_code = cls.call(request_type='post', url=url, json=data)
        return response_data, status_code

    @classmethod
    @log
    def cropping_answer_images(cls, data, session_id):
        """
        Cropping answer images for generic AS

        Parameters:
            data (dict): Data for cropping
            session_id (str): identifier of session

        Returns:
            tuple: (response_data, status_code, )
        """
        url = cls.get_absolute_url(ENDPOINTS['cropping_answer_images'].format(session_id=session_id))
        response_data, status_code = cls.call(request_type='post', url=url, json=data)
        return response_data, status_code

    @classmethod
    @log
    def generic_scan(cls, data, session_id):
        """
        Cropping answer images for generic AS

        Parameters:
            data (dict): Data for recognition
            session_id (str): identifier of session

        Returns:
            tuple: (response_data, status_code, )
        """
        url = cls.get_absolute_url(ENDPOINTS['generic_scan'].format(session_id=session_id))
        response_data, status_code = cls.call(request_type='post', url=url, json=data)
        return response_data, status_code
