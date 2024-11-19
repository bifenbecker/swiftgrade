import { createSelector } from 'reselect';
import { initialState } from '../reducer';
import {
  makeSelectAssessment,
  makeSelectAssessmentDetails,
  makeSelectAssessmentFiles,
  makeSelectAssessmentPassword,
  makeSelectAssessments,
  makeSelectAssessmentSettings,
  makeSelectCalculator,
  makeSelectCurrentInputTabElement,
  makeSelectDesmos,
  makeSelectDesmosExpressionAnalysis,
  makeSelectPrevInputTabElement,
} from './assessment';
import { makeSelectAnswerSheetPreview, makeSelectAnswerSheetResult } from './generation';
import {
  makeSelectActiveResultsData,
  makeSelectAnalysis,
  makeSelectAnswers,
  makeSelectResults,
  makeSelectAverages,
  makeSelectFilters,
  makeSelectStudentResults,
  makeSelectViewFullScans,
} from './results';
import { makeSelectAnswerSheetItemScan, makeSelectAnswerSheetScanLoading } from './scanning';

const selectAssessments = state => state.get('assessments', initialState);
const makeSelectLoading = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('loading'),
  );

export {
  makeSelectActiveResultsData,
  makeSelectAnalysis,
  makeSelectAnswers,
  makeSelectAnswerSheetItemScan,
  makeSelectAnswerSheetPreview,
  makeSelectAnswerSheetResult,
  makeSelectAnswerSheetScanLoading,
  makeSelectAssessment,
  makeSelectAssessmentDetails,
  makeSelectAssessmentFiles,
  makeSelectAssessmentPassword,
  makeSelectAssessments,
  makeSelectAssessmentSettings,
  makeSelectAverages,
  makeSelectCalculator,
  makeSelectCurrentInputTabElement,
  makeSelectDesmos,
  makeSelectDesmosExpressionAnalysis,
  makeSelectFilters,
  makeSelectLoading,
  makeSelectPrevInputTabElement,
  makeSelectResults,
  makeSelectStudentResults,
  makeSelectViewFullScans,
};
