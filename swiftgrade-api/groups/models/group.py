# from django.contrib.auth.hashers import make_password
from django.db import models
from groups.constants.group import CATEGORY_CHOICES, DIFFERENT

from api.core.models import NotDeletableModel
from users.models import Student, User


# def default_created_by_user():
#     user = User.objects.filter(email='user@user.com', status=User.ACTIVE).first()
#     if not user:
#         data = {
#             'email': 'user@user.com',
#             'password': make_password('123456'),
#             'status': User.ACTIVE,
#         }
#         user = User.objects.create(**data)
#     return user.id
#


class Group(NotDeletableModel):
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES, default=DIFFERENT)
    category_img_number = models.IntegerField(default=1)
    category_last_img_number = models.IntegerField(null=True)
    color = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50)
    students = models.ManyToManyField(Student, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    code = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='classes', null=True)
