import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.GET_AUTHENTICATED_STATUS:
      return state;
    case types.SET_AUTHENTICATED_STATUS:
      return { ...state, authenticated: action.status };
    case types.LOGIN_SUCCESS:
      return { ...state, role: action.role };
    case types.LOGOUT_SUCCESS:
      return { ...state, role: 0 };
    default:
      return state;
  }
};

export default authReducer;
