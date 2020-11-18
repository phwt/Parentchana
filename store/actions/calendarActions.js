import * as types from "./actionTypes";
import { calendarConfig } from "../../config";
import axios from "axios";
import { schedulePushNotification } from "../../modules/LocalNotification";

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

export const toggleCalendarFavorite = (eventId) => {
  return async (dispatch, getState) => {
    const {
      calendar: { favorite },
    } = getState();

    if (favorite.some((favItem) => favItem.eventId === eventId)) {
      // TODO: Remove notification schedule
      dispatch({ type: types.REMOVE_CALENDAR_FAVORITE, eventId });
    } else {
      const identifier = await schedulePushNotification(eventId);
      dispatch({ type: types.ADD_CALENDAR_FAVORITE, eventId, identifier });
    }
  };
};
