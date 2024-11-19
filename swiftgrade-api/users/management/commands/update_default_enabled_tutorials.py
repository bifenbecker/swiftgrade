from django.core.management import BaseCommand

from users.models.user import User, get_enabled_tutorials_default_dict
from users.constants import TUTORIAL_ASSESSMENTS_LIST_PAGE

class Command(BaseCommand):
    help = 'Update enabled tutorials'

    def handle(self, *args, **options):
        users_for_update = []
        for user in User.objects.all():
            enabled_tutorials = user.enabled_tutorials
            if TUTORIAL_ASSESSMENTS_LIST_PAGE not in enabled_tutorials:
                enabled_tutorials.update({TUTORIAL_ASSESSMENTS_LIST_PAGE: True})
                user.enabled_tutorials = enabled_tutorials
                users_for_update.append(user)
        User.objects.bulk_update(users_for_update, fields=['enabled_tutorials'])


            