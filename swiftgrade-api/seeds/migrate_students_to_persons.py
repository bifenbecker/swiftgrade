from django.db.models import Count

from assessments.models import AssessmentResult, AnswerSheetScan, RecognizedPerson
from users.models import Student

class MigrateStudentsToPersons:
    def call(self):
        results = self._get_results()

        recognized_persons, scans = [], []
        for result in results:
            scan = result.answer_sheet_scan
            # build recognized person
            recognized_person = self._build_recognized_person(result, scan)
            # update student to unnamed scan
            scan.student = None

            recognized_persons.append(recognized_person)
            scans.append(scan)

        self._create_recognized_persons(recognized_persons)
        self._update_scans(scans)

        # delete students
        self._delete_students()

    @staticmethod
    def _get_results():
        return AssessmentResult.manager.filter(answer_sheet_scan__named=False)

    @staticmethod
    def _build_recognized_person(result, scan):
        student = scan.student
        recognized_person = {
            'assessmentresult': result,
            'first_name': student.first_name,
            'last_name': student.last_name,
            'email': student.email,
        } if student else {'assessmentresult': result}
        return RecognizedPerson(**recognized_person)

    @staticmethod
    def _create_recognized_persons(data):
        recognized_persons, results = RecognizedPerson.objects.bulk_create(data), []
        for recognized_person in recognized_persons:
            assessment_result = recognized_person.assessmentresult
            assessment_result.recognized_person = recognized_person
            results.append(assessment_result)
        AssessmentResult.manager.bulk_update(results, ['recognized_person'])

    @staticmethod
    def _update_scans(scans):
        AnswerSheetScan.manager.bulk_update(scans, ['student'])

    @staticmethod
    def _delete_students():
        Student.objects.annotate(
            assessments=Count('completedassessment'),
            groups=Count('group'),
            scans=Count('answersheetscan')
        ).filter(assessments=0, groups=0, scans=0).delete()

def perform():
    MigrateStudentsToPersons().call()
