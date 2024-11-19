import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  orange,
  pink,
  purple,
  red,
  teal,
  lime,
} from '@material-ui/core/colors';

export const DATE_FORMAT = 'MMMM DD YYYY';
export const DATE_TIME_FORMAT = 'MMM DD YYYY hh:mm A';
export const DATE_TIME_FORMAT_RESULTS = 'MMM DD YYYY, hh:mm a';
export const TIME_FORMAT = 'hh:mm A';

export const LANGUAGES = ['en'];
export const DEFAULT_LOCALE = LANGUAGES[0];

export const CALCULATOR_ID = 'calculator';

export const { WHATSAPP_PAGE_URL } = process.env;

// answer sheet kinds
export const CUSTOM_SHEET = 'custom';
export const GENERIC_SHEET = 'generic';

// answer sheet types
export const ONLINE_SHEET = 'online';
export const PAPER_SHEET = 'paper';

// popup keys
export const AFTER_RELEASE_POPUP = 'after_release';
export const ASK_STUDENTS_TO_WRITE_NEATLY_POPUP = 'ask_students_to_write_neatly';
export const CREATE_CUSTOM_SHEET_VIDEO_POPUP = 'create_custom_sheet_video';
export const DISTRIBUTE_GENERIC_AS_POPUP = 'distribute_generic_as';
export const DISTRIBUTE_REGULAR_AS_POPUP = 'distribute_regular_as';
export const NO_STUDENTS_IN_CLASS_POPUP = 'no_students_in_class';
export const PRINT_MC_SHEETS_POPUP = 'print_mc_sheets'; // Needs for popup displaying each time after creating Generic assessment
export const PRINT_REGULAR_SHEETS_POPUP = 'print_regular_sheets'; // Needs for popup displaying each time after creating Written assessment
export const RELEASE_ONLINE_SHEETS_POPUP = 'release_online_sheets';
export const SCAN_WRITTEN_AS_POPUP = 'scan_written_as';
export const SCAN_GENERIC_AS_POPUP = 'scan_written_generic_as';
export const STUDENTS_MUST_FILL_CIRCLES_POPUP = 'students_must_fill_circles';
export const WELCOME_STUDENT_PORTAL_POPUP = 'welcome_student_portal';
// export const VIEW_RESULTS_VIDEO_POPUP = 'view_results_video';

