import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const pickupReducer = (state = initialState.pickup, action) => {
  switch (action.type) {
    case types.FETCH_STUDENTS:
      return { ...state, students: action.students };
    default:
      return state;
  }
};

export default pickupReducer;
