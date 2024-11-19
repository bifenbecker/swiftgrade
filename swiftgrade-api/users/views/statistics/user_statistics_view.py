from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from users.schemas import UserStatisticsSchema
from users.services.statistics import StatisticsService
from users.helpers.chart_helper import ChartHelper


USER_TYPES = {
    "active": {"method": "get_active_teachers", "title": _("Number of new + returning teachers")},
    "new": {"method": "get_new_teachers", "title": _("Number of new teachers")},
    "new_students": {"method": "get_new_students", "title": _("Number of new students")},
    "returning": {"method": "get_returning_teachers", "title": _("Number of returning teachers")},
    "students": {"method": "get_total_students", "title": _("Number of all students")},
    "total": {"method": "get_total_teachers", "title": _("Number of all teachers")},
}


class UserStatisticsView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = UserStatisticsSchema
    
    def get(self, request, user_type, period):
        if user_type in USER_TYPES:
            datelist = ChartHelper.get_chart_dates(period)
            get_users_method = getattr(StatisticsService, USER_TYPES[user_type]["method"])
            users = get_users_method(datelist)
            labels = ChartHelper.format_dates_to_labels(datelist, period)
            chart_structure = ChartHelper.get_chart_structure(users, labels, USER_TYPES[user_type]["title"])
            return Response(chart_structure)
        return Response({"errors": _("Incorrect user type.")}, status=HTTP_400_BAD_REQUEST)
