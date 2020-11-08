import * as types from "./actionTypes";

export const setAuthenticatedStatus = (status) => {
  return { type: types.SET_AUTHENTICATED_STATUS, status };
};

export const getAuthenticatedStatus = (status) => {
  return { type: types.GET_AUTHENTICATED_STATUS, status };
};
