import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const checkinReducer = (state = initialState.checkin, action) => {
  switch (action.type) {
    case types.FETCH_CHECKIN_LIST:
      return { ...state, list: action.checkinItems };
    default:
      return state;
  }
};

export default checkinReducer;
