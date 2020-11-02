import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { calendarAPI } from "../../store/mockData";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Calendar = () => {
  // const [calendarAPI, setcalendarAPI] = useState(calendarAPI);
  // const calendarAPI = {
  //   "2012-05-21": [{ name: "test 1" }],
  //   "2012-05-23": [{ name: "cat" }],
  //   "2012-05-24": [],
  //   "2012-05-25": [{ name: "dog" }, { name: "yo" }],
  // };
  // const [items, setItems] = useState(calendarAPI);
  // console.log(calendarAPI[0].summary);
  var calendarData = {};
  for (var i = 0; i < Object.keys(calendarAPI).length; i++) {
    //if key doesnt exist
    if (calendarAPI[i].start.date.toString() in calendarAPI){
      calendarData[calendarAPI[i].start.date.toString()].push({ name: calendarAPI[i].summary });
    }
    else{
      calendarData[calendarAPI[i].start.date.toString()] = [{ name: calendarAPI[i].summary }];
    }
    //elseif key already exist
  }
  console.log(calendarData);

  // const loadItems = (day) => {
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);
  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: "Item for " + strTime + " #" + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }
  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1000);
  // };
  const renderItem = (item) => {
    return (
      <TouchableOpacity style={[styles.item, { height: 80 }]}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        // testID={testIDs.agenda.CONTAINER}
        items={calendarData}
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
});
export default Calendar;
