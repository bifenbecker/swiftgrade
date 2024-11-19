from rest_framework import serializers


class QuestionSerializer(serializers.Serializer):
    DECIMAL = "decimal"
    NONDECIMAL = "non-decimal"
    MC = "mc"
    WITH_UNITS = "non-decimal-with-unit"
    FIB = "fib"
    MATH = "mf"
    MATH_WITH_UNITS = "mf-with-unit"


    QUESTION_TYPE_CHOICES = [DECIMAL, NONDECIMAL, MC, WITH_UNITS, FIB, MATH, MATH_WITH_UNITS]
    LATEX_STYLED = [DECIMAL, NONDECIMAL, WITH_UNITS, MATH, MATH_WITH_UNITS]

    kind = serializers.ChoiceField(required=True, choices=QUESTION_TYPE_CHOICES)
    height = serializers.IntegerField(required=False, allow_null=True)
    width = serializers.IntegerField(required=False, allow_null=True)
