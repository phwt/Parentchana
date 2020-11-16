import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const calendarReducer = (state = initialState.calendar, action) => {
  switch (action.type) {
    case types.FETCH_CALENDAR_EVENTS:
      return { ...state, events: action.events };
    case types.TOGGLE_CALENDAR_FAVORITE:
      if (state.favorite.some((item) => item.eventId === action.eventId)) {
        return {
          ...state,
          favorite: state.favorite.filter(
            (item) => item.eventId !== action.eventId
          ),
        };
      } else {
        return {
          ...state,
          favorite: [
            ...state.favorite,
            { eventId: action.eventId, identifier: action.identifier },
          ],
        };
      }
    default:
      return state;
  }
};

export default calendarReducer;
