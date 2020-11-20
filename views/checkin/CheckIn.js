import React, { useCallback, useEffect, useState } from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import CheckInTable from "../../components/checkin/CheckInTable";
import { computeMarkedDates } from "../../modules/CheckinUtils";
import { fetchCheckinList } from "../../store/actions/checkinActions";
import { Appbar } from "react-native-paper";

const CheckIn = ({ navigation }) => {
  const [selectedRange, setSelectedRange] = useState(
    moment("01/10/2020", "DD/MM/YYYY")
  );
  const [loaded, setLoaded] = useState(false);

  const checkinList = useSelector((state) => state.checkin.list);

  const dispatch = useDispatch();

  const loadCheckinList = useCallback(async () => {
    try {
      await dispatch(fetchCheckinList("12345")); // TODO: Handle student selection
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadCheckinList();
  }, [loadCheckinList]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Time Check-in" subtitle="Showing 12345's info" />
        <Appbar.Action icon="refresh" />
      </Appbar.Header>

      <Calendar
        markedDates={computeMarkedDates(checkinList)}
        markingType={"period"}
        current={moment().utcOffset("+05:30").format("YYYY-MM-DD")}
        onMonthChange={(month) => {
          setSelectedRange(
            moment(`01-${month.month}-${month.year}`, "DD-MM-YYYY")
          );
        }}
        displayLoadingIndicator={!loaded}
        renderHeader={(date) => {
          const header = date.toString("MMMM yyyy");
          const [month, year] = header.split(" ");

          return (
            <View
              style={{
                flexDirection: "row",
                width: "77%",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{ marginLeft: 75, ...styles.textStyle }}
              >{`${month}`}</Text>
              <Text style={{ marginRight: 0, ...styles.textStyle }}>
                {year}
              </Text>
            </View>
          );
        }}
      />
      <SafeAreaView style={styles.container}>
        <CheckInTable selectedRange={selectedRange} checkinList={checkinList} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
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
    // paddingTop: 10,
    // paddingBottom: 10,
    color: "black",
    // paddingRight: 5,
  },
});

export default CheckIn;
