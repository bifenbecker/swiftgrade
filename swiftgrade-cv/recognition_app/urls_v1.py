from django.conf.urls import url
from recognition_app.views import (
    ParseBarcodeView,
    RecognizeView,
    FastParseView,
    GenericAnswersCroppingView,
    GenericRecognizeView
)

urlpatterns = [
    url(r"^parse_barcode/$", ParseBarcodeView.as_view(), name="parse"),
    url(r"^fast_parse/$", FastParseView.as_view(), name="fast_parse"),
    url(r"^answer_sheet/batch/(?P<batch_id>\d+)/recognize/$", RecognizeView.as_view(), name="recognize"),
    url(r"^generic_answer_sheet/batch/(?P<batch_id>\d+)/cropping/$",
        GenericAnswersCroppingView.as_view(), name="generic_answers_cropping"),
    url(r"^generic_answer_sheet/batch/(?P<batch_id>\d+)/recognize/$",
        GenericRecognizeView.as_view(), name="generic_recognize"),
]
