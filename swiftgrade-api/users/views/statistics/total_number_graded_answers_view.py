from django.utils.translation import ugettext as _
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from users.helpers.chart_helper import ChartHelper
from users.services.statistics import GradedAnswersService
from users.schemas import TotalNumberGradedAnswersSchema


ANSWER_TYPE_METHODS = {
    "total": "get_total_number_of_graded_answers",
    "paper_vs_online": "get_paper_vs_online_number_of_graded_answers",
    "mc_vs_handwritten": "get_mc_vs_hand_number_of_graded_answers",
    "answer_type": "get_answer_type_number_of_graded_answers",
}

TITLE = _("Number of answers graded")


class TotalNumberGradedAnswersView(APIView):
    authentication_classes = (SessionAuthentication, )
    permission_classes = (IsAdminUser, )
    swagger_schema = TotalNumberGradedAnswersSchema

    def get(self, request, answer_type, period):
        if answer_type in ANSWER_TYPE_METHODS:
            datelist = ChartHelper.get_chart_dates(period)
            graded_answers_method = getattr(GradedAnswersService, ANSWER_TYPE_METHODS[answer_type])
            graded_answers = graded_answers_method(datelist)
            labels = ChartHelper.format_dates_to_labels(datelist, period)
            chart_structure = ChartHelper.get_chart_structure(graded_answers, labels, TITLE)
            return Response(chart_structure)
        return Response({"errors": _("Incorrect answer type.")}, status=HTTP_400_BAD_REQUEST)
