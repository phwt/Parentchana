import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const checkinReducer = (state = initialState.checkin, action) => {
  switch (action.type) {
    case types.LOAD_CHECKIN_LIST:
      return state;
    default:
      return state;
  }
};

export default checkinReducer;
