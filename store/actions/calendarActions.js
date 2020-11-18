import * as types from "./actionTypes";
import { calendarConfig } from "../../config";
import axios from "axios";
import { scheduleEventNotification } from "../../modules/LocalNotification";
import { cancelScheduledNotificationAsync } from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const fetchCalendarFavorites = () => {
  return async (dispatch) => {
    const favoriteList = await AsyncStorage.getItem("calendarFavorites");
    dispatch({
      type: types.FETCH_CALENDAR_FAVORITES,
      favoriteList: favoriteList !== null ? JSON.parse(favoriteList) : [],
    });
  };
};

export const toggleCalendarFavorite = (eventId) => {
  return async (dispatch, getState) => {
    const {
      calendar: { favorite },
    } = getState();

    if (favorite.some((favItem) => favItem.eventId === eventId)) {
      await AsyncStorage.setItem(
        "calendarFavorites",
        JSON.stringify(
          favorite.filter((favItem) => favItem.eventId !== eventId)
        )
      );

      const { identifier } = favorite.find(
        (favItem) => favItem.eventId === eventId
      );
      await cancelScheduledNotificationAsync(identifier);
      dispatch({ type: types.REMOVE_CALENDAR_FAVORITE, eventId });
    } else {
      await AsyncStorage.setItem(
        "calendarFavorites",
        JSON.stringify([...favorite, { eventId, identifier }])
      );

      const identifier = await scheduleEventNotification(eventId);
      dispatch({ type: types.ADD_CALENDAR_FAVORITE, eventId, identifier });
    }
  };
};
