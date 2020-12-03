import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const calendarReducer = (state = initialState.calendar, action) => {
  switch (action.type) {
    case types.FETCH_CALENDAR_EVENTS:
      return { ...state, events: action.events };
    case types.FETCH_CALENDAR_FAVORITES:
      return { ...state, favorite: action.favoriteList };
    case types.ADD_CALENDAR_FAVORITE:
      return {
        ...state,
        favorite:
        [
          ...state.favorite,
          { eventId: action.eventId, identifier: action.identifier },
        ],
      };
    case types.REMOVE_CALENDAR_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(
          (item) => item.eventId !== action.eventId
        ),
      };
    default:
      return state;
  }
};

export default calendarReducer;
