from django.db import models

from api.core.models import NotDeletableModel
from .answer import Answer
from .mark import Mark


class AnswerMark(NotDeletableModel, Mark):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='mark')
