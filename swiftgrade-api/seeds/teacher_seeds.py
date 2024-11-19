from users.models import User
from users.services import UserService


def copy_teacher_email_to_username():
    """
    Copies teacher's email (if not null) to username.
    """
    users = User.objects.filter(email__isnull=False, role=User.TEACHER)
    for user in users:
        user_by_username = UserService.get_user_by_username(user.email, statuses=[User.ACTIVE, User.EMAIL_VERIFICATION])
        if not user_by_username and not user.username:
            user.username = user.email
            user.save()


def perform():
    copy_teacher_email_to_username()
