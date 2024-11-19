from django.contrib import admin
from .models import Assessment, AssessmentFile, AssessmentItem, Answer, AnswerMark, AnswerSheet, \
    AnswerSheetScan, AnswerSheetScanItem, AssessmentResult, AssessmentResultItem, RecognitionBatch, \
    AnswerSheetZip, AssessmentResultItemMark, CompletedAssessment, AssessmentSettings, RecognizedPerson
from api.core.admin import SuperuserModelAdmin

@admin.register(AnswerSheet)
class AnswerSheet(SuperuserModelAdmin):
    list_filter = ("kind", )

@admin.register(AnswerSheetZip)
class AnswerSheetZip(SuperuserModelAdmin):
    list_filter = ("is_download", )

@admin.register(AssessmentFile)
class AssessmentFile(SuperuserModelAdmin):
    list_filter = ("format", )

@admin.register(AssessmentItem)
class AssessmentItem(SuperuserModelAdmin):
    list_filter = ("kind", )

admin.site.register(Assessment, SuperuserModelAdmin)
admin.site.register(AssessmentSettings, SuperuserModelAdmin)
admin.site.register(Answer, SuperuserModelAdmin)
admin.site.register(AnswerMark, SuperuserModelAdmin)
admin.site.register(AnswerSheetScan, SuperuserModelAdmin)
admin.site.register(AnswerSheetScanItem, SuperuserModelAdmin)
admin.site.register(AssessmentResult, SuperuserModelAdmin)
admin.site.register(AssessmentResultItem, SuperuserModelAdmin)
admin.site.register(RecognitionBatch, SuperuserModelAdmin)
admin.site.register(AssessmentResultItemMark, SuperuserModelAdmin)
admin.site.register(CompletedAssessment, SuperuserModelAdmin)
admin.site.register(RecognizedPerson, SuperuserModelAdmin)
