import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectModal = state => state.get('modal', initialState);

const makeSelectModalData = () =>
  createSelector(
    selectModal,
    modalState => modalState.get('modalData'),
  );

const makeSelectIsModalActive = () =>
  createSelector(
    selectModal,
    modalState => modalState.get('isModalActive'),
  );

export { makeSelectIsModalActive, makeSelectModalData };
