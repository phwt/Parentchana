import * as types from "./actionTypes";

export const loadCalendarList = (calendars) => {
  return { type: types.LOAD_CALENDAR_LIST, calendars };
};

export const toggleCalendarFavorite = (id) => {
  return { type: types.TOGGLE_CALENDAR_FAVORITE, id };
};

