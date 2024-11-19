from users.models import User
from users.services import UserService


def copy_student_email_to_username():
    """
    Copies student's email (if not null) to username.
    """
    users = User.objects.filter(email__isnull=False, role=User.STUDENT)
    for user in users:
        user_by_username = UserService.get_user_by_username(user.email, statuses=[User.ACTIVE, User.EMAIL_VERIFICATION])
        if not user_by_username and not user.username:
            user.username = user.email

    User.objects.bulk_update(users, fields=["username"])


def perform():
    copy_student_email_to_username()
