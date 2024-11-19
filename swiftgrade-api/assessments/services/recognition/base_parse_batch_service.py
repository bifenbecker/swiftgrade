from assessments.helpers import AssessmentHelper
from assessments.models import Assessment, RecognizedPerson

from .clean_answer_service import CleanAnswerService


class BaseParseBatchService:
    @staticmethod
    def _build_recognized_person(results):
        data = {}

        for key in ['first_name', 'last_name', 'email']:
            result_item = results.get(key, {})
            value = result_item.get('value')
            url = result_item.get('url')

            if isinstance(value, str) and key in ['first_name', 'last_name']:
                value = value.replace(' ', '').capitalize()

            data.update({
                key: CleanAnswerService.call(value, key),
                f'{key}_img': url,
            })

        return RecognizedPerson(**data)

    @staticmethod
    def _update_status(obj, status = Assessment.SCANNED):
        obj.status = status
        obj.save()

        return obj

    @staticmethod
    def _bulk_create(batch_for_create, model=RecognizedPerson):
        if hasattr(model, 'manager'):
            return model.manager.bulk_create(batch_for_create)
        return model.objects.bulk_create(batch_for_create)

    @staticmethod
    def _bulk_update(batch_for_update, model, fields):
        if hasattr(model, 'manager'):
            return model.manager.bulk_update(batch_for_update, fields)
        return model.objects.bulk_update(batch_for_update, fields)

    @classmethod
    def map_assessment_items(cls, items):
        results = []

        for item in items:
            answers = []
            for answer in item.answer.all():
                answers.append({
                    "id": answer.id,
                    "answer": AssessmentHelper.get_value_body(answer.body, 'answer', item.kind),
                    "valid": answer.body.get('valid', True),
                    "marks": {item.kind: item.value for item in answer.mark.all()},
                    "scientific_notation": answer.scientific_notation,
                    "significant_figure": answer.significant_figure,
                    "tolerance_data": answer.tolerance_data,
                    "tolerance": answer.tolerance,
                    "unit": answer.unit,
                    "value": AssessmentHelper.get_value_body(answer.body, 'value', item.kind),
                })
            results.append({
                "answers": answers,
                "id": item.id,
                "kind": item.kind,
                "number": str(item.number),
                "setting": item.setting,
            })
        return results
