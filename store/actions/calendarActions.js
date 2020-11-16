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
      type: types.FETCH_CALENDAR_EVENTS,
      events: data.items,
    });
  };
};

export const toggleCalendarFavorite = (eventId, identifier) => {
  return { type: types.TOGGLE_CALENDAR_FAVORITE, eventId, identifier };
};
