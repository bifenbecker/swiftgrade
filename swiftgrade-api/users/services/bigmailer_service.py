from django.conf import settings
from users.models import User
import requests

HEADERS = {
    "accept": "application/json",
    "content-type": "application/json",
    "X-API-Key": settings.BIGMAILER_X_API_KEY
}

BASE_URL = f"https://api.bigmailer.io/v1/brands/{settings.BIGMAILER_BRAND_ID}/"

class BigMailerService:
    @staticmethod
    def create_contact(user):
        """
        Adds user's email after sign up to the BigMailer list depending on the user's role.
        """
        list_id = settings.BIGMAILER_SIGN_UP_TEACHERS_LIST_ID if user.role == User.TEACHER else settings.BIGMAILER_SIGN_UP_STUDENTS_LIST_ID
        payload = {
            "list_ids": [list_id],
            "unsubscribe_all": False,
            "email": user.email
        }
        requests.post(
            f"{BASE_URL}contacts", 
            json=payload, 
            headers=HEADERS
        )

    @staticmethod
    def update_contact(user):
        """
        Updates user's first and last name in BigMailer after user completes these fields.
        Also adds contact to "Verified Teachers" list if user is a teacher.
        """
        payload = {
          "field_values": [
              {
                  "name": "FIRST_NAME",
                  "string": user.first_name
              },
              {
                  "name": "LAST_NAME",
                  "string": user.last_name
              }
          ],
        }

        if user.role == User.TEACHER:
            payload["list_ids"] = [settings.BIGMAILER_VERIFIED_TEACHERS_LIST_ID]

        requests.post(
            f"{BASE_URL}contacts/{user.email}?list_ids_op=add", 
            json=payload, 
            headers=HEADERS
        )

    @staticmethod
    def send_verification_email(user, verify_email_link):
        """
        Sends verification email through BigMailer after user sign up.
        """
        payload = {
            "variables": [
                {
                    "name": "VERIFY_EMAIL_LINK",
                    "value": verify_email_link
                }
            ],
            "email": user.email
        }

        campaing_id = settings.BIGMAILER_TEACHERS_CAMPAING_ID if user.role == User.TEACHER else settings.BIGMAILER_STUDENTS_CAMPAING_ID

        requests.post(
            f"{BASE_URL}transactional-campaigns/{campaing_id}/send", 
            json=payload, 
            headers=HEADERS
        )
