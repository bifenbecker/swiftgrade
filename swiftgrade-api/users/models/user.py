from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.postgres.fields import ArrayField, JSONField
from django.db import models
from django.utils.translation import gettext_lazy as _

from ..constants import *


def get_enabled_popups_default_dict():
    return {
        POPUP_AUTO_CORRECT: True,
        POPUP_AFTER_RELEASE: True,
        POPUP_ASK_STUDENTS_TO_WRITE_NEATLY: True,
        POPUP_BANNER: True,
        POPUP_CREATE_CUSTOM_SHEET_VIDEO: True,
        POPUP_EDIT_ASSESSMENT: True,
        POPUP_GENERIC: True,
        POPUP_HOW_TO_USE_SWIFTGRADE: True,
        POPUP_PNG_FORMAT: True,
        POPUP_SMALLER_AS: True,
        POPUP_STUDENTS: True,
        POPUP_STUDENTS_MUST_FILL_CIRCLES: True,
        POPUP_WELCOME_FINISHED_USER_WATCHING: True,
        POPUP_VIDEO_REMINDER: True,
        POPUP_ASSESSMENT_HELP_ANSWER_KEY: True,
        POPUP_NEXT_STEP_WRITEN: True,
        POPUP_SCAN_WRITTEN_GENERIC_AS: True,
        POPUP_SCAN_WRITTEN_AS: True,
        POPUP_ALLOW_BROWSER: True,
        POPUP_NEXT_STEP_MC: True,
        POPUP_STUDENT_SCAN_MC: True,
        POPUP_RESULTS_HELP: True,
        POPUP_DISTRIBUTE_GENERIC_AS: True,
        POPUP_DISTRIBUTE_REGULAR_AS: True,
        POPUP_WELCOME_DASHBOARD_VIDEO: True,
        POPUP_WELCOME_CREATE_ASSESSMENT_VIDEO: True,
        POPUP_WELCOME_VIEW_RESULTS_VIDEO: True,
        POPUP_WELCOME_TEACHER: True,
        POPUP_WELCOME_STUDENT_PORTAL: True,
        POPUP_CHECKLIST_DASHBOARD: True,
        POPUP_CHECKLIST_CREATE_CLASS: True,
        POPUP_CHECKLIST_CREATE_ASSESSMENT: True,
        POPUP_CHECKLIST_GET_AS: True,
        POPUP_CHECKLIST_GET_RESULT: True,
        POPUP_CHECKLIST_BOTTOM: True,
        POPUP_PRINT_MC_SHEETS: True,
        POPUP_RELEASE_ONLINE_SHEETS: True,
        POPUP_PRINT_REGULAR_SHEETS: True,
        POPUP_USERNAME_IS_NOW_EMAIL: False,
        POPUP_SEND_EMAIL_RESULTS: True,
        POPUP_VERIFY_EMAIL: False,
    }


def get_enabled_tutorials_default_dict():
    return {
        TUTORIAL_ASSESSMENT_RESULTS_HELP: True,
        TUTORIAL_ASSESSMENT_SETTINGS_PAGE: True,
        TUTORIAL_CREATE_ASSESSMENT_HELP: True,
        TUTORIAL_CREATE_CLASS: True,
        TUTORIAL_DASHBOARD_PLAYER_BUTTON: True,
        TUTORIAL_GENERATE_CUSTOM_SHEET_PAGE: True,
        TUTORIAL_GENERIC_PREVIEW_PAGE: True,
        TUTORIAL_ASSESSMENTS_LIST_PAGE: True,
        TUTORIAL_CONGRATULATIONS_DASHBOARD: False,
        TUTORIAL_FIRST_CLASS_DESCRIPTION: True,
        TUTORIAL_WELCOME_DASHBOARD: True,
        TUTORIAL_ASSESSMENT_CREATION: True,
        TUTORIAL_WELCOME_ASSESSMENT: True,
        TUTORIAL_ASSESSMENT_CONGRATULATIONS: False,
        TUTORIAL_ASSESSMENT_EXPLANATION: True,
        TUTORIAL_ASSESSMENT_ANSWERS_CREATION: True,
        TUTORIAL_ANSWERS: True,
        TUTORIAL_RESULTS_HELP_ICON: True,
        TUTORIAL_ANALYSIS: True,
        TUTORIAL_ADDING_STUDENT: True,
        TUTORIAL_ADDING_STUDENT_CONGRATULATIONS: True,
        TUTORIAL_STUDENT_PORTAL: True,
        TUTORIAL_STUDENT_AVAILABLE_TAB: True,
        TUTORIAL_RESULTS: True,
        TUTORIAL_WELCOME_DASHBOARD_WITH_GROUPS: True,
        TUTORIAL_STUDENTS_CLASS_PAGE_TABS: True,
        TUTORIAL_PRINT_MC_SHEETS: False,
        TUTORIAL_AFTER_PRINT_MC_SHEETS: True,
        TUTORIAL_SECOND_RESULTS_FILTERS: True,
        TUTORIAL_OPEN_RESULTS_PAGE: False,
        TUTORIAL_RESULTS_FILTERS_BUTTON: True,
        TUTORIAL_CLICK_ON_FILTERS_BUTTON: False,
        TUTORIAL_DOWNLOAD_WRITTEN_AS: False,
        TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS: False,
        TUTORIAL_DOWNLOAD_MC_AS: False,
        TUTORIAL_AFTER_DOWNLOAD_MC_AS: True,
        TUTORIAL_RELEASE_ONLINE_AS: False,
        TUTORIAL_AFTER_RELEASE_ONLINE_AS: False,
        TUTORIAL_AFTER_DOWNLOAD_MC_AS: False,
        TUTORIAL_MANUALLY_ADD_STUDENTS: True,
    }


