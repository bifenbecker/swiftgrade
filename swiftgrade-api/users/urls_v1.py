from django.conf.urls import url

from users.views import (
    AppleSignInView,
    CheckAccessView,
    CheckAutoSignInView,
    CheckClassCodeView,
    CheckUserVerificationCodeView,
    DeleteStudentsView,
    GoogleSignInView,
    TokenRefreshView,
    RecoverPasswordView,
    SignUpView,
    SignInView,
    StudentsListCreateView,
    StudentSignUpView,
    UserMailerView,
    UserDetailView,
    UserChecklistView,
    VerifyEmailView,
    ManuallyAddStudentsView,
    CheckStudentUsernameView,
    DownloadStudentLoginInfoView,
    GenerateUsernameView,
)

from users.views.statistics import (
    UserStatisticsView,
    ActiveTeachersWithResultsView,
    AnswerTypeOptionsView,
    AssessmentTypeOptionsView,
    UserTypeOptionsView,
    FilterOptionsView,
    FunnelFilterOptionsView,
    TeachersFunnelView,
    TotalNumberGradedAnswersView,
    TotalAssessmentsGivenView,
    TotalAssessmentResultsView,
)


urlpatterns = [
    url(r"^auth/apple_sign_in/$", AppleSignInView.as_view(), name="sign_in"),
    url(r"^auth/recover/$", RecoverPasswordView.as_view(), name="recover_password"),
    url(r"^auth/sign_up/$", SignUpView.as_view(), name="sign_up"),
    url(r"^auth/sign_in/$", SignInView.as_view(), name="sign_in"),
    url(r"^auth/student_sign_up/$", StudentSignUpView.as_view(), name="sign_up"),
    url(r"^auth/google_sign_in/$", GoogleSignInView.as_view(), name="sign_in"),
    url(r"^auth/check_verification_code/$",
        CheckUserVerificationCodeView.as_view(), name="check_verification_code_for_user"
    ),
    url(r"^auth/check_auto_sign_in/$", CheckAutoSignInView.as_view(), name="check_auto_sign_in"),
    url(r"^auth/check_class_code/$", CheckClassCodeView.as_view(), name="check_class_code"),
    url(r'^auth/token-refresh/', TokenRefreshView.as_view(), name="token-refresh"),
    url(r"^check_access/$", CheckAccessView.as_view(), name="check_access"),
    url(r"^users/(?P<user_id>\d+)/$", UserDetailView.as_view(), name="user_detail"),
    url(r"^users/(?P<user_id>\d+)/checklist/$", UserChecklistView.as_view(), name="user_checklist"),
    url(r"^users/(?P<user_id>\d+)/verify_email/$", VerifyEmailView.as_view(), name="verify_email"),
    url(r"^users/generate_username/(?P<quantity>\d+)/$", GenerateUsernameView.as_view(), name="generate_username"),
    url(r"^students/$", StudentsListCreateView.as_view(), name="students"),
    url(r"^students/delete/$", DeleteStudentsView.as_view(), name="delete_students"),
    url(r"^students/manually_add/(?P<group_id>\d+)/$", ManuallyAddStudentsView.as_view(), name="manually_add"),
    url(r"^students/check_username/$", CheckStudentUsernameView.as_view(), name="check_username"),
    url(r"^students/download_student_login_info/$", DownloadStudentLoginInfoView.as_view(), name="download_student_login_info"),
    url(r"^send_email_notification/$", UserMailerView.as_view(), name="email_notification"),
    url(r"^send_email_notification/v(?P<version_id>\d+)/$", UserMailerView.as_view(), name="email_notification"),

    url(r"^chart/active_teachers_with_results/(?P<period>\d+)/$", ActiveTeachersWithResultsView.as_view(),
        name='chart_active_teachers_with_results'),
    url(r"^chart/teachers_funnel/(?P<period>\w*)/$", TeachersFunnelView.as_view(),
        name='chart_teachers_funnel'),
    url(r"^chart/total_assessments_given/(?P<assessment_type>\w*)/(?P<period>\d+)/$", TotalAssessmentsGivenView.as_view(),
        name='chart_total_assessments_given'),
    url(r"^chart/total_assessment_results/(?P<period>\d+)/$", TotalAssessmentResultsView.as_view(),
        name='chart_total_assessment_results'),
    url(r"^chart/total_number_graded_answers/(?P<answer_type>\w*)/(?P<period>\d+)/$", TotalNumberGradedAnswersView.as_view(),
        name='chart_total_number_graded_answers'),
    url(r"^chart/users/(?P<user_type>\w*)/(?P<period>\d+)/$", UserStatisticsView.as_view(), name='chart_users'),
    url(r"^chart/answer_type_options/$", AnswerTypeOptionsView.as_view(), name='chart_answer_type_options'),
    url(r"^chart/assessment_type_options/$", AssessmentTypeOptionsView.as_view(), name='chart_assessment_type_options'),
    url(r"^chart/filter_options/$", FilterOptionsView.as_view(), name='chart_filter_options'),
    url(r"^chart/funnel_filter_options/$", FunnelFilterOptionsView.as_view(), name='chart_funnel_filter_options'),
    url(r"^chart/users_type_options/$", UserTypeOptionsView.as_view(), name='chart_users_type_options'),
]