// tutorial item ids
export const ASSESSMENTS_SETTINGS_ATTACHMENTS_ID = 'assessments-settings-attachments';
export const ASSESSMENTS_SETTINGS_RELEASE_ID = 'assessment-settings-release-button-wrapper';
export const ASSESSMENTS_SETTINGS_RELEASE_BTN_ID = 'MuiButtonBase-root';
export const ASSESSMENTS_SETTINGS_ANTI_CHEATING_ID = 'assessments-settings-anti-cheating';
export const ASSESSMENTS_SETTINGS_ANTI_CHEATING_LABEL_ID = 'MuiFormControlLabel-root';
export const CREATE_ASSESSMENT_HELP_ICON_ID = 'create-assessment-help-icon';
export const CUSTOM_INPUT_FIELD_ID = 'custom-input-field';
export const CUSTOM_PREVIEW_DOWNLOAD_BUTTON_ID = 'custom-preview-download-button';
export const GENERATE_SHEET_ICON_ID = 'generate-sheet-icon';
export const PLAYER_ICON_ID = 'generate-custom-tutorial-video';
export const GENERIC_PREVIEW_DOWNLOAD_BUTTON_ID = 'generic-preview-download-button';
export const GENERIC_PREVIEW_DOWNLOAD_BUTTON_LABEL_ID = 'MuiButton-label';
export const GENERIC_PREVIEW_STUDENT_INFO_ID = 'generic-preview-student-info';
export const GENERIC_PREVIEW_CUSTOMIZE_ID = 'generic-preview-customize_container';
export const MORE_ASSESSMENT_OPTIONS_ID = 'more-assessment-options';
export const NEXT_ASSESSMENT_STEP_ID = 'next-assessment-step';
export const SELECT_ALL_ASSESSMENTS_ID = 'select-all-assessments';
export const TABS_HELPER_ICON_ID = 'tabs-helper-icon';
export const TABS_ALL_ID = 'results-tabs';
export const TABS_ANALYSIS_TAB_ID = 'results-tabs-analysis';
export const TABS_ANSWERS_TAB_ID = 'results-tabs-answers';
export const TABS_RESULTS_TAB_ID = 'results-tabs-results';
export const TABS_ANSWER_SELECT_ID = 'answer_select';
export const TABS_ANSWER_KEY_ID = 'answers-tab-answer-key';
export const TABS_ANALYSIS_ID = 'MuiTableCell-root MuiTableCell-head';
export const TABS_ANALYSIS_HEAD_ROW_ID = 'MuiTableRow-root MuiTableRow-head';
export const RESULTS_ROW_ID = 'row_';
export const RESULTS_ROW_ICON_ID = 'results-tab-select-row-button';
export const RESULTS_ROW_HEAD_ID = 'MuiTableRow-head';
export const RESULTS_ROW_HEAD_CIRCLE_ID = 'results-tab-select-all-button';
export const RESULTS_FILTER_BUTTON_ID = 'results-filter-button';
export const CREATE_BUTTON_ID = 'create-assessment-button';
export const FIRST_ASSESSMENT_STEP_ID = 'MuiTableRow-root not_collapse MuiTableRow-hover';
export const BODY_ID = 'body';
export const CARDS_CARD_CLASS_ID = 'groups-card-container';
export const HEADER_PLUS_ICON_CONTAINER_ID = 'plus_icon_container';
export const OPTIONS_RENAMING_CLASS_ID = 'groups-card-menu-button-';

// tutorial keys
export const TUTORIAL_MC_DASHBOARD_TUTORIAL = 'tutorial_mc_dashboard';
export const TUTORIAL_RESULTS_HELP_ICON = 'tutorial_results_help_icon';
export const TUTORIAL_STEP_HELP = 'tutorial_step_help';
export const INPUT_ANSWER_KEY_TUTORIAL_ID = 'MuiGrid-root';
export const CREATE_ANSWER_KEY_TUTORIAL_ID = 'MuiGrid-root';
export const CREATE_ANSWER_QUESTION_ONE_CONTENT_ID = 'fib_textfield[null][0]';
export const ADD_ANSWER_KEY_ABOVE_CONTENT_ID = 'plus_button';
export const REPEAT_ANSWERS_ASSESSMENT_CONTENT_ID = 'MuiGrid-root';
export const HELP_ICON_CONTENT_ID = 'create-assessment-help-icon-svg';

export const STUDENT_TUTORIAL_ADD_ID = 'add-students-button';
export const STUDENT_TUTORIAL_ICON_ID = 'students-select_icon';
export const STUDENT_TUTORIAL_CIRCLE_ID = 'select-all-students-button';
export const STUDENT_TUTORIAL_CARD_ID = 'groups-card-container';
export const STUDENT_TUTORIAL_JOIN_BTN_ID = 'student-join-class-button';

export const AUTO_GENERATE_BUTTONS_ID = 'auto-generate-buttons';
export const USER_NAME_OR_EMAIL_COLUMN_ID = 'username-or-email-column';
export const FIRST_TABLE_ROW_ID = 'first-table-row-id';

