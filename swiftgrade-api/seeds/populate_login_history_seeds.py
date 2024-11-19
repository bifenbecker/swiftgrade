from pytz import timezone

from users.models import LoginHistory, User


class PopulateLoginHistory:
    """
    Copies user's last login to history login table in UTC+0 date format.
    """
    def call(self):
        self._copy_last_login_to_login_history()

    @staticmethod
    def _copy_last_login_to_login_history():
        objs = list()
        users = User.objects.filter(role=User.TEACHER, is_staff=False, last_login__isnull=False)
        for user in users:
            obj = LoginHistory(user_id=user.id, logged_in_at=user.last_login.replace(tzinfo=timezone('Etc/GMT+8')))
            objs.append(obj)
        LoginHistory.objects.bulk_create(objs)


def perform():
    PopulateLoginHistory().call()
