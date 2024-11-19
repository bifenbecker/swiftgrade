from typing import Optional
from assessments.models import Assessment, AssessmentResult, CompletedAssessment


def process_assessment_result(assessment_result: AssessmentResult) -> Optional[CompletedAssessment]:
    """
    Create if does not exists CompletedAssessment
    Args:
        assessment_result (): AssessmentResult

    Returns: CompletedAssessment or None

    """
    return CompletedAssessment.objects.get_or_create(
        assessment_id=assessment_result.assessment_id,
        student_id=assessment_result.answer_sheet_scan.student_id,
        result_id=assessment_result.id,
        defaults={
            'created_at': assessment_result.updated_at,
            'updated_at': assessment_result.updated_at,
        }
    )[0]


def restore_paper_results():
    """
    Main function that restore paper results assessments - create new records of CompletedAssessment
    Returns: None

    """
    print('Start restoring paper assessments')
    assessment_results = AssessmentResult.objects.filter(assessment__type=Assessment.PAPER,
                                                         assessment__status=Assessment.SCANNED,
                                                         answer_sheet_scan__student_id__isnull=False).select_related(
        'answer_sheet_scan')
    tuple(map(process_assessment_result, assessment_results))

    print('Finish restoring paper assessments')


def perform():
    restore_paper_results()
