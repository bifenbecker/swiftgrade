from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from users.schemas import ActiveTeachersWithResultsSchema
from users.services.statistics import StatisticsService
from users.helpers.chart_helper import ChartHelper


TITLE = _("Number of teachers with a new result")


class ActiveTeachersWithResultsView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = ActiveTeachersWithResultsSchema

    def get(self, request, period):
        datelist = ChartHelper.get_chart_dates(period)
        active_teachers = StatisticsService.get_active_teachers_with_results(datelist)
        labels = ChartHelper.format_dates_to_labels(datelist, period)
        chart_structure = ChartHelper.get_chart_structure(active_teachers, labels, TITLE)
        return Response(chart_structure)
