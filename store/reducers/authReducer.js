import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const calendarReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.GET_AUTHENTICATED_STATUS:
      return state;
    case types.SET_AUTHENTICATED_STATUS:
      return { ...state, authenticated: action.status };
    case types.LOGIN_SUCCESS:
      return { ...state, role: action.role, profile: action.profile };
    case types.LOGOUT_SUCCESS:
      return { ...state, role: 0, profile: {} };
    default:
      return state;
  }
};

export default calendarReducer;
