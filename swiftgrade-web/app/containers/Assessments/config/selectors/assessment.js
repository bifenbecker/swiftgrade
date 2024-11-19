import { createSelector } from 'reselect';
import { initialState } from '../reducer';

const selectAssessments = state => state.get('assessments', initialState);

const makeSelectAssessment = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('assessment'),
  );

const makeSelectAssessmentFiles = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('assessment_files'),
  );

const makeSelectAssessmentDetails = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('assessmentDetails'),
  );

const makeSelectAssessmentPassword = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('assessment_password'),
  );

const makeSelectAssessmentSettings = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('settings'),
  );

const makeSelectAssessments = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('assessments'),
  );

const makeSelectCalculator = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('calculator'),
  );

const makeSelectCurrentInputTabElement = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('currentInputTabElement'),
  );

const makeSelectDesmos = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('desmos'),
  );

const makeSelectDesmosExpressionAnalysis = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('desmos_analysis'),
  );

const makeSelectPrevInputTabElement = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('prevInputTabElement'),
  );

export {
  makeSelectAssessment,
  makeSelectAssessmentDetails,
  makeSelectAssessmentFiles,
  makeSelectAssessmentPassword,
  makeSelectAssessmentSettings,
  makeSelectAssessments,
  makeSelectCalculator,
  makeSelectCurrentInputTabElement,
  makeSelectDesmos,
  makeSelectDesmosExpressionAnalysis,
  makeSelectPrevInputTabElement,
};
