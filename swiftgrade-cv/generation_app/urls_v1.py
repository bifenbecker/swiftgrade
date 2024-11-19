from django.conf.urls import url
from generation_app.views import (
    GenerateAnswerSheetView,
    GenerateGenericAnswerSheetView,
    PreviewAnswerSheetView,
    PreviewGenericAnswerSheetView
)

urlpatterns = [
    url(r"^answer_sheet/generate/generic/$", GenerateGenericAnswerSheetView.as_view(), name="generic_generation"),
    url(r"^answer_sheet/preview/generic/$", PreviewGenericAnswerSheetView.as_view(), name="generic_preview"),
    url(r"^answer_sheet/generate/$", GenerateAnswerSheetView.as_view(), name="generation"),
    url(r"^answer_sheet/preview/$", PreviewAnswerSheetView.as_view(), name="preview"),
]
