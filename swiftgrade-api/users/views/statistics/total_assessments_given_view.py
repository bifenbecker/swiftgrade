from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from users.helpers.chart_helper import ChartHelper
from users.services.statistics import AssessmentsGivenService
from users.schemas import TotalAssessmentsGivenSchema


ASSESSMENT_TYPE_METHODS = {
    "total": "get_total_assessments_given",
    "paper_vs_online": "get_paper_vs_online_assessments_given",
    "test_type": "get_type_assessments_given",
}

TITLE = _("Number of assessments with their first result")


class TotalAssessmentsGivenView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = TotalAssessmentsGivenSchema

    def get(self, request, assessment_type, period):
        if assessment_type in ASSESSMENT_TYPE_METHODS:
            datelist = ChartHelper.get_chart_dates(period)
            get_assessments_method = getattr(AssessmentsGivenService, ASSESSMENT_TYPE_METHODS[assessment_type])
            assessments = get_assessments_method(datelist)
            labels = ChartHelper.format_dates_to_labels(datelist, period)
            chart_structure = ChartHelper.get_chart_structure(assessments, labels, TITLE)
            return Response(chart_structure)
        return Response({"errors": _("Incorrect assessment type.")}, status=HTTP_400_BAD_REQUEST)
