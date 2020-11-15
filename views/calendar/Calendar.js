import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleCalendarFavorite } from "../../store/actions/calendarActions";

// import { calendarConfig } from "../../config";
// import axios from "axios";

const Calendar = (props) => {
  const events = useSelector((state) => state.calendar.list);
  const [computedEvents, setComputedEvents] = useState({});
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback((eventId) => {
    dispatch(toggleCalendarFavorite(eventId));
  }, [dispatch]);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
  //         calendarConfig.calendarId
  //       )}/events?key=${calendarConfig.apiKey}`
  //     );
  //     setEvents(data.items);
  //   })();
  // }, []);

  useEffect(() => {
    let calendarData = {};
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
          <Ionicons name="ios-star-outline" size={20}/>
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
        selected={"2020-11-06"}
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
