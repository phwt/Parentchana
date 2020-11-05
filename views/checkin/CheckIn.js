import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import {CalendarList} from 'react-native-calendars';
import { checkinAPI } from "../../store/mockData";

const CheckIn = () => {
  // const [checkinList, setcheckinList] = useState(checkinAPI);
  var checkinData = {};
  // for (var i = 0; i < Object.keys(checkinAPI).length; i++) {
  //   if(checkinAPI[i].type === "arrival"){
  //     if(checkinAPI[i].ontime){
  //       checkinData[checkinAPI[i].timestamp.getFullYear()+"-"+('0' + (checkinAPI[i].timestamp.getMonth() + 1)).slice(-2) + "-" + ('0' + checkinAPI[i].timestamp.getDate()).slice(-2)] = { textColor: 'white', startingDay: true, endingDay: true, color: '#249d3c' };
  //     }
  //     else {
  //       checkinData[checkinAPI[i].timestamp.getFullYear()+"-"+('0' + (checkinAPI[i].timestamp.getMonth() + 1)).slice(-2) + "-" + ('0' + checkinAPI[i].timestamp.getDate()).slice(-2)] = { textColor: 'white', startingDay: true, endingDay: true, color: '#ff9a00' };
  //     }
  //   }
  //   else if (checkinAPI[i].type === "absent") {
  //     checkinData[checkinAPI[i].timestamp.getFullYear()+"-"+('0' + (checkinAPI[i].timestamp.getMonth() + 1)).slice(-2) + "-" + ('0' + checkinAPI[i].timestamp.getDate()).slice(-2)] = { textColor: 'white', startingDay: true, endingDay: true, color: '#d72f3c' };
  //   } 
  // }
  // console.log(checkinData);

  return (
    <CalendarList
      // testID={testIDs.calendarList.CONTAINER}
      // markedDates={{
      //   '2020-11-02': {disabled: true, startingDay: true, endingDay: true, color: 'green'},
      //   '2020-11-17': {disabled: true, startingDay: true, endingDay: true, color: 'green'},
      //   '2020-11-25': {disabled: true, startingDay: true, endingDay: true, color: 'green'}

      // }}
      markedDates={checkinData}
      markingType={'period'}
      current={'2020-10-02'}
      // pastScrollRange={24}
      // futureScrollRange={24}
      renderHeader={(date) => {
        const header = date.toString('MMMM yyyy');
        const [month, year] = header.split(' ');

        return(
          <View style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10
          }}>
            <Text style={{marginLeft: 5, ...styles.textStyle}}>{`${month}`}</Text>
            <Text style={{marginRight: 5, ...styles.textStyle}}>{year}</Text>
          </View>
        );
      }}
      // theme={{
      //   'stylesheet.calendar.header': {
      //     dayHeader: {
      //       fontWeight: '600',
      //       color: 'black'
      //     }
      //   },
      //   'stylesheet.day.basic': {
      //     today: {
      //       borderColor: '#48BFE3',
      //       borderWidth: 0.8
      //     },
      //     todayText: {
      //       color: '#5390D9',
      //       fontWeight: '800'
      //     }
      //   }
      // }}
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
  textStyle: {
    fontSize: 20,
    // fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black',
    paddingRight: 5
  }
});

export default CheckIn;
