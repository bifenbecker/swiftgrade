from assessments.models import AssessmentItem


def get_max_mark(answers):
    max_mark = 0
    for answer in answers:
        mark = sum(i.value for i in answer.mark.all())
        if mark > max_mark:
            max_mark = mark
    return max_mark


def perform():
    data = []

    for item in AssessmentItem.manager.all():
        item.max_mark = get_max_mark(item.answer.all())
        data.append(item)

    AssessmentItem.manager.bulk_update(data, fields=['max_mark'])
