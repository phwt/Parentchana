import * as types from "./actionTypes";

export const loadCalendarList = (calendars) => {
  return { type: types.LOAD_CALENDAR_LIST, calendars };
};

export const loadCalendarFavorite = (calendars) => {
  return { type: types.LOAD_CALENDAR_FAVORITE, calendars };
};

export const toggleCalendarFavorite = (id) => {
  return { type: types.TOGGLE_CALENDAR_FAVORITE, id };
};

