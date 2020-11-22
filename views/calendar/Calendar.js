import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { currentMonthDays } from "../../modules/CheckinUtils";
import moment from "moment";

import {
  fetchCalendarEvents,
  fetchCalendarFavorites,
  toggleCalendarFavorite,
} from "../../store/actions/calendarActions";
import { Appbar } from "react-native-paper";
import Color from "../../modules/Color";

const Calendar = ({ navigation }) => {
  const events = useSelector((state) => state.calendar.events);
  const favoriteEvents = useSelector((state) => state.calendar.favorite);
  const [computedEvents, setComputedEvents] = useState({});
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(
    async (eventId) => {
      dispatch(toggleCalendarFavorite(eventId));
    },
    [dispatch]
  );

  const loadCalendarEvents = useCallback(async () => {
    try {
      await dispatch(fetchCalendarEvents());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadCalendarEvents();
  }, [loadCalendarEvents]);

  const loadCalendarFavorites = useCallback(async () => {
    try {
      await dispatch(fetchCalendarFavorites());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadCalendarFavorites();
  }, [loadCalendarFavorites]);

  useEffect(() => {
    let calendarData = currentMonthDays({
      toDate: moment(Date()).endOf("month"),
      defaultItemValue: [],
      keyFormat: "YYYY-MM-DD",
    });
    events.map((el) => {
      const startDate = el.start.date.toString();

      if (startDate in calendarData)
        calendarData[startDate] = [
          ...calendarData[startDate],
          {
            id: el.id,
            name: el.summary,
            date: moment(startDate, "YYYY-MM-DD"),
          },
        ];
      else
        calendarData[startDate] = [
          {
            id: el.id,
            name: el.summary,
            date: moment(startDate, "YYYY-MM-DD"),
          },
        ];
    });
    setComputedEvents(calendarData);
  }, [events]);

  const renderItem = (item) => {
    return (
      <View style={[styles.item, { height: 50 }]}>
        <Text style={styles.eventText}>{item.name}</Text>
        {item.date.diff(moment()) > 0 && (
          <TouchableOpacity
            style={styles.fav}
            onPress={() => toggleFavoriteHandler(item.id)}
          >
            {favoriteEvents.some((i) => i.eventId === item.id) ? (
              <Ionicons name="ios-notifications" size={25} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={25}
                color="white"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <>
      <Appbar.Header style={{ backgroundColor: Color.calendarKey }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.popToTop();
          }}
        />
        <Appbar.Content title="Calendar" subtitle="School's Events" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <Agenda
          items={computedEvents}
          selected={moment(Date.now()).format("YYYY-MM-DD")}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#00adf5",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  fav: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  eventText: {
    color: "white",
    marginTop: 10,
    marginLeft: 5,
    fontSize: 16,
  },
});

export default Calendar;
