import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";
import CheckInTable from "../../components/checkin/CheckInTable";

const CheckInDetailed = (props) => {
  const [selectedRange, setSelectedRange] = useState(
    moment(new Date("11/01/2020"))
  ); // TODO: Handle month selection

  const checkinList = useSelector((state) => state.checkin.list);

  return (
    <SafeAreaView style={styles.container}>
      <CheckInTable selectedRange={selectedRange} checkinList={checkinList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 25,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  space: {
    width: "25%",
    flexDirection: "row",
  },
  data: {
    // justifyContent: "center",
    alignSelf: "center",
    margin: 0,
  },
});

export default CheckInDetailed;
