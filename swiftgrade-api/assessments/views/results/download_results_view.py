from assessments.serializers import AssessmentResultsListForDownloadSerializer
from assessments.services import AssessmentResultsService, CreateExcelFileService
from django.shortcuts import HttpResponse

from .base_assessment_results_view import BaseAssessmentResultsView

class DownloadResultsView(BaseAssessmentResultsView):
    """
        Create excel file with students info and students results:
        First name, Last name, Email, Mark, Mark (%)
    """
    serializer_class = AssessmentResultsListForDownloadSerializer

    def get(self, request, *args, **kwargs):
        """
            Returns excel file with assessment details and students results.
        """
        assessment, ordering = self.get_object(), self._get_ordering(self.request.query_params)

        total = AssessmentResultsService.get_assessment_total_mark(assessment)
        results = AssessmentResultsService.get_assessment_results_summary(assessment, ordering)
        results_data = AssessmentResultsListForDownloadSerializer(results, many=True, context={"total": total}).data
        results_count = results.count()

        excel_file_content = CreateExcelFileService.create_results_workbook(assessment, total, results_count, results_data)

        return HttpResponse(
            excel_file_content,
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
