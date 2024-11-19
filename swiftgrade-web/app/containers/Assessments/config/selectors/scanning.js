import { createSelector } from 'reselect';
import { initialState } from '../reducer';

const selectAssessments = state => state.get('assessments', initialState);

const makeSelectAnswerSheetItemScan = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('answer_sheet_item_scan'),
  );

const makeSelectAnswerSheetScanLoading = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('answer_sheet_scan_loading'),
  );

export { makeSelectAnswerSheetItemScan, makeSelectAnswerSheetScanLoading };
