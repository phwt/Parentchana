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

const Calendar = (props) => {
  const events = useSelector((state) => state.calendar.events);
  const favoriteEvents = useSelector((state) => state.calendar.favorite);
  const [computedEvents, setComputedEvents] = useState({});
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(
    async (eventId) => {
      dispatch(toggleCalendarFavorite(eventId)); // TODO: Schedule a notification
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
      <View style={[styles.item, { height: 50 }]}>
        <Text style={styles.eventText}>{item.name}</Text>
        <TouchableOpacity
          style={styles.fav}
          onPress={() => toggleFavoriteHandler(item.id)}
        >
          {favoriteEvents.some((i) => i.eventId === item.id) ? (
            <Ionicons name="ios-star" size={25} color="white" />
          ) : (
            <Ionicons name="ios-star-outline" size={25} color="white" />
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
