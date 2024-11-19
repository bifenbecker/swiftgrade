import { createSelector } from 'reselect';
import { initialState } from '../reducer';

const selectAssessments = state => state.get('assessments', initialState);

const makeSelectResults = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('results'),
  );

const makeSelectFilters = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('filters'),
  );

const makeSelectDownloadResults = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('download_results'),
  );

const makeSelectViewFullScans = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('preview_full_scans'),
  );

const makeSelectAverages = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('averages'),
  );

const makeSelectAnalysis = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('analysis'),
  );

const makeSelectAnswers = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('answers'),
  );

const makeSelectActiveResultsData = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('active_results_data'),
  );

const makeSelectStudentResults = () =>
  createSelector(
    selectAssessments,
    assessmentState => assessmentState.get('student_results'),
  );

export {
  makeSelectActiveResultsData,
  makeSelectAnalysis,
  makeSelectAnswers,
  makeSelectAverages,
  makeSelectFilters,
  makeSelectResults,
  makeSelectStudentResults,
  makeSelectDownloadResults,
  makeSelectViewFullScans,
};
