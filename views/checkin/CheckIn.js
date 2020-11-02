import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import {CalendarList} from 'react-native-calendars';
import { checkinAPI } from "../../store/mockData";

const CheckIn = () => {
  const [checkinList, setcheckinList] = useState(checkinAPI);

  return (
    <CalendarList
      // testID={testIDs.calendarList.CONTAINER}
      current={'2020-06-10'}
      pastScrollRange={24}
      futureScrollRange={24}
      renderHeader={(date) => {
        const header = date.toString('MMMM yyyy');
        const [month, year] = header.split(' ');
        const textStyle = {
          fontSize: 18,
          fontWeight: 'bold',
          paddingTop: 10,
          paddingBottom: 10,
          color: '#5E60CE',
          paddingRight: 5
        };

        return(
          <View style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 10
          }}>
            <Text style={{marginLeft: 5, ...textStyle}}>{`${month}`}</Text>
            <Text style={{marginRight: 5, ...textStyle}}>{year}</Text>
          </View>
        );
      }}
      theme={{
        'stylesheet.calendar.header': {
          dayHeader: {
            fontWeight: '600',
            color: '#48BFE3'
          }
        },
        'stylesheet.day.basic': {
          today: {
            borderColor: '#48BFE3',
            borderWidth: 0.8
          },
          todayText: {
            color: '#5390D9',
            fontWeight: '800'
          }
        }
      }}
    />);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
  },
  title: {
    fontWeight: "bold",
  },
});

export default CheckIn;