def get_enabled_pulse_buttons_default_dict():
    return {
        PULSE_DASHBOARD_CREATE_CLASS: True,
        PULSE_DASHBOARD_DOWNLOAD_GENERIC_AS: True,
        PULSE_DASHBOARD_GENERATE_GENERIC_AS: True,
        PULSE_ASSESSMENTS_CREATE_ANSWER_KEY: True,
        PULSE_ASSESSMENTS_PRINT_AS: True,
        PULSE_ASSESSMENTS_DOWNLOAD_REGULAR_AS: True,
        PULSE_ASSESSMENTS_RELEASE_ONLINE_AS: True,
        PULSE_PREVIEW_DOWNLOAD_REGULAR_AS: True,
        PULSE_PREVIEW_DOWNLOAD_GENERIC_AS: True,
        PULSE_RESULTS_FILTERS: False,
        PULSE_STUDENTS_INVITE_STUDENTS: True,
        PULSE_AVAILABLE_ASSESSMENTS_START: True,
    }


def get_popups_progress_default_dict():
    return {
        POPUP_PROGRESS_MC_SHEET_CREATED: False,
        POPUP_PROGRESS_REGULAR_SHEET_CREATED: False,
        POPUP_PROGRESS_ONLINE_SHEET_CREATED: False,
    }


def get_tutorial_progress_default_dict():
    return {
        TUTORIAL_PROGRESS_ASSESSMENTS_LIST_TIPS_DISPLAYABLE: True,
        TUTORIAL_PROGRESS_GENERIC_SHEET_DISPLAYABLE: True,
    }


class CustomUserManager(UserManager):
    def get_queryset(self):
        return super().get_queryset()


class User(AbstractUser):
    manager = CustomUserManager()

    MR = "mr"
    MS = "ms"
    MX = "mx"
    GENDERS_CHOICES = (
        (MR, "Mr."),
        (MS, "Ms."),
        (MX, "Mx."),
    )

    ADMIN = "admin"
    TEACHER = "teacher"
    STUDENT = "student"
    ROLES_CHOICES = (
        (ADMIN, "Admin"),
        (TEACHER, "Teacher"),
        (STUDENT, "Student"),
    )

    UNIVERSITY = "university"
    HIGH_SCHOOL = "high_school"
    MIDDLE_SCHOOL = "middle_school"
    ELEMENTARY = "elementary"
    SCHOOL_TYPES_CHOICES = (
        (UNIVERSITY, "University"),
        (HIGH_SCHOOL, "High school"),
        (MIDDLE_SCHOOL, "Middle school"),
        (ELEMENTARY, "Elementary"),
    )

    ACTIVE = "active"
    EMAIL_VERIFICATION = "email_verification"
    STATUSES_CHOICES = (
        (ACTIVE, "Active"),
        (EMAIL_VERIFICATION, "Email verification"),
    )
    ANDROID = "android"
    WEB = "website"
    IOS = "ios"
    MOBILE = "mobile"
    MOBILE_A = "mobile_android"
    MOBILE_IOS = "mobile_ios"
    DEVICE_CHOICES = (
        (ANDROID, _("Android App")),
        (WEB, _("Web version")),
        (IOS, _("IOs App")),
        (MOBILE, _("Mobile")),
        (MOBILE_A, _("Mobile (A)")),
        (MOBILE_IOS, _("Mobile (iOS)")),
    )
    gender = models.CharField(
        max_length=255, choices=GENDERS_CHOICES, null=True, blank=True
    )
    phone = models.CharField(max_length=15, blank=True, null=True)
    first_name = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="first"
    )
    last_name = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="last"
    )
    username = models.CharField(unique=True, max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    role = models.CharField(max_length=255, choices=ROLES_CHOICES, default=TEACHER)
    school_type = models.CharField(
        max_length=255,
        choices=SCHOOL_TYPES_CHOICES,
        null=True,
        blank=True,
        verbose_name="school",
    )
    status = models.CharField(
        max_length=255, choices=STATUSES_CHOICES, default=EMAIL_VERIFICATION
    )
    subjects = ArrayField(
        models.CharField(max_length=50, blank=True), null=True, blank=True
    )
    is_keep_logged_in = models.BooleanField(null=False, blank=False, default=False)
    is_info_page_passed = models.BooleanField(null=False, blank=False, default=False)
    sign_up_device = models.CharField(
        max_length=30, choices=DEVICE_CHOICES, null=True, blank=True
    )
    last_login_device = models.CharField(
        max_length=30, choices=DEVICE_CHOICES, null=True, blank=True
    )
    enabled_popups = JSONField(default=get_enabled_popups_default_dict)
    enabled_tutorials = JSONField(default=get_enabled_tutorials_default_dict)
    enabled_pulse_buttons = JSONField(default=get_enabled_pulse_buttons_default_dict)
    popups_progress = JSONField(default=get_popups_progress_default_dict)
    tutorials_progress = JSONField(default=get_tutorial_progress_default_dict)
    sent_emails_counter = models.PositiveSmallIntegerField(default=0)
    enable_email_subscription = models.BooleanField(default=True)
    last_email_date = models.DateField(blank=True, null=True)
    last_printed_as = models.DateTimeField(blank=True, null=True)
    last_released_as = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.email or f"{self.first_name} {self.last_name}"
