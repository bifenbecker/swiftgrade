from users.models import User
from django.contrib.auth.hashers import make_password


def get_admin_params():
    return {
        'email': 'admin@test.test',
        'is_staff': True,
        'is_superuser': True,
        'password': make_password('password'),
        'username': 'admin',
    }


def perform():
    if not User.objects.filter(username='admin').exists():
        User.manager.create(**get_admin_params())
