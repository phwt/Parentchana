import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { currentMonthDays } from "../../modules/CheckinUtils";
import moment from "moment";

import {
  fetchCalendarEvents,
  toggleCalendarFavorite,
} from "../../store/actions/calendarActions";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../../modules/LocalNotification";

const Calendar = (props) => {
  const events = useSelector((state) => state.calendar.events);
  const favoriteEvents = useSelector((state) => state.calendar.favorite);
  const [computedEvents, setComputedEvents] = useState({});
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(
    async (eventId) => {
      const identifier = await schedulePushNotification(eventId); // TODO: Make notification toggleable
      dispatch(toggleCalendarFavorite(eventId, identifier)); // TODO: Schedule a notification
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
    (async () => {
      await registerForPushNotificationsAsync();
    })();
  }, []);

  useEffect(() => {
    loadCalendarEvents();
  }, [loadCalendarEvents]);

  useEffect(() => {
    let calendarData = currentMonthDays(
      moment(Date()).endOf("month"),
      [],
      "YYYY-MM-DD"
    );
    events.map((el) => {
      const startDate = el.start.date.toString();

      if (startDate in calendarData)
        calendarData[startDate] = [
          ...calendarData[startDate],
          { id: el.id, name: el.summary },
        ];
      else calendarData[startDate] = [{ id: el.id, name: el.summary }];
    });
    setComputedEvents(calendarData);
  }, [events]);

  const renderItem = (item) => {
    return (
      <View style={[styles.item, { height: 80 }]}>
        <Text>{item.name}</Text>
        <TouchableOpacity
          style={styles.fav}
          onPress={() => toggleFavoriteHandler(item.id)}
        >
          {favoriteEvents.some((i) => i.eventId === item.id) ? (
            <Ionicons name="ios-star" size={20} />
          ) : (
            <Ionicons name="ios-star-outline" size={20} />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        // testID={testIDs.agenda.CONTAINER}
        items={computedEvents}
        // loadItemsForMonth={loadItems}
        selected={moment(Date.now()).format("YYYY-MM-DD")}
        renderItem={renderItem}
        // renderEmptyDate={() => {return (<View />);}}
        // renderEmptyDate={this.renderEmptyDate.bind(this)}
        // rowHasChanged={this.rowHasChanged.bind(this)}
      />
    </View>
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
    backgroundColor: "white",
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
    top: 20,
  },
});

export default Calendar;
