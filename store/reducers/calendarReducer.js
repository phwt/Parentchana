import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const calendarReducer = (state = initialState.calendar, action) => {
  switch (action.type) {
    case types.LOAD_CALENDAR_LIST:
      return state;
    case types.TOGGLE_CALENDAR_FAVORITE:
      return { ...state, favorite: [...state.favorite, action.id] };
    default:
      return state;
  }
};

export default calendarReducer;
