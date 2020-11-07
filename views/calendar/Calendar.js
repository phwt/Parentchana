import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  loadCalendarList,
  toggleCalendarFavorite,
} from "../../store/actions/calendarActions";

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

const Calendar = (props) => {
  useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        await loadCalendarList();
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  const toggleFavorite = (id) => {
    props.toggleCalendarFavorite(id);
  };

  var calendarData = {};
  for (var i = 0; i < Object.keys(props.calendarAPI).length; i++) {
    //if key doesnt exist
    if (props.calendarAPI[i].start.date.toString() in props.calendarAPI) {
      calendarData[props.calendarAPI[i].start.date.toString()].push({
        name: props.calendarAPI[i].summary,
        id: props.calendarAPI[i].id,
      });
    } else {
      calendarData[props.calendarAPI[i].start.date.toString()] = [
        { name: props.calendarAPI[i].summary, id: props.calendarAPI[i].id },
      ];
    }
    //elseif key already exist
  }
  console.log(calendarData);

  const renderItem = (item) => {
    return (
      <View style={[styles.item, { height: 80 }]}>
        <Text>{item.name}</Text>
        <TouchableOpacity
          style={styles.fav}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons name="ios-star-outline" size={20}></Ionicons>
        </TouchableOpacity>
      </View>
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
  fav: {
    position: "absolute",
    right: 30,
    top: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    calendarAPI: state.calendar.list,
  };
};

const mapDispatchToProps = {
  loadCalendarList,
  toggleCalendarFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