export const ASSESSMENT_RESULTS_HELP_TUTORIAL = 'assessment_results_help';
export const ASSESSMENTS_LIST_PAGE_TUTORIAL = 'assessments_list_page';
export const STUDENTS_LIST_PAGE_TUTORIAL = 'students_list_page';
export const STUDENTS_JOIN_CLASS_PAGE_TUTORIAL = 'students_join_class_page';
export const STUDENTS_CLASS_PAGE_TABS_TUTORIAL = 'students_class_page_tabs';
export const STUDENTS_CLASS_PAGE_TAB_AVAILABLE = 'Mui-selected';
export const CREATE_ASSESSMENT_HELP_TUTORIAL = 'create_assessment_help';
export const GENERATE_CUSTOM_SHEET_PAGE_TUTORIAL = 'generate_custom_sheet_page';
export const GENERIC_PREVIEW_PAGE_TUTORIAL = 'generic_preview_page';
export const MC_SHEETS_TUTORIAL = 'mc_sheets';

export const TUTORIAL_DASHBOARD_PLAYER_BUTTON = 'dashboard_player_button';
export const TUTORIAL_WELCOME_DASHBOARD_WITHOUT_GROUPS = 'welcome_dashboard';
export const TUTORIAL_CREATE_CLASS = 'create_class';
export const TUTORIAL_CONGRATULATIONS_DASHBOARD = 'congratulations_dashboard';
export const TUTORIAL_FIRST_CLASS_DESCRIPTION = 'first_class_description';
export const TUTORIAL_WELCOME_DASHBOARD_WITH_GROUPS = 'welcome_dashboard_with_groups';
export const TUTORIAL_PRINT_MC_SHEETS = 'print_mc_sheets';
export const TUTORIAL_AFTER_PRINT_MC_SHEETS = 'after_print_mc_sheets';
export const TUTORIAL_ASSESSMENT_CREATION = 'assessment_creation';
export const TUTORIAL_WELCOME_ASSESSMENT = 'welcome_assessment';
export const TUTORIAL_ASSESSMENT_CONGRATULATIONS = 'assessment_congratulations';
export const TUTORIAL_ASSESSMENT_EXPLANATION = 'assessment_explanation';
export const TUTORIAL_ASSESSMENT_ANSWERS_CREATION = 'assessment_answers_creation';
export const TUTORIAL_ANSWERS = 'answers';
export const TUTORIAL_ANALYSIS = 'analysis';
export const TUTORIAL_ADDING_STUDENT = 'adding_student';
export const TUTORIAL_ADDING_STUDENT_CONGRATULATIONS = 'adding_student_congratulations';
export const TUTORIAL_STUDENT_PORTAL = 'student_portal';
export const TUTORIAL_STUDENT_AVAILABLE_TAB = 'student_available_tab';
export const TUTORIAL_RESULTS = 'results';
export const TUTORIAL_SECOND_RESULTS_FILTERS = 'second_results_filters';
export const TUTORIAL_OPEN_RESULTS_PAGE = 'open_results_page';
export const TUTORIAL_RESULTS_FILTERS_BUTTON = 'results_filters_button';
export const TUTORIAL_CLICK_ON_FILTERS_BUTTON = 'click_on_filters_button';
export const TUTORIAL_DOWNLOAD_WRITTEN_AS = 'download_written_as';
export const TUTORIAL_AFTER_DOWNLOAD_WRITTEN_AS = 'after_download_written_as';
export const TUTORIAL_DOWNLOAD_MC_AS = 'download_mc_as';
export const TUTORIAL_AFTER_DOWNLOAD_MC_AS = 'after_download_mc_as';
export const TUTORIAL_RELEASE_ONLINE_AS = 'release_online_as';
export const TUTORIAL_AFTER_RELEASE_ONLINE_AS = 'after_release_online_as';
export const TUTORIAL_MANUALLY_ADD_STUDENTS = 'manually_add_students';

