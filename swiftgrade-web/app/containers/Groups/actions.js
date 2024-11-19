import {
  COPY_GROUP_REQUEST,
  CREATE_GROUPS_REQUEST,
  DELETE_GROUP_REQUEST,
  GET_GROUP_REQUEST,
  GET_GROUPS_REQUEST,
  JOIN_GROUP_REQUEST,
  RENAME_GROUP_REQUEST,
  SET_GROUP,
  SET_GROUPS,
  SET_LOADING,
  SET_IS_NEW_SESSION,
} from './constants';

export const createGroupsRequest = data => ({
  type: CREATE_GROUPS_REQUEST,
  data,
});

export const getGroupRequest = data => ({
  type: GET_GROUP_REQUEST,
  data,
});

export const getGroupsRequest = data => ({
  type: GET_GROUPS_REQUEST,
  data,
});

export const joinGroupRequest = data => ({
  type: JOIN_GROUP_REQUEST,
  data,
});

export const setGroup = data => ({
  type: SET_GROUP,
  data,
});

export const setGroups = data => ({
  type: SET_GROUPS,
  data,
});

export const setLoading = data => ({
  type: SET_LOADING,
  data,
});

export const setIsNewSession = data => ({
  type: SET_IS_NEW_SESSION,
  data,
});

export const deleteGroupRequest = data => ({
  type: DELETE_GROUP_REQUEST,
  data,
});

export const copyGroupRequest = data => ({
  type: COPY_GROUP_REQUEST,
  data,
});

export const renameGroupRequest = data => ({
  type: RENAME_GROUP_REQUEST,
  data,
});
