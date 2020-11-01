import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { checkinAPI } from "../../store/mockData";
import { color } from "react-native-reanimated";
import { check } from "prettier";


const CheckIn = () => {
  let [checkinList, setcheckinList] = useState(checkinAPI);
  // console.log(checkinList);
  return <Text>CheckInScreen</Text>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
  },
  title: {
    fontWeight: "bold",
  }
});


export default CheckIn;
