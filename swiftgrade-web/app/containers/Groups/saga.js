/* eslint-disable no-empty */
import _ from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  copyGroupApi,
  createGroupsApi,
  deleteGroupApi,
  getGroupApi,
  getGroupsApi,
  joinGroupApi,
  renameGroupApi,
} from 'api/requests';
import { setGroup, setGroups, setLoading } from './actions';

import {
  CREATE_GROUPS_REQUEST,
  GET_GROUP_REQUEST,
  GET_GROUPS_REQUEST,
  DELETE_GROUP_REQUEST,
  COPY_GROUP_REQUEST,
  RENAME_GROUP_REQUEST,
  JOIN_GROUP_REQUEST,
} from './constants';
import { makeSelectGroups } from './selectors';

export function* createGroups(action) {
  const { data, handleErrors, handleSuccess } = action.data;
  try {
    // According to these changes the logic for web and mobile app can be slightly different.
    // if (data.groups.length === 1) {
    //   response = createGroupApi()
    //   yield history.push(`groups/${response.data.group_id}/assessments/`);
    // } else {
    const response = yield call(createGroupsApi, data);
    yield put(setGroups(response.data));
    yield put(setLoading(false));
    // }
    if (_.has(action.data, 'handleSuccess')) {
      yield call(handleSuccess);
    }
  } catch (errors) {
    if (errors.status === 400) {
      yield put(setLoading(false));
      yield call(handleErrors, errors.data);
    }
  }
}

export function* getGroup(action) {
  try {
    const { groupId } = action.data;
    const response = yield call(getGroupApi, groupId);
    yield put(setGroup(response.data));
  } catch {}
}

export function* getGroups(action) {
  try {
    const response = yield call(getGroupsApi, action.data);
    yield put(setGroups(response.data));
    yield put(setLoading(false));

    if (_.has(action.data, 'handleSuccess')) {
      yield call(action.data.handleSuccess, response.data);
    }
  } catch {}
}

export function* deleteGroup(action) {
  const { groupId, handleSuccess } = action.data;
  try {
    const response = yield call(deleteGroupApi, groupId);
    if (response.status === 204) {
      const groups = yield select(makeSelectGroups());
      const updatedGroups = groups.filter(group => group.id !== groupId);
      yield put(setGroups(updatedGroups));
      yield call(handleSuccess);
    }
  } catch {}
}

export function* copyGroup(action) {
  const { data, groupId, handleErrors, handleSuccess } = action.data;
  try {
    const response = yield call(copyGroupApi, groupId, data);
    const groups = yield select(makeSelectGroups());
    groups.unshift(response.data);
    yield put(setGroups(groups));
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* renameGroup(action) {
  const { data, groupId, handleErrors, handleSuccess } = action.data;
  try {
    const response = yield call(renameGroupApi, groupId, data);
    const groups = yield select(makeSelectGroups());
    const groupIndex = groups.findIndex(group => group.id === response.data.id);
    groups[groupIndex] = response.data;
    yield put(setGroups(groups));
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* joinGroup(action) {
  const { data, handleSuccess } = action.data;
  try {
    const response = yield call(joinGroupApi, data);
    yield put(setGroups(response.data));
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      const { handleErrors } = action.data;
      yield call(handleErrors, errors.data);
    }
  }
}

export default function* groupsSaga() {
  yield takeLatest(COPY_GROUP_REQUEST, copyGroup);
  yield takeLatest(CREATE_GROUPS_REQUEST, createGroups);
  yield takeLatest(DELETE_GROUP_REQUEST, deleteGroup);
  yield takeLatest(GET_GROUP_REQUEST, getGroup);
  yield takeLatest(GET_GROUPS_REQUEST, getGroups);
  yield takeLatest(JOIN_GROUP_REQUEST, joinGroup);
  yield takeLatest(RENAME_GROUP_REQUEST, renameGroup);
}
