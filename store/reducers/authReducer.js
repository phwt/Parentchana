import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const calendarReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.GET_AUTHENTICATED_STATUS:
      return state;
    case types.SET_AUTHENTICATED_STATUS:
      return { ...state, authenticated: action.status };
    default:
      return state;
  }
};

export default calendarReducer;
