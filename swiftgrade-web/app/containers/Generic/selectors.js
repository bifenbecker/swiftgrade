import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGenericPreview = state => state.get('generic_preview', initialState);

const makeSelectLoading = () =>
  createSelector(
    selectGenericPreview,
    genericPreviewState => genericPreviewState.get('isLoading'),
  );

const makeSelectorGenericPreview = () =>
  createSelector(
    selectGenericPreview,
    genericPreviewState => genericPreviewState.get('generic_preview'),
  );

const makeSelectorGenericData = () =>
  createSelector(
    selectGenericPreview,
    genericPreviewState => genericPreviewState.get('generic_data'),
  );

export { makeSelectLoading, makeSelectorGenericPreview, makeSelectorGenericData };
