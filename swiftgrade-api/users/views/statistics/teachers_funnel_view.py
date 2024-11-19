from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from users.constants import FUNNEL_SINCE_START
from users.schemas import TeachersFunnelSchema
from users.services.statistics.teachers_funnel_service import TeachersFunnelService
from users.helpers.chart_helper import ChartHelper


TITLE = _("Teachers funnel")


class TeachersFunnelView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = TeachersFunnelSchema

    def get(self, request, period):
        datelist = ChartHelper.get_chart_dates(period)
        active_teachers = TeachersFunnelService.get_funnel_data(datelist, period=='since_start')
        labels = ChartHelper.format_dates_to_labels(datelist, period, period=='since_start')
        chart_structure = ChartHelper.get_chart_structure(active_teachers, labels, TITLE)
        return Response(chart_structure)
