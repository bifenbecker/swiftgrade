import { createSelector } from 'reselect';
import { initialState } from '../reducer';

const selectAssessments = state => state.get('assessments', initialState);

const makeSelectAnswerSheetPreview = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('answer_sheet_preview'),
  );

const makeSelectAnswerSheetResult = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('answer_sheet_result'),
  );

export { makeSelectAnswerSheetPreview, makeSelectAnswerSheetResult };
