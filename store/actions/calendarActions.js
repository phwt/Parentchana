import * as types from "./actionTypes";
import { calendarConfig } from "../../config";
import axios from "axios";

export const fetchCalendarEvents = () => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarConfig.calendarId
      )}/events?key=${calendarConfig.apiKey}`
    );
    dispatch({
      type: types.LOAD_CALENDAR_LIST,
      events: data.items,
    });
  };
};

export const toggleCalendarFavorite = (id) => {
  return { type: types.TOGGLE_CALENDAR_FAVORITE, id };
};
