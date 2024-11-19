import { SHOW_MODAL, HIDE_MODAL } from './constants';

export const showModal = data => ({
  type: SHOW_MODAL,
  data,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});
