from typing import List
from django.db import connection
from users.models import User
from users.constants import POPUP_RELEASE_ONLINE_SHEETS, POPUP_AFTER_RELEASE


def add_popup_release_online_sheets_to_users(users: List[User]) -> None:
    """
    Add field POPUP_RELEASE_ONLINE_SHEETS for users enabled_popup json field
    Args:
        users (list of users from database):

    Returns: None

    """
    for user in users:
        user_enabled_popups = user.enabled_popups.copy()
        data_for_update = {}
        popup_after_release = user_enabled_popups.get(POPUP_AFTER_RELEASE, None)
        if not popup_after_release:
            data_for_update.update({
                POPUP_AFTER_RELEASE: False,
                POPUP_RELEASE_ONLINE_SHEETS: False
            })
        else:
            data_for_update.update({
                POPUP_RELEASE_ONLINE_SHEETS: popup_after_release
            })

        user_enabled_popups.update(data_for_update)
        user.enabled_popups = user_enabled_popups
    User.objects.bulk_update(users, ['enabled_popups'])


def restore_user_popup_release_online_sheets():
    """
    Main function that restore popup release online sheets
    Returns: None

    """
    print('Start restoring popup release online sheets')
    add_popup_release_online_sheets_to_users(User.objects.all())
    print(f"Amount of queries to database: {len(connection.queries)}")
    print('Finish restoring popup release online sheets')


def perform():
    restore_user_popup_release_online_sheets()
