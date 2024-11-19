from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from users.schemas import TotalAssessmentResultsSchema
from users.services.statistics import StatisticsService
from users.helpers.chart_helper import ChartHelper


TITLE = _("Number of student results")


class TotalAssessmentResultsView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = TotalAssessmentResultsSchema

    def get(self, request, period):
        datelist = ChartHelper.get_chart_dates(period)
        total_number_results = StatisticsService.get_total_assessment_results_number(datelist)
        labels = ChartHelper.format_dates_to_labels(datelist, period)
        chart_structure = ChartHelper.get_chart_structure(total_number_results, labels, TITLE)
        return Response(chart_structure)