export const POPUP_WELCOME_FINISHED_USER_WATCHING = 'finished_watching';
export const POPUP_VIDEO_REMINDER = 'video_reminder';
export const POPUP_ASSESSMENT_HELP_ANSWER_KEY = 'assessment_help_answer_key';
export const POPUP_ALLOW_BROWSER = 'allow_browser';
export const POPUP_NEXT_STEP_MC = 'next_step_mc';
export const POPUP_STUDENT_SCAN_MC = 'student_scan_mc';
export const POPUP_RESULTS_HELP = 'results_help';
export const POPUP_WELCOME_DASHBOARD_VIDEO = 'welcome_dashboard_video';
export const POPUP_WELCOME_CREATE_ASSESSMENT_VIDEO = 'welcome_create_assessment_video';
export const POPUP_WELCOME_VIEW_RESULTS_VIDEO = 'welcome_view_results_video';
export const POPUP_WELCOME_TEACHER = 'welcome_teacher';
export const POPUP_CHECKLIST_DASHBOARD = 'checklist_dashboard';
export const POPUP_CHECKLIST_CREATE_CLASS = 'checklist_create_class';
export const POPUP_CHECKLIST_CREATE_ASSESSMENT = 'checklist_create_assessment';
export const POPUP_CHECKLIST_GET_AS = 'checklist_get_as';
export const POPUP_CHECKLIST_GET_RESULT = 'checklist_get_result';
export const POPUP_CHECKLIST_BOTTOM = 'checklist_bottom';
export const POPUP_HOW_TO_USE_SWIFTGRADE = 'how_to_use_swiftgrade';
export const POPUP_BANNER = 'banner';
export const POPUP_USERNAME_IS_NOW_EMAIL = 'username_is_now_email';
export const POPUP_SEND_EMAIL_RESULTS = 'send_email_results';
export const POPUP_VERIFY_EMAIL = 'verify_email';

// tutorial progress keys
export const ASSESSMENTS_LIST_TIPS_DISPLAYABLE_TUTORIAL_PROGRESS = 'assessments_list_tips_displayable';
export const GENERIC_SHEET_DISPLAYABLE_TUTORIAL_PROGRESS = 'generic_sheet_displayable';

export const COLORS = {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  orange,
  pink,
  purple,
  red,
  teal,
  lime,
};

// pulse buttons keys
export const PULSE_DASHBOARD_CREATE_CLASS = 'dashboard_create_class';
export const PULSE_DASHBOARD_DOWNLOAD_GENERIC_AS = 'dashboard_download_generic_as';
export const PULSE_DASHBOARD_GENERATE_GENERIC_AS = 'dashboard_generate_generic_as';

export const PULSE_ASSESSMENTS_CREATE_ANSWER_KEY = 'assessments_create_answers_key';
export const PULSE_ASSESSMENTS_PRINT_AS = 'assessments_print_as';
export const PULSE_ASSESSMENTS_DOWNLOAD_REGULAR_AS = 'assessments_download_regular_as';
export const PULSE_ASSESSMENTS_RELEASE_ONLINE_AS = 'assessments_release_online_as';

export const PULSE_PREVIEW_DOWNLOAD_REGULAR_AS = 'preview_download_regular_as';
export const PULSE_PREVIEW_DOWNLOAD_GENERIC_AS = 'preview_download_generic_as';

export const PULSE_RESULTS_FILTERS = 'results_filters';

export const PULSE_STUDENTS_INVITE_STUDENTS = 'students_invite_students';

export const PULSE_AVAILABLE_ASSESSMENTS_START = 'available_assessments_start';

// help modal tooltip types
export const RESULTS_TYPE = 'results';
export const CREATE_ANSWERS_TYPE = 'answers';

// links
export const HELP_ARTICLE_LINK_RESULTS = 'https://help.goswiftgrade.com/help-options/view-results';
export const HELP_ARTICLE_LINK_CREATE_ANSWER_KEY = 'https://help.goswiftgrade.com/help-options/create-answer-key';
export const BANNER_TUTORIAL_VIDEOS_LINK = 'https://www.youtube.com/playlist?list=PL5MJvbOcQoX84O14-9JCn9zPDgXbEXk2d  ';
export const APP_GOSWIFTGRADE_JOIN_LINK_TEXT = 'app.goswiftgrade.com/join';
