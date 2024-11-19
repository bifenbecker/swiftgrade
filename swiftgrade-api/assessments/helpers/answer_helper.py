from assessments.models import AssessmentItem

class AnswerHelper:
    @classmethod
    def get_answer(cls, data, kind, max_mark):
        answer, value = data.body.get('answer', None), data.body.get('value', None)
        marks = cls._get_marks(data, max_mark)

        if kind == AssessmentItem.NUMERIC:
            return {
                'answer': answer,
                'height': data.body.get('height', 1),
                'id': data.id,
                'marks': marks,
                'scientific_notation': data.scientific_notation,
                'significant_figure': data.significant_figure,
                'tolerance': data.tolerance,
                'unit': data.unit,
                'value': value,
                'width': data.body.get('width', 0),
            }
        elif kind == AssessmentItem.MF:
            return {
                'answer': answer,
                'id': data.id,
                'marks': marks,
                'value': value,
                'height': data.body.get('height', 1),
                'unit': data.unit,
                'width': data.body.get('width', 0),
            }
        return {'answer': answer, 'id': data.id, 'marks': marks, 'value': value}

    @staticmethod
    def _get_marks(answer, max_mark):
        marks = {item.kind: item.value for item in answer.mark.all()}
        marks['total'] = max_mark
        return marks
