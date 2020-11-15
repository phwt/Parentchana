import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const calendarReducer = (state = initialState.calendar, action) => {
  switch (action.type) {
    case types.FETCH_CALENDAR_EVENTS:
      return { ...state, events: action.events };
    case types.TOGGLE_CALENDAR_FAVORITE:
      if (state.favorite.includes(action.id)) {
        return {
          ...state,
          favorite: state.favorite.filter((id) => id != action.id),
        };
      } else {
        return { ...state, favorite: [...state.favorite, action.id] };
      }
    default:
      return state;
  }
};

export default calendarReducer;
