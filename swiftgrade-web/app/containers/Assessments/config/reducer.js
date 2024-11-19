import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  ANSWER_SHEET_ITEM_SCAN_SUCCESS,
  CREATE_ASSESSMENT_REQUEST,
  DELETE_RESULTS_REQUEST,
  GET_ANALYSIS_SUCCESS,
  GET_ANSWERS_SUCCESS,
  GET_ASSESSMENT_FILES_SUCCESS,
  GET_ASSESSMENT_NAME_SUCCESS,
  GET_ASSESSMENT_REQUEST,
  GET_ASSESSMENT_SETTINGS_SUCCESS,
  GET_ASSESSMENTS_REQUEST,
  GET_AVERAGES_SUCCESS,
  GET_RESULTS_REQUEST,
  GET_RESULTS_SUCCESS,
  GET_STUDENT_RESULTS_SUCCESS,
  GET_DOWNLOAD_RESULTS_SUCCESS,
  GET_FULL_SCANS_FOR_PREVIEW_SUCCESS,
  PREVIEW_ANSWER_SHEET_REQUEST,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_RESUTLS_DATA,
  SET_ANSWER_SHEET_PREVIEW,
  SET_ANSWER_SHEET_RESULT,
  SET_ANSWER_SHEET_SCAN_LOADING,
  SET_ASSESSMENT_DETAILS,
  SET_ASSESSMENT_PASSWORD,
  SET_ASSESSMENT,
  SET_ASSESSMENTS,
  SET_CALCULATOR,
  SET_CURRENT_INPUT_TAB_ELEMENT,
  SET_DESMOS_EXPRESSION_ANALYSIS,
  SET_DESMOS,
  SET_FILTERS,
  SET_PREV_INPUT_TAB_ELEMENT,
  SET_RESULTS_ACTIVE_HELP_VIDEO,
  SUBMIT_ONLINE_ASSESSMENT_SUCCESS,
  UNASSIGN_ASSESSMENT_SUCCESS,
  UPDATE_ASSESSMENT_SUCCESS,
  UPDATE_STUDENT_MARK_REQUEST,
} from './constants';

export const initialState = fromJS({
  active_answer: null,
  active_results_data: null,
  analysis: null,
  answer_sheet_item_scan: null,
  answer_sheet_preview: null,
  answer_sheet_result: null,
  answer_sheet_scan_loading: false,
  answers: null,
  assessment_files: null,
  assessment: null,
  assessments: null,
  assessmentDetails: {
    errors: null,
    is_calculator: false,
    name: null,
    scrollTo: null,
  },
  assessment_password: null,
  averages: null,
  calculator: null,
  currentInputTabElement: null,
  desmos_analysis: null,
  desmos: null,
  filters: ['correct', 'partially_correct', 'incorrect', 'low_accuracy', 'high_accuracy'],
  loading: false,
  prevInputTabElement: null,
  results: null,
  resultsActiveHelpVideo: null,
  settings: null,
  student_results: {
    data: [],
    mark: null,
  },
  preview_full_scans: null,
});

function assessmentsReducer(state = initialState, action) {
  switch (action.type) {
    case ANSWER_SHEET_ITEM_SCAN_SUCCESS:
      return state.set('answer_sheet_item_scan', action.data);
    case CREATE_ASSESSMENT_REQUEST:
      return state.set('assessments', { isLoading: true });
    case GET_ANSWERS_SUCCESS:
      return state.set('answers', action.data).set('loading', false);
    case GET_ASSESSMENT_NAME_SUCCESS: {
      let assessmentDetails = state.get('assessmentDetails');
      assessmentDetails = assessmentDetails.set('name', action.data.name);
      return state.set('assessmentDetails', assessmentDetails);
    }
    case GET_ASSESSMENT_FILES_SUCCESS:
      return state.set('assessment_files', action.data);
    case GET_ASSESSMENT_REQUEST:
      return state.set('assessment', { isLoading: true });
    case GET_ASSESSMENTS_REQUEST:
      return state.set('assessments', { isLoading: true });
    case GET_AVERAGES_SUCCESS:
      return state.set('averages', action.data);
    case GET_ASSESSMENT_SETTINGS_SUCCESS:
      return state.set('settings', action.data);
    case GET_RESULTS_REQUEST:
      return state.set('loading', true);
    case DELETE_RESULTS_REQUEST:
      return state.set('results', { data: { isLoading: true } });
    case GET_RESULTS_SUCCESS:
      return state.set('results', action.data).set('loading', false);
    case GET_ANALYSIS_SUCCESS:
      return state.set('analysis', action.data);
    case GET_STUDENT_RESULTS_SUCCESS:
      return state.set('student_results', action.data);
    case GET_DOWNLOAD_RESULTS_SUCCESS:
      return state.set('download_results', action.data);
    case GET_FULL_SCANS_FOR_PREVIEW_SUCCESS:
      return state.set('preview_full_scans', action.data);
    case PREVIEW_ANSWER_SHEET_REQUEST:
      return state.set('answer_sheet_preview', { isLoading: true });
    case SET_ACTIVE_ANSWER:
      return state.set('active_answer', action.data);
    case SET_ACTIVE_RESUTLS_DATA:
      return state.set('active_results_data', action.data);
    case SET_ANSWER_SHEET_PREVIEW:
      return state.set('answer_sheet_preview', action.data);
    case SET_ANSWER_SHEET_RESULT:
      return state.set('answer_sheet_result', action.data);
    case SET_ANSWER_SHEET_SCAN_LOADING:
      return state.set('answer_sheet_scan_loading', action.data);
    case SET_ASSESSMENT:
      return state.set('assessment', action.data);
    case SET_ASSESSMENTS:
      return state.set('assessments', action.data);
    case SET_CALCULATOR:
      return state.set('calculator', action.data);
    case SET_CURRENT_INPUT_TAB_ELEMENT:
      return state.set('currentInputTabElement', action.elementId);
    case SET_DESMOS:
      return state.set('desmos', action.data);
    case SET_DESMOS_EXPRESSION_ANALYSIS:
      return state.set('desmos_analysis', action.data);
    case SET_ASSESSMENT_DETAILS:
      return state.set('assessmentDetails', action.data);
    case SET_ASSESSMENT_PASSWORD:
      return state.set('assessment_password', action.data);
    case SET_FILTERS:
      return state.set('filters', action.data);
    case SET_PREV_INPUT_TAB_ELEMENT:
      return state.set('prevInputTabElement', action.elementId);
    case SET_RESULTS_ACTIVE_HELP_VIDEO:
      return state.set('', action.data);
    case SUBMIT_ONLINE_ASSESSMENT_SUCCESS:
      return state.set('student_results', action.data);
    case UNASSIGN_ASSESSMENT_SUCCESS:
      return state.set('assessments', action.data);
    case UPDATE_ASSESSMENT_SUCCESS: {
      const assessments = _.cloneDeep(state.get('assessments'));
      const index = assessments.findIndex(a => a.id === action.data.id);
      assessments[index] = action.data;
      return state.set('assessments', assessments).set('loading', false);
    }
    case UPDATE_STUDENT_MARK_REQUEST:
      return state.set('loading', true);
    default:
      return state;
  }
}

export default assessmentsReducer;
