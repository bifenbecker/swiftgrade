from swiftgrade_api import celery_app
from assessments.helpers import RecognitionHelper


@celery_app.task
def evaluate_math_formula(expr: str):
    formula = RecognitionHelper.parse_mf_to_latex(expr)
    formula = formula.doit()
    return str(formula)
