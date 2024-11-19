from .delete_students_view import DeleteStudentsView
from .students_list_create_view import StudentsListCreateView
from .dowload_login_info_view import DownloadStudentLoginInfoView
from .user_mailer_view import UserMailerView
from .auth.apple_sign_in_view import AppleSignInView
from .auth.check_class_code_view import CheckClassCodeView
from .auth.check_user_verification_code_view import CheckUserVerificationCodeView
from .auth.recover_password_view import RecoverPasswordView
from .auth.sign_up_view import SignUpView
from .auth.sign_in_view import SignInView
from .user_detail_view import UserDetailView
from .user_checklist_view import UserChecklistView
from .auth.google_sign_in_view import GoogleSignInView
from .auth.student_sign_up_view import StudentSignUpView
from .auth.token_refresh_view import TokenRefreshView
from .auth.check_auto_sign_in_view import CheckAutoSignInView
from .manually_add_students_view import ManuallyAddStudentsView
from .check_student_username_view import CheckStudentUsernameView
from .generate_username_view import GenerateUsernameView
from .check_access_view import CheckAccessView
from .verify_email_view import VerifyEmailView

__all__ = (
    "AppleSignInView",
    "CheckUserVerificationCodeView",
    "DeleteStudentsView",
    "StudentsListCreateView",
    "UserMailerView",
    "SignUpView",
    "SignInView",
    "UserDetailView",
    "UserChecklistView",
    "RecoverPasswordView",
    "GoogleSignInView",
    "StudentSignUpView",
    "CheckClassCodeView",
    "TokenRefreshView",
    "CheckAutoSignInView",
    "ManuallyAddStudentsView",
    "CheckStudentUsernameView",
    "DownloadStudentLoginInfoView",
    "GenerateUsernameView",
    "CheckAccessView",
    "VerifyEmailView",
)
