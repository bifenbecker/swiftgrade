from api.core.doc_utils import BaseSwaggerSchema, OpenapiConverter

from assessments.models import AnswerMark, AssessmentItem, Assessment
from assessments.serializers import AssessmentsListSerializer

from collections import OrderedDict
from drf_yasg import openapi


MARKS = openapi.Items(
    type=openapi.TYPE_OBJECT,
    properties=OrderedDict((
        ("kind", openapi.Schema(type=openapi.TYPE_STRING, enum=AnswerMark.KINDS)),
        ("value", openapi.Schema(type=openapi.TYPE_INTEGER)),
    )),
)

ASSESSMENT_ITEMS = openapi.Items(
    type=openapi.TYPE_OBJECT,
    properties=OrderedDict((
        ("answers", openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Items(
            type=openapi.TYPE_OBJECT,
            properties=OrderedDict((
                ("body", openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=OrderedDict((
                        ("actual_height", openapi.Schema(type=openapi.TYPE_INTEGER)),
                        ("answer", openapi.Schema(type=openapi.TYPE_STRING)),
                        ("evaluation_displayed", openapi.Schema(type=openapi.TYPE_BOOLEAN)),
                        ("fraction_mode", openapi.Schema(type=openapi.TYPE_BOOLEAN)),
                        ("height", openapi.Schema(type=openapi.TYPE_INTEGER)),
                        ("value", openapi.Schema(type=openapi.TYPE_STRING)),
                        ("width", openapi.Schema(type=openapi.TYPE_INTEGER)),
                    )),
                )),
                ("scientific_notation", openapi.Schema(type=openapi.TYPE_INTEGER)),
                ("significant_figure", openapi.Schema(type=openapi.TYPE_INTEGER)),
                ("tolerance", openapi.Schema(type=openapi.TYPE_INTEGER)),
                ("tolerance_data", openapi.Schema(type=openapi.TYPE_OBJECT)),
                ("marks", openapi.Schema(type=openapi.TYPE_ARRAY, items=MARKS))
            )),
        ))),
        ("kind", openapi.Schema(type=openapi.TYPE_STRING, enum=AssessmentItem.KINDS)),
        ("number", openapi.Schema(type=openapi.TYPE_INTEGER)),
        ("setting", openapi.Schema(type=openapi.TYPE_ARRAY, items=['decimal']))
    )),
)

ASSESSMENT = [
    openapi.Parameter(name='assessment_items', in_=openapi.IN_BODY, type=openapi.TYPE_ARRAY, items=ASSESSMENT_ITEMS),
    openapi.Parameter(name='kind', in_=openapi.IN_BODY, type=openapi.TYPE_STRING, enum=Assessment.KIND_CHOICES),
    openapi.Parameter(name='name', in_=openapi.IN_BODY, type=openapi.TYPE_STRING),
    openapi.Parameter(name='status', in_=openapi.IN_BODY, type=openapi.TYPE_STRING, enum=Assessment.STATUS_CHOICES),
]

ASSESSMENT_FOR_CREATE = [
    openapi.Parameter(name='assessment_items', in_=openapi.IN_BODY, type=openapi.TYPE_ARRAY, items=ASSESSMENT_ITEMS),
    openapi.Parameter(name='name', in_=openapi.IN_BODY, type=openapi.TYPE_STRING),
]

ASSESSMENT_FOR_UPDATE = [
    openapi.Parameter(name='name', in_=openapi.IN_BODY, type=openapi.TYPE_STRING),
]


class BaseAssessmentSchema(BaseSwaggerSchema):
    def _get_schema(self):
        assessments = self.serializer_to_schema(AssessmentsListSerializer())
        return openapi.Schema(type=openapi.TYPE_ARRAY, items=assessments)

    def get_request_body_parameters(self, consumes):
        if self.method in ["PUT", "PATCH", "POST"]:
            data = ASSESSMENT_FOR_CREATE if self.method == "POST" else ASSESSMENT_FOR_UPDATE
            request_fields = OpenapiConverter.convert_fields_in_schema(data)
            return [self.make_body_parameter(request_fields)]
        return super().get_request_body_parameters(consumes)
